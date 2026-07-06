// types and constants for NavBar component

import { Map, Calendar, User, PlusSquare } from "lucide-react";
import { ElementType } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: ElementType;
  href: string;
  requiresAuth: boolean;
}

export interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "My Games", label: "My Games", icon: Calendar, href: "/testPage", requiresAuth: false },
  {id: "new game", label: "New Game", icon: PlusSquare, href: "/newGame", requiresAuth: true},
  { id: "map", label: "Map", icon: Map, href: "/map", requiresAuth: false },
  { id: "profile", label: "Profile", icon: User, href: "/profile", requiresAuth: true },
 
];