import { Separator } from "@/components/ui/separator";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";

import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="cursor-pointer"
          />
        </Link>
        <h3 className="text-xl font-medium">Crafted</h3>
      </div>
      <SearchInput />
      <div className="flex items-center gap-3 max-sm:pl-6">
        <ThemeSwitch />
        <Separator orientation="vertical" className="h-6 bg-separator" />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
