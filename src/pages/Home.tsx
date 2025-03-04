import { useEffect, useState } from 'react';
import { getInfo } from '../api/api';

const Home = () => {
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfo();
        setInfo(data.data.info); 
      } catch (error) {
        console.error("Failed to fetch info:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      {info && (
        <h2 dangerouslySetInnerHTML={{ __html: info }} />
      )}
    </div>
  );
};

export default Home;
