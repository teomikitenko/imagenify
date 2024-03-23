import { authMiddleware } from "@clerk/nextjs";

  export default authMiddleware({
    publicRoutes: ['/',"/api/webhooks(.*)"],
    beforeAuth:(req)=>console.log(req),
    afterAuth:(req)=>console.log(req)
});  

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/","/(api|trpc)(.*)"],
  };