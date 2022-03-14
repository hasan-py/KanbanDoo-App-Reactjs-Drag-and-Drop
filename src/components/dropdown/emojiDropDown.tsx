import { EmojiIcon } from "../svgIcon";

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
          <EmojiIcon />
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
