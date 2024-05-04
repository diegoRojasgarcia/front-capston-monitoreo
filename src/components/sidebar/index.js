// @/components/Layout/index.js
import React from "react";
import { Sidebar } from "./sidebar";

export default function Layout({ children }) {
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
