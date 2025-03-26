import "~/styles/globals.css";
import { Navbar } from "~/components/layout/navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
