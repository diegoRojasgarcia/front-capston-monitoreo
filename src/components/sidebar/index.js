// @/components/Layout/index.js
import React from "react";
import { Sidebar } from "./sidebar";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { accessToken, logout, user } = useAuth();
  const router = useRouter();

  //si no es un usuario logeado, redireccionamos al login
  if (!accessToken) {
    router.push("/");
    return null;
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="flex">
          <div className="w-1/6 min-w-64">
            <Sidebar />
          </div>

          <div className="w-5/6">{children}</div>
        </div>
      </div>
    </>
  );
}
