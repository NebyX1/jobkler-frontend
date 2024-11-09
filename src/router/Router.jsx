//? Importamos los componentes de React Router para generar el sistema de rutas de la app
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//? Importamos los componentes
import App from "@/App";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Legal from "@/pages/Legal";
import Contact from "@/pages/Contact";
import Resources from "@/pages/Resources";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Results from "@/pages/Results";
import ShowProfile from "@/pages/ShowProfile";
import Profile from "@/pages/Profile";
import CreateProfile from "@/pages/CreateProfile";
import UpdateProfile from "@/pages/UpdateProfile";
import ActivateUser from "@/pages/ActivateUser";
import PasswordReset from "@/pages/PasswordReset";
import Configuration from "@/pages/Configuration";
import NotFound from "@/pages/NotFound";
import {
  ProtectedRoutes,
  LoginGuard,
} from "@/router/middleware/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/index" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/login"
          element={
            <LoginGuard>
              <Login />
            </LoginGuard>
          }
        />
        <Route
          path="/register"
          element={
            <LoginGuard>
              <Register />
            </LoginGuard>
          }
        />
        <Route
          path="/user-verification/:uid/:token/"
          element={
            <LoginGuard>
              <ActivateUser />
            </LoginGuard>
          }
        />
        <Route
          path="/password-reset/:uid/:token/"
          element={
            <LoginGuard>
              <PasswordReset />
            </LoginGuard>
          }
        />
        <Route
          path="/create-profile"
          element={
            <ProtectedRoutes>
              <CreateProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoutes>
              <UpdateProfile />
            </ProtectedRoutes>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/results/:slug" element={<Results />} />
        <Route path="/show-profile/:id" element={<ShowProfile />} />
        <Route
          path="/configuration"
          element={
            <ProtectedRoutes>
              <Configuration />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
