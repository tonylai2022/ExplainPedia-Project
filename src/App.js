import { useState } from "react";
import ResultCard from "./components/ResultCard";
import Spinner from "./components/Spinner";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [fixKeyword, setFixKeyword] = useState("");

  const performSearch = async (keyword, retry = false) => {
    setIsSearching(true);
    await connectBackend(keyword, retry);
    setIsSearching(false);
    setFixKeyword(keyword);
  }

  const handleClickOfSearchButton = async (e) => {
    await performSearch(keywordInput);
  }

  const handleUserInputChange = (e) => {
    setKeywordInput(e.target.value);
  }

  async function connectBackend(keyword, isRetry) {
    const url = `http://localhost:8080/api/search?retry=${isRetry}`
    let response = await fetch(url, {
      method: `POST`,
      body: JSON.stringify({ keyword }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let input = await response.json();
    let text = input.text;
    setExplanation(text);
  }
  
  const toDisplayResultCard = !isSearching && explanation;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen' style={{ position: 'relative', bottom: toDisplayResultCard ? '60px' : '180px' }}>
      <div className='text-6xl font-bold mb-6'>
        <span id="color_gradient">ExplainPedia</span>
      </div>
      <p className='mt-3 text-2xl text-slate-500'>Explain everything in five levels of difficulty from child to expert</p>
      <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <form className='w-full'>
          <div className="mb-6 flex flex-col items-center justify-center">
            <input
              type="text"
              className="w-9/12 xl:w-6/12 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200 dark:shadow-sm-light"
              placeholder="Search a keyword"
              value={keywordInput}
              onInput={handleUserInputChange}
            />
          </div>
          <div className='flex flex-col items-center justify-start'>
            {isSearching
              ? <Spinner />
              :
              <button
                type="submit"
                className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-500 disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                onClick={handleClickOfSearchButton}
              // disabled={keywordInput === ""}
              >
                Search
              </button>
            }
          </div>
        </form>
      </div>
      {
        toDisplayResultCard &&
        <ResultCard
          keyword={fixKeyword}
          explanation={explanation}
          performSearch={performSearch}
        />
      }
    </div>
  );
}

export default App;
