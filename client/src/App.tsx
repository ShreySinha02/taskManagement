import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideNavigation from './components/sidenavigation/SideNavigation';

function App() {
  return (
    <div className="h-screen flex flex-col">
        <NavBar />
     
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white shadow-md">
          <SideNavigation />
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
