/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import { IoCreateOutline } from 'react-icons/io5'; // icon for navbar
import Image from 'next/image';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" className="nav">
      <div>
        <Link passHref href="/feed">
          <Image src="/images/logo.png" alt="Plothole" height={40} width={300} />
        </Link>
      </div>
      <div className="flex right-nav fw-semibold">
        <Nav className="gap-1">
          <Link passHref href="/post/new">
            <Nav.Link className="pt-[11px] flex gap-1 text-[#C84D85]">
              <IoCreateOutline className="w-6 h-6" />
              <span className="pt-[2px]">Write</span>
            </Nav.Link>
          </Link>
          <SearchBar />
        </Nav>
        <UserMenu />
      </div>
    </Navbar>
  );
}
