"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, ChevronDown, Globe, HelpCircle, Heart, User, AlignRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { FaBlog } from "react-icons/fa"
import { useOptimizedTourCategories } from "@/hooks/use-optimized-tour-categories"
import { Skeleton } from "@/components/ui/skeleton"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const { categories, isLoading: categoriesLoading } = useOptimizedTourCategories()

  const isActive = (path: string) => pathname === path
  // Transform opacity based on scroll position
  const headerBgOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const searchBarOpacity = useTransform(scrollY, [0, 50], [0, 1])

  // Control visibility of elements based on scroll
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 20)
    })
    return () => unsubscribe()
  }, [scrollY])

  // Active link indicator
  const ActiveIndicator = () => (
    <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-green-400"></span>
  )

  return (
    <header className="sticky top-0 z-50 w-full">
      <motion.div
        className="relative w-full transition-all duration-300"
        style={{
          backgroundColor: "white",
          boxShadow: isScrolled ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {/* Main header */}
        <div className="container max-w-6xl mx-auto md:px-4 px-1">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/loggo.png"
                  alt="Tripadvisor"
                  width={350}
                  height={340}
                  className="h-48 w-48 object-contain"
                />
              </Link>
            </div>

            {/* Main Navigation - Centered on desktop */}
            <nav className="hidden md:flex items-center justify-center space-x-11 flex-1 ml-8">
              <Link
                href="/"
                className={`text-base  hover:text-green-600 transition-colors relative font-semibold ${
                  isActive("/") ? "text-green-600 font-bold" : ""
                }`}
              >
                Discover
                {/* <ActiveIndicator /> */}
              </Link>
              <Link
                href="/trips"
                className={`text-base  hover:text-green-600 transition-colors relative font-semibold ${
                  isActive("/trips") ? "text-green-600 font-bold" : ""
                }`}
              >
                Trips
                {/* <ActiveIndicator /> */}
              </Link>

              <Link
                href="/about-us"
                className={`text-base relative font-semibold hover:text-green-600 transition-colors ${
                  isActive("/about-us") ? "text-green-600 font-bold" : ""
                }`}
              >
                About us
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-sm font-bold text-gray-800 hover:text-black group">
                  More
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-0 rounded-lg shadow-lg border border-gray-200">
                  <DropdownMenuItem className="flex items-center py-3 px-4 cursor-pointer hover:bg-gray-50">
                    <Link href="/login" className="flex items-center w-full">
                      <div className="mr-3 text-gray-600">
                        <User className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Log in / Sign up</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center py-3 px-4 cursor-pointer hover:bg-gray-50">
                    <Link href="/blogs" className="flex items-center w-full">
                      <div className="mr-3 text-gray-600">
                        <FaBlog className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Blogs</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center py-3 px-4 cursor-pointer hover:bg-gray-50">
                    <Link href="/wishlist" className="flex items-center w-full">
                      <div className="mr-3 text-gray-600">
                        <Heart className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Wishlists</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0">
                    <Link
                      href="https://wa.me/0700000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-3 px-4 w-full hover:bg-gray-50"
                    >
                      <div className="mr-3 text-gray-600">
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Help</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right side menu items */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Search Input - Only when scrolled */}
              <motion.div
                className="relative max-w-md"
                style={{ opacity: searchBarOpacity }}
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  width: isScrolled ? "240px" : "0px",
                  opacity: isScrolled ? 1 : 0,
                }}
              >
                {isScrolled && (
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search"
                      className="w-full h-9 rounded-full pl-10 pr-4 bg-gray-100 border-none focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:ring-offset-0"
                    />
                  </div>
                )}
              </motion.div>

              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 cursor-not-allowed">
                <Globe className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className=" px-2 font-bold cursor-not-allowed">
                USD
              </Button>

              <Button className="rounded-full bg-black text-white hover:bg-black/90 px-4 hover:bg-green-900" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {/* Mobile search button */}
              <Button variant="ghost" size="icon" className="rounded-full mr-1">
                <Search className="h-8 w-8 text-lg" />
              </Button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="w-14 h-14">
                    <AlignRight className="h-8 w-8 text-xl" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-full p-0">
                  <SheetHeader className="border-b p-4">
                    <SheetTitle className="text-left">
                      <Image
                        src="/images/loggo.png"
                        alt="Tripadvisor"
                        width={250}
                        height={250}
                        className="h-8 w-40 object-cover"
                      />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col py-4">
                    <Link
                      href="/"
                      className="px-4 py-2 text-lg font-semibold hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Discover
                    </Link>
                    <Link
                      href="/trips"
                      className="px-4 py-2 text-lg font-medium hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Trips
                    </Link>

                    <Link
                      href="/about-us"
                      className={`px-4 py-2 text-lg font-medium hover:bg-gray-100 ${
                        isActive("/about-us") ? "text-green-600 font-bold" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      About us
                    </Link>

                    {/* Tour Categories Section */}
                    <div className="px-4 py-2 border-t mt-2">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Tour Categories</h3>
                      {categoriesLoading ? (
                        <div className="space-y-2">
                          {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-6 w-32 rounded" />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/categories/${category.slug}`}
                              className="block py-2 text-base hover:text-green-600"
                              onClick={() => setIsOpen(false)}
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-2 border-t mt-2">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">More</h3>
                      <Link
                        href="/wishlist"
                        className="block py-2 text-base hover:text-green-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <Link
                        href="/blogs"
                        className="block py-2 text-base hover:text-green-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Blogs
                      </Link>
                      <Link
                        href="https://wa.me/0700000"
                        className="block py-2 text-base hover:text-green-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Help
                      </Link>
                      <Link
                        href="/login"
                        className="block py-2 text-base hover:text-green-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Login/Signup
                      </Link>
                    </div>
                    <div className="px-4 py-2 border-t mt-2 cursor-not-allowed">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium">Currency</span>
                        <Button variant="ghost" size="sm">
                          USD
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                    <Button className="w-full rounded-full bg-black text-white hover:bg-black/90">
                      <Link href="/login">Sign in</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Sub navigation - shows when scrolled */}
        <motion.div
          className="border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            height: isScrolled ? "auto" : 0,
            opacity: isScrolled ? 1 : 0,
          }}
          style={{
            display: isScrolled ? "block" : "none",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {isScrolled && (
            <div className="container max-w-5xl mx-auto px-4">
              <div className="flex items-center space-x-8 overflow-x-auto md:py-5 scrollbar-hide py-3">
                {categoriesLoading ? (
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton key={index} className="h-4 w-20 rounded" />
                    ))}
                  </>
                ) : (
                  <>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="text-sm whitespace-nowrap hover:text-green-600 transition-colors font-medium"
                      >
                        {category.title}
                      </Link>
                    ))}
                    {/* Keep some static links if needed */}
                    {/* <Link
                      href="/hotels"
                      className="text-sm whitespace-nowrap hover:text-green-600 transition-colors font-medium"
                    >
                      Hotels
                    </Link>
                    <Link
                      href="/restaurants"
                      className="text-sm whitespace-nowrap hover:text-green-600 transition-colors font-medium"
                    >
                      Restaurants
                    </Link> */}
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </header>
  )
}
