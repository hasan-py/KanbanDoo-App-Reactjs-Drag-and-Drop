import { spaceValidation } from "../../controller/utils";
import { EmojiDropDown } from "../dropdown/emojiDropDown";
import { AddIconCircle, ClipboardIcon } from "../svgIcon";

export function ListInput({
  newListInput,
  setNewListInput,
  stringValidation,
  newListAddHandler,
  dataset,
  setDataset,
}: any) {
  return (
    <>
      <div className="px-2 w-[300px] overflow-y-auto">
        <div className="font-bold flex items-start">
          <span>
            <ClipboardIcon />
          </span>

          <input
            type="text"
            name="newListInput"
            value={newListInput}
            onChange={(e) => setNewListInput(e.target.value)}
            onKeyPress={(e: any) => {
              if (stringValidation(e)) {
                newListAddHandler(
                  dataset,
                  setDataset,
                  e.target.value,
                  setNewListInput
                );
              }
            }}
            placeholder="Add new list"
            className="w-11/12 focus:outline-none px-1 bg-gray-50 text-sm"
          />

          <span
            onClick={() => {
              if (spaceValidation(newListInput)) {
                newListAddHandler(
                  dataset,
                  setDataset,
                  newListInput,
                  setNewListInput
                );
              }
            }}
            className="mx-1 cursor-pointer"
          >
            <AddIconCircle />
          </span>

          <EmojiDropDown
            onSelectEmoji={(emoji: string) => {
              setNewListInput(`${newListInput}${emoji}`);
            }}
          />
        </div>
      </div>
    </>
  );
}
