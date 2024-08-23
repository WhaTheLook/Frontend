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
import { Login } from "@/page/Login";
import { Detail } from "@/page/Detail";

import { AuthBoundary } from "@/components/common/AuthBoundary";
import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";
import { SearchProvider } from "@/components/Search/SearchProvider";

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
        path: "login",
        element: <Login />,
      },
      {
        path: "search",
        element: (
          <SearchProvider>
            <Search />
          </SearchProvider>
        ),
      },
      {
        path: "saved",
        element: (
          <AuthBoundary>
            <Bookmark />
          </AuthBoundary>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthBoundary>
            <ApiErrorBoundary>
              <MyPage />
            </ApiErrorBoundary>
          </AuthBoundary>
        ),
      },
      {
        path: "post/:postId",
        element: <Detail />,
      },
    ],
  },
  {
    path: "upload",
    element: (
      <AuthBoundary>
        <UploadLayout />
      </AuthBoundary>
    ),
    children: [
      {
        path: "",
        element: <Upload />,
      },
    ],
  },
  {
    path: "profile/edit",
    element: (
      <AuthBoundary>
        <ProfileEdit />
      </AuthBoundary>
    ),
  },
  { path: "/kakao/auth", element: <KakaoLoginRedirect /> },
]);
