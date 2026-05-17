import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    // Gestisce modifica task
    const handleUpdate = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task modificata con successo!");
            setShowEditModal(false);
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
            <button onClick={() => setShowEditModal(true)}>Modifica Task</button>
            <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
            {/* Modale conferma eliminazione */}
            <Modal
                show={showDeleteModal}
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questa task?"
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
            {/* Modale modifica task */}
            {showEditModal && (
                <EditTaskModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    task={task}
                    onSave={handleUpdate}
                />
            )}
        </div>
    );
}

export default TaskDetail;