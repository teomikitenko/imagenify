import { LoadingFormTwoInput } from "@/components/Loading"
import TransformedFormWrapper from "@/components/wrappers/TransformedFormWrapper"
import { Suspense } from "react"

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
    <Suspense fallback={<LoadingFormTwoInput/>}>
          <TransformedFormWrapper type='replace'/>
        </Suspense> 
  </div>
  )
}

export default Replace