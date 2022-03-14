import { useState } from "react";
import { newListAddHandler } from "../../controller/cardAndList";
import {
  listAndCardDrop,
  listDragEnd,
  listDragLeave,
  listDragOver,
  listDragStart,
} from "../../controller/dragAndDrop";
import { stringValidation } from "../../controller/utils";
import { cardInterface, datasetInterface } from "../../types";
import { CardInput } from "../input/cardInput";
import { ListInput } from "../input/listInput";
import { ListTitle } from "./listTitle";
import SingleCard from "./_card";

export default function List() {
  const [newListInput, setNewListInput] = useState<String>("");
  const [dataset, setDataset] = useState<Array<datasetInterface> | []>([]);

  const [selectedCard, setSelectedCard] = useState<cardInterface | null>();
  const [selectedList, setSelectedList] = useState<datasetInterface | null>();

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
            {/* List Title */}
            <ListTitle
              dataset={dataset}
              setDataset={setDataset}
              item={item}
              index={index}
            />

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
