/* eslint-disable jsx-a11y/anchor-is-valid */
import { DarkThemeToggle, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { textContent } from "../../constants";

type LinkProps = {
  label: string;
  href: string;
};
const NavLink = ({ label, href }: LinkProps) => {
  return (
    <Link href={href}>
      <a className="ml-1 py-3 font-semibold text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500 sm:py-0">
        {label}
      </a>
    </Link>
  );
};

const Header: FC<Record<string, never>> = function () {
  return (
    <header className="sticky top-0 z-20 border-b">
      <Navbar fluid>
        <Navbar.Brand href="/">
          <Image
            alt="Brand Logo"
            src="/favicon.png"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
            {textContent.brand}
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle />
          <DarkThemeToggle />
        </div>
        <Navbar.Collapse>
          {textContent.navbar.links.map((item, i) => (
            <NavLink key={i} label={item.label} href={item.href} />
          ))}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
