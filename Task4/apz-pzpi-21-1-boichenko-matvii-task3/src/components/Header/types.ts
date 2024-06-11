export interface NavbarItem {
    label: string;
    iconPath?: string;
    children?: Array<NavbarItem>;
    href?: string;
}

export interface DeviceSpecificNavbarProps {
    navbarItems: Array<NavbarItem>
}
