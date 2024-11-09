import { createRoot } from "react-dom/client";

//? Importamos el archivo de estilos de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//? Importamos el sistema de rutas
import Router from "./router/Router.jsx";

//? Importamos queryclient
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient.js";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);
