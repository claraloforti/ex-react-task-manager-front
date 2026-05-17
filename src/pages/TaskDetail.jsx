import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);
    const [showModal, setShowModal] = useState(false);

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
            <button onClick={() => setShowModal(true)}>
                Elimina Task
            </button>
            {/* Modale conferma eliminazione */}
            <Modal
                show={showModal}
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questa task?"
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
        </div>
    );
}

export default TaskDetail;