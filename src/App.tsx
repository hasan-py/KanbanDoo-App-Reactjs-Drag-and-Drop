import React, { useState } from "react";

function App() {
  const [dataset, setDataset] = useState<any>([
    {
      id: 1,
      labelName: "Task List",
      list: [
        {
          id: 1,
          name: "Pagination Ui",
          isLocked: false,
        },
        {
          id: 2,
          name: "Pagination Functionality",
          isLocked: false,
        },
        {
          id: 3,
          name: "Infinity Scroll",
          isLocked: false,
        },
        {
          id: 4,
          name: "Printer Print",
          isLocked: false,
        },
      ],
    },
    {
      id: 2,
      labelName: "Doing",
      list: [
        {
          id: 1,
          name: "From Validation",
          isLocked: false,
        },
      ],
    },
    {
      id: 3,
      labelName: "Done",
      list: [
        {
          id: 1,
          name: "Survey Order create JASF KAGS asg asg as gas gas",
          isLocked: false,
        },
      ],
    },
    // {
    //   id: 4,
    //   labelName: "Others",
    //   list: [],
    // },
    // {
    //   id: 5,
    //   labelName: "New Others",
    //   list: [],
    // },
    // {
    //   id: 6,
    //   labelName: "OOOO",
    //   list: [],
    // },
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

  const onDragEnterCard = (e: any) => {
    const index = e.target.attributes["data-index"].value;
    const nestedIndex = e.target.attributes["data-nestedindex"].value;

    const { prevLocation, item } = selectedItem;

    console.log("Current", index, nestedIndex);
    console.log("Prev", prevLocation?.index, prevLocation?.nestedIndex);

    if (nestedIndex !== prevLocation?.nestedIndex) {
      const copy = [...dataset];
      const arrList = copy[index].list;
      const temp = arrList[nestedIndex];
      arrList[prevLocation?.nestedIndex] = temp;
      arrList[nestedIndex] = item;
      setDataset(copy);
    }
  };

  const onDropCard = (e: any) => {
    e.preventDefault();
    const dropIndex = e.target.attributes["data-index"] || null;

    if (selectedItem?.prevLocation?.index === dropIndex?.value) {
      setSelectedItem(null);
      return;
    }

    if (selectedItem?.item && e.target.attributes["data-index"]) {
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

    // console.log(selectedItem, "Dropeed");
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
                    onDragLeave={onDragEnterCard}
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
