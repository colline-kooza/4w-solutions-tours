"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Package, Clock, Shield } from "lucide-react";

import { CartItem } from "@/app/api/products-checkout/route";
import PaymentButton from "./PaymentButton";

const orderItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    stock: 100,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    description:
      "Wireless noise-canceling headphones with premium sound quality",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 249.99,
    stock: 100,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60",
    description: "Latest generation smartwatch with health tracking features",
  },
  {
    id: "3",
    name: "Portable Charger",
    price: 49.99,
    qty: 2,
    stock: 100,
    image:
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=60",
    description: "20000mAh power bank with fast charging capability",
  },
];

export default function OrderCard() {
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shipping = 0; // Free shipping
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border-gray-200">
      <CardHeader className="space-y-4 pb-8">
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Order Summary
          </CardTitle>
          <span className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            Confirmed
          </span>
        </div>

        <div className="flex gap-6 pt-2">
          <div className="flex items-center text-sm text-gray-600">
            <Package className="w-4 h-4 mr-2" />
            Free Shipping
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            2-3 Business Days
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 mr-2" />
            Buyer Protection
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-1">
          {orderItems.map((item, index) => (
            <li key={index} className="flex gap-4 py-4 first:pt-0">
              <div className="relative w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 truncate pr-4">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.qty}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <div className="w-full space-y-4">
          <PaymentButton checkoutProducts={orderItems} />
          <p className="text-center text-sm text-gray-500">
            Secure payment processing by Stripe
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
