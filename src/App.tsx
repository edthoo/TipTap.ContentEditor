import { TipTapEditor } from "./components/TipTapEditor/TipTapEditor";

function App() {
  return (
    <div className="bg-slate-950 w-screen h-screen">
      <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="text-white text-xl font-[500]">TipTap - Content Editor</div>
        <TipTapEditor />
      </div>
    </div>
  );
}

export default App;
