import React from "react";
import TaskList from "./TaskList";

const AllTasks = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All tasks </h1>
      <TaskList />
    </div>
  );
};

export default AllTasks;
