import { PiSquaresFourFill } from "react-icons/pi";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { PiHamburgerFill } from "react-icons/pi";
import { TiLocation } from "react-icons/ti";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";

import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <div className="flex flex-col gap-16">
      <Link href="/" className="font-bold tracking-wider my-3">avoburger</Link>

      <div className="navbar min-h-[58%] py-8 ">
        <Link href="/dashboard">
          <div>
            <PiSquaresFourFill /> <span>Dashboard</span>
          </div>
        </Link>

        <Link href="/orders">
          <div>
            <BiSolidShoppingBagAlt />
            <span>Orders</span>
            <p className="bg-gradient-to-r from-teal-300 to-lime-400 p-[0.1rem] text-[0.7rem] font-medium w-8 h-5 rounded-full">
              12
            </p>
          </div>
        </Link>

        <Link href="/products">
          <div>
            <PiHamburgerFill />
            <span>Products</span>
          </div>
        </Link>

        <Link href="/restaurant">
          <div>
            <TiLocation />
            <span>Restaurants</span>
          </div>
        </Link>

        <Link href="/drivers">
          <div>
            <BsFillPersonFill />
            <span>Drivers</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-center gap-4 min-h-[25%] p-2">
        <Link href="/" className="text-sm text-neutral-500">
          Done for the day?
        </Link>
        <button className="bg-gradient-to-r from-teal-500 to-lime-500 text-white flex items-center gap-2 justify-center px-2 py-3 rounded-xl">
          <IoSend /> Send daily report
        </button>
      </div>

      <div className="flex items-center justify-between min-h-[10%] p-3 border-t">
        <Image
          src="/images/businesswoman.jpg"
          className="w-10 h-10 rounded-full absolute"
          width={5000}
          height={5000}
          alt="profile-img"
        />
        <span className="bg-green-500 w-3 h-3 rounded-full relative -top-3 -right-7"></span>
        <span>Annalise Wallis</span>
        <HiDotsVertical className="text-2xl" />
      </div>
    </div>
  );
}

export default Navbar;
