import { H4 } from "../../common/typography";
import LogOut from "./LogOut";

export default function NavBar() {
  return (
    <header className="section sticky top-0 z-10 bg-background shadow border-b">
      <nav className=" flex items-center justify-between ">
        <H4 className="text-primary">Streamer</H4>
        <LogOut />
      </nav>
    </header>
  );
}
