import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { CheckCircle, Trash2 } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

const TaskCard = ({ task, onDelete, onToggle }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${task._id}`, {
        headers: { Authorization: `${user.token}` },
      });
      onDelete(task._id);
    } catch (err) {
      console.error("Error occurred:", err);
      alert("Failed to delete task");
    }
  };

  const handleToggle = async () => {
    try {
      await axios.put(
        `${API_URL}/api/tasks/${task._id}`,
        {},
        {
          headers: { Authorization: `${user.token}` },
        }
      );
      onToggle(task._id);
    } catch (err) {
      console.error("Error occurred:", err);
      alert("Failed to toggle task");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 shadow-xl rounded-2xl p-6 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {task.title}
        </h3>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 transition"
          title="Delete Task"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {task.description}
      </p>

      <p className="text-sm text-gray-500 mb-2 font-semibold">
        Priority:{" "}
        <span
          className={`px-2 py-1 rounded-full text-white ${
            task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {task.priority}
        </span>
      </p>

      <div className="flex justify-between items-center text-sm">
        <span
          className={`font-bold px-4 py-1 rounded-full capitalize text-white ${
            task.status === "complete" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {task.status}
        </span>
        <div className="flex items-center gap-2">
          <CheckCircle
            size={18}
            className={`cursor-pointer ${
              task.status === "complete"
                ? "text-green-500"
                : "text-gray-400 hover:text-yellow-500"
            }`}
            onClick={handleToggle}
            title="Mark as complete"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
