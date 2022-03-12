import { useState } from "react";
import { CardActoionDropDown } from "../components/dropdown/cardActionDropDown";
import { CardLockUnlock } from "../components/dropdown/cardLockUnlock";
import { EmojiDropDown } from "../components/dropdown/emojiDropDown";
import {
  cardDataHandler,
  listDataHandler,
  newCardAddHandler,
  newListAddHandler,
} from "../controller/cardAndList";
import {
  demoCardMaker,
  spaceValidation,
  stringValidation,
} from "../controller/utils";

function Home() {
  const [newListInput, setNewListInput] = useState("");
  const [dataset, setDataset] = useState<any>([
    {
      id: 1,
      labelName: "Backlog Task",
      list: demoCardMaker(1, 5, "Backlog Task 🗑️"),
      newCardInput: "",
      renameListName: false,
    },
    {
      id: 2,
      labelName: "Doing ",
      list: demoCardMaker(2, 3, "Doing Task 👩‍🏭"),
      newCardInput: "",
      renameListName: false,
    },
    {
      id: 3,
      labelName: "Hello I'm Done ",
      list: demoCardMaker(3, 2, "Done Task 👏"),
      newCardInput: "",
      renameListName: false,
    },
  ]);
  const [selectedCard, setSelectedCard] = useState<any>();
  const [selectedList, setSelectedList] = useState<any>();

  const onDragStartCard = (e: any) => {
    console.log("Child Start", e);
    const index = e.target.attributes["data-index"].value;
    const nestedIndex = e.target.attributes["data-nestedindex"].value;

    e.currentTarget.parentElement.classList.add("border-2");
    e.currentTarget.parentElement.classList.add("border-slate-500");
    e.currentTarget.parentElement.classList.add("border-dashed");
    e.currentTarget.parentElement.classList.add("opacity-30");

    if (dataset[index].list[nestedIndex].draggable) {
      setSelectedCard({
        item: dataset[index].list[nestedIndex],
        prevLocation: { index, nestedIndex },
      });
    }
  };

  const onDragEndCard = (e: any) => {
    e.currentTarget.parentElement.classList.remove("border-2");
    e.currentTarget.parentElement.classList.remove("border-slate-500");
    e.currentTarget.parentElement.classList.remove("border-dashed");
    e.currentTarget.parentElement.classList.remove("opacity-30");
  };

  const onDragOverCard = (e: any) => {
    e.preventDefault();
    if (!selectedCard) {
      e.currentTarget.classList.add("border-2");
      e.currentTarget.classList.add("border-slate-500");
      e.currentTarget.classList.add("border-dashed");
    }
  };

  const onDropCard = (e: any) => {
    // console.log("Wrapper Drop", selectedCard?.item);
    e.preventDefault();
    e.currentTarget.classList.remove("border-2");
    e.currentTarget.classList.remove("border-slate-500");
    e.currentTarget.classList.remove("border-dashed");

    let dropIndex = e.target.attributes["data-index"] || null;

    if (selectedList?.prevLocation?.index >= 0 && !selectedCard?.prevLocation) {
      let right;
      let result;
      dropIndex = dropIndex?.value;

      let arr = [...dataset]?.filter(
        (_: any, i: number) => i !== +selectedList?.prevLocation?.index
      );

      if (+dropIndex === 0) {
        /* Insert At Beggening */
        arr.unshift(selectedList?.item);
        result = arr;
      } else if (+dropIndex === arr.length) {
        /* Insert At Last */
        arr.push(selectedList?.item);
        result = arr;
      } else {
        /* Insert At Anywhere */
        right = arr.splice(dropIndex, arr.length);
        result = [...arr, selectedList?.item, ...right];
      }

      setDataset(result);
      setSelectedList(null);
    } else {
      if (selectedCard?.prevLocation?.index === dropIndex?.value) {
        setSelectedCard(null);
        return;
      }

      if (selectedCard?.item && e.target.attributes["data-index"]) {
        const itemAlreayInList = dataset[dropIndex.value].list.some(
          (item: any) => item?.id === selectedCard?.item?.id
        );

        // console.log("itemAlreayInList", itemAlreayInList);
        if (itemAlreayInList) {
          return;
        }

        const index = e.target.attributes["data-index"].value;
        const copy = [...dataset];
        copy[index].list.push(selectedCard?.item);

        const filter = copy[selectedCard?.prevLocation.index].list.filter(
          (_: any, i: number) => i !== +selectedCard?.prevLocation.nestedIndex
        );
        copy[selectedCard?.prevLocation?.index].list = filter;

        setDataset(copy);
        setSelectedCard(null);
      }
    }
  };

  const nestedDrop = (e: any) => {
    if (!selectedCard) return;

    const { prevLocation, item } = selectedCard;
    const index = e.target.attributes["data-index"].value;
    const nestedIndex = e.target.attributes["data-nestedindex"].value;

    /* If card in current list */
    if (index === prevLocation.index) {
      const copy = [...dataset];
      const arr = copy[index].list?.filter(
        (_: any, i: number) => i !== +prevLocation?.nestedIndex
      );

      const right = arr.splice(nestedIndex, arr.length);
      const result = [...arr, item, ...right];
      copy[index].list = result;
      setDataset(copy);
      setSelectedCard(null);
    } else {
      console.log(
        "Called NEsted Worng!!",
        { index, nestedIndex },
        prevLocation
      );
      const copy = [...dataset];
      const arr = copy[index].list;

      let right;
      let result;

      if (+nestedIndex === 0) {
        /* Insert At Beggening */
        arr.unshift(item);
        result = arr;
      } else if (+nestedIndex + 1 === arr.length) {
        /* Insert At Last */
        arr.push(item);
        result = arr;
      } else {
        /* Insert At Anywhere */
        right = arr.splice(nestedIndex, arr.length);
        result = [...arr, item, ...right];
      }

      copy[index].list = result;
      const filter = copy[prevLocation.index].list.filter(
        (_: any, i: number) => i !== +prevLocation.nestedIndex
      );
      copy[prevLocation.index].list = filter;

      setDataset(copy);
      setSelectedCard(null);
    }

    e.currentTarget.parentElement.classList.remove("border-2");
    e.currentTarget.parentElement.classList.remove("border-slate-500");
    e.currentTarget.parentElement.classList.remove("border-dashed");
  };

  const nestedDragOver = (e: any) => {
    if (selectedCard) {
      e.currentTarget.parentElement.classList.add("border-2");
      e.currentTarget.parentElement.classList.add("border-slate-500");
      e.currentTarget.parentElement.classList.add("border-dashed");
    }
  };

  const nestedDragLeave = (e: any) => {
    e.currentTarget.parentElement.classList.remove("border-2");
    e.currentTarget.parentElement.classList.remove("border-slate-500");
    e.currentTarget.parentElement.classList.remove("border-dashed");
  };

  return (
    <div className="z-10 flex p-8 h-screen w-[100%] overflow-auto bg-gray-50">
      <div className="z-20 flex flex-row">
        {dataset?.map((item: any, index: number) => (
          <div
            key={index}
            data-index={index}
            onDragOver={onDragOverCard}
            onDrop={onDropCard}
            draggable
            onDragStart={(e: any) => {
              const nestedIndex = e.target.attributes["data-nestedindex"];
              setSelectedList({ item, prevLocation: { index } });
              if (!nestedIndex?.value) {
                e.currentTarget.classList.add("border-2");
                e.currentTarget.classList.add("border-slate-500");
                e.currentTarget.classList.add("border-dashed");
              }
            }}
            onDragEnd={(e: any) => {
              const nestedIndex = e.target.attributes["data-nestedindex"];

              if (!nestedIndex?.value) {
                e.currentTarget.classList.remove("border-2");
                e.currentTarget.classList.remove("border-slate-500");
                e.currentTarget.classList.remove("border-dashed");
              }
            }}
            onDragLeave={(e: any) => {
              const nestedIndex = e.target.attributes["data-nestedindex"];
              if (!nestedIndex?.value) {
                e.currentTarget.classList.remove("border-2");
                e.currentTarget.classList.remove("border-slate-500");
                e.currentTarget.classList.remove("border-dashed");
              }
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
                    <svg
                      className="w-6 h-6 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
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

            {item?.list?.length > 0 ? (
              <div className="mt-4 bg-gray-100 rounded-lg py-1 px-3 z-30">
                {item.list?.map((nestedItem: any, nestedIndex: number) => (
                  <div
                    key={nestedIndex}
                    className="grid my-3 grid-cols-12 bg-white items-center rounded px-2"
                  >
                    <div className="col-span-1">
                      {nestedItem?.isEditable ? (
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
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
                        draggable={nestedItem.draggable}
                        onDragStart={onDragStartCard}
                        onDragEnd={onDragEndCard}
                        onDragOver={nestedDragOver}
                        onDrop={nestedDrop}
                        onDragLeave={nestedDragLeave}
                        onDoubleClick={() => {
                          cardDataHandler(
                            dataset,
                            setDataset,
                            "isEditable",
                            true,
                            index,
                            nestedIndex
                          );
                        }}
                        className="col-span-10 flex py-4 justify-between text-sm rounded cursor-pointer"
                      >
                        {nestedItem?.name}
                      </div>
                    )}

                    <div className="col-span-1">
                      <CardActoionDropDown
                        dataset={dataset}
                        setDataset={setDataset}
                        nestedItem={nestedItem}
                        index={index}
                        nestedIndex={nestedIndex}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* New Card Added text form */}
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

                <EmojiDropDown />
              </>
            </div>
          </div>
        ))}

        {/* List Add Text Form */}
        <div className="px-2 w-[300px] overflow-y-auto">
          <div className="font-bold flex items-start">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
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

            <EmojiDropDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
