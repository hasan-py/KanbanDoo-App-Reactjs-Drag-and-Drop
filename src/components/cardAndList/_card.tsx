import { cardDataHandler } from "../../controller/cardAndList";
import {
  singleCardDragEnd,
  singleCardDragLeave,
  singleCardDragOver,
  singleCardDragStart,
  singleCardDrop,
} from "../../controller/dragAndDrop";
import { spaceValidation, stringValidation } from "../../controller/utils";
import { CardActoionDropDown } from "../dropdown/cardActionDropDown";
import { CardLockUnlock } from "../dropdown/cardLockUnlock";
import { EmojiDropDown } from "../dropdown/emojiDropDown";
import { ApproveIcon } from "../svgIcon";

export default function SingleCard({
  item,
  index,
  dataset,
  setDataset,
  selectedCard,
  setSelectedCard,
}: any) {
  return (
    <>
      <div className="mt-4 bg-gray-100 rounded-lg py-1 px-3 z-30">
        {item.list?.map((nestedItem: any, nestedIndex: number) => (
          <div
            key={nestedIndex}
            className="grid my-2 grid-cols-12 bg-white items-center rounded px-2"
          >
            <div className="col-span-1">
              {nestedItem?.isEditable ? (
                <span
                  onClick={() => {
                    if (spaceValidation(nestedItem?.name)) {
                      cardDataHandler(
                        dataset,
                        setDataset,
                        "isEditable",
                        false,
                        index,
                        nestedIndex
                      );
                    }
                  }}
                  className="col-span-1 cursor-pointer"
                >
                  <ApproveIcon />
                </span>
              ) : (
                <CardLockUnlock
                  dataset={dataset}
                  setDataset={setDataset}
                  nestedItem={nestedItem}
                  index={index}
                  nestedIndex={nestedIndex}
                />
              )}
            </div>

            {nestedItem?.isEditable ? (
              <>
                <input
                  type="text"
                  name="newCardInput"
                  value={nestedItem?.name}
                  placeholder="Add new card"
                  onChange={(e) =>
                    cardDataHandler(
                      dataset,
                      setDataset,
                      "name",
                      e.target.value,
                      index,
                      nestedIndex
                    )
                  }
                  onKeyPress={(e: any) => {
                    if (stringValidation(e)) {
                      cardDataHandler(
                        dataset,
                        setDataset,
                        "isEditable",
                        false,
                        index,
                        nestedIndex
                      );
                    }
                  }}
                  className="col-span-10 focus:outline-none py-4 px-1 text-sm"
                />

                <EmojiDropDown
                  onSelectEmoji={(emoji: string) => {
                    cardDataHandler(
                      dataset,
                      setDataset,
                      "name",
                      `${nestedItem?.name}${emoji}`,
                      index,
                      nestedIndex
                    );
                  }}
                />
              </>
            ) : (
              <div
                title={
                  !nestedItem.draggable
                    ? "Unlock first to drag"
                    : "Double click to rename"
                }
                data-index={index}
                data-nestedindex={nestedIndex}
                key={nestedIndex}
                draggable={nestedItem?.draggable}
                onDragStart={(e) =>
                  singleCardDragStart(e, dataset, setSelectedCard)
                }
                onDragEnd={singleCardDragEnd}
                onDragOver={(e) => singleCardDragOver(e, selectedCard)}
                onDrop={(e) =>
                  singleCardDrop(
                    e,
                    setSelectedCard,
                    dataset,
                    setDataset,
                    selectedCard
                  )
                }
                onDragLeave={singleCardDragLeave}
                onDoubleClick={() => {
                  if (nestedItem?.draggable) {
                    cardDataHandler(
                      dataset,
                      setDataset,
                      "isEditable",
                      true,
                      index,
                      nestedIndex
                    );
                  } else {
                    alert("Please unlocked the card first 🔓🔓");
                  }
                }}
                className="break-all col-span-10 flex py-4 justify-between text-sm rounded cursor-pointer"
              >
                {nestedItem?.name}
              </div>
            )}

            {nestedItem?.draggable && !nestedItem?.isEditable ? (
              <div className="col-span-1">
                <CardActoionDropDown
                  dataset={dataset}
                  setDataset={setDataset}
                  nestedItem={nestedItem}
                  index={index}
                  nestedIndex={nestedIndex}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
