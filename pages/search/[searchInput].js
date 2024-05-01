/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { searchPosts } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchResults = async () => {
    const filteredResults = await searchPosts(searchInput, user.id);
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    getSearchResults();
  }, [searchInput, user.id]);

  return (
    <div className="d-flex flex-wrap">
      {searchResults.length === 0
        ? (<h1>No posts found.</h1>)
        : (searchResults.map((results) => (
          <PostCard key={results.id} postObj={results} onUpdate={getSearchResults} />)))}
    </div>
  );
}
