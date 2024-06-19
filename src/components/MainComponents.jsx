import React, { useEffect, useState } from "react";
import NavbarComponents from "./NavbarComponents";
import FooterComponents from "./FooterComponents";
import { Outlet } from "react-router-dom";

const MainComponents = () => {
  return (
    <>
      <header className=" sticky top-0 left-0">
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
