import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainComponents from "./components/MainComponents.jsx";
import AboutPage from "./pages/about.jsx";
import MoviePage from "./pages/movie.jsx";
import { ServicePage } from "./pages/service.jsx";
import CardDetail from "./components/CardDetail.jsx";
import Register from "./pages/register.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";

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
        path: "/movie",
        element: <MoviePage />,
      },
      {
        path: "/movie/:id",
        element: <CardDetail />,
      },
      {
        path: "/service",
        element: <ServicePage />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
