import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import NavbarIcons from "./NavbarIcons";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <div className="relative h-16 bg-background px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* mobile */}
      <div className="flex h-full items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">ANA&apos;s</div>
        </Link>
        <Menu />
      </div>

      {/* bigger screens */}
      <div className="hidden h-full items-center justify-between gap-8 md:flex">
        {/* left */}
        <div className="flex w-1/3 items-center gap-12 lg:w-1/2">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <div className="text-2xl tracking-wide">ANA&apos;s</div>
          </Link>

          <div className="hidden gap-4 lg:flex">
            <Link href="/" className="hover:text-primary">
              Homepage
            </Link>
            <Link href="/shop" className="hover:text-primary">
              Shop
            </Link>
            <Link href="/deals" className="hover:text-primary">
              Deals
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
        {/* right */}
        <div className="flex w-2/3 items-center justify-between gap-8 lg:w-1/2 xl:w-1/2">
          <SearchBar />
          <NavbarIcons />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
