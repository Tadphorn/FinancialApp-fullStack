import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrans } from "../api/transaction";
import React, { useEffect, useRef, useState } from "react";
import { Chart, initTE } from "tw-elements";
import { Item } from "./Form";

type Props = {};
export default function GenReport({}: Props) {
  const useTrans = () =>
    useQuery({
      queryKey: ["transactions"],
      queryFn: fetchTrans,
    });
  const { data, isLoading, error } = useTrans();

  const color = [
    "rgba(63, 81, 181, 0.5)",
    "rgba(77, 182, 172, 0.5)",
    "rgb(255, 171, 171)",
    "rgba(66, 133, 244, 0.5)",
    "rgba(156, 39, 176, 0.5)",
    "rgba(233, 30, 99, 0.5)",
    "#FFD966",
    "rgba(66, 73, 244, 0.4)",
    "rgba(66, 133, 244, 0.2)",
  ];

  const genInfo = [
    "Income",
    "Personal care",
    "Housing",
    "Food",
    "Transportation",
    "Education",
    "Entertainment",
    "Debt payments",
    "Other",
  ];
  const [showPay, setShowPay] = useState<number[]>([]);
  const allPayment: number[] = [];
  const report = () => {
    genInfo.map((gen: string) => {
      const price: number = data
        ?.filter((item: { genres: string }) => item.genres === gen)
        .reduce(
          (total: number, item: { amount: string }) =>
            (total += parseInt(item.amount)),
          0
        );
      allPayment.push(price);
    });
    if (showPay.length != 9) {
      setShowPay(allPayment);
    }

    console.log("allpayment", allPayment);
    console.log("showPay", showPay);
  };

  useEffect(() => {
    if (!isLoading) {
      report();
    }
    if (showPay.length === 9) {
      initTE({ Chart });
    }
  }, [data, showPay]);

  if (isLoading) {
    return <div className="main grid justify-items-center">loading....</div>;
  }
  if (error instanceof Error) {
    return <div>`Error: ${error.message}`</div>;
  }
  return (
    <div className="mx-auto w-2/5 overflow-hidden main pt-8">
      <h1 className="text-5xl pb-8">Report Income-Expense</h1>
      {/* <div>{JSON.stringify(allPayment)}</div> */}
      <canvas
        data-te-chart="doughnut"
        data-te-dataset-label="Traffic"
        data-te-labels={JSON.stringify(genInfo)}
        data-te-dataset-data={JSON.stringify(showPay)}
        data-te-dataset-background-color={JSON.stringify(color)}
      ></canvas>
    </div>
  );
}
