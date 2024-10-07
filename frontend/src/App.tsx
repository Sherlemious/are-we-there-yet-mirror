import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './modules/Admin/App';
import RootLayout from './modules/layout/pages/Root';
import Activity, { loader as activityLoader } from './modules/Activity/pages/Activity';
import { loader as activityFormLoader } from './modules/Activity/component/ActivityForm';
import { Tag } from './modules/Tags/App';
import { PrefrenceTag } from './modules/PrefrenceTag/App';
import { Category } from './modules/Category/App';
import { ActivityForm } from './modules/Activity/App';

const BrowserRouter = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [] },
  {
    path: '/AdminDashboard',
    element: <Dashboard />,
  },
  {
    path: '/Activity',
    children: [
      {
        index: true,
        element: <Activity />,
        loader: activityLoader,
      },
      {
        path: 'add',
        element: <ActivityForm method="post" />,
        loader: activityFormLoader,
      },
    ],
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
