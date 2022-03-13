const allEmojis = [
  "😀",
  "😁",
  "😂",
  "😃",
  "😄",
  "😅",
  "😆",
  "😇",
  "😉",
  "😊",
  "😋",
  "😌",
  "😍",
  "😎",
  "😏",
  "😜",
  "😝",
  "😠",
  "😩",
  "😪",
  "😭",
  "😶",
  "😷",
  "👏",
  "👀",
  "👋",
  "👍",
  "👎",
  "👇",
  "👈",
  "👉",
  "🙈",
  "🐸",
  "🐳",
  "🔥",
  "🚀",
  "💻",
  "🔍",
  "🔎",
];

export const EmojiDropDown = ({ onSelectEmoji }: any) => {
  return (
    <span className="mr-2">
      <div className="relative">
        <div className="dropdown inline-block relative">
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="grid grid-cols-3 text-xs z-30 w-[105px] h-24 overflow-y-scroll pl-2 py-2 bg-white -top-1 dropdown-menu absolute right-0 hidden text-gray-700 shadow-lg rounded">
            {allEmojis.map((emoji, index) => (
              <span
                onClick={() => onSelectEmoji(emoji)}
                key={index}
                className="col-span-4 text-lg hover:bg-gray-200 rounded cursor-pointer whitespace-no-wrap"
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </span>
  );
};
