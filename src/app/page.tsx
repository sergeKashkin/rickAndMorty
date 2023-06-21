"use client";

import useSWR from "swr";
import Table, { row } from "./components/table/table";
import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination/Pagination";
import { CharacterColumns, serverUrl } from "./constants";
import fetcher from "./helpers/swr";
import { baseResponse, character } from "./entities";
import { Parse } from "./helpers/parse";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [rows, setRows] = useState<row[][]>([]);

  const { data, error, isLoading } = useSWR<baseResponse<character>, Error>(
    `${serverUrl}/character?page=${page}`,
    fetcher
  );

  useEffect(() => {
    if (data?.info.pages && pages !== data?.info.pages) {
      setPages(data?.info.pages);
    }
    if (data?.results) {
      setRows(
        data.results.map(character => Parse.characterToRow(character))
      );
    }
  }, [data]);

  const onPageChange = (_: any, index: number) => {
    setPage(index);
  };

  return (
    <main className="flex flex-col h-full items-center justify-between p-6">
      <div className="flex place-items-center">
        {isLoading ? (
          "Is Loading"
        ) : (
          <Table
            width={"90vw"}
            height={"80vh"}
            imageSize={{width: 50, height: 50}}
            columns={CharacterColumns}
            rows={rows}
          />
        )}
      </div>
      <Pagination count={pages} page={page} onChange={onPageChange} />
    </main>
  );
}
