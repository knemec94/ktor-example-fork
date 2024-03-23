import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { paths } from "../util";
import { NotePage } from "./pages/NotePage/NotePage";

export const PrivateApp = () => (
  <BrowserRouter>
    <Routes>
      <Route path={paths.index} element={<RootLayout />}>
        <Route path={paths.index} element={null} />
        <Route path={paths.note()} element={<NotePage />} />
        <Route
          path={paths.login}
          element={<Navigate to={paths.index} replace />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
