"use client";

import Table from './components/table/table';
import { ChangeEvent, useState } from 'react';
import Pagination from '@mui/material/Pagination/Pagination';

export default function Home() {
  const [page, setPage] = useState(1);

  const onPageChange = (event: ChangeEvent<unknown>, index: number) => {
    setPage(index);
  }

  return (
    <main className="flex flex-col h-full items-center justify-between p-6">

      <div className="flex place-items-center">
        <Table 
          width={"90vw"} 
          columns={["Name", "Origin", "Status", "Species", "Gender"]} 
          rows={[["Morty", "Earth", "Alive", "Human", "Male"]]} 
        />
      </div>
      <Pagination count={10} page={page} onChange={onPageChange} />
    </main>
  )
}
