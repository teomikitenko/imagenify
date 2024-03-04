import TransformedForm from "@/components/TransformedForm";

export const Fill = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-extrabold text-blue-950 mb-3">
          Generative Fill
        </h1>
        <h3 className="text-slate-500">
          Enhance an image's dimensions using AI outpainting
        </h3>
      </div>
      <TransformedForm key={'aspectRatio'} type="aspectRatio"/>
    </div>
  );
};

export default Fill;
