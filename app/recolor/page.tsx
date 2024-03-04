import React from "react";
import TransformedForm from "@/components/TransformedForm";

export const Recolor = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-extrabold text-blue-950 mb-3">
          Object Recolor
        </h1>
        <h3 className="text-slate-500">
          Identify and recolor objects from the image
        </h3>
      </div>
      <TransformedForm key={"recolor"} type="recolor" />
    </div>
  );
};
export default Recolor;
