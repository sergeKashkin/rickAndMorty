import { row } from "../components/table/table";
import { character } from "../entities";

export class Parse {
    public static characterToRow = (character: character): row[] => {
      return [
        { isImage: true, value: character.image },
        { isImage: false, value: character.name },
        { isImage: false, value: character.origin.name },
        { isImage: false, value: character.status },
        { isImage: false, value: character.species },
        { isImage: false, value: character.gender },
      ];
    };
}
