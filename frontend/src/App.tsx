import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './modules/layout/pages/Root';
import { AdminPage as AdminProducts } from './modules/products/App';
import { AllProducts } from './modules/products/App';
import { SellerPage as SellerProducts } from './modules/products/App';

const BrowserRouter = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [] },
  { path: '/myproducts-admin', element: <AdminProducts />, children: [] },
  { path: '/all-products', element: <AllProducts />, children: [] },
  { path: '/myproducts-seller', element: <SellerProducts />, children: [] },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
