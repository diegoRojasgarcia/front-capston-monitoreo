// @/components/Layout/index.js
import React, { useState } from "react";
import { Sidebar } from "./sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex">
          <div class="w-1/6 min-w-40">
            <Sidebar />
          </div>

          <div class="w-5/6 ">{children}</div>
        </div>
      </div>
    </>
  );
}
