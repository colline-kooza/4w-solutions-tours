import Link from "next/link";
import React from "react";


export default function Logo({
  variant = "light",
  href = "/",
}: {
  variant?: "dark" | "light";
  href?: string;
}) {
  return (
    <Link href={"/"} className="flex items-center space-x-2">
       <img src="/images/loggo.png" alt="" className="md:w-[200px] w-[140px] h-[0px] md:h-[200px] object-contain"/>
  </Link>
  )
}
