import { useState } from "react";
import {
  listDataHandler,
  newListAddHandler,
} from "../../controller/cardAndList";
import {
  listAndCardDrop,
  listDragEnd,
  listDragLeave,
  listDragOver,
  listDragStart,
} from "../../controller/dragAndDrop";
import { spaceValidation, stringValidation } from "../../controller/utils";
import { CardActoionDropDown } from "../dropdown/cardActionDropDown";
import { CardInput } from "../input/cardInput";
import { ListInput } from "../input/listInput";
import { CloseIcon, PencilIcon } from "../svgIcon";
import SingleCard from "./card";

export default function List() {
  const [newListInput, setNewListInput] = useState("");
  const [dataset, setDataset] = useState<any>([]);

  const [selectedCard, setSelectedCard] = useState<any>();
  const [selectedList, setSelectedList] = useState<any>();

  return (
    <>
      <div className="z-20 flex flex-row">
        {dataset?.map((item: any, index: number) => (
          <div
            key={index}
            data-index={index}
            data-item={item}
            onDragOver={(e) => listDragOver(e, selectedCard)}
            onDrop={(e) =>
              listAndCardDrop(
                e,
                selectedList,
                selectedCard,
                dataset,
                setDataset,
                setSelectedList,
                setSelectedCard
              )
            }
            draggable={item?.draggable}
            onDragStart={(e: any) => {
              listDragStart(e, item, index, setSelectedList);
            }}
            onDragEnd={(e: any) => {
              listDragEnd(e, item);
            }}
            onDragLeave={(e: any) => {
              listDragLeave(e, item);
            }}
            className="px-2 w-[300px] overflow-y-auto z-10"
          >
            <div className="font-bold grid grid-cols-12 items-center">
              {item?.renameListName ? (
                <>
                  <span
                    onClick={(e) => {
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
                    className="col-span-1"
                  >
                    <CloseIcon />
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

                  <span className="col-span-1">
                    <PencilIcon />
                  </span>
                </>
              ) : (
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
                    className="col-span-11 cursor-pointer"
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

            {/* All card goes here! */}
            {item?.list?.length > 0 ? (
              <SingleCard
                item={item}
                index={index}
                dataset={dataset}
                setDataset={setDataset}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            ) : null}

            {/* + New card text field */}
            <CardInput
              index={index}
              item={item}
              stringValidation={stringValidation}
              dataset={dataset}
              setDataset={setDataset}
            />
          </div>
        ))}

        {/* + New list text field */}
        <ListInput
          newListInput={newListInput}
          setNewListInput={setNewListInput}
          stringValidation={stringValidation}
          newListAddHandler={newListAddHandler}
          dataset={dataset}
          setDataset={setDataset}
        />
      </div>
    </>
  );
}
