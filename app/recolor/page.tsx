import TransformedForm from "@/components/TransformedForm";



export const Recolor = () => {
  return (
    <div className="flex  flex-col gap-8">
      <div>
        <h1 className="responsive-text pt-11 lg:pt-0 font-extrabold text-blue-950 mb-3 dark:text-slate-200">
          Object Recolor
        </h1>
        <h3 className="text-slate-500 dark:text-slate-200">
          Identify and recolor objects from the image
        </h3>
      </div>
      <TransformedForm key={"recolor"} type="recolor" />
    </div>
  );
};
export default Recolor;
