import { RouterProvider } from "react-router-dom";

import { ModalProvider } from "./components/common/ModalProvider";
import { router } from "./routes/router";

import { GlobalStyle } from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </>
  );
}

export default App;
