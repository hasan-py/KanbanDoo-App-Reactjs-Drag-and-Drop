import {
  listDataHandler,
  newCardAddHandler,
} from "../../controller/cardAndList";
import { spaceValidation } from "../../controller/utils";
import { EmojiDropDown } from "../dropdown/emojiDropDown";
import { AddIconCircle, CardAddIcon } from "../svgIcon";

export function CardInput({
  index,
  item,
  stringValidation,
  dataset,
  setDataset,
}: any) {
  return (
    <>
      <div className="flex items-start mt-3">
        <>
          <span>
            <CardAddIcon />
          </span>

          <input
            type="text"
            name="newCardInput"
            value={item?.newCardInput}
            placeholder="Add new card"
            onChange={(e) =>
              listDataHandler(
                dataset,
                setDataset,
                "newCardInput",
                e.target.value,
                index
              )
            }
            onKeyPress={(e: any) => {
              if (stringValidation(e)) {
                newCardAddHandler(dataset, setDataset, index);
              }
            }}
            className="w-11/12 focus:outline-none px-1 bg-gray-50 text-sm"
          />

          <span
            onClick={() => {
              if (spaceValidation(item?.newCardInput)) {
                newCardAddHandler(dataset, setDataset, index);
              }
            }}
            className="mx-1 cursor-pointer"
          >
            <AddIconCircle />
          </span>

          <EmojiDropDown
            onSelectEmoji={(emoji: string) => {
              listDataHandler(
                dataset,
                setDataset,
                "newCardInput",
                `${item?.newCardInput}${emoji}`,
                index
              );
            }}
          />
        </>
      </div>
    </>
  );
}
