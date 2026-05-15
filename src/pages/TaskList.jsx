import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";


function TaskList() {

    const { tasks } = useContext(GlobalContext);

    return (
        <div className="task-table container">

            <h1>Lista Task</h1>

            <table>

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default TaskList;