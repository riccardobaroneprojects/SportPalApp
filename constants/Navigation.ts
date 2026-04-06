import { Map, Calendar, Users, Trophy, User } from "lucide-react";
import { NavItem } from "@/types/Navigation";

export const NAV_ITEMS: NavItem[] = [
  { id: "My Games", label: "My Games", icon: Calendar, href: "/testPage", requiresAuth: true },
  { id: "map", label: "Map", icon: Map, href: "/", requiresAuth: false },
  { id: "profile", label: "Profile", icon: User, href: "/profile", requiresAuth: true },
];