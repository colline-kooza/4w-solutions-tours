import Footer from "@/components/frontend/footer";
import SiteHeader from "@/components/frontend/site-header";
import WhatsAppCTA from "@/components/frontend/WhatsAppCTA";
import React, { ReactNode } from "react";


export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white relative">
      {/* <PromoBanner /> */}
      <SiteHeader />
      {children}
      <Footer />
     <WhatsAppCTA
        phoneNumber="+256740302462" 
        message="Hi! I'm interested in your tours. Can you help me?"
      />
    </div>
  );
}
