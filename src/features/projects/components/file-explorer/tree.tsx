import { ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { cn } from "@/lib/utils";
import {
  useCreateFile,
  useCreateFolder,
  useFolderContents,
  useDeleteFile,
  useRenameFile
} from "../../hooks/use-files";
import { getItemPadding } from "./constants";
import { LoadingRow } from "./loading-row";
import { CreateInput } from "./create-input";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";

export const Tree = ({
  item,
  level,
  projectId,
}: {
  item: Doc<"files">;
  level?: number;
  projectId: Id<"projects">;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false)
  const [ creating, setCreating ] = useState(null)

  const renameFile = useRenameFile()
  const deleteFile = useDeleteFile()
  const createFile = useCreateFile()
  const createFolder = useCreateFile()

  const folderContents = useFolderContents({
    projectId,
    parentId: item._id,
    enabled: item.type === "folder" && isOpen
  })

  if(item.type === 'file') {
    return (
      <div>
        I am a file!
      </div>
    )
  }

  return (
    <div>
      I am folder
    </div>
  )
};
