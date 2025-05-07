import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import TaskListItem from "../components/TaskListItem";
// import ToggleView from "../components/ToggleView";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  // const [view, setView] = useState("card");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "Low" });
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization: `${user?.token}` },
      });
      setTasks(res.data);
    };
    if (user) fetchTasks();
  }, [user]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/tasks`, newTask, {
        headers: { Authorization: `${user?.token}` },
      });
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "", priority: "Low" });
      setShowForm(false);
    } catch (err) {
      console.error("Error occurred:", err);
      alert("Failed to add task");
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task => task._id === taskId
      ? { ...task, status: task.status === "complete" ? "incomplete" : "complete" }
      : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchStatus = statusFilter === "All" || task.status === statusFilter.toLowerCase();
    const matchPriority = priorityFilter === "All" || task.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-5 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Task Management</h1>
          <div className="flex items-center gap-4">
            <span>Hello, <span className="capitalize font-semibold">{user?.username}</span></span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-5 max-w-5xl mx-auto w-full">
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            {showForm ? "Hide Add Task Form" : "+ Add Task"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-5 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Task Title"
                className="w-full p-2 mb-4 border rounded-lg"
                required
              />
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Task Description"
                className="w-full p-2 mb-4 border rounded-lg"
                required
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full p-2 mb-4 border rounded-lg"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Submit Task
              </button>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div>
            <label className="block mb-1 font-medium">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Filter by Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="grid gap-4">
          {
            filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            ))
          }
          {/* {view === "card"
            ? filteredTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                />
              ))
            : filteredTasks.map(task => (
                <TaskListItem
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                />
              ))} */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 shadow-inner">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Task Manager by Rajat Valecha</p>
      </footer>
    </div>
  );
};

export default Dashboard;
