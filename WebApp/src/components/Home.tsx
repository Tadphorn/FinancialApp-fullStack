import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrans } from "../api/transaction";
import React from "react";
import Transaction from "./Transaction";
import Summary from "./Summary";
import Form from "./Form";
import { Link } from "react-router-dom";
import GenReport from "./GenReport";

type Props = {};

export default function Home({}: Props) {
  const {
    data: moneys,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTrans,
  });

  if (isLoading)
    return (
      <div className="main grid justify-items-center">
        <Spinner className="h-12 w-12" />
      </div>
    );
  if (error instanceof Error) return <div>`Error: ${error.message}`</div>;

  return (
    <div className="main">
      <h1 className="text-5xl p-10">Income-Expense App</h1>
      <Form />
      <div className="pt-10 pb-10">
        <Transaction items={moneys} />
      </div>
      <Summary items={moneys}></Summary>
    </div>
  );
}
