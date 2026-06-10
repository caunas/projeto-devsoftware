import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPaperclip } from "react-icons/fa";
import { useUI } from "../../hooks/useUI";

function ActivityList({ activities = [], title }) {
  const { notify } = useUI();
  const [openItems, setOpenItems] = useState({});

  if (!activities.length) {
    return null;
  }

  function toggleItem(index) {
    setOpenItems((currentItems) => ({
      ...currentItems,
      [index]: !currentItems[index],
    }));
  }

  function handleFileChange(activityTitle, event) {
    const file = event.target.files?.[0];

    if (file) {
      notify(`Arquivo "${file.name}" anexado em ${activityTitle}.`, "success");
    }
  }

  return (
    <article className="activity-list-card">
      <h2>{title}</h2>
      <div className="activity-list">
        {activities.map((activity, index) => {
          const isOpen = Boolean(openItems[index]);
          const isPending = activity.status === "Pendente";

          return (
            <div className="activity-item" key={`${activity.title}-${activity.detail}`}>
              <div className="activity-summary">
                <div>
                  <strong>{activity.title}</strong>
                  <span>{activity.detail}</span>
                </div>
                <div className={`status-pill ${activity.variant || ""}`.trim()}>{activity.status}</div>
                <button type="button" onClick={() => toggleItem(index)} aria-label={`Ver detalhes de ${activity.title}`}>
                  {isOpen ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
                </button>
              </div>

              {isOpen && (
                <div className="activity-details">
                  <p>{activity.description}</p>
                  {isPending && (
                    <label className="file-attach">
                      <FaPaperclip aria-hidden="true" />
                      <span>Anexar arquivo</span>
                      <input type="file" onChange={(event) => handleFileChange(activity.title, event)} />
                    </label>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default ActivityList;
