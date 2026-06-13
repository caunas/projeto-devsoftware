import { useMemo, useState } from "react";
import { UIContext } from "./UIContextValue";

export function UIProvider({ children }) {
  const [isGlobalLoading, setGlobalLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  /**
   * Dispara notificações globais.
   *
   * Use em chamadas de API para feedback de sucesso, erro ou informação.
   */
  function notify(message, type = "info") {
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
  }

  /**
   * Remove manualmente uma notificação.
   * As notificações também expiram automaticamente após alguns segundos.
   */
  function dismissNotification(id) {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }

  const value = useMemo(
    () => ({
      dismissNotification,
      isGlobalLoading,
      notifications,
      notify,
      setGlobalLoading,
    }),
    [isGlobalLoading, notifications]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
