/* eslint-disable jsx-a11y/anchor-is-valid */
import { DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { textContent } from "../../constants";
import Account from "./account";
import Connect from "./connect";

type LinkProps = {
  label: string;
  href: string;
};
const NavLink = ({ label, href }: LinkProps) => {
  return (
    <Link href={href}>
      <p className="ml-1 py-3 text-lg font-medium text-gray-500 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-500 sm:py-0">
        {label}
      </p>
    </Link>
  );
};

const Header: FC<Record<string, never>> = function () {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const handleOnDisconnect = () => {
    disconnect();
  };
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
          <span className="whitespace-nowrap px-3 text-2xl font-semibold dark:text-white">
            {textContent.brand}
          </span>
        </Navbar.Brand>
        <div className="flex md:order-3">
          {isConnected && address ? (
            <Dropdown label={<Account address={address} />} inline>
              <Dropdown.Item>
                <Link href={`/profile/${address}`}>Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={handleOnDisconnect}>Disconnect</button>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Connect />
          )}
        </div>
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
