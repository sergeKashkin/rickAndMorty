import { ModalData } from "../components/modal/modal";
import { row } from "../components/table/table";
import { character } from "../entities";

export class Parse {
    public static characterToRow = (character: character): row[] => {
      return [
        { id: character.id, isImage: true, value: character.image },
        { id: character.id, isImage: false, value: character.name },
        { id: character.id, isImage: false, value: character.origin.name },
        { id: character.id, isImage: false, value: character.status },
        { id: character.id, isImage: false, value: character.species },
        { id: character.id, isImage: false, value: character.gender },
      ];
    };

    public static characterToModalData = (character: character, onClose: Function): ModalData => {
      return {
        image: character.image,
        isOpen: true,
        onClose,
        title: character.name,
        subtitle: [`First time appeared ${character.episode[0]}`, `Last time appeared ${character.episode[character.episode.length - 1]}`]
      }
    }
}
