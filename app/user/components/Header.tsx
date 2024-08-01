import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Avatar } from '@nextui-org/react';
import Link from 'next/link';

import AuthButton from '../../../components/AuthButton';
import { AcmeLogo } from '../../../components/icons/AcmeLogo';
import { SearchIcon } from '../../../components/icons/SearchIcon';

import { createClient } from '@/utils/supabase/server';
export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();

      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden font-bold text-inherit sm:block">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-3 sm:flex">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" color="secondary" href="#">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent className="items-center" justify="end">
        <Input
          classNames={{
            base: 'max-w-full min-w-48  h-10',
            mainWrapper: ' h-full',
            input: 'text-small',
            inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon />}
          type="search"
        />
        <div className="flex flex-row items-center">
          <Avatar
            isBordered
            as="button"
            className="mx-5 transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <span className="hidden items-center gap-2 whitespace-nowrap sm:flex">
            {isSupabaseConnected && <AuthButton />}
          </span>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
