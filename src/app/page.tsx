'use client';

import { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { CiCircleInfo } from "react-icons/ci";
import RenderInfoBox from '@/components/infoBox';


interface LogData {
  [key: string]: any;
}

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [logData, setLogData] = useState<LogData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [option, setOption] = useState<string>('Default');

  const requiredFields = [
    'user',
    'platform',
    'operator_id',
    'lobby_url',
    'lang',
    'ip',
    'game_code',
    'currency',
    'country',
  ];

  const checkRequiredFields = (data: LogData): boolean => {
    return requiredFields.every(field => field in data && data[field]);
  };

  const parseLog = () => {
    try {
      const parsedData: LogData = JSON.parse(input);
      if (option === '/operator/generic/v2/game/url' && !checkRequiredFields(parsedData)) {
        setLogData(parsedData);
        setError('Missing required fields');
      } else {
        setLogData(parsedData);
        setError(null);
      }
    } catch (e) {
      setLogData(null);
      setError('Invalid JSON');
    }
  };

  function formatJSON(body: any): import("react").ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      
      <div className="w-full bg-slate-100 rounded-lg m-auto p-5 shadow-md">
        <h1 className="text-black text-2xl mb-4 font-bold">
          Log Viewer
          <span className="text-gray-500 text-sm ml-5">pre-Alpha 0.01</span>
        </h1>

        <label htmlFor="api-endpoint" className="block text-black flex items-center space-x-2 font-semibold">
          <span>Select API Endpoint</span>
          <a
            data-tooltip-id="my-tooltip"
            className='text-black cursor-pointer relative'
            data-tooltip-content="You can choose different API endpoints to test here."
          >

            <CiCircleInfo />
          </a>
        </label>


        <select
          id="api-endpoint"
          className="my-2 text-black p-2 border border-gray-300 rounded-lg bg-slate-100"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="Default">Default</option>
          <option value="/operator/generic/v2/game/url">/operator/generic/v2/game/url</option>
        </select>

        <textarea
          className="w-full h-[400px] mb-5 p-2 border border-gray-300 rounded-lg text-black"
          placeholder="Paste your JSON log here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="items-center justify-center gap-2 rounded-[4px] w-full bg-blue-400 px-[1.25rem] py-[1rem] text-xs font-semibold leading-none text-white transition focus-visible:outline focus-visible:outline-2 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
          onClick={parseLog}
        >
          Parse Log
        </button>

        <Tooltip id="my-tooltip" />


        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <div className="mt-5">
          {logData ? (
            <>
              {requiredFields.map((field) => {
                const value = logData[field];
                const bgColor = (option === '/operator/generic/v2/game/url' && (!value || value === '' || value === 'null')) ? 'bg-red-100' : 'bg-blue-50';

                // Define tooltip text based on field
                const toolTipText = field === 'country' && option === '/operator/generic/v2/game/url' ? 'Some of the countries might be hardblocked. Check in BMP if the game supports the country' : undefined;

                return (
                  <div key={field} className="relative">
                    {/* Pass toolTipText to renderInfoBox */}
                    <RenderInfoBox label={field} value={value} bgColor={bgColor} toolTipText={toolTipText} />
                  </div>
                );
              })}

              {logData._source?.body && (
                <div className="info-box bg-blue-50 p-2 mb-2 rounded-md border border-blue-200 text-black">
                  <span className="font-bold text-black">Body: </span>
                  <div>{formatJSON(logData._source.body)}</div>
                </div>
              )}

              <RenderInfoBox label="Beautified JSON" value={logData ? JSON.stringify(logData, null, 2) : ''} />


            </>
          ) : (
            <p className="text-gray-500 text-center mt-3">No data to display</p>
          )}
        </div>

      </div>
    </main>
  );
}
