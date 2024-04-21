import { Route, Routes } from "react-router-dom";
import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/page";
import { Auth } from "./auth/Auth";
import "./App.css";

const initialState = createPage();

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <AppStateProvider initialState={initialState}>
            <Page />
          </AppStateProvider>
        }
      />
      <Route
        path="/:id"
        element={
          <AppStateProvider initialState={initialState}>
            <Page />
          </AppStateProvider>
        }
      />
    </Routes>
  );
}

export default App;
