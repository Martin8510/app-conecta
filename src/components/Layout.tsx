import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { RootState, useAppSelector } from "../app/store";

const Layout: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  console.log("Layout :" + user);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header isAuthenticated={!!user} />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
