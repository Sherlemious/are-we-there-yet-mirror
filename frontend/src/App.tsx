import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./modules/shared/pages/RootLayout";
import { TourGuideProfile } from "./modules/TourGuide/App";
import { generalSettingAction } from "./modules/TourGuide/App";
import { AdvertiserProfile } from "./modules/Advertiser/App";
import { SellerProfile } from "./modules/Seller/App";
import {
  Register,
  registerAction,
  registerLoader,
} from "./modules/Register/App";

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <RootLayout />, children: [] },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
    loader: registerLoader,
  },
  {
    path: "/tour-guide-profile",
    element: <TourGuideProfile />,
    action: generalSettingAction,
  },
  {
    path: "/advertiser-profile",
    element: <AdvertiserProfile />,
    action: generalSettingAction,
  },
  {
    path: "/seller-profile",
    element: <SellerProfile />,
    action: generalSettingAction,
  },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
