import { ReactNode, FC } from "react";
import Header from "../header/header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="layout-container">
    <Header />
    <main className="pt-16">{children}</main>
    <footer>Your Footer</footer>
  </div>
);

export default Layout;
