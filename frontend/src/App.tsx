import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./modules/shared/pages/RootLayout";
import {
  TourGuideProfile,
  tourGuideProfileLoader,
} from "./modules/TourGuide/App";
import { generalSettingAction } from "./modules/TourGuide/App";
import {
  AdvertiserProfile,
  advertiserProfileLoader,
} from "./modules/Advertiser/App";
import { SellerProfile, sellerProfileLoader } from "./modules/Seller/App";
import {
  Register,
  registerAction,
  registerLoader,
} from "./modules/Register/App";
import {
  TouristAction,
  TouristProfile,
  touristProfileLoader,
} from "./modules/Tourist/App";

import { Toaster } from "react-hot-toast";

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <RootLayout />, children: [] },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
    loader: registerLoader,
  },
  {
    path: "/tour-guide-profile/:id",
    element: <TourGuideProfile />,
    action: generalSettingAction,
    loader: tourGuideProfileLoader,
  },
  {
    path: "/advertiser-profile/:id",
    element: <AdvertiserProfile />,
    action: generalSettingAction,
    loader: advertiserProfileLoader,
  },
  {
    path: "/seller-profile/:id",
    element: <SellerProfile />,
    action: generalSettingAction,
    loader: sellerProfileLoader,
  },
  {
    path: "/tourist-profile/:id",
    element: <TouristProfile />,
    loader: touristProfileLoader,
    action: TouristAction,
  },
]);

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 4000 },
          style: {
            fontSize: "16px",
            lineHeight: "1.5",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "white",
            margin: "5px",
            display: "absolute",
          },
        }}
      />
      <RouterProvider router={BrowserRouter} />
    </>
  );
}

export default App;
