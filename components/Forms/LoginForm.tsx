"use client"
import { Loader2, Lock, Mail } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"

import type { LoginProps } from "@/types/types"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import TextInput from "../FormInputs/TextInput"
import PasswordInput from "../FormInputs/PasswordInput"
import SubmitButton from "../FormInputs/SubmitButton"

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [emailLogin, setEmailLogin] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginProps>()
  const params = useSearchParams()
  const returnUrl = params.get("returnUrl") || "/dashboard"
  const [passErr, setPassErr] = useState("")
  const router = useRouter()

  async function onSubmit(data: LoginProps) {
    try {
      setLoading(true)
      setPassErr("")
      console.log("Attempting to sign in with credentials:", data)
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      })
      console.log("SignIn response:", loginData)
      if (loginData?.error) {
        setLoading(false)
        toast.error("Sign-in error", {
          description: "Please check your credentials or make sure your email is verified",
        })
        setPassErr("Wrong credentials or account not verified")
      } else {
        reset()
        setLoading(false)
        toast.success("Login Successful")
        setPassErr("")
        router.push(returnUrl)
      }
    } catch (error) {
      setLoading(false)
      console.error("Network Error:", error)
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again.",
      })
    }
  }

  async function handleGoogleSignIn() {
    try {
      setLoading(true)
      await signIn("google", { callbackUrl: returnUrl })
    } catch (error) {
      setLoading(false)
      toast.error("Google sign-in failed")
      console.error("Google sign-in error:", error)
    }
  }

  async function handleGitHubSignIn() {
    try {
      setLoading(true)
      await signIn("github", { callbackUrl: returnUrl })
    } catch (error) {
      setLoading(false)
      toast.error("GitHub sign-in failed")
      console.error("GitHub sign-in error:", error)
    }
  }

  if (!emailLogin) {
    return (
      <div className="min-h-[80vh] flex items-start justify-center px-4">
        <div className="max-w-md w-full space-y-2 md:mt-[3%] mt-[25%]">
          <div className="text-start">
            <div className="justify-start mb-1 md:flex hidden">
              <Link href={"/"} className="flex items-center space-x-2">
                <img 
                  src="/images/loggo.png" 
                  alt="Marktk 4w Tours Logo" 
                  className="w-[200px] h-[100px] object-cover"
                />
              </Link>
            </div>
            <h2 className="md:text-3xl text-3xl font-bold text-gray-900 mb-2">
              Sign in to unlock the
            </h2>
            <h2 className="md:text-3xl text-3xl font-bold text-gray-900 mb-8">
              best of Marktk 4w tours.
            </h2>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-black border-2 border-black rounded-full font-medium flex items-center justify-center gap-3 transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <img 
                  src="https://static.tacdn.com/img2/google/G_color_40x40.png" 
                  alt="Google" 
                  className="w-5 h-5"
                />
              )}
              Continue with Google
            </Button>

            {/* <Button
              onClick={handleGitHubSignIn}
              disabled={loading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-black border-2 border-black rounded-full font-medium flex items-center justify-center gap-3 transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              )}
              Continue with GitHub
            </Button> */}

            <Button
              onClick={() => setEmailLogin(true)}
              className="w-full h-12 bg-white hover:bg-gray-50 text-black border-2 border-black rounded-full font-medium flex items-center justify-center gap-3 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Continue With Email
            </Button>
          </div>

          <div className="text-center text-xs text-gray-600 space-y-2 mt-8">
            <p>
              By proceeding, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Use
              </Link>{" "}
              and confirm you have read our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy and Cookie Statement
              </Link>
              .
            </p>
            <p>
              This site is protected by reCAPTCHA and the Google{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full space-y-2">
        <div className="text-start">
          <button
            onClick={() => setEmailLogin(false)}
            className="text-blue-600 hover:underline text-sm mb-4 flex items-center gap-1 transition-colors"
          >
            ← Back to sign in options
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
             Login With Email
          </h2>
          <p className="text-gray-600 text-sm">
            Welcome Back to <span className="text-[#34e0a1]">Marktk 4w tours</span>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            register={register}
            errors={errors}
            label="Email Address"
            name="email"
            icon={Mail}
            placeholder="admin@example.com"
          />
          <PasswordInput
            register={register}
            errors={errors}
            label="Password"
            name="password"
            icon={Lock}
            placeholder="Enter your password"
            forgotPasswordLink="/forgot-password"
          />
          {passErr && <p className="text-red-500 text-xs">{passErr}</p>}

          <SubmitButton
            title="Sign In"
            loadingTitle="Signing in..."
            loading={loading}
            className="w-full"
            loaderIcon={Loader2}
            showIcon={false}
          />
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>Admin credentials required for dashboard access</p>
        </div>
      </div>
    </div>
  )
}