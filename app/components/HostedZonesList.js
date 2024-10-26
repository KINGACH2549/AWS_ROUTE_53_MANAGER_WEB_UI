"use client";

import * as React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteZoneModal } from "./deleteZone/DeleteZoneModal";
import NoZoneFound from "./NoZoneFound";
import Link from "next/link";

export const columns = (showDeleteButton, setZoneId, setZoneName) => [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          if (!!value) {
            setZoneId(row.getValue("Id")?.replace("/hostedzone/", ""));
            setZoneName(row.getValue("Name")?.replace("com.", "com"));
          }
          row.toggleSelected(!!value);
          showDeleteButton(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Id",
    header: "Zone ID",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("Id")?.replace("/hostedzone/", "")}
      </div>
    ),
  },
  {
    accessorKey: "Name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue("Name")?.replace("com.", "com")}
      </div>
    ),
  },
  {
    accessorKey: "CallerReference",
    // header: () => <div className="text-right">Reference ID</div>,
    header: "Reference ID",
    cell: ({ row }) => {
      const amount = row.getValue("CallerReference");

      return <div className="font-medium">{amount}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Link
          href={
            "/zonedetails/" + row.getValue("Id")?.replace("/hostedzone/", "")
          }
          className="underline  text-blue-600 font-medium"
        >
          View Zone
        </Link>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(payment.id)}
        //     >
        //       Copy payment ID
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem>View customer</DropdownMenuItem>
        //     <DropdownMenuItem>View payment details</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];

function DataTableDemo(
  data,
  setChanges,
  marker,
  handleMarker,
  handlePagination
) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteButton, showDeleteButton] = React.useState(false);
  const [zoneId, setZoneId] = React.useState("");
  const [zoneName, setZoneName] = React.useState("");

  const table = useReactTable({
    data,
    columns: columns(showDeleteButton, setZoneId, setZoneName),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    showDeleteButton: showDeleteButton,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      deleteButton,
    },
  });

  const handleNextButton = () => {
    handlePagination(marker[marker.length - 1]);
  };

  const handlePreviousButton = () => {
    const markers = [...marker];
    let i = 0;
    while (i < 2) {
      markers.pop();
      i++;
    }
    handlePagination(markers[markers.length - 1]);
    handleMarker(markers);
  };
  // console.log(table.getRowModel().rows, "22");

  // table.getRowModel().rows.map((row) => {
  //   console.log(row.original, "row");
  //   row.getVisibleCells().map((cell) => {});
  // });

  return (
    <div className="w-full px-10 v">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter zones..."
          value={table.getColumn("Name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {deleteButton ? (
            <DeleteZoneModal
              showDeleteButton={showDeleteButton}
              zoneId={zoneId}
              setChanges={setChanges}
              setRowSelection={setRowSelection}
              zoneName={zoneName}
            />
          ) : (
            ""
          )}
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="rounded-md border"
        style={{ boxShadow: "0 1px 5px rgba(255, 3, 119,50%)" }}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <NoZoneFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            style={{ boxShadow: "rgb(92 81 189 / 61%) 0px 1px 4px" }}
            // onClick={() => table.previousPage()}
            onClick={handlePreviousButton}
            disabled={marker.length <= 1 || marker[0] === "/"}
            // disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            style={{ boxShadow: "rgb(92 81 189 / 61%) 0px 1px 4px" }}
            onClick={handleNextButton}
            // onClick={() => table.nextPage()}
            disabled={marker.length==0 || marker[marker.length - 1] === "/"}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function HostedZonesList(props) {
  const { hostedZonelist, setChanges, marker, handleMarker, handlePagination } =
    props;

  return (
    <>
      {DataTableDemo(
        hostedZonelist,
        setChanges,
        marker,
        handleMarker,
        handlePagination
      )}
    </>
  );
}
