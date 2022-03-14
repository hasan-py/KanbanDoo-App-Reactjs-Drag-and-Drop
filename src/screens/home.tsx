import List from "../components/cardAndList/_list";
import { HeaderAndFooter } from "../components/layout/headerAndFooter";

function Home() {
  return (
    <div className="z-10 select-none flex px-8 py-16 h-screen w-[100%] overflow-auto bg-gray-50">
      <HeaderAndFooter />
      <List />
    </div>
  );
}

export default Home;
