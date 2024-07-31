import { RouterProvider } from "react-router-dom";

import { ModalProvider } from "./components/common/ModalProvider";
import { AuthProvider } from "./AuthProvider";
import { router } from "./routes/router";

import { GlobalStyle } from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
