"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function LogIn() {
  const params = useSearchParams();
  const code = params.get("code"); // string | null

  const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || "";
  const SCOPE = process.env.NEXT_PUBLIC_INSTAGRAM_SCOPE || "";

  console.log({ code });

  const auth_code = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI,
  )}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = auth_code;
  };

  return (
    <div className="flex items-center justify-center bg-color  h-full">
      <div className="w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif mb-8 text-gray-900 dark:text-gray-100">
            Simple Instagram
          </h1>
        </div>

        <form className="space-y-3" onSubmit={handleLogin}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600"
          >
            Log in with Instagram
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-semibold">
            OR
          </span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* <button className="w-full flex items-center justify-center gap-2 text-blue-900 dark:text-blue-400 font-semibold text-sm">
          <span className="text-xl">f</span>
          Log in with Facebook
        </button> */}

        {/* <div className="text-center mt-4">
          <a href="#" className="text-xs text-blue-900 dark:text-blue-400">
            Forgot password?
          </a>
        </div> */}

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          You can also report content you believe is unlawful in your country
          without logging in.
        </p>

        {/* <div className="mt-8 pt-5 border-t border-gray-300 dark:border-gray-600 text-center">
          <p className="text-sm text-gray-900 dark:text-gray-100">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 font-semibold">
              Sign up
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
