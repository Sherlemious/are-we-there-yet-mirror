import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './modules/Admin/App';
import RootLayout from './modules/layout/pages/Root';
import Activity from './modules/Activity/pages/Activity';
import { Tag } from './modules/Tags/App';
import { PrefrenceTag } from './modules/PrefrenceTag/App';
import { Category } from './modules/Category/App';

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
  {
    path: '/PrefrenceTag',
    element: <PrefrenceTag />,
  },
  {
    path: '/ActivityCategory',
    element: <Category />,
  },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
