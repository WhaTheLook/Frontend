import { RouterProvider } from "react-router-dom";

import { ModalProvider } from "./components/common/ModalProvider";
import { ToastProvider } from "./components/common/ToastProvider";
import { DetailModalProvider } from "./components/Detail/DetailModalProvider";
import { AuthProvider } from "./AuthProvider";
import { router } from "./routes/router";

import { GlobalStyle } from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ModalProvider>
          <DetailModalProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </DetailModalProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
