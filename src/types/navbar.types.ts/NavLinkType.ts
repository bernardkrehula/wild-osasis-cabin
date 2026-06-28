import type React from "react";

export type NavLinkType = {
  icon: { id: string; name: string; path: React.ReactNode };
  reddirect: (e: React.MouseEvent<HTMLLIElement>) => void;
  activeLink: {
    home: boolean;
    bookings: boolean;
    apartments: boolean;
    users: boolean;
    settings: boolean;
  };
};
