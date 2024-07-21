import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layout/MainLayout";
import { UploadLayout } from "@/layout/UploadLayout";

import { Home } from "@/page/Home";
import { Search } from "@/page/Search";
import { Upload } from "@/page/Upload";
import { Bookmark } from "@/page/Bookmark";
import { MyPage } from "@/page/MyPage";
import { ProfileEdit } from "@/page/ProfileEdit";
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
        element: <Bookmark />,
      },
      {
        path: "profile",
        element: <MyPage />,
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
  {
    path: "profile/edit",
    element: <ProfileEdit />,
  },
  { path: "/kakao/auth", element: <KakaoLoginRedirect /> },
]);
