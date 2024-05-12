import { useState, useEffect } from "react";
import axios from "axios";

interface IHit {
  title: string;
  objectID: number;
  url: string;
}

const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query=";

function App() {
  const [hits, setHits] = useState<IHit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${API_ENDPOINT}landscape`);
      // console.log(result);
      setHits(result.data.hits);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-[3.2em] leading-[1.1] text-center">Fetch Data</h1>
      <hr />
      {hits.length > 0 && (
        <ul>
          {hits.map((item) => (
            <li key={item.objectID}>
              <a
                href={item.url}
                target="_blank"
                className="text-current no-underline hover:underline"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
