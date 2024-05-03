// @/components/Layout/index.js
import React, { useState } from "react";
import { Sidebar } from "./sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
