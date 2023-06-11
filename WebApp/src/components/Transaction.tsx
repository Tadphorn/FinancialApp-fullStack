import { Item } from "@/components/Form";
import ItemComp from "./ItemComp";
import { Card, Typography } from "@material-tailwind/react";

type Props = {
  items: Item[]; // Define the type for the 'items' property
};

export default function Transaction({ items }: Props) {
  return (
    <Card className="overflow-y-auto hometb">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none "
              >
                Menu
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none"
              >
                Genres
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none"
              >
                Price
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((element, index) => {
            return <ItemComp {...element} key={index} />;
          })}
        </tbody>
      </table>
    </Card>
  );
}
