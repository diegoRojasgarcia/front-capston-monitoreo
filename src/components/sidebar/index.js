// @/components/Layout/index.js
import React from "react";
import { Sidebar } from "./sidebar";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex">
          <div className="min-w-64">
            <Sidebar />
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
