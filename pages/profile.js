import React from 'react';
import UserCard from '../components/cards/UserCard';

export default function Profile() {
  return (
    <div className="flex">
      <div className="mt-32">
        <UserCard />
      </div>
    </div>
  );
}
