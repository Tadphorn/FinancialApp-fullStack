import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Item } from "./Form";

type Props = {
  items: Item[]; // Define the type for the 'items' property
};

export default function Summary({ items }: Props) {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const summary = () => {
    const amount = items.map((items) => parseInt(items.amount));
    setIncome(
      amount.filter((val) => val >= 0).reduce((total, val) => (total += val), 0)
    );
    setExpense(
      amount.filter((val) => val < 0).reduce((total, val) => (total += val), 0)
    );
  };
  useEffect(() => {
    summary();
  }, [items, income, expense]);
  return (
    <Card className="h-35 w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none text-green-500"
              >
                Income
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none  text-pink-500"
              >
                Expense
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none text-cyan-500"
              >
                Total
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-bold text-green-500 p-4"> {income} </td>
            <td className="font-bold text-pink-500 p-4"> {expense} </td>
            <td className="font-bold text-cyan-500 p-4"> {income + expense} </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
