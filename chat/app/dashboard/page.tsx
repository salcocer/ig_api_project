'use client';
import Content from "@/components/Content";
import { fetchInstagramData } from "@/lib/api";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await fetchInstagramData("/me", { fields: "id,name" });
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    getUserData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}!</h1>
          <p>Your ID: {userData.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Content />
    </div>
  );
}
