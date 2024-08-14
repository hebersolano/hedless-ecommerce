import Link from "next/link";
import Menu from "./Menu";

function Navbar() {
  return (
    <div className="relative h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* mobile */}
      <div className="flex h-full items-center justify-between">
        <Link href="/">
          <div className="text-2xl tracking-wide">ANA&apos;s</div>
        </Link>
        <Menu />

        {/* bigger screens */}
        <div className="hidden md:flex"></div>
      </div>
    </div>
  );
}

export default Navbar;
