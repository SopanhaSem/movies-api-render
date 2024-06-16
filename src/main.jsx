import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainComponents from "./components/MainComponents.jsx";
import AboutPage from "./pages/about.jsx";
import MoviePage from "./pages/movie.jsx";
import { ServicePage } from "./pages/service.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainComponents />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "movie",
        element: <MoviePage />,
      },
      {
        path: "service",
        element: <ServicePage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
