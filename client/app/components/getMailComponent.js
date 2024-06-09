"use client"

import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import { useSession } from 'next-auth/react';

function GetMailComponent() {
  const { data: session, status } = useSession()
  const [mail, setMail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; 
      const googleAccessToken = localStorage.getItem("accessToken") //session.accessToken;
      
      

      const res = await fetch('https://gmailloader.onrender.com/mail', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleAccessToken}`,
          'OpenAI-API-Key': openAiKey,
        }
      }).catch(err => console.log(err));

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const mails = await res.json();
      setMail(mails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const classifyData = async () => {
    try {
      setLoading(true);
      setError(null);

      const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; 
      const googleAccessToken = localStorage.getItem("accessToken") //session.accessToken;
      
      

      const res = await fetch('https://gmailloader.onrender.com/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleAccessToken}`,
          'OpenAI-API-Key': openAiKey,
        },
        body: JSON.stringify(mail)
      })

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const mails = await res.json();
      setMail(mails);
    } catch (error) {
      console.log(error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem("accessToken", session.accessToken);
      fetchData();
    }
  }, [session]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
     <div className="mx-auto w-[70%] flex justify-end">
        <p className="font-md font-bold text-gray-800 cursor-pointer" onClick={classifyData}>Classify</p>
     </div>
      <div className="mx-auto max-w-[75%] lg:max-w-[60%]  space-y-4">
        {mail.length > 0 ? (
          mail.map((m) =>(
            <div key={m.id} className="w-full max-h-fit p-4 border border-gray-800 rounded-md">
            <div className="flex justify-between">
              <p className="text-black">{m.subject}</p>
              {m.class && (<p className={`${m.class==="important"?"text-green-500":m.class==="social"?"text-blue-500":"text-red-500"}`}>{m.class}</p>)}
            </div>
            {m.snippet && <p className="font-medium text-left">{m.snippet}</p>}
            </div>
          ))
        ) : (
          <div>No emails found</div>
        )}
      </div>
    </div>
  );
}

export default GetMailComponent;



// <div>
// {mails.length > 0 ? (
//   mails.map((m) => <div key={m.id}>{m.subject}</div>)
// ) : (
//   <div>No emails found</div>
// )}
// </div>



