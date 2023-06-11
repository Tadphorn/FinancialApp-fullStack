import { Select, Typography, Option, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTrans, updateTrans } from "../api/transaction";
import IconTrash from "../assets/trash-can-regular.svg";
import IconEdit from "../assets/edit-solid.svg";

type Props = {
  id: number;
  title: string;
  amount: string;
  genres: string;
};

export default function ItemComp({ id, title, amount, genres }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateAmount, setUpdateAmount] = useState(amount);
  const [updateGen, setUpdateGen] = useState(genres);

  const queryClient = useQueryClient();

  //edit Transaction
  const updateTransMutation = useMutation({
    mutationFn: updateTrans,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const edit = () => {
    console.log(updateGen);

    if (editMode) {
      updateTransMutation.mutate({ id, updateTitle, updateAmount, updateGen });
    }
    setEditMode(!editMode);
  };

  //delete Transaction
  const deleteTransMutation = useMutation({
    mutationFn: removeTrans,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const deleteTrans = () => {
    console.log(id);
    deleteTransMutation.mutate(id);
  };
  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="p-4">
        {editMode ? (
          <Input
            className="w-4/5 bg-gray-200"
            type="text"
            onChange={(e) => setUpdateTitle(e.target.value)}
            value={updateTitle}
          />
        ) : (
          <Typography variant="small" color="blue-gray" className="font-bold">
            {title}
          </Typography>
        )}
      </td>
      <td className="p-4">
        {editMode ? (
          <Select
            size="md"
            value={updateGen}
            onChange={(e: any) => {
              setUpdateGen(e);
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
        ) : (
          <Typography variant="small" color="blue-gray" className="font-bold">
            {genres}
          </Typography>
        )}
      </td>
      <td className="p-4">
        {editMode ? (
          <Input
            className="w-4/5"
            type="number"
            onChange={(e) => setUpdateAmount(e.target.value)}
            value={updateAmount}
          />
        ) : (
          <Typography variant="small" color="blue-gray" className="font-bold">
            {amount}
          </Typography>
        )}
      </td>
      <td className="p-4">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue"
          className="font-medium"
          onClick={() => edit()}
        >
          {!editMode ? <img src={IconEdit} className="w-5 h-5"></img> : "Save"}
        </Typography>
      </td>
      <td className="p-4">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue"
          className="font-medium"
          onClick={() => deleteTrans()}
        >
          <img src={IconTrash} className="w-5 h-5"></img>
        </Typography>
      </td>
    </tr>
  );
}
