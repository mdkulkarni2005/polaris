"use client";

import { formatDistanceToNow } from "date-fns";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useConversations } from "../hooks/use-conversations";
import { Id } from "../../../../convex/_generated/dataModel";

interface PastConversationsDialogProps {
  projectId: Id<"projects">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (conversationId: Id<"conversations">) => void;
}

export const PastConversationDialog = ({
  projectId,
  open,
  onOpenChange,
  onSelect,
}: PastConversationsDialogProps) => {
  const conversations = useConversations(projectId);

  const handleSelect = (conversationId: Id<"conversations">) => {
    onSelect(conversationId);
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Past Conversation"
      description="Search and select a past conversation"
    >
      <CommandInput placeholder="Search conversations..." />
      <CommandList>
        <CommandEmpty>No conversations found.</CommandEmpty>
        <CommandGroup heading="Conversations">
          {conversations?.map((conversation) => (
            <CommandItem
              key={conversation._id}
              value={`${conversation.title}-${conversation._id}`}
              onSelect={() => handleSelect(conversation._id)}
            ></CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
