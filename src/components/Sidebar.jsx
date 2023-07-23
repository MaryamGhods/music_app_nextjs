import React from "react";
import Link from "next/link";
import { links } from "../assets/constants";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({handleClick}) => {
  return (
    <div>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.to}
          className="flex flex-row justify-start items-center my-6 ml-4 text-sm font-medium text-gray-400 hover:text-[#d048fd]"
          onClick={() => handleClick && handleClick()}
        >
        <link.icon className="w-6 h-6 ml-2 text-right" />
        {link.name}
      </Link>
      ))}
    </div>
  )
}

const Sidebar = (handleClick) => {

  const [mobileMenuOpen , setMobileMenuOpen] = useState(false);
 
  return (
    <div className="">
      <div className="w-[180px] h-full bg-[#20022b] text-white pt-4 px-4 md:flex flex-col hidden">
        <h1 className="my-4 text-xl font-bold text-[#d048fd]">دنیای موزیک</h1>
        <NavLinks />
      </div>

      <h1 className="sm:hidden block my-4 text-xl font-bold text-[#d048fd] absolute top-1 right-6">دنیای موزیک</h1>

      <div className="md:hidden block absolute top-4 left-6 z-50">
        {mobileMenuOpen ? 
        <RiCloseLine className="w-8 h-8 text-white mr-2" onClick={() => (setMobileMenuOpen(false))} /> 
        : <HiOutlineMenu className="w-8 h-8 text-white mr-2" onClick={() => (setMobileMenuOpen(true))} /> }
      </div>

      <div className={`absolute top-0 h-screen w-[60%] bg-gradient-to-tl from-white/10 to-[#431b50] backdrop-blur-lg z-40 py-14 p-8 md:hidden ${mobileMenuOpen ? 'left-0' : 'left-full hidden'}`}>
        <NavLinks />
      </div>
    </div>
  )
};

export default Sidebar;