import React from "react";

type Task = {
  id: string;
  name: string;
  completed: boolean;
};

type ProgressBarProps = {
  tasks: Task[];
};

const TasksBar: React.FC<ProgressBarProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div>
      <div style={{ width: "100%", backgroundColor: "#ddd" }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "#4caf50",
            height: "15px",
            marginBottom: "10px"
          }}
        />
      </div>
      <p>{`${completedTasks} de ${totalTasks} tareas completadas`}</p>
    </div>
  );
};

export default TasksBar;
