import TransformedForm from "@/components/TransformedForm";

const Remove = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-extrabold text-blue-950 mb-3">
          Object Remove
        </h1>
        <h3 className="text-slate-500">
          Identify and eliminate objects from images
        </h3>
      </div>
      <TransformedForm key={'remove'} type="remove" />
    </div>
  );
};

export default Remove;
