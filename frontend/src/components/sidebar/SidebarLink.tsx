import { NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router";

interface SidebarLinkProps {
  label: string;
  icon: React.ElementType;
  to: string;
}

const SidebarLink = ({ label, icon: Icon, to }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      component={Link}
      to={to}
      //   onClick={(event) => event.preventDefault()}
      style={{ fontWeight: "500", borderRadius: "8px" }}
      leftSection={<Icon size={22} color={isActive ? "#ffffff" : "#3f3f46"} />}
      label={label}
      variant={isActive ? "filled" : "default"}
      active={isActive}
      className="nv"
      py="6px"
    />
  );
};

export default SidebarLink;
