import OrderCard from "@/components/stripe/stripe-checkout/OrderCard";
import PricingSection from "@/components/stripe/stripe-checkout/PricingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Stripe Checkout Demo
        </h1>

        <section className="mb-16">
          <OrderCard />
        </section>
        <PricingSection />
      </div>
    </main>
  );
}
