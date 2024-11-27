import { AccountType } from "@/modules/shared/types/User.types";
import {
  AdminLinks,
  AdvertiserLinks,
  SellerLinks,
  TourGuideLinks,
  TourismGovernorLinks,
  TouristLinks,
} from "./content";

import type { NavBarContent } from "./content";

export function returnNavBarContentBasedOnUser(accountType: string) {
  const navBarContent: NavBarContent = {};

  switch (accountType) {
    case AccountType.Tourist:
      navBarContent["links"] = TouristLinks;
      return navBarContent;

    case AccountType.Advertiser:
      navBarContent["links"] = AdvertiserLinks;
      return navBarContent;

    case AccountType.Seller:
      navBarContent["links"] = SellerLinks;
      return navBarContent;

    case AccountType.TourGuide:
      navBarContent["links"] = TourGuideLinks;
      return navBarContent;

    case AccountType.Admin:
      navBarContent["links"] = AdminLinks;
      return navBarContent;

    case AccountType.TourismGovernor:
      navBarContent["links"] = TourismGovernorLinks;
      return navBarContent;

    default:
      return navBarContent;
  }
}
