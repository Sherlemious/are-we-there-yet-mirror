import { preferenceTag } from "../types/PreferenceTag";
import UpdatePopup from "./update-popup";
import { useRef, useState } from "react";
import Table, { type TableColumn } from "../../shared/components/Table";

interface TagTableProps {
  Tags: preferenceTag[];
  onDeleteTag: (id: string) => void;
  setTags: React.Dispatch<React.SetStateAction<preferenceTag[]>>;
}

function TagTable({ Tags, onDeleteTag, setTags }: TagTableProps) {
  const dialogRef = useRef<HTMLDialogElement>();
  const [updateId, setUpdateId] = useState("");
  const tableColumns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name",
    },
  ];

  const handleEdit = (id: string) => {
    setUpdateId(id);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div className="w-96 container mx-auto">
        <Table
          data={Tags}
          columns={tableColumns}
          actions={{
            onDelete: onDeleteTag,
            onEdit: handleEdit,
          }}
        />
      </div>
      <UpdatePopup
        dialogRef={dialogRef}
        _id={updateId}
        title="Update a Preference Tag"
        setTags={setTags}
      />
    </>
  );
}

export default TagTable;
