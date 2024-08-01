import Header from '@/app/user/components/Header';
import SidebarMenu from '@/app/user/components/SideBar';
import { Providers } from '@/components/providers/Providers';
export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <Providers attribute="class" defaultTheme="light">
      <div className="relative flex h-screen flex-col">
        <div className="flex flex-1">
          <SidebarMenu />
          <main className="container flex-1 py-5">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
