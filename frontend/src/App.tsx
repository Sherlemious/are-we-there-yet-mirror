import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './modules/Admin/App';
import RootLayout from './modules/layout/pages/Root';
import Activity from './modules/ActivityCategory/pages/Activity';
import { Tag } from './modules/Tags/App';

const BrowserRouter = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [] },
  {
    path: '/AdminDashboard',
    element: <Dashboard />,
  },
  {
    path: '/Activity',
    element: <Activity />,
  },
  {
    path: '/Tag',
    element: <Tag />,
  },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
