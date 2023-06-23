"use client";

import useSWR from "swr";
import Table, { row } from "./components/table/table";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination/Pagination";
import { CharacterColumns, serverUrl } from "./constants";
import fetcher from "./helpers/swr";
import { baseResponse, character, episode } from "./entities";
import { Parse } from "./helpers/parse";
import ModalComponent, { ModalData } from "./components/modal/modal";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pages, setPages] = useState<number>(1);
  const [rows, setRows] = useState<row[][]>([]);
  const [clickedRow, setClickedRow] = useState<row | null>(null);
  const [modalState, setModalState] = useState<ModalData>({
    isOpen: false,
    image: null,
    onClose: () => setModalState({ ...modalState, isOpen: false }),
    subtitle: [],
    title: null,
  });

  const { data, error, isLoading } = useSWR<baseResponse<character>, Error>(
    `${serverUrl}/character?page=${page}&name=${name}&gender=${gender}&status=${status}`,
    fetcher
  );

  useEffect(() => {
    if (!clickedRow) return;

    const openModal = async () => {
      try {
        let character: character | undefined = data?.results.find(
          (character) => character.id === clickedRow.id
        );
        let first = await fetch(character!.episode[0]);
        let last = await fetch(
          character!.episode[character!.episode.length - 1]
        );

        let firstName: episode = await first.json();
        let lastName: episode = await last.json();
        setModalState(
          Parse.characterToModalData(
            { ...character!, episode: [firstName.episode, lastName.episode] },
            () => setModalState({ ...modalState, isOpen: false })
          )
        );
      } catch (e) {
        console.error(e);
      }
    };

    openModal();
  }, [clickedRow]);

  useEffect(() => {

    if (error) {
      console.error("ERRRRORRR");
    }

    if (data?.info?.pages && pages !== data?.info?.pages) {
      setPages(data?.info.pages);
    }
    if (data?.results) {
      setRows(data.results.map((character) => Parse.characterToRow(character)));
    }
  }, [data, error]);

  const onPageChange = (_: any, index: number) => {
    setPage(index);
  };

  const onRowClick = (row: row) => {
    setClickedRow(row);
  };

  return (
    <main className="flex flex-col h-full items-center justify-between p-6">
      <div className="flex place-items-center">
        {error ? (
          "Error"
        ) : (
          <main className="flex flex-col">
            <Table
              width={80}
              height={70}
              imageSize={{ width: 50, height: 50 }}
              columns={CharacterColumns}
              rows={rows}
              isLoading={isLoading}
              search={{label: "Name", value: name, onChange: (query: string) => setName(query)}}
              onRowClick={(row) => onRowClick(row)}
            />
          </main>
        )}
      </div>
      <ModalComponent state={modalState}></ModalComponent>
      <Pagination count={pages} page={page} onChange={onPageChange} />
    </main>
  );
}
