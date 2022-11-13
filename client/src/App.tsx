import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/test');
      const data = await response.json();
      console.log(data);
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-y-8">
      <div className="font-bold text-5xl">Welcome</div>
      <div>Console should show JSON from Express server</div>
    </div>
  );
}

export default App;
