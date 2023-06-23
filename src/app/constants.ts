import { tableFilter } from "./components/table/table";

export const CharacterColumns: string[] = [
  "",
  "Name",
  "Origin",
  "Status",
  "Species",
  "Gender",
];

export const CharacterFilters: tableFilter[] = [
  {
    label: "Gender",
    chips: [
      { value: "Male", isSelected: false },
      { value: "Female", isSelected: false },
    ],
  },
  {
    label: "Status",
    chips: [
      { value: "Alive", isSelected: false },
      { value: "Dead", isSelected: false },
      { value: "unknown", isSelected: false },
    ],
  },
];

export const serverUrl: string = "https://rickandmortyapi.com/api";

export class Strings {
  public static Name: string = "Name";
}
