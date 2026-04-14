import { Map, Calendar, User, PlusSquare } from "lucide-react";
import { NavItem } from "@/types/Navigation";

export const NAV_ITEMS: NavItem[] = [
  { id: "My Games", label: "My Games", icon: Calendar, href: "/testPage", requiresAuth: false },
  {id: "new game", label: "New Game", icon: PlusSquare, href: "/newGame", requiresAuth: false},
  { id: "map", label: "Map", icon: Map, href: "/map", requiresAuth: false },
  { id: "profile", label: "Profile", icon: User, href: "/profile", requiresAuth: true },
 
];