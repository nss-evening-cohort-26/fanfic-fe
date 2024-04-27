import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <h1>Hello {user.firstName}! Welcome back.</h1>
  );
}
