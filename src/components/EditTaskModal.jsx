import { useState, useRef } from "react";
import Modal from "./Modal";

function EditTaskModal({ show, onClose, task, onSave }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    const editFormRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...task, title, description, status });
    };

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <div>
                        <label>Nome</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Descrizione</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Stato</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            }
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
            confirmText="Salva"
        />
    );
}

export default EditTaskModal;