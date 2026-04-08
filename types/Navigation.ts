// nav bar items interface

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