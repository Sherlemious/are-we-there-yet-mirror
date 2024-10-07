import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './modules/Admin/App';
import { loader as activityLoader } from './modules/Activity/pages/Activity';
import { loader as activityFormLoader, action as activityFormAction } from './modules/Activity/component/ActivityForm';
import { Tag } from './modules/Tags/App';
import { PrefrenceTag } from './modules/PrefrenceTag/App';
import { Category } from './modules/Category/App';
import { Activity, ActivityForm, EditActivity } from './modules/Activity/App';

const BrowserRouter = createBrowserRouter([
  {
    path: '/AdminDashboard',
    element: <Dashboard />,
  },
  {
    path: '/activity',
    children: [
      {
        index: true,
        element: <Activity />,
        loader: activityLoader,
      },
      {
        path: 'add',
        element: <ActivityForm method="post" />,
        action: activityFormAction,
        loader: activityFormLoader,
      },
      {
        path: 'edit',
        element: <EditActivity />,
        action: activityFormAction,
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
