import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layout/MainLayout";
import { UploadLayout } from "@/layout/UploadLayout";

import { Home } from "@/page/Home";
import { Search } from "@/page/Search";
import { KakaoLoginRedirect } from "@/page/KakaoLoginRedirect";
import { PostDetail } from "@/components/Detail/PostDetail";
import { Upload } from "@/page/Upload";

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
        path: "post/:postId",
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "upload",
    element: <UploadLayout />,
    children: [
      {
        path: "",
        element: <Upload />,
      },
    ],
  },
  { path: "/kakao/auth", element: <KakaoLoginRedirect /> },
]);
