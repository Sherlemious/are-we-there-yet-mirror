import { Profile } from '../types/Profile';
import Table, { type TableColumn } from "../../shared/components/Table";

interface ProfileTableProps {
  profiles: Profile[];
  onDeleteProfile: (id: string) => void;
}

function ProfileTable({ profiles, onDeleteProfile }: ProfileTableProps) {

  const tableColumns: TableColumn[] = [
    {
      header: "Username",
      accessor: "username",
    },    {
      header: "Email",
      accessor: "email",
    },    {
      header: "Account Type",
      accessor: "account_type",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <Table
        data={profiles}
        columns={tableColumns}
        actions={{
          onDelete: onDeleteProfile,
        }}
      />
    </div>
  );
}

export default ProfileTable;
