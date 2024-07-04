import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layout/MainLayout";
import { Home } from "@/page/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <>Search</>,
      },
      {
        path: "saved",
        element: <>Saved</>,
      },
      {
        path: "mypage",
        element: <>Mypage</>,
      },
      {
        path: "post",
        element: <>Post</>,
      },
    ],
  },
]);
