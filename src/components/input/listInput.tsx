import { EmojiDropDown } from "../dropdown/emojiDropDown";

export function ListInput({
  newListInput,
  setNewListInput,
  stringValidation,
  newListAddHandler,
  dataset,
  setDataset,
}: any) {
  return (
    <>
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

          <EmojiDropDown
            onSelectEmoji={(emoji: string) => {
              setNewListInput(`${newListInput}${emoji}`);
            }}
          />
        </div>
      </div>
    </>
  );
}
