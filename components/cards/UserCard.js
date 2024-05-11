/* eslint-disable react/button-has-type */
import React from 'react';
import Image from 'next/image';
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaGoogle,
} from 'react-icons/fa';
import { useAuth } from '../../utils/context/authContext';

export default function UserCard() {
  const { user } = useAuth();

  return (
    <div className="container mt-5 inter-bold">
      <div className="row d-flex justify-content-center w-[750px]">
        <div className="col-md-7">
          <div className="card bg-[#333333] p-3 py-4 border-b-2 border-b-[#ff5687]">
            <div className="text-center">
              <Image src={user.image} width={100} height={100} className="rounded-circle mx-auto" />
            </div>

            <div className="text-center text-white mt-3">
              <h5 className="mt-2 mb-0">
                {user.firstName} {user.lastName}
              </h5>
              <span className="inter-bold">{user.email}</span>

              <div className="px-4 mt-1">
                <p className="fonts inter-normal">{user.bio}</p>
              </div>

              <ul className="social-list">
                <li>
                  <FaFacebookSquare />
                </li>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaLinkedin />
                </li>
                <li>
                  <FaGoogle />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
