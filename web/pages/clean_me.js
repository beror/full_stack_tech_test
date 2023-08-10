import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

export default function MessyPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData()
        .catch((error) => setError(error));
  }, []);

  async function getData() {
    try {
        setIsLoading(true);
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
        setData(data);
    } catch (error) {
        //We can custom our error here
        throw new Error('Something going wrong')
    } finally {
        setIsLoading(false);
    }
  }

  if(error) return <p>error.message</p>

  if(isLoading) return <p>Loading...</p>;

  if(!data || data.length === 0) return <p>Empty list</p>

  const renderItem = (item) => (
      <div key={item.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid black' }}>
        <h2 style={{ fontSize: '25px' }}>{item.title}</h2>
        <p>{item.description}</p>
        <button
            onClick={() => router.push(`/detail/${item.id}`)}
            style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          View Detail
        </button>
      </div>
  );

  return (
    <div style={{ fontFamily: 'Arial', color: 'black', backgroundColor: 'white', padding: '20px' }}>
      <h1 style={{ fontSize: '30px', color: 'blue' }}>Page Title</h1>
      {data.map(renderItem)}
    </div>
  );
}
