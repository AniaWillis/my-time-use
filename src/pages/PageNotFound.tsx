import { Frown } from "lucide-react";

function PageNotFound() {
  return (
    <div className="w-screen h-screen flex gap-4 justify-center pt-[25%]">
      <div>
        <Frown className="size-10 text-cyan-600" />
      </div>
      <h1 className="text-center font-body text-cyan-600 font-bold text-3xl sm:text-4xl">
        Page Not Found (404)
      </h1>
    </div>
  );
}

export default PageNotFound;
