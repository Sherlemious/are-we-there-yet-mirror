import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './modules/layout/pages/Root';
import { TourGuideProfile } from './modules/Tour Guide/App';
import { generalSettingAction } from './modules/Tour Guide/App';
import { AdvertiserProfile } from './modules/Advertiser/App';
import { SellerProfile } from './modules/Seller/App';

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
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
