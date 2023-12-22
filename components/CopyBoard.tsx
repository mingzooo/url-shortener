"use client";

import {FormEvent, useRef, useState} from 'react'
import Link from 'next/link';

type CopyBoardProps = {
  code: string
}

const CopyBoard = ({ code }: CopyBoardProps) => {
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setIsCopy(true)
    } else {
      setIsCopy(false)
    }
  }

  return (
    <div className='flex flex-col'>
      <form className='max-w-[600px] w-full flex justify-center my-4 mx-auto' onSubmit={handleOnSubmit}>
        <input
          type='text'
          className='border border-solid p-4 rounded-1-1g w-full'
          value={`${process.env.NEXT_PUBLIC_API_URL}/${code}`}
          ref={inputRef}
          readOnly
        />
        <div className='flex flex-col justify-center relative'>
          <input
            type='submit'
            className=''
            value={'URL 복사'}
          />
          {isCopy && (
            <div className='absolute top-16 bg-black text-white p-2 rounded-1g text-sm'>
              URL 복사완료
            </div>
          )}
        </div>
      </form>
      <div className='flex flex-row'>
        <span>
          see how many time your link got clicked!
        </span>
        <Link
          href={`/analytic?code=${code}`}
          className='text-blue-300'
        >
          click Here!
        </Link>
      </div>
    </div>
  )
}

export default CopyBoard