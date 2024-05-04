import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function Dashboard() {
  const { user } = useAuth();

  return <h1 className="inter-bold text-3xl text-center pt-52">Hello {user.firstName}! Welcome back.</h1>;
}
