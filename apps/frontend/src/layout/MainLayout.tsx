import React, { ReactNode } from "react";
import { Navbar } from "../components/common/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <main className="pt-20 px-4">
        {children}
      </main>
    </div>
  );
}
