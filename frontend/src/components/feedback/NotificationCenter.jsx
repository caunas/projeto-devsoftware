import { useUI } from "../../hooks/useUI";

function NotificationCenter() {
  const { dismissNotification, notifications } = useUI();

  if (!notifications.length) {
    return null;
  }

  return (
    <div className="notification-stack" aria-live="polite">
      {notifications.map((notification) => (
        <button
          className={`notification-toast ${notification.type}`}
          key={notification.id}
          type="button"
          onClick={() => dismissNotification(notification.id)}
        >
          {notification.message}
        </button>
      ))}
    </div>
  );
}

export default NotificationCenter;
