import React from "react";
import { UserProvider } from "../src/Components/pages/UserContext/UserContext";
import AppRoutes from "./routes";

const App = () => (
  <UserProvider>
    <AppRoutes />
  </UserProvider>
);

export default App;
