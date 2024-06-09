"use client"

import { Login } from '../app/actions/index.js';
import OpenAIKeyInput from '../app/components/openaiKeyInput.js';

function Home() {


  return (
    <div className="flex flex-col justify-center items-center">
      <form action={Login} className='max-w-sm'>
        <button 
        type='submit'
        name='action'
        value="google" 
        class="text-white text-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center me-2 mb-2 w-full">
          <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
          </svg>
          Sign in with Google
        </button>
      </form>
      <OpenAIKeyInput />
    </div>
  );
}

export default Home;

// py-4 px-7 
// bg-primary 
// bg-opacity-5 
// rounded-md 
// block 
// mx-auto 
// min-w-fit w-1/4
