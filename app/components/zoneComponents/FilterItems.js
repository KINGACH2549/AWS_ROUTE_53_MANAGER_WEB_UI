import { SelectItem } from "@/components/ui/select";
export default function FilterItems({ items }) {
  const filterItems = items?.map((item) => {
    return (
      <>
        <SelectItem value={item.type}>{item.type}</SelectItem>
      </>
    );
  });
  return <>{filterItems}</>;
}
