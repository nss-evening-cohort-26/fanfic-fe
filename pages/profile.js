import React from 'react';
import UserCard from '../components/cards/UserCard';

export default function Profile() {
  return (
    <div className="flex justify-center">
      <div className="mt-32">
        <UserCard />
      </div>
    </div>
  );
}
