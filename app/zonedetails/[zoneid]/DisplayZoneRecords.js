import { useEffect, useState, useRef } from "react";
import RecordTable from "../../components/zoneComponents/RecordTable";
import { listResourceRecordSets } from "@/app/api/ListDnsRecord";
import RecordSearch from "@/app/components/zoneComponents/RecordSearch";
import MiniSearch from "minisearch";

export default function DisplayZoneRecords({
  zoneID,
  zoneName,
  metaData,
  changes,
  setChanges,
}) {
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    routingPolicy: "",
  });
  const [records, setRecords] = useState([]);
  const miniSearch = useRef(null);

  useEffect(() => {
    listResourceRecordSets(zoneID, filters).then((res) => {
      const records = res.data.ResourceRecordSets.map((record, index) => ({
        ...record,
        id: `${record.Name}-${record.Type}-${index}`, // Generate a unique ID based on Name, Type, and index
      }));

      miniSearch.current = new MiniSearch({
        fields: ["Name"], // fields to index for full-text search
        storeFields: Object.keys(res.data.ResourceRecordSets[0]), // fields to return with search results
      });

      miniSearch.current.addAll(records);
      setRecords(records);
    });
  }, [changes]);

  const searchRecords = (data) => {
    const results =
      data.name.length > 0
        ? miniSearch.current.search(data.name, {
            prefix: true,
            filter:
              data.type.length > 0
                ? (result) => result.Type === data.type
                : undefined,
          })
        : miniSearch.current.search(MiniSearch.wildcard, {
            filter:
              data.type.length > 0
                ? (result) => result.Type === data.type
                : undefined,
          });
    setRecords(results);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="px-20 w-full flex gap-1">
          <RecordSearch
            filters={filters}
            setFilters={setFilters}
            searchRecords={searchRecords}
            metaData={metaData}
          />
        </div>
        <div className="px-20 w-full">
          <RecordTable
            records={records}
            zoneName={zoneName}
            zoneID={zoneID}
            setChanges={setChanges}
            metaData={metaData}
          />
        </div>
      </div>
    </>
  );
}
