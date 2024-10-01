import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './modules/layout/pages/Root';
import { TouristGoverner } from './modules/HistoricalPlaces/App';

const BrowserRouter = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [] },
  { path: '/tourism-governer', element: <TouristGoverner />, children: [] },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
