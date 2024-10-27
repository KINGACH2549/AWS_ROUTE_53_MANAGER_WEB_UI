import { SelectItem } from "@/components/ui/select";
export default function FilterItems({ items }) {
  const filterItems = items?.map((item, index) => {
    return (
      <>
        <SelectItem key={index} value={item.type}>
          {item.type}
        </SelectItem>
      </>
    );
  });
  return <>{filterItems}</>;
}
