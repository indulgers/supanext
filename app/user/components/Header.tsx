import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { SearchIcon } from "../../../components/icons/SearchIcon";
import AuthButton from "../../../components/AuthButton";
import { AcmeLogo } from "../../../components/icons/AcmeLogo";
export default async function Index  ()  {
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
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
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
            base: "max-w-full min-w-48  h-10",
            mainWrapper: " h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon />}
          type="search"
        />
         <div className="flex flex-row items-center ">
              <Avatar
                isBordered
                as="button"
                className="transition-transform mx-5"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              <span className="hidden sm:flex items-center gap-2 whitespace-nowrap">
              {isSupabaseConnected && <AuthButton />}
              </span>
            </div> 
      </NavbarContent>
    </Navbar>
  );
};
