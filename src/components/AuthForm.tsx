"use client";
import { SignInWithGoogle } from "@/utils/actions";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const AuthForm = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action={async () => {
          await SignInWithGoogle();
        }}
        className="w-full max-w-xs"
      >
        <button
          type="submit"
          className="flex items-center justify-center gap-3 w-full px-4 py-3 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
