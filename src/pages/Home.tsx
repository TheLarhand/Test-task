import { useEffect, useState } from 'react';
import { getInfo } from '../api/api';
import "../styles/global.scss";

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
        <h2 className="home__title" dangerouslySetInnerHTML={{ __html: info }} />
      )}
    </div>
  );
};

export default Home;
