import { useCallback, useEffect, useMemo, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import { getApiErrorMessage } from "../../services/api";
import {
  createResource,
  crudResources,
  deleteResource,
  listResource,
  updateResource,
} from "../../services/crudService";
import PageHeader from "./PageHeader";

function getEmptyForm(fields) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

function formatValue(value, fieldName) {
  if (value === null || value === undefined || value === "") return "-";
  if (fieldName === "dataEvento") return new Date(value).toLocaleString("pt-BR");
  return String(value);
}

function CrudManager({ description, resource, title }) {
  const config = crudResources[resource];
  const { user } = useAuth();
  const { notify } = useUI();
  const emptyForm = useMemo(() => getEmptyForm(config.fields), [config.fields]);
  const [formData, setFormData] = useState(emptyForm);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      setItems(await listResource(config));
    } catch (error) {
      notify(getApiErrorMessage(error, "Nao foi possivel carregar os registros."), "error");
    } finally {
      setIsLoading(false);
    }
  }, [config, notify]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadItems, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadItems]);

  function resetForm() {
    setEditingId(null);
    setFormData(emptyForm);
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormData(Object.fromEntries(config.fields.map((field) => {
      let value = item[field.name] ?? "";
      if (field.type === "datetime-local" && value) value = value.slice(0, 16);
      if (field.type === "password") value = "";
      return [field.name, value];
    })));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await updateResource(config, editingId, formData, user);
        notify("Registro atualizado com sucesso.", "success");
      } else {
        await createResource(config, formData, user);
        notify("Registro criado com sucesso.", "success");
      }
      resetForm();
      await loadItems();
    } catch (error) {
      notify(getApiErrorMessage(error, "Nao foi possivel salvar o registro."), "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Confirma a exclusao de ${item.nome || item.titulo || `#${item.id}`}?`)) return;
    try {
      await deleteResource(config, item.id);
      notify("Registro removido com sucesso.", "success");
      if (editingId === item.id) resetForm();
      await loadItems();
    } catch (error) {
      notify(getApiErrorMessage(error, "Nao foi possivel remover o registro."), "error");
    }
  }

  return (
    <main className="portal-page">
      <PageHeader eyebrow="Administracao" title={title} description={description} badge="API local" />

      <article className="crud-card">
        <div className="crud-card-header">
          <h2>{editingId ? "Editar registro" : "Novo registro"}</h2>
          {editingId && <button className="button-secondary" type="button" onClick={resetForm}>Cancelar edicao</button>}
        </div>
        <form className="crud-form" onSubmit={handleSubmit}>
          {config.fields.map((field) => (
            <div className={`form-group ${field.multiline ? "full-width" : ""}`} key={field.name}>
              <label htmlFor={`${resource}-${field.name}`}>{field.label}</label>
              {field.multiline ? (
                <textarea id={`${resource}-${field.name}`} rows="3" value={formData[field.name]} required={field.required} onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })} />
              ) : (
                <input id={`${resource}-${field.name}`} type={field.type || "text"} value={formData[field.name]} required={field.required || (!editingId && field.requiredOnCreate)} min={field.type === "number" ? "1" : undefined} onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })} />
              )}
            </div>
          ))}
          <div className="crud-form-actions full-width">
            <button className="button-primary" disabled={isSaving} type="submit">{isSaving ? "Salvando..." : editingId ? "Atualizar" : "Cadastrar"}</button>
          </div>
        </form>
      </article>

      <article className="crud-card">
        <h2>Registros</h2>
        {isLoading ? <p className="crud-message">Carregando...</p> : items.length === 0 ? <p className="crud-message">Nenhum registro encontrado.</p> : (
          <div className="crud-table-wrap">
            <table className="crud-table">
              <thead><tr>{config.columns.map((column) => <th key={column}>{config.labels[column]}</th>)}<th>Acoes</th></tr></thead>
              <tbody>{items.map((item) => (
                <tr key={item.id}>
                  {config.columns.map((column) => <td key={column}>{formatValue(item[column], column)}</td>)}
                  <td className="crud-actions"><button type="button" onClick={() => handleEdit(item)}>Editar</button><button className="danger" type="button" onClick={() => handleDelete(item)}>Excluir</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </article>
    </main>
  );
}

export default CrudManager;
