import { Table } from "antd";
type DataIndex = string | number | (string | number)[];

export type TableColumn<T> = {
  title: string;
  key: string;
  dataIndex?: DataIndex;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
};

type CommonTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
};

function CommonTable<T extends object>({
  columns,
  data,
  loading = false,
  rowKey = "id",
}: CommonTableProps<T>) {
  // map your columns → antd columns
  const mappedColumns = columns.map((col) => ({
    title: col.title,
    key: col.key,
    dataIndex: col.dataIndex,
    align: col.align,
    width: col.width,
    render: col.render
      ? (value: any, record: T, index: number) =>
          col.render!(value, record, index)
      : undefined,
  }));

  return (
    <Table
    className="custom-table"
      columns={mappedColumns}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={false}
    />
  );
}

export default CommonTable;