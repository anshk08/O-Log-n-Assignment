import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { House } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between px-5 py-2 fixed">
      <div className="font-bold text-xl">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <House className="size-6" />
          Weather Union <p className="text-blue-500">API</p>
        </Link>
      </div>

      <ModeToggle />
    </div>
  );
};

export default Header;
