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
import { TouristAction, TouristProfile } from "./modules/Tourist/App";

import { Toaster } from "react-hot-toast";
import { store } from "./store";
import { Provider } from "react-redux";

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
  {
    path: "/tourist-profile",
    element: <TouristProfile />,
    loader: registerLoader,
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
      <Provider store={store}>
        <RouterProvider router={BrowserRouter} />
      </Provider>
    </>
  );
}

export default App;
