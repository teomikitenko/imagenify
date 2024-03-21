import BuyCreditsCards from "@/components/BuyCredits";
import type { CardType } from "@/types/type";

const Credits = () => {
  const plansCard: CardType = [
    {
      planName: "Free",
      planPrice: 0,
      credits: 10,
      planDetail: [
        ["10 Credits", true],
        ["Basic Access to Services", true],
        ["Priority Customer Support", false],
        ["Priority Updates", false],
      ],
    },
    {
      planName: "Pro Package",
      planPrice: 59,
      credits: 100,
      planDetail: [
        ["100 Credits", true],
        ["Full Access to Services", true],
        ["Priority Customer Support", true],
        ["Priority Updates", false],
      ],
    },
    {
      planName: "Premium Package",
      planPrice: 499,
      credits: 499,
      planDetail: [
        ["10 Credits", true],
        ["Full Access to Services", true],
        ["Priority Customer Support", true],
        ["Priority Updates", true],
      ],
    },
  ];

  return (
    <div className="flex  flex-col gap-8">
      <div>
        <h1 className="responsive-text pt-11 lg:pt-0 font-extrabold text-blue-950 mb-3 dark:text-slate-200">
          Buy Credits
        </h1>
        <h3 className="text-slate-500 dark:text-slate-200">
          Choose a credit package that suits your needs!
        </h3>
      </div>
      <BuyCreditsCards plansCard={plansCard} />
    </div>
  );
};

export default Credits;
