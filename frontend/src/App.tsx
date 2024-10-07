import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./modules/shared/pages/RootLayout";
import { generalSettingAction } from "./modules/TourGuide/App";
import { AdminPage as AdminProducts } from "./modules/products/App";
import { AllProducts } from "./modules/products/App";
import { SellerPage as SellerProducts } from "./modules/products/App";
import { Dashboard as AdminDashboard } from "./modules/Admin/App";
import Activity from "./modules/Activity/pages/Activity";
import { Tag } from "./modules/Tags/App";
import { PrefrenceTag } from "./modules/PrefrenceTag/App";
import { Category } from "./modules/Category/App";
import {
  TourGuideProfile,
  tourGuideProfileLoader,
} from "./modules/TourGuide/App";
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
import { UsersAssets } from "./modules/shared/pages/UsersAssets";
import { UsersAssets as CrudUserAssets } from "./modules/TourGuide/pages/UsersAssets";

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
  {
    path: "/myproducts-admin",
    element: <AdminProducts />,
    children: [],
  },
  {
    path: "/all-products",
    element: <AllProducts />,
    children: [],
  },
  {
    path: "/myproducts-seller",
    element: <SellerProducts />,
    children: [],
  },
  {
    path: "/AdminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/Activity",
    element: <Activity />,
  },
  {
    path: "/Tag",
    element: <Tag />,
  },
  {
    path: "/PrefrenceTag",
    element: <PrefrenceTag />,
  },
  {
    path: "/ActivityCategory",
    element: <Category />,
  },
  {
    path: "/users-assets",
    element: <UsersAssets />,
  },
  {
    path: "/crud-users-assets",
    element: <CrudUserAssets />,
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
