import React, { useEffect, useState } from "react";
import NavbarComponents from "./NavbarComponents";
import FooterComponents from "./FooterComponents";
import { Outlet } from "react-router-dom";

const MainComponents = () => {
  return (
    <>
      <header>
        <NavbarComponents />
      </header>
      <main>
        <Outlet />
      </main>
      <FooterComponents />
    </>
  );
};

export default MainComponents;
