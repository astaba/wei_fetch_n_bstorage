import { useState, useEffect } from "react";
import axios from "axios";

import useLocalStorage from "./hook/useLocalStorage";

interface IHit {
  title: string;
  objectID: number;
  url: string;
}

const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query=";

function App() {
  const [hits, setHits] = useState<IHit[]>([]);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    "hitSearch",
    "landscape",
  );
  const [query, setQuery] = useState(searchTerm);

  const handleBtnClick = () => {
    setQuery(searchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      const result = await axios.get(`${API_ENDPOINT}${query}`);
      // console.log(result);
      setHits(result.data.hits);
    };
    fetchData();
  }, [query]);
  return (
    <div>
      <h1 className="text-[3.2em] leading-[1.1] text-center">Fetch Data</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-inherit text-lg px-2 py-1 mr-4"
        />
        <button type="button" onClick={handleBtnClick} className="btn">
          Search
        </button>
      </div>
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
