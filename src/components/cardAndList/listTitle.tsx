import { listDataHandler } from "../../controller/cardAndList";
import { spaceValidation, stringValidation } from "../../controller/utils";
import { CardActoionDropDown } from "../dropdown/cardActionDropDown";
import { EmojiDropDown } from "../dropdown/emojiDropDown";
import { ApproveIcon } from "../svgIcon";

export function ListTitle(props: any) {
  const { dataset, setDataset, item, index } = props;

  return (
    <div className="font-bold grid grid-cols-12 items-center">
      {/* When title is editable */}
      {item?.renameListName ? (
        <>
          <span
            onClick={() => {
              if (spaceValidation(item?.labelName)) {
                listDataHandler(
                  dataset,
                  setDataset,
                  "renameListName",
                  false,
                  index
                );
              }
            }}
            className="col-span-1 cursor-pointer"
          >
            <ApproveIcon />
          </span>

          <input
            type="text"
            name="newCardInput"
            value={item?.labelName}
            placeholder="Rename list"
            onChange={(e) =>
              listDataHandler(
                dataset,
                setDataset,
                "labelName",
                e.target.value,
                index
              )
            }
            onKeyPress={(e: any) => {
              if (stringValidation(e)) {
                listDataHandler(
                  dataset,
                  setDataset,
                  "renameListName",
                  false,
                  index
                );
              }
            }}
            className="col-span-10 focus:outline-none px-1 bg-gray-50 text-sm"
          />

          <span className="col-span-1 flex align-center">
            <EmojiDropDown
              onSelectEmoji={(emoji: string) => {
                listDataHandler(
                  dataset,
                  setDataset,
                  "labelName",
                  `${item?.labelName}${emoji}`,
                  index
                );
              }}
            />
          </span>
        </>
      ) : (
        /* When Title is not editable */
        <>
          <span
            title="Dubble click to rename"
            onDoubleClick={(e) => {
              listDataHandler(
                dataset,
                setDataset,
                "renameListName",
                true,
                index
              );
            }}
            className="break-all col-span-11 cursor-pointer"
          >
            {item?.labelName}
          </span>

          <span className="col-span-1 flex justify-end">
            <CardActoionDropDown
              dataset={dataset}
              setDataset={setDataset}
              nestedItem={item}
              index={index}
              nestedIndex={null}
            />
          </span>
        </>
      )}
    </div>
  );
}
