export interface cardInterface {
  id: string | number;
  name: string;
  draggable: boolean;
  isEditable: boolean;
}

export interface datasetInterface {
  id: number | string;
  labelName: string;
  list: Array<cardInterface>;
  newCardInput: string | number;
  renameListName: boolean | null;
}
