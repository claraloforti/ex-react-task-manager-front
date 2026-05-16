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

    const addTask = (newTask) => { };
    const removeTask = (taskId) => { };
    const updateTask = (updatedTask) => { };

    return { tasks, addTask, removeTask, updateTask };
}