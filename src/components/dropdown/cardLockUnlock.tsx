import React from "react";
import { cardDataHandler } from "../../controller/cardAndList";

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
      {nestedItem.draggable ? (
        <>
          <svg
            className="w-4 h-4 text-red-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
          </svg>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 text-red-300 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </>
      )}
    </span>
  );
};
