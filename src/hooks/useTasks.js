import { useEffect, useState } from "react";

export function useTasks() {

    const [tasks, setTasks] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL;


    useEffect(() => {

        fetch(`${apiUrl}/tasks`)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch(err => console.error(err));
    }, [apiUrl]);

    // Aggiungi task
    const addTask = async newTask => {
        const response = await fetch(`${apiUrl}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        setTasks(prev => [...prev, data.task]);
    };

    // Rimuovi task
    const removeTask = (taskId) => { };

    // Modifica task
    const updateTask = (updatedTask) => { };

    return { tasks, addTask, removeTask, updateTask };
}