
import AttractionUpdatePage from '@/components/dashboard/attractions/attraction-update-page';
import React from 'react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <div>
      <AttractionUpdatePage id={id} />
    </div>
  );
}