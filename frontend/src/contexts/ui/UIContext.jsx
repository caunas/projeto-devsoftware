import { useCallback, useMemo, useState } from "react";
import { UIContext } from "./UIContextValue";

export function UIProvider({ children }) {
  const [isGlobalLoading, setGlobalLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  /**
   * Dispara notificações globais.
   *
   * Use em chamadas de API para feedback de sucesso, erro ou informação.
   */
  const notify = useCallback((message, type = "info") => {
    const id = crypto.randomUUID();
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { id, message, type },
    ]);

    window.setTimeout(() => {
      setNotifications((currentNotifications) =>
        currentNotifications.filter((notification) => notification.id !== id)
      );
    }, 4200);
  }, []);

  /**
   * Remove manualmente uma notificação.
   * As notificações também expiram automaticamente após alguns segundos.
   */
  const dismissNotification = useCallback((id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const value = useMemo(
    () => ({
      dismissNotification,
      isGlobalLoading,
      notifications,
      notify,
      setGlobalLoading,
    }),
    [dismissNotification, isGlobalLoading, notifications, notify]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
