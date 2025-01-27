import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
const links = [
  {
    title: "Home",
    icon: "hii",
    href: "#",
  }
];
const Tabs = () => {
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
};

export default Tabs;
