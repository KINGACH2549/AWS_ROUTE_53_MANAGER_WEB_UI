import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterItems from "./FilterItems";
import { Button } from "@/components/ui/button";

export default function RecordSearch(props) {
  const { filters, setFilters, metaData, searchRecords } = props;
  const updateFilters = (key, value) => {
    const filter = { ...filters, [key]: value };
    searchRecords(filter);
    setFilters(filter);
  };

  return (
    <>
      <Input
        onChange={(e) => updateFilters("name", e.target.value)}
        placeholder="Search Record Name"
        className="border-2 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-green-200 basis-1/2"
      />
      <Select
        value={filters.type}
        onValueChange={(value) => {
          updateFilters("type", value);
        }}
      >
        <SelectTrigger className="border-2 basis-1/6 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-500">
          <SelectValue placeholder="DNS Record Type" />
        </SelectTrigger>
        <SelectContent>
          <FilterItems items={metaData.RecordTypes} />
        </SelectContent>
      </Select>
      <Select
        value={filters.routingPolicy}
        onValueChange={(value) => {
          updateFilters("routingPolicy", value);
        }}
      >
        <SelectTrigger className="border-2 basis-1/6">
          <SelectValue placeholder="Routing policy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Simple">Simple</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="basis-1/6"
        onClick={() => {
          const filter = {
            name: filters.name,
            type: "",
            routingPolicy: "",
          };
          searchRecords(filter);
          setFilters(filter);
        }}
      >
        Clear Filters
      </Button>
    </>
  );
}
