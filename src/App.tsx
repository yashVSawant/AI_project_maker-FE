import { BrowserRouter, Routes, Route } from "react-router-dom";
import pagesRoutes from "./routes/data/routes";
import WithSideBarLayout from "./routes/WithSideBarLayout";
import WithoutSideBarLayout from "./routes/WithoutSideBarLayout";
import Toast from "./components/Toast";
// Pages

const NotFound = () => <h1>404 - Page Not Found</h1>;




function App() {
  return (
    <BrowserRouter>
    <Toast />
    {/* < Header /> */}
      <Routes>
        {pagesRoutes.map((route, index) => {
          if(route.permission !== "auth" || route.sideBar === false){
            return<Route element={<WithoutSideBarLayout isOpenRoute={route.permission !== "auth"} />}><Route key={index} path={route.path} element={<route.element />} /></Route> 
          }
          return<Route element={<WithSideBarLayout/>}><Route key={index} path={route.path} element={<route.element />} /></Route> 
        }
        )}

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;