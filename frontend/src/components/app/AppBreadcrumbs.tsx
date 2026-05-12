import { Anchor, Breadcrumbs, Text } from "@mantine/core";
import { AltArrowRight } from "@solar-icons/react";
import { Link, useLocation } from "react-router";

const AppBreadcrumbs = ({ customLastCrumb }: { customLastCrumb?: string }) => {
  const pathname = useLocation().pathname;

  const paths = pathname.split("/").slice(1);
  const crumbs = paths.map((label, index) => {
    const isLast = index === paths.length - 1;
    const isFirst = index === 0;
    const to = `/${paths.slice(0, index + 1).join("/")}`;
    const text = customLastCrumb && isLast ? customLastCrumb : label;

    return isLast || isFirst ? (
      <Text key={index} size="sm" fw={isFirst ? 400 : 500}>
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      </Text>
    ) : (
      <Anchor component={Link} to={to} key={index} size="sm">
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      </Anchor>
    );
  });

  return (
    // <div>breadcrum</div>
    <Breadcrumbs separator={<AltArrowRight size={14} />}>{crumbs}</Breadcrumbs>
  );
};

export default AppBreadcrumbs;
