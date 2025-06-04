import DestinationUpdatePage from '@/components/DestinationPage';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <div>
      <DestinationUpdatePage id={id}/>
    </div>
  )
}
