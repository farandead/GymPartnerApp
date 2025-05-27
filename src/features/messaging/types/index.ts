export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    lastSeen?: Date;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
  isTyping?: boolean;
}
