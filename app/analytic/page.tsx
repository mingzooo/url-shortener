import React from 'react'
import Link from 'next/link';

type AnalyticPageProps = {
  searchParams: {
    code: string
  }
};

async function getAnalytic(code: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytic/${code}`, {
    method: "GET",
  });
  // console.log(res)
  if (!res.ok) {
    throw new Error("failed to fetch data")
  }
  return res.json()
}

const AnalyticPage = async ({ searchParams }: AnalyticPageProps) => {
  const { code } = searchParams;
  const res = await getAnalytic(code);

  console.log(res)

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-slate-600 text-3xl'>
        Total URL Clicks: {res.data.clicked}
      </h1>
      <div className='flex flex-col gap-4 mt-8'>
        <Link
          href={res.data.url.originalUrl}
          className='text-blue-300'
          target='_blank'
          prefetch={false}
        >
          {res.data.url.originalUrl}
        </Link>
        <Link
          href={res.data.url.originalUrl}
          className='text-blue-300'
          target='_blank'
          prefetch={false}
        >
          {res.data.url.shortUrl}
        </Link>
      </div>
      <button>
        <Link
          href={'/'}
          className='text-white'
          target='_blank'
        >
          click to shorten more Links
        </Link>
      </button>
    </div>
  )
}

export default AnalyticPage