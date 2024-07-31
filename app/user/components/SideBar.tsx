'use client';
import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import Link from 'next/link';

export default function SidebarMenu() {
  const [isVertical, setIsVertical] = useState(true);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname.replace('/',''));

  return (
    <div className="flex flex-col px-4">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" isVertical={isVertical} className="p-10" selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
          <Tab key="dashboard" title={<Link href="/user/dashboard">导航页</Link>}/>
          <Tab key="user" title={<Link href="/user">用户管理</Link>}/>
          <Tab key="videos" title={<Link href="/videos">Videos</Link>}/>
        </Tabs>
      </div>
    </div>
  );
}