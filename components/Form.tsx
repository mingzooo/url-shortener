"use client";

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [inputUrl, setInputUrl] = useState<string | null>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputUrl) {
      const { data, statusCode, error } = await createUrl(inputUrl);
      
      if (statusCode == 200) {
        router.push(`/success?code=${data.code}`);
        setError(null);
      } else {
        setError(error.message);
      }
    }

  }

  async function createUrl(url: string) {
    const res = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      body: JSON.stringify({url})
    })

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    return res.json();
  }

  return (
    <form className='max-w-[600px] w-full flex justify-center my-4 mx-auto' onSubmit={handleOnSubmit}>
      <div>
        <input
          type='text'
          placeholder='Enter a URL'
          className={`border border-solid p-4 rounded-1-1g w-full ${error && 'border-rose-600'}`}
          onChange={handleOnChange}
          required
        />

        {
          error && (
            <div>
              {error}
            </div>
          )
        }
      </div>

      <input type='submit' className='' value={'shorten Url'}/>
    </form>
  )
}

export default Form