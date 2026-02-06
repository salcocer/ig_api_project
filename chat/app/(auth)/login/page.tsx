import React, { Suspense } from "react";
import Hero from "@components/Hero";
import LogIn from "@components/LogIn";
import Footer from "@components/Footer";
import Spinner from "@components/Spinner";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Hero Section*/}
        <div className="w-[60%] min-w-75">
          <Hero />
        </div>

        {/* Login Form*/}
        <div className="w-[40%] min-w-75">
          <Suspense fallback={<Spinner />}>
            <LogIn />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  );
}
