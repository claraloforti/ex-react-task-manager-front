import { useRef, useState } from "react";

function AddTask() {

    // controllati
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    // non controllati
    const descriptionRef = useRef();
    const statusRef = useRef();

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const handleSubmit = (e) => {
        e.preventDefault();

        // validazione titolo
        if (!title.trim()) {
            setError("Il titolo è obbligatorio");
            return;
        }

        const hasSymbols = symbols.split("").some((char) =>
            title.includes(char)
        );

        if (hasSymbols) {
            setError("Il titolo non può contenere simboli speciali");
            return;
        }

        setError("");

        const task = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };
    };

    return (
        <div className="add-task-container">

            <h1>Aggiungi Task</h1>

            <form onSubmit={handleSubmit}>

                {/* Input titolo */}
                <div>
                    <input
                        type="text"
                        placeholder="Nome task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>

                {/* Input descrizione */}
                <div>
                    <textarea
                        placeholder="Descrizione"
                        ref={descriptionRef}
                    />
                </div>

                {/* Select stato */}
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