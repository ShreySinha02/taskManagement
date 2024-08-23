import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

// Sample data for tasks (you can fetch this from an API)
const sampleTasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3' },
];

function Tasks() {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [tasks, setTasks] = useState(sampleTasks);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-2 rounded-md ${viewMode === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            List View
          </button>
        </div>
        <Link to="/app/create-task">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create Task
          </button>
        </Link>
      </div>

      {/* Tasks Display Section */}
      <div className={viewMode === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : ''}>
        {viewMode === 'card' ? (
          tasks.map((task) => (
            <div key={task.id} className="p-4 bg-white shadow-md rounded-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p>{task.description}</p>
            </div>
          ))
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="p-4 bg-white shadow-md rounded-md border border-gray-200 mb-4">
                <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tasks;
