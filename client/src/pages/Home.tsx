import React, { useEffect } from 'react';
import { trpc } from '../utils/trpc';

const Home = () => {
  const testUserQuery = trpc.getUser.useQuery();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/test');
      const data = await response.json();
      console.log(data);
    }

    fetchData();
  }, []);

  if (!testUserQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-y-8">
      <div className="text-bold text-5xl">Welcome {testUserQuery.data.name}</div>
      <div>Console should show JSON from Express server</div>
    </div>
  );
};

export default Home;
