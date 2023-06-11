import axios from "axios";

export async function fetchTrans() {
  const response = await axios.get("http://localhost:3000/money");
  return response.data;
}

export async function createTrans(newTrans: any) {
  console.log(newTrans.genres);
  const response = await axios.post(`http://localhost:3000/money`, {
    id: newTrans.id,
    title: newTrans.title,
    amount: newTrans.amount,
    genres: newTrans.genres,
  });
  return response.data;
}

export async function updateTrans(updatedTrans: any) {
  const response = await axios.patch(
    `http://localhost:3000/money/${updatedTrans.id}`,
    {
      id: updatedTrans.id,
      title: updatedTrans.updateTitle,
      amount: parseInt(updatedTrans.updateAmount),
      genres: updatedTrans.updateGen,
    }
  );
  return response.data;
}

export async function removeTrans(id: number | undefined) {
  const response = await axios.delete(
    `http://localhost:3000/money/${id}`
  );
  return response.data;
}
