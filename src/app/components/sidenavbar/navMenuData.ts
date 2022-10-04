export interface INavbarData {
  routeLink: string;
  icon: string;
  label: string;
}

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    routeLink: 'statistics',
    icon: 'analytics',
    label: 'Statistics',
  },
  {
    routeLink: 'settings',
    icon: 'settings',
    label: 'Settings',
  },
];
