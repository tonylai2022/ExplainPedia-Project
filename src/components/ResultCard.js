import { useState } from "react";

function ResultCard({ keyword, explanation, performSearch }) {
  const [audio, setAudio] = useState(null);

  const playAudio = () => {
    audio.play();
  }

  const retrySearch = () => {
    performSearch(keyword, true);
  }

  return (
    <div href="#" className="block w-9/12 xl:w-6/12 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"># {keyword}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{explanation}</p>
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          className="mt-6 text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-500 disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          onClick={retrySearch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>

        </button>
        <button
          className="mt-6 text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-500 disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          onClick={playAudio}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        </button>
        <audio
          ref={(audio) => { setAudio(audio); }}
          src={`http://localhost:8080/api/text-to-speech?phrase=${explanation}`}
          controls={false}
        />
      </div>
    </div>

  );
}

export default ResultCard;