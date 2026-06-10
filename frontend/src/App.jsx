import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/feedback/ErrorBoundary";
import GlobalLoader from "./components/feedback/GlobalLoader";
import NotificationCenter from "./components/feedback/NotificationCenter";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { ThemeProvider } from "./contexts/theme/ThemeContext";
import { UIProvider } from "./contexts/ui/UIContext";

function App() {
  return (
    /*
      Ordem dos providers:
      ThemeProvider: dark/light mode.
      UIProvider: loader global e notificações.
      AuthProvider: sessão, usuário, login/logout e permissões.
      ErrorBoundary: tratamento de erros inesperados de renderização.
    */
    <ThemeProvider>
      <UIProvider>
        <AuthProvider>
          <ErrorBoundary>
            <GlobalLoader />
            <NotificationCenter />
            <AppRoutes />
          </ErrorBoundary>
        </AuthProvider>
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
