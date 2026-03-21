"use client";
import { LoginForm } from "@/components/login-form";
import SpinnerBackground from "@/components/ui/spinner-background";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

async function postCodeToServer(code: string) {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  }).catch((error) => {
    throw new Error(`${error.message}`);
  });

  return res.json();
}

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params?.get("code");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    postCodeToServer(code)
      .then((data) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Login code error: ", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code, router]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {loading && <SpinnerBackground />}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <MessageCircle className="size-4" />
            </div>
            OnlyChats
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
