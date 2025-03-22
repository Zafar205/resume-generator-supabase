"use client";

import { SignInWithGoogle, signUpWithEmailPassword, signInWithEmailPassword } from "@/utils/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";

const AuthForm = () => {
  const searchParams = useSearchParams();
  const authType = searchParams.get("authtype")?.toLowerCase() || "signin";

  const getFormAction = () => (authType === "signup" ? signUpWithEmailPassword : signInWithEmailPassword);

  const [state, formAction, isPending] = useActionState(getFormAction(), {
    error: "",
    success: null,
  });

  const renderSubmitButtonText = authType === "signup" ? "Sign Up" : "Sign In";

  return (
    <form action={formAction} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto justify-center">
      <label className="flex flex-col gap-1">
        <span className="text-gray-600 font-medium">Email</span>
        <input type="email" name="email" required className="input input-bordered w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </label>
      
      <label className="flex flex-col gap-1">
        <span className="text-gray-600 font-medium">Password</span>
        <input type="password" name="password" required className="input input-bordered w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </label>
      
      {state.error && <div className="text-red-500 text-sm">{state.error}</div>}
      {state.success && <div className="text-green-500 text-sm">{state.success}</div>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {isPending ? "Processing..." : renderSubmitButtonText}
      </button>

      <button
        type="button"
        onClick={SignInWithGoogle}
        className="flex items-center justify-center gap-3 w-full px-4 py-2 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        <FcGoogle size={24} />
        <span>Sign in with Google</span>
      </button>

      <div className="text-center text-sm text-gray-600">
        {authType === "signup" ? (
          <p>
            Already have an account? <Link href="/auth" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link href="/auth?authtype=signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
