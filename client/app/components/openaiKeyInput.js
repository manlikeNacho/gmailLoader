"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

function OpenAIKeyInput() {
  const { data: session, status } = useSession();
  const [aiKey, setAIKey] = useState('');
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);
  const router = useRouter()

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
          Well never share your details. They&apos;re saved to your localStorage.
        </p>
        <div className="w-full space-x-2">
        <Button  size='md' type='submit' className='text-white bg-gray-900 border-2 font-semibold border-gray-900' radius='sm'>
        Save API KEY
       </Button>
          {session && status === 'authenticated' && (
            <Button  size='md' type='submit' className='text-gray-900 bg-white border-2 font-semibold border-gray-900' radius='sm' onClick={() => router.push('/dashboard')}>
            Go To Dashboard
           </Button>
          )}
        </div>
      </form>
      {message && <p className={`text-sm ${valid ? "text-green-500" : "text-red-500"} mt-2`}>{message}</p>}
    </div>
  );
}



export default OpenAIKeyInput;

