import React from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

interface DataTableProps {
  columns: any[];
  data: any[];
  search?: boolean;
  pagination?: boolean;
  sort?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  search = true,
  pagination = true,
  sort = true,
}) => {
  return (
    <Grid
      data={data}
      columns={columns}
      search={search}
      pagination={pagination && { limit: 5 }}
      sort={sort}
    />
  );
};

export default DataTable;
