import Link from "next/link"

export default function HomeLoginSection() {
  return (
    <section className="max-w-4xl mx-auto bg-[#efeef7] py-12 px-4 container mb-16">
      <div className=" mx-auto text-center">
        <h1 className="text-2xl md:text-[26px] font-black text-gray-900 mb-2">
          Log in to manage bookings With Martk Tours
        </h1>

        <p className="text-gray-700 mb-5 text-xs">
          Don't have an account yet?{" "}
          <Link href="/login" className="underline text-gray-900 hover:text-gray-700 transition-colors">
            Sign up
          </Link>
        </p>

       <Link href="/login">
  <button className="w-full max-w-xs bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Log in
        </button>
       </Link>
      
      </div>
    </section>
  )
}
