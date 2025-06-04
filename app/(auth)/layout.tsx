import Footer from "@/components/frontend/footer";
import SiteHeader from "@/components/frontend/site-header";
import WhatsAppCTA from "@/components/frontend/WhatsAppCTA";
import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div>
    <SiteHeader />
    {children}
      <Footer />
      <WhatsAppCTA
            phoneNumber="1234567890" 
            message="Hi! I'm interested in your tours. Can you help me?"
          />
    </div>;
}
