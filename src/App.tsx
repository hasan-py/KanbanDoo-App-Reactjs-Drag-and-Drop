import React, { useState } from "react";

const itemMaker = (listId: number, num: number, text: string) => {
  let result = [];
  for (let i = 1; i <= num; i++) {
    result.push({
      id: `${listId}-${i}`,
      name: `${text} ${i}`,
      isLocked: false,
    });
  }
  return result;
};

function App() {
  const [dataset, setDataset] = useState<any>([
    {
      id: 1,
      labelName: "Backlog Task",
      list: itemMaker(1, 5, "Backlog Task 🗑️"),
    },
    {
      id: 2,
      labelName: "Doing ",
      list: itemMaker(2, 3, "Doing Task 👩‍🏭"),
    },
    {
      id: 3,
      labelName: "Hello I'm Done ",
      list: itemMaker(3, 2, "Done Task 👏"),
    },
  ]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const onDragStartCard = (e: any) => {
    const index = e.target.attributes["data-index"].value;
    const nestedIndex = e.target.attributes["data-nestedindex"].value;

    e.currentTarget.classList.add("border-2");
    e.currentTarget.classList.add("border-blue-500");
    e.currentTarget.classList.add("border-dashed");
    e.currentTarget.classList.add("opacity-25");

    setSelectedItem({
      item: dataset[index].list[nestedIndex],
      prevLocation: { index, nestedIndex },
    });
  };

  const onDragEndCard = (e: any) => {
    e.currentTarget.classList.remove("border-2");
    e.currentTarget.classList.remove("border-blue-500");
    e.currentTarget.classList.remove("border-dashed");
    e.currentTarget.classList.remove("opacity-25");
  };

  const onDragOverCard = (e: any) => {
    e.preventDefault();
  };

  const onDropCard = (e: any) => {
    // console.log("Wrapper Drop", selectedItem?.item);
    e.preventDefault();

    const dropIndex = e.target.attributes["data-index"] || null;

    if (selectedItem?.prevLocation?.index === dropIndex?.value) {
      setSelectedItem(null);
      return;
    }

    if (selectedItem?.item && e.target.attributes["data-index"]) {
      const itemAlreayInList = dataset[dropIndex.value].list.some(
        (item: any) => item?.id === selectedItem?.item?.id
      );

      // console.log("itemAlreayInList", itemAlreayInList);
      if (itemAlreayInList) {
        return;
      }

      const index = e.target.attributes["data-index"].value;
      const copy = [...dataset];
      copy[index].list.push(selectedItem?.item);

      const filter = copy[selectedItem?.prevLocation.index].list.filter(
        (_: any, i: number) => i !== +selectedItem?.prevLocation.nestedIndex
      );
      copy[selectedItem?.prevLocation.index].list = filter;

      setDataset(copy);

      setSelectedItem(null);
    }
  };

  const nestedDrop = (e: any) => {
    // console.log("Nested Drop", selectedItem?.item);
    const { prevLocation, item } = selectedItem;
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
      setSelectedItem(null);
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
      setSelectedItem(null);
    }

    e.currentTarget.classList.remove("border-2");
    e.currentTarget.classList.remove("border-blue-500");
    e.currentTarget.classList.remove("border-dashed");
  };

  const nestedDragOver = (e: any) => {
    e.currentTarget.classList.add("border-2");
    e.currentTarget.classList.add("border-blue-500");
    e.currentTarget.classList.add("border-dashed");
  };

  const nestedDragLeave = (e: any) => {
    e.currentTarget.classList.remove("border-2");
    e.currentTarget.classList.remove("border-blue-500");
    e.currentTarget.classList.remove("border-dashed");
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
            className="px-2 w-[300px] overflow-y-auto"
          >
            <div className="font-bold">{item?.labelName}</div>

            {item.list?.length > 0 ? (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                {item.list?.map((nestedItem: any, nestedIndex: number) => (
                  <div
                    data-index={index}
                    key={nestedIndex}
                    data-nestedindex={nestedIndex}
                    draggable
                    onDragStart={onDragStartCard}
                    onDragEnd={onDragEndCard}
                    onDragOver={nestedDragOver}
                    onDrop={nestedDrop}
                    onDragLeave={nestedDragLeave}
                    className="bg-gray-50 my-2 text-sm px-3 py-4 rounded shadow-lg cursor-pointer"
                  >
                    {nestedItem?.name}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="grid grid-cols-12 mt-4">
              <>
                <input
                  placeholder="Add New Task"
                  className="col-span-8 py-2 px-3 focus:outline-none bg-gray-50"
                />

                <div className="col-span-4">
                  <span className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-1 cursor-pointer">
                    <svg
                      className="group-hover:text-blue-500 mb-1 text-slate-400"
                      width="20"
                      height="20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                    </svg>
                    Add
                  </span>
                </div>
              </>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
