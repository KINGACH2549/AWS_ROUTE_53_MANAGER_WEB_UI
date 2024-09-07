import { useEffect, useState } from "react";
import RecordTable from "../../components/zoneComponents/RecordTable";
import { listResourceRecordSets } from "@/app/api/ListDnsRecord";

export default function DisplayZoneRecords({ zoneID, zoneName }) {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    listResourceRecordSets(zoneID).then((res) => {
      setRecords(res.data.ResourceRecordSets);
    });
  }, []);
  return (
    <>
      <div className="px-20 w-full">
        <RecordTable records={records} zoneName={zoneName} />
      </div>
    </>
  );
}
