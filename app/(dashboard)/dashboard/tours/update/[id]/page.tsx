import TourUpdatePage from '@/components/frontend/TourUpdatePage';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <div>
      <TourUpdatePage id={id}/>
    </div>
  )
}
