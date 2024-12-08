import { Tag } from '../types/Tag';
import Table, { type TableColumn } from "../../shared/components/Table";


interface TagTableProps {
  Tags: Tag[];
  onDeleteTag: (id: string) => void;
}

function TagTable({ Tags }: TagTableProps) {
  const tableColumns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name",
    },    {
      header: "Type",
      accessor: "type",
    },    {
      header: "Historical Period",
      accessor: "historical_period",
    },
  ];

    
  return (
    <div className="container mx-auto max-w-2xl p-4">
    <Table
      data={Tags}
      columns={tableColumns}
    />
  </div>
  );
}

export default TagTable;
