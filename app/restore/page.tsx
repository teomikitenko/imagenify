import React from "react";
import TransformedForm from "@/components/TransformedForm";

const Restore = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-extrabold text-blue-950 mb-3">Restore Image</h1>
        <h3 className="text-slate-500">Refine images by removing noise and imperfections</h3>
      </div>
      <TransformedForm type='restore'/>
    </div>
  );
};

export default Restore;
