"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="relative mb-16 py-16 px-4">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-gray-100/25 bg-[size:20px_20px] opacity-20" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent backdrop-blur-sm" />

      <div className="relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <Card className="relative overflow-hidden border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300" />
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl font-bold">Basic Plan</CardTitle>
              <div>
                <p className="text-4xl font-bold text-gray-900">$99</p>
                <p className="text-gray-600 mt-1">One-time payment</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Unlimited access to basic features</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Up to 10 team members</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Basic analytics dashboard</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative overflow-hidden border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="absolute top-6 right-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl font-bold">Pro Plan</CardTitle>
              <div>
                <p className="text-4xl font-bold text-gray-900">$19.99</p>
                <p className="text-gray-600 mt-1">per month</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>All Basic Plan features</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>24/7 Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-6">
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
