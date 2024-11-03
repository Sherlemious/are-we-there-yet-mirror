import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  ErrorPage,
  NotFoundPage,
  RootLayout,
  rootLayoutLoader,
} from "./modules/Layout/App";
import { AdminPage as AdminProducts } from "./modules/products/App";
import { AllProducts } from "./modules/products/App";
import { SellerPage as SellerProducts } from "./modules/products/App";
import { Dashboard as AdminDashboard } from "./modules/Admin/App";
import { Tag } from "./modules/Tags/App";
import { PrefrenceTag } from "./modules/PrefrenceTag/App";
import { Category } from "./modules/Category/App";
import { TourGuideProfile } from "./modules/TourGuide/App";
import { AdvertiserProfile } from "./modules/Advertiser/App";
import { SellerProfile } from "./modules/Seller/App";

import { TouristProfile, touristProfileLoader } from "./modules/Tourist/App";
import { Toaster } from "react-hot-toast";
import { UsersAssets } from "./modules/shared/pages/UsersAssets";
import { UsersAssets as CrudUserAssets } from "./modules/TourGuide/pages/UsersAssets";
import { AllMuseums } from "./modules/Museums/App";
import { loader as activityLoader } from "./modules/Activity/pages/Activity";
import {
  loader as activityAddLoader,
  editLoader as activityEditLoader,
  action as activityFormAction,
} from "./modules/Activity/component/ActivityForm";
import { Activity, ActivityForm, EditActivity } from "./modules/Activity/App";
import UserContextProvider from "./modules/shared/store/user-context";
import { RouteGuard } from "./modules/shared/components/RouteGuard";
import { AccountType } from "./modules/shared/types/User.types";
import { LandingPage } from "./modules/LandingPage/App";
import Register from "./modules/Register/pages/Register";
import { registerAction, registerLoader } from "./modules/Register/App";

const BrowserRouter = createBrowserRouter([
  {
    path: "/home",
    index: true,
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
    loader: registerLoader,
  },
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: rootLayoutLoader,
    children: [
      {
        path: "/tour-guide-profile/:id",
        // element: <TourGuideProfile />,
        element: (
          <RouteGuard account_types={[AccountType.TourGuide]}>
            <TourGuideProfile />
          </RouteGuard>
        ),
      },
      {
        path: "/advertiser-profile/:id",
        // element: <AdvertiserProfile />,
        element: (
          <RouteGuard account_types={[AccountType.Advertiser]}>
            <AdvertiserProfile />
          </RouteGuard>
        ),
      },
      {
        path: "/seller-profile/:id",
        // element: <SellerProfile />,
        element: (
          <RouteGuard account_types={[AccountType.Seller]}>
            <SellerProfile />
          </RouteGuard>
        ),
      },
      {
        path: "/tourist-profile/:id",
        // element: <TouristProfile />,
        element: (
          <RouteGuard account_types={[AccountType.Tourist]}>
            <TouristProfile />
          </RouteGuard>
        ),
        loader: touristProfileLoader,
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
        path: "/activity",
        element: (
          <RouteGuard account_types={[AccountType.Advertiser]}>
            <Outlet />
          </RouteGuard>
        ),
        children: [
          {
            index: true,
            element: <Activity />,
            loader: activityLoader,
          },
          {
            path: "add",
            element: <ActivityForm method="post" />,
            action: activityFormAction,
            loader: activityAddLoader,
          },
          {
            path: "edit/:activityId",
            element: <EditActivity />,
            action: activityFormAction,
            loader: activityEditLoader,
          },
        ],
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
      {
        path: "/all-museums",
        element: <AllMuseums />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
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
      <UserContextProvider>
        <RouterProvider router={BrowserRouter} />
      </UserContextProvider>
    </>
  );
}

export default App;
