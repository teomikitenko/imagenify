import TransformedForm from "@/components/TransformedForm"

const Replace = () => {
  return (
    <div className="flex flex-col gap-8">
    <div>
      <h1 className="responsive-text pt-11 lg:pt-0 font-extrabold text-blue-950 mb-3 dark:text-slate-200">
        Replace Image
      </h1> 
      <h3 className="text-slate-500 dark:text-slate-200">
      Transform images with seamless object replacement
      </h3>
    </div>
    <TransformedForm key={'replace'} type="replace"/>
  </div>
  )
}

export default Replace