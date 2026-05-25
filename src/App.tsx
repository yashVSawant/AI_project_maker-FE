import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import pagesRoutes from "./routes/data/routes";
import WithSideBarLayout from "./routes/WithSideBarLayout";
import WithoutSideBarLayout from "./routes/WithoutSideBarLayout";
import Toast from "./components/Toast";
// Pages

const NotFound = () => <h1>404 - Page Not Found</h1>;

function App() {
  const isLoggedIn = () => {
    return Boolean(localStorage.getItem("AI_PROJECT_TOKEN"));
  };
  return (
    <BrowserRouter>
      <Toast />
      {/* < Header /> */}
      <Routes>
        {/* ✅ Root redirect */}
        <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/projects" replace /> : <Navigate to="/login" replace />
          }
        />
        ,
        {pagesRoutes.map((route, index) => {
          if (route.permission !== "auth" || route.sideBar === false) {
            return (
              <Route element={<WithoutSideBarLayout  />}>
                <Route key={index} path={route.path} element={<route.element />} />
              </Route>
            );
          }
          return (
            <Route element={<WithSideBarLayout />}>
              <Route key={index} path={route.path} element={<route.element />} />
            </Route>
          );
        })}
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
