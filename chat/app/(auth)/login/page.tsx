import Hero from "@components/Hero";
import LogIn from "@components/LogIn";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Hero Section - 60% */}
      <div className="w-[60%]">
        <Hero />
      </div>

      {/* Login Form - 40% */}
      <div className="w-[40%]">
        <LogIn />
      </div>
    </div>
  );
}
