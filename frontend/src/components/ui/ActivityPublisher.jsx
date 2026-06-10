import { useState } from "react";
import { useUI } from "../../hooks/useUI";

function ActivityPublisher({ initialActivities = [], title }) {
  const { notify } = useUI();
  const [activityTitle, setActivityTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [activities, setActivities] = useState(initialActivities);

  if (!title) {
    return null;
  }

  /**
   * Publica atividade somente em memoria.
   *
   * Integracao backend:
   * - recurso exclusivo do portal do professor;
   * - substituir por POST /teachers/me/activities;
   * - enviar title, description e deadline no payload.
   */
  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = activityTitle.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription || !deadline) {
      notify("Preencha titulo, descricao e prazo da atividade.", "error");
      return;
    }

    setActivities((currentActivities) => [
      {
        title: trimmedTitle,
        detail: `Prazo: ${deadline}`,
        description: trimmedDescription,
        status: "Publicada",
      },
      ...currentActivities,
    ]);
    setActivityTitle("");
    setDescription("");
    setDeadline("");
    notify("Atividade publicada com sucesso.", "success");
  }

  return (
    <article className="activity-publisher">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity-title">Titulo da atividade</label>
        <input
          id="activity-title"
          value={activityTitle}
          onChange={(event) => setActivityTitle(event.target.value)}
          placeholder="Digite o titulo da atividade"
        />

        <label htmlFor="activity-deadline">Prazo da atividade</label>
        <input
          id="activity-deadline"
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
        />

        <label htmlFor="activity-description">Descricao da atividade</label>
        <textarea
          id="activity-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Digite a descricao da atividade para os alunos"
          rows="4"
        />
        <button type="submit">Publicar atividade</button>
      </form>

      {!!activities.length && (
        <>
          <h3 className="activity-history-title">Atividades passadas</h3>
          <div className="data-list">
            {activities.map((activity, index) => (
              <div className="data-row" key={`${activity.title}-${activity.detail}-${index}`}>
                <strong>{activity.title}</strong>
                <span>{activity.detail}</span>
                {activity.description && <span>{activity.description}</span>}
                <div className={`status-pill ${activity.variant || ""}`.trim()}>{activity.status}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </article>
  );
}

export default ActivityPublisher;
