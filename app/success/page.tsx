import { CopyBoard } from '@/components';
import React from 'react'

type SuccessPageProps = {
  searchParams: {
    code: string
  }
};

const SuccessPage = ({searchParams}:SuccessPageProps) => {
  const { code } = searchParams;
  return (
    <div>
      <CopyBoard code={code} />
    </div>
  )
}

export default SuccessPage