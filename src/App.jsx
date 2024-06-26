import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { SelectDayProvider } from "./context/selectDayContext";
import { UpdateTaskCProvider } from "./context/updatetaskContext";
import theme from "./style/themeColors";
import { ThemeProvider} from "@mui/material";

function App() {
  return (
    //viene de context authContext//dan un estado que puede ser accedido desde todos los componentes
    //al agregar navbar todos ven los opciones
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <TaskProvider>
        <UpdateTaskCProvider>
        <SelectDayProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-3 md:px-0 ">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* engloba rutas verificacion de autorizacion */}
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
        </SelectDayProvider>
        </UpdateTaskCProvider>
      </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

