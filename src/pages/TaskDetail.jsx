import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);

    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        return <p>Task non trovata</p>;
    }

    // Gestisce eliminazione task
    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata con successo!");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="task-detail">
            <h1>{task.title}</h1>

            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

            <button onClick={handleDelete}>
                Elimina Task
            </button>
        </div>
    );
}

export default TaskDetail;