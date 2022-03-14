import { Remover } from "../../controller/cardAndList";
import { DeleteIcon, MoreIcon } from "../svgIcon";

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
          <MoreIcon />

          <ul className="text-xs z-30 w-22 -top-1 dropdown-menu absolute right-0 hidden text-gray-700 shadow-lg rounded pt-1">
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
                Delete <DeleteIcon />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </span>
  );
};
