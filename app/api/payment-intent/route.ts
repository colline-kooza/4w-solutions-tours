import { stripe } from "@/config/stripe";
import { NextRequest, NextResponse } from "next/server";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

async function getActiveProducts() {
  const stripeProducts = await stripe.products.list();
  const activeProducts = stripeProducts.data.filter(
    (item: any) => item.active === true
  );
  return activeProducts;
}

export async function POST(request: NextRequest) {
  try {
    // Validate input
    const body = await request.json();
    if (
      !body.products ||
      !Array.isArray(body.products) ||
      body.products.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid request: products array is required" },
        { status: 400 }
      );
    }

    const { products } = body;
    const checkoutProducts: Item[] = products;

    // Calculate total amount
    const amount = checkoutProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Get active products from Stripe
    let activeProducts = await getActiveProducts();

    // Create products in Stripe that don't exist yet
    try {
      for (const product of checkoutProducts) {
        const stripeProduct = activeProducts?.find(
          (stripeProduct: any) =>
            stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
        );

        if (stripeProduct === undefined) {
          const unitAmount = Math.round(product.price * 100);

          const prod = await stripe.products.create({
            name: product.name,
            default_price_data: {
              unit_amount: unitAmount,
              currency: "usd",
            },
            images: [product.image],
          });
          console.log(`Product created: ${prod.name}`);
        } else {
          console.log("Product already exists");
        }
      }
    } catch (error) {
      console.error("Error creating products:", error);
      return NextResponse.json(
        { error: "Failed to create products in Stripe" },
        { status: 500 }
      );
    }

    // Refresh the list of active products after creating new ones
    activeProducts = await getActiveProducts();

    // Prepare checkout items for Stripe
    let checkoutStripeProducts: any = [];
    for (const product of checkoutProducts) {
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
      );

      if (stripeProduct) {
        checkoutStripeProducts.push({
          price: stripeProduct?.default_price,
          quantity: product.quantity,
        });
      } else {
        // If a product wasn't found even after creation, handle this error
        return NextResponse.json(
          { error: `Product ${product.name} could not be processed` },
          { status: 400 }
        );
      }
    }

    // Validate that we have items to check out
    if (checkoutStripeProducts.length === 0) {
      return NextResponse.json(
        { error: "No valid products found for checkout" },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents, ensure it's an integer
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(checkoutProducts),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Payment intent creation error:", error);
    return NextResponse.json(
      {
        error: "Failed to create payment intent",
        message: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
