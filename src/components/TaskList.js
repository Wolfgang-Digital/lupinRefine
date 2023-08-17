import React from 'react';

const TaskList = ({ activeTab }) => {
  // Sample task data for different tabs
  const tasksByTab = [
    [
      { id: 1, title: 'Caseys Furniture', description: 'Analytics' },
      { id: 2, title: 'The Night Sky', description: 'PPC' },
      { id: 3, title: 'The Night Sky', description: 'PPC' },
      { id: 4, title: 'HomeSecure', description: 'Analytics' },
      { id: 5, title: 'Zurich Insurance', description: 'PPC' },
      { id: 5, title: 'Littlewoods', description: 'Analytics' },
    ],
    [
      { id: 1, title: 'ZERO', description: 'Analytics' },
      { id: 2, title: 'Actavo', description: 'PPC' },
      { id: 3, title: 'Arnotts', description: 'PPC' },
      { id: 4, title: 'Bannon Jewellers', description: 'Analytics' },
      { id: 5, title: 'BodySlims', description: 'PPC' },
      { id: 5, title: 'Corcorans Furniture', description: 'Analytics' },
    ],
    [
      { id: 1, title: 'Caseys Furniture', description: 'Analytics' },
      { id: 2, title: 'The Night Sky', description: 'PPC' },
      { id: 3, title: 'The Night Sky', description: 'PPC' },
      { id: 4, title: 'HomeSecure', description: 'Analytics' },
      { id: 5, title: 'Zurich Insurance', description: 'PPC' },
      { id: 5, title: 'Littlewoods', description: 'Analytics' },

    ],
  ];

  // Get the tasks for the current active tab
  const tasks = tasksByTab[activeTab - 1] || [];

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default TaskList;
