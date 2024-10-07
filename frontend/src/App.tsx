import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './modules/shared/pages/RootLayout';
import { TourGuideProfile } from './modules/TourGuide/App';
import { generalSettingAction } from './modules/TourGuide/App';
import { AdvertiserProfile } from './modules/Advertiser/App';
import { SellerProfile } from './modules/Seller/App';
import { AdminPage as AdminProducts } from './modules/products/App';
import { AllProducts } from './modules/products/App';
import { SellerPage as SellerProducts } from './modules/products/App';

const BrowserRouter = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [] },
  {
    path: '/tour-guide-profile',
    element: <TourGuideProfile />,
    action: generalSettingAction,
  },
  {
    path: '/advertiser-profile',
    element: <AdvertiserProfile />,
    action: generalSettingAction,
  },
  {
    path: '/seller-profile',
    element: <SellerProfile />,
  },
  { path: '/myproducts-admin', element: <AdminProducts />, children: [] },
  { path: '/all-products', element: <AllProducts />, children: [] },
  { path: '/myproducts-seller', element: <SellerProducts />, children: [] },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
