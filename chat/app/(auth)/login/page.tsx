import Hero from "@components/Hero";
import LogIn from "@components/LogIn";
import Footer from "@components/Footer";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Hero Section - 60% */}
        <div className="w-[60%] min-w-[300px]">
          <Hero />
        </div>

        {/* Login Form - 40% */}
        <div className="w-[40%] min-w-[300px]">
          <LogIn />
        </div>
      </div>

      <Footer />
    </div>
  );
}
