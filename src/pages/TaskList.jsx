import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

const STATUS_ORDER = { "To do": 0, "Doing": 1, "Done": 2 };

function TaskList() {

    const { tasks } = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

    // Gestisce ordinamento
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    };

    // Ordina i task
    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder;
            }
            if (sortBy === "status") {
                return (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) * sortOrder;
            }
            if (sortBy === "createdAt") {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
            }
        });
    }, [tasks, sortBy, sortOrder]);


    return (
        <div className="task-table container">

            <h1>Lista Task</h1>

            <table>

                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>
                            Nome {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                        <th onClick={() => handleSort("status")}>
                            Stato {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                        <th onClick={() => handleSort("createdAt")}>
                            Data di Creazione {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {sortedTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default TaskList;