import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import type { CardType } from "@/types/type";
import Image from "next/image";
import PlanIcon from "@/public/icons/free-plan.svg";
import Cross from "@/public/icons/cross.svg";
import Check from "@/public/icons/check.svg";
import { onCheckout } from "@/app/action";
import { currentUser } from "@clerk/nextjs";

const BuyCreditsCards = async ({ plansCard }: { plansCard: CardType }) => {
  const user = await currentUser();
  return (
    <div className="flex gap-2">
      {plansCard.map((c) => (
        <Card key={c.planName}>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <Image src={PlanIcon} width={50} height={50} alt="plan" />
              </div>
              <CardTitle className="text-center font-semibold text-indigo-600">{c.planName}</CardTitle>
              <CardTitle className="text-center text-blue-950 text-4xl dark:text-slate-400">{c.planPrice + "$"}</CardTitle>
              <CardDescription className="text-center">
                {c.creditsAmount + " " + "Credits"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col mt-3 gap-4">
            {c.planDetail.map((d) => (
              <div className="flex gap-3">
                {d[1] ? (
                  <Image src={Check} width={24} height={24} alt="check" />
                ) : (
                  <Image src={Cross} width={24} height={24} alt="cross" />
                )}
                <p className="text-slate-500">{d[0]}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="w-full">
            <form className="w-full"
              action={async () => {
                "use server";
                await onCheckout({
                  price: c.planPrice,
                  name: user?.lastName
                    ? user?.firstName + " " + user?.lastName
                    : user?.firstName,
                  plan_name: c.planName,
                });
              }}
            >
              <Button className={`${c.planName === "Free"?'bg-slate-100':'bg-purple-gradient'} rounded-3xl w-full`}>
                <p className={`${c.planName === "Free"?'text-indigo-600':'text-slate-200'}`} >
                  {c.planName === "Free" ? "Free Consumable" : "Buy Credit"}
                </p>
              </Button>
            </form>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BuyCreditsCards;
