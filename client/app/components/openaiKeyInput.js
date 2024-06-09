"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function OpenAIKeyInput() {
  const { data: session, status } = useSession();
  const [aiKey, setAIKey] = useState('');
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);

  const handleInputChange = (e) => {
    setAIKey(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (aiKey && aiKey.length > 5) {
      setValid(true);
      localStorage.setItem('openai_api_key', aiKey);
      setMessage('API key saved successfully!');
    } else {
      setValid(false);
      setMessage('Please enter a valid API key.');
    }
  };

  return (
    <div>
      <form className="max-w-sm mx-auto space-y-1" onSubmit={handleFormSubmit}>
        <label htmlFor="aiKey" className="block mb-2 text-sm font-medium text-gray-900">
          Your OpenAI Key
        </label>
        <input
          type="text"
          id="aiKey"
          aria-describedby="open-ai-key"
          value={aiKey}
          onChange={handleInputChange}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-100`}
          placeholder="1234-abcd..."
        />
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We’ll never share your details. They're saved to your localStorage.
        </p>
        <div className="w-full flex justify-start gap-2">
          <button
            type="submit"
            className="border border-gray-900 bg-gray-900 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            Save API Key
          </button>
          {session && status === 'authenticated' && (
            <Link href="/dashboard">
              <p
                type="button"
                // onClick={() => router.push("/dashboard")}
                className="w-full border border-gray-900 bg-gray-900 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                Go To Dashboard
              </p>
            </Link>
          )}
        </div>
      </form>
      {message && <p className={`text-sm ${valid ? "text-green-500" : "text-red-500"} mt-2`}>{message}</p>}
    </div>
  );
}

export default OpenAIKeyInput;

