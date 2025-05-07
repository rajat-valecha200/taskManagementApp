import React from "react";

const TaskListItem = ({ task }) => {
  return (
    <div className="border-b py-2">
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
  );
};

export default TaskListItem;