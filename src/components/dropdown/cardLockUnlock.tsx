import { cardDataHandler } from "../../controller/cardAndList";
import { LockIcon, UnlockIcon } from "../svgIcon";

export const CardLockUnlock = ({
  dataset,
  setDataset,
  nestedItem,
  index,
  nestedIndex,
}: any) => {
  return (
    <span
      onClick={() => {
        cardDataHandler(
          dataset,
          setDataset,
          "draggable",
          !nestedItem?.draggable,
          index,
          nestedIndex
        );
      }}
      className="cursor-pointer"
    >
      {nestedItem.draggable ? <UnlockIcon /> : <LockIcon />}
    </span>
  );
};
