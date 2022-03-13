import {
  listDataHandler,
  newCardAddHandler,
} from "../../controller/cardAndList";
import { EmojiDropDown } from "../dropdown/emojiDropDown";

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
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
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
