import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import AddTask from "./pages/AddTask";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                {/* Navbar */}
                <nav className="navbar container">
                    <NavLink to="/">LISTA TASK</NavLink>
                    <NavLink to="/add">AGGIUNGI TASK</NavLink>
                </nav>

                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/add" element={<AddTask />} />
                    <Route path="/task/:id" element={<TaskDetail />} />
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;