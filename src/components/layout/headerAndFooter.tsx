export function HeaderAndFooter() {
  return (
    <>
      <div className="fixed top-0 w-full mt-2 text-center text-xl font-bold text-slate-700">
        📋 Kanban Board 📋
      </div>
      <div className="fixed bottom-0 w-full mb-4 text-center text-sm font-bold text-slate-500">
        Built with 💓 by{" "}
        <a className="underline" href="https://github.com/hasan-py">
          Hasan
        </a>
      </div>
    </>
  );
}
