import React, { useState } from "react";

function App() {
  const [dataset, setDataset] = useState<any>([
    {
      labelName: "Task List",
      list: [
        {
          name: "Pagination Ui",
          isLocked: false,
        },
        {
          name: "Pagination Functionality",
          isLocked: false,
        },
        {
          name: "Infinity Scroll",
          isLocked: false,
        },
        {
          name: "Printer Print",
          isLocked: false,
        },
      ],
    },
    {
      labelName: "Doing",
      list: [
        {
          name: "From Validation",
          isLocked: false,
        },
      ],
    },
    {
      labelName: "Done",
      list: [
        {
          name: "Survey Order create",
          isLocked: false,
        },
      ],
    },
    {
      labelName: "Others",
      list: [],
    },
    {
      labelName: "New Others",
      list: [],
    },
    {
      labelName: "OOOO",
      list: [],
    },
  ]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const onDragStartCard = (e: any) => {
    console.log("DragStart has been triggered");

    const index = e.target.attributes["data-index"].value;
    const nestedIndex = e.target.attributes["data-nestedindex"].value;

    setTimeout(() => {
      const copy = [...dataset];
      const mapData = copy[index]?.list?.filter(
        (_: any, i: number) => i !== +nestedIndex
      );

      copy[index] = { ...copy[index], list: mapData };
      setDataset(copy);
      console.log("COPY", copy);
      setSelectedItem({
        item: dataset[index].list[nestedIndex],
        prevLocation: { index, nestedIndex },
      });
    }, 0);
  };
  const onDragEndCard = (e: any) => {
    console.log("onDragEndCard --- has been triggered");
  };

  const onDragOverCard = (e: any) => {
    e.preventDefault();
    console.log("onDragOverCard has been triggered");

    e.target.classList.add("bg-green-100");
  };
  const onDragEnterCard = (e: any) => {
    console.log("onDragEnterCard has been triggered");
  };
  const onDragLeaveCard = (e: any) => {
    console.log("onDragLeaveCard has been triggered");
    e.target.classList.remove("bg-green-100");
  };
  const onDropCard = (e: any) => {
    console.log("onDropCard has been triggered");

    if (selectedItem?.item) {
      const index = e.target.attributes["data-index"].value;
      setTimeout(() => {
        const copy = [...dataset];
        copy[index].list.push(selectedItem?.item);
        setDataset(copy);
        console.log("COPY", copy);
        setSelectedItem(null);
      }, 0);
    }

    console.log(selectedItem, "Dropeed");
  };

  return (
    <div
      className="flex p-8 h-screen w-[100%] overflow-auto bg-gray-50"
      onDrop={(e) => {
        const { item, prevLocation } = selectedItem;
        if (item) {
          const copy = [...dataset];
          let index = prevLocation?.index;

          copy.push(copy[index].list.push(selectedItem?.item));
          setDataset(copy);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        console.log("BODY============");
      }}
    >
      <div className="flex flex-row">
        {dataset?.map((item: any, index: number) => (
          <div
            key={index}
            data-index={index}
            onDragOver={onDragOverCard}
            onDragEnter={onDragEnterCard}
            onDragLeave={onDragLeaveCard}
            onDrop={onDropCard}
            draggable={false}
            className="px-4 py-2 bg-white mx-4 shadow-lg rounded min-w-[300px] h-[400px] overflow-y-auto"
          >
            <div
              onDrop={(e) => {}}
              onDragStart={(e) => {}}
              draggable={false}
              className="border-b pb-1 mb-8"
            >
              {item?.labelName}
            </div>

            {item.list?.map((nestedItem: any, nestedIndex: number) => (
              <div
                key={nestedIndex}
                data-index={index}
                data-nestedindex={nestedIndex}
                draggable
                onDragStart={onDragStartCard}
                onDragEnd={onDragEndCard}
                className="bg-gray-50 my-4 p-4 rounded shadow-lg"
              >
                {nestedItem?.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
