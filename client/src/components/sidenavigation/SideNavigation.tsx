import React from 'react';
import { Link } from 'react-router-dom';

function SideNavigation() {
  return (
    <div className="w-64 h-full bg-gray-800 text-white shadow-md">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        Navigation
      </div>
      <ul className="mt-4">
        <li>
          <Link
            to="/app/dashboard"
            className="block p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/app/tasks"
            className="block p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/createuser"
            className="block p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            Create User
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNavigation;
