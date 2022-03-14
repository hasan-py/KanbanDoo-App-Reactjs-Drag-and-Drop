import {
  listDataHandler,
  newCardAddHandler,
} from "../../controller/cardAndList";
import { EmojiDropDown } from "../dropdown/emojiDropDown";
import { CardAddIcon } from "../svgIcon";

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
          <span className="cursor-pointer">
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
