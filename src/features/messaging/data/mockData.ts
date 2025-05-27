import { Conversation, Message } from '../types';

// Create mock data file with 5 conversations and messages
export const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      content: "Hey! Are we still on for tomorrow's workout?",
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '2',
      content: 'Yes, definitely! 💪 Same time at 7am?',
      timestamp: new Date(Date.now() - 3300000),
      status: 'read',
    },
  ],
  '2': [
    {
      id: '3',
      senderId: '3',
      receiverId: '1',
      content: 'Looking for a spotter this weekend?',
      timestamp: new Date(Date.now() - 7200000),
      status: 'read',
    },
    {
      id: '4',
      senderId: '1',
      receiverId: '3',
      content: 'Sure, I could use one for bench press 🏋️‍♂️',
      timestamp: new Date(Date.now() - 7000000),
      status: 'delivered',
    },
  ],
  '3': [
    {
      id: '5',
      senderId: '4',
      receiverId: '1',
      content: 'Great form on those deadlifts today!',
      timestamp: new Date(Date.now() - 86400000),
      status: 'read',
    },
    {
      id: '6',
      senderId: '1',
      receiverId: '4',
      content: 'Thanks! Been working on my technique 💪',
      timestamp: new Date(Date.now() - 85000000),
      status: 'read',
    },
  ],
  '4': [
    {
      id: '7',
      senderId: '5',
      receiverId: '1',
      content: 'Want to join our HIIT session tomorrow?',
      timestamp: new Date(Date.now() - 172800000),
      status: 'read',
    },
    {
      id: '8',
      senderId: '1',
      receiverId: '5',
      content: 'Count me in! What time? 🔥',
      timestamp: new Date(Date.now() - 171800000),
      status: 'delivered',
    },
  ],
  '5': [
    {
      id: '9',
      senderId: '6',
      receiverId: '1',
      content: 'Need a yoga partner for morning sessions',
      timestamp: new Date(Date.now() - 259200000),
      status: 'read',
    },
    {
      id: '10',
      senderId: '1',
      receiverId: '6',
      content: 'Perfect! Ive been wanting to improve flexibility 🧘‍♂️',
      timestamp: new Date(Date.now() - 258200000),
      status: 'sent',
    },
  ],
};

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [{
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      lastSeen: new Date(),
    }],
    lastMessage: mockMessages['1'][mockMessages['1'].length - 1],
    unreadCount: 2,
    updatedAt: new Date(),
  },
  {
    id: '2',
    participants: [{
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastSeen: new Date(Date.now() - 1800000),
    }],
    lastMessage: mockMessages['2'][mockMessages['2'].length - 1],
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 7000000),
    isTyping: true,
  },
  {
    id: '3',
    participants: [{
      id: '4',
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      lastSeen: new Date(Date.now() - 3600000),
    }],
    lastMessage: mockMessages['3'][mockMessages['3'].length - 1],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 85000000),
  },
  {
    id: '4',
    participants: [{
      id: '5',
      name: 'James Smith',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      lastSeen: new Date(Date.now() - 7200000),
    }],
    lastMessage: mockMessages['4'][mockMessages['4'].length - 1],
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 171800000),
  },
  {
    id: '5',
    participants: [{
      id: '6',
      name: 'Lisa Brown',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      lastSeen: new Date(Date.now() - 14400000),
    }],
    lastMessage: mockMessages['5'][mockMessages['5'].length - 1],
    unreadCount: 3,
    updatedAt: new Date(Date.now() - 258200000),
  },
];