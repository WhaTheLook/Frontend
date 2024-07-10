import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layout/MainLayout";

import { Home } from "@/page/Home";
import { Search } from "@/page/Search";
import { KakaoLoginRedirect } from "@/page/KakaoLoginRedirect";
import { PostDetail } from "@/components/Detail/PostDetail";

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
        element: <Search />,
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
        path: "upload",
        element: <>Upload</>,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
    ],
  },
  { path: "/kakao/auth", element: <KakaoLoginRedirect /> },
]);
