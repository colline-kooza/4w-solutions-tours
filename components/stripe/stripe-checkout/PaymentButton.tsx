"use client";

import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "@/app/api/products-checkout/route";
import { CreditCard } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export default function PaymentButton({
  checkoutProducts,
}: {
  checkoutProducts: CartItem[];
}) {
  const total = checkoutProducts.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
  );

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const response = await fetch(`${baseUrl}/api/products-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: checkoutProducts }),
    });

    const data = await response.json();
    return data.client_secret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          formMethod="post"
          className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-6 text-lg font-medium hover:shadow-lg transition-shadow duration-200"
        >
          Pay ${total.toFixed(2)}
        </Button>
      </DialogTrigger>
      <DialogContent className="my-4 py-6 xl:max-w-screen-xl flex flex-col h-[90vh]">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-6 w-6 text-primary" />
          <DialogTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
            Premium Access
          </DialogTitle>
        </div>

        <ScrollArea className="flex-1 rounded-md border">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t text-sm text-gray-500 text-center">
          <p>Secure payment processed by Stripe</p>
          <p>
            © {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel Payment
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
