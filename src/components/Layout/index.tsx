import { Flowbite } from "flowbite-react";
import { ReactNode } from "react";
import { flowbiteTheme as theme } from "../../constants";
import FooterComponent from "./footer";
import Header from "./header";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Flowbite theme={{ theme }}>
      <Header />
      {children}
      <div className="border-t dark:bg-gray-900">
        <FooterComponent />
      </div>
    </Flowbite>
  );
}
