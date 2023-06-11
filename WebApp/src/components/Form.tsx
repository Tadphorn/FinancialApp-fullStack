//tsrfc
import React, { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrans } from "../api/transaction";
import { stringify } from "querystring";

export type Item = {
  id: number
  title: string;
  amount: string;
  genres: string;
  // Define other properties of Item
};

type Props = {};

export default function Form({}: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const inputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const queryClient = useQueryClient();
  const createTransMutation = useMutation({
    mutationFn: createTrans,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const saveItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const itemData = {
      title: title,
      amount: parseInt(amount),
      genres: genres,
    };
    createTransMutation.mutate({
      ...itemData,
    });
    // onAddItem(itemData);
    setTitle("");
    setAmount("");
  };

  //genres selected
  const [genres, setGenres] = useState<string>("Food");

  return (
    <div className="">
      <form className="flex w-max gap-8" onSubmit={saveItem}>
        <div className="form-control flex flex-col space-y-3">
          <label className="text-xl ">ชื่อรายการ</label>
          <Input
            size="lg"
            label="ระบุชื่อรายการ"
            type="text"
            onChange={inputTitle}
            value={title}
          />
        </div>
        <div className="form-control flex flex-col space-y-3">
          <label className="text-xl">จำนวนเงิน</label>
          <Input
            size="lg"
            label="ระบุจำนวนเงิน"
            type="number"
            onChange={inputAmount}
            value={amount}
          />
        </div>
        <div className=" form-control flex flex-col space-y-3">
          <label className="text-xl">หมวดหมู่</label>
          <Select
            size="lg"
            label="หมวดหมู่"
            value={genres}
            onChange={(e: any) => {
              setGenres(e);
            }}
          >
            <Option value="Income">Income</Option>
            <Option value="Personal care">Personal care</Option>
            <Option value="Housing">Housing</Option>
            <Option value="Food">Food</Option>
            <Option value="Transportation">Transportation</Option>
            <Option value="Education">Education</Option>
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Debt payments">Debt payments</Option>
            <Option value="Other">Other...</Option>
          </Select>
          {/* <p>Selected value: {genres}</p> */}
        </div>

        <div className="pt-9">
          <Button size="lg" type="submit" className="btn" disabled={!title}>
            บันทึก
          </Button>
        </div>
      </form>
    </div>
  );
}
