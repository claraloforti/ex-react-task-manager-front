import { useRef, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function AddTask() {
    const { addTask } = useContext(GlobalContext);

    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    // Validazione titolo
    const validateTitle = (value) => {
        if (!value.trim()) {
            return "Il titolo è obbligatorio";
        }

        const hasSymbols = symbols.split("").some(char =>
            value.includes(char)
        );

        if (hasSymbols) {
            return "Il titolo non può contenere simboli speciali";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateTitle(title);

        if (validationError) {
            setError(validationError);
            return;
        }

        const newTask = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };

        try {
            await addTask(newTask);
            alert("Task creata con successo!");

            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="add-task-container">

            <h1>Aggiungi Task</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <input
                        type="text"
                        placeholder="Nome task"
                        value={title}
                        onChange={(e) => {
                            const value = e.target.value;

                            setTitle(value);
                            setError(validateTitle(value));
                        }}
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>

                <div>
                    <textarea ref={descriptionRef} />
                </div>

                <div>
                    <select ref={statusRef} defaultValue="To do">
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button type="submit">
                    Aggiungi Task
                </button>

            </form>

        </div>
    );
}

export default AddTask;