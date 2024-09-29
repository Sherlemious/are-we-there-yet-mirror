import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './modules/layout/pages/Root';

const BrowserRouter = createBrowserRouter([{ path: '/', element: <RootLayout />, children: [] }]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
