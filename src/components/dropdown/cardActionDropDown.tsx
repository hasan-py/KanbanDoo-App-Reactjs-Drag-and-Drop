import { Remover } from "../../controller/cardAndList";

export const CardActoionDropDown = ({
  dataset,
  setDataset,
  // nestedItem,
  index,
  nestedIndex,
}: any) => {
  return (
    <span>
      <div className="relative">
        <div className="dropdown inline-block relative">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>

          <ul className="text-xs z-30 w-22 -top-1 dropdown-menu absolute right-0 hidden text-gray-700 shadow-lg rounded pt-1">
            {/* We can edit by dubble click */}
            {/* <li>
              <span
                onClick={() => {
                  if (nestedIndex && +nestedIndex >= 0) {
                    cardDataHandler(
                      dataset,
                      setDataset,
                      "isEditable",
                      true,
                      index,
                      nestedIndex
                    );
                  } else {
                    listDataHandler(
                      dataset,
                      setDataset,
                      "renameListName",
                      true,
                      index
                    );
                  }
                }}
                className="cursor-pointer rounded-t flex bg-white hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
              >
                Edit{" "}
                <svg
                  className="w-3 h-3 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li> */}
            <li>
              <span
                onClick={() => {
                  if (+nestedIndex >= 0) {
                    Remover(dataset, setDataset, index, nestedIndex);
                  } else {
                    Remover(dataset, setDataset, index, null);
                  }
                }}
                className="cursor-pointer rounded flex bg-white hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
              >
                Delete{" "}
                <svg
                  className="w-3 h-3 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </span>
  );
};
