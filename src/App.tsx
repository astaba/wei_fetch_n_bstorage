import useLocalStorage from "./hook/useLocalStorage";
import useFetchData from "./hook/useFetchData";

interface IHit {
  title: string;
  objectID: number;
  url: string;
}

const getUrl = (query: string) => {
  const API_BASE = "http://hn.algolia.com/api/v1/search";
  const url = new URL(API_BASE);
  url.searchParams.set("query", query);
  return url.href;
};

function App() {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    "hitSearch",
    "landscape",
  );

  const {
    setUrl,
    fetcher: { isError, isLoading, data: hits },
  } = useFetchData<IHit[]>({
    watchedUrl: getUrl(searchTerm),
    initialData: [],
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setUrl(getUrl(searchTerm));
  };

  return (
    <div>
      <h1 className="text-[3.2em] leading-[1.1] text-center">Fetch Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-inherit text-lg px-2 py-1 mr-4"
        />
        <button type="submit" disabled={!searchTerm} className="btn">
          Search
        </button>
      </form>
      <hr />
      {isError && <h3>{isError}</h3>}
      {isLoading ? (
        <h3 className="">Loading...</h3>
      ) : (
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
