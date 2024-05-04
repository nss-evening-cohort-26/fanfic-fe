import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue !== '') router.push(`/search/${searchValue}`);
    setSearchValue('');
  };

  return (
    <Form id="search-bar" className="pt-[10px] search-bar" onSubmit={handleSubmit}>
      <FormControl type="text" placeholder="Search Posts" size="sm" className="rounded-full" onChange={handleChange} value={searchValue} />
    </Form>
  );
}
