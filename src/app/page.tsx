"use client";

import useSWR from "swr";
import Table, { row, tableFilter } from "./components/table/table";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination/Pagination";
import {
  CharacterColumns,
  CharacterFilters,
  Strings,
  serverUrl,
} from "./constants";
import fetcher from "./helpers/swr";
import { baseResponse, character, episode } from "./entities";
import { Parse } from "./helpers/parse";
import ModalComponent, { ModalData } from "./components/modal/modal";

export default function Home() {
  let filters: tableFilter[] = CharacterFilters;
  filters[0].onChange = (val: string) =>
    setGender(val === gender ? "" : val || "");
  filters[1].onChange = (val: string) =>
    setStatus(val === status ? "" : val || "");

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
    filters[0].chips.forEach(
      (chip) => (chip.isSelected = gender === chip.value)
    );
    filters[1].chips.forEach(
      (chip) => (chip.isSelected = status === chip.value)
    );
    setPage(1);
  }, [gender, status]);

  useEffect(() => {
    if (data?.info?.pages && pages !== data?.info?.pages) {
      setPages(data?.info.pages);
    }
    if (data?.results) {
      setRows(data.results.map((character) => Parse.characterToRow(character)));
    }
  }, [data]);

  const onPageChange = (_: any, index: number) => {
    setPage(index);
  };

  const onRowClick = (row: row) => {
    setClickedRow(row);
  };

  return (
    <main className="flex flex-col max-sm:p-0 h-full items-center justify-between p-6">
      <div className="flex place-items-center">
        <main className="flex flex-col">
          <h1 className="mb-4 w-full text-2xl max-sm:pt-4 max-sm:px-2 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl">
            The{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Ultimate Guide
            </span>{" "}
            to Dimension-Hopping Adventures!
          </h1>
          <p className="text-lg lg:pb-2 font-normal max-sm:hidden text-black-500 lg:text-xl dark:text-gray-400">
            Enter the wild universe of Rick and Morty, where eccentricity,
            interdimensional travel, and hilarious chaos collide.{" "}
          </p>

          <Table
            width={90}
            height={55}
            imageSize={{ width: 50, height: 50 }}
            columns={CharacterColumns}
            rows={rows}
            isLoading={isLoading}
            search={{
              label: Strings.Name,
              value: name,
              onChange: (query: string) => {
                setPage(1); 
                setTimeout(() =>setName(query))
              },
            }}
            onRowClick={(row) => onRowClick(row)}
            noData={Boolean(error)}
            filters={filters}
          />
        </main>
      </div>
      <ModalComponent state={modalState}></ModalComponent>
      {error ? (
        ""
      ) : (
        <footer className="max-sm:pt-16 pt-4">
          <Pagination count={pages} page={page} color="primary" onChange={onPageChange} />
        </footer>
      )}
    </main>
  );
}
