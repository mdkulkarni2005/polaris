import { Id } from "../../../../convex/_generated/dataModel";

interface ConversationsidebarProps {
    projectId: Id<"projects">
}

export const ConversationSidebar = ({
    projectId,
}: ConversationSidebar) => {
    return (
        <div>
            Conversation Sidebar!
        </div>
    )
}

