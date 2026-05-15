import React from "react";

function TaskRow({ task }) {

    const getStatusColor = (status) => {
        switch (status) {
            case "To do":
                return "#ff4d4d";
            case "Doing":
                return "#ffd633";
            case "Done":
                return "#4dff88";
            default:
                return "white";
        }
    };

    return (
        <tr>

            <td>{task.title}</td>

            <td style={{ backgroundColor: getStatusColor(task.status) }}>
                {task.status}
            </td>

            <td>{new Date(task.createdAt).toLocaleDateString()}</td>

        </tr>
    );
}

export default React.memo(TaskRow);