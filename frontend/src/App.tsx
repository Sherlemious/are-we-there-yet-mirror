import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './modules/Admin/App';
import RootLayout from './modules/layout/pages/Root';

const BrowserRouter = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [] },
  {
    path: '/AdminDashboard',
    element: <Dashboard />,
  },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
