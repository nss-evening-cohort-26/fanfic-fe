import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="text-center pt-52">
      <div>
        <Image src="/images/login.png" alt="Plothole" height={400} width={400} />
      </div>
      <Button type="button" size="md" className="hover:text-[#e6627d] roboto-condensed-buttons bg-transparent border-none text-2xl" onClick={signIn}>
        SIGN IN
      </Button>
    </div>
  );
}

export default Signin;
