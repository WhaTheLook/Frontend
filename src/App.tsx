import { RouterProvider } from "react-router-dom";

import { ModalProvider } from "./components/common/ModalProvider";
import { ToastProvider } from "./components/common/ToastProvider";
import { AuthProvider } from "./AuthProvider";
import { router } from "./routes/router";

import { GlobalStyle } from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
