import type { Conversation } from '../types/chat'
import { daysAgo } from '../utils/format'
import { DEMO_USER_ID } from './users'

/** Sample conversations for the demo account (as buyer and as seller). */
export const seedConversations: Conversation[] = [
  {
    id: 'c-sarah-desk',
    listingId: 'l-desk',
    buyerId: DEMO_USER_ID,
    sellerId: 'u-sarah',
    messages: [
      { id: 'm1', senderId: DEMO_USER_ID, text: 'Hi Sarah, is the desk still available?', sentAt: daysAgo(0, 3, 20) },
      { id: 'm2', senderId: 'u-sarah', text: 'Hi! Yes it is 😊', sentAt: daysAgo(0, 3, 5) },
      { id: 'm3', senderId: DEMO_USER_ID, text: 'Would you take $130?', sentAt: daysAgo(0, 2, 50) },
      { id: 'm4', senderId: 'u-sarah', text: 'I can do $140 if you pick up this weekend.', sentAt: daysAgo(0, 1, 10) },
    ],
    updatedAt: daysAgo(0, 1, 10),
    lastReadAt: { [DEMO_USER_ID]: daysAgo(0, 2, 50), 'u-sarah': daysAgo(0, 1, 10) },
  },
  {
    id: 'c-selena-keyboard',
    listingId: 'l-keyboard',
    buyerId: 'u-selena',
    sellerId: DEMO_USER_ID,
    messages: [
      { id: 'm5', senderId: 'u-selena', text: 'Hi', sentAt: daysAgo(1, 4, 6) },
      { id: 'm6', senderId: 'u-selena', text: 'Is the keyboard available?', sentAt: daysAgo(1, 4, 5) },
      { id: 'm7', senderId: DEMO_USER_ID, text: 'yes!', sentAt: daysAgo(1, 4, 2) },
    ],
    updatedAt: daysAgo(1, 4, 2),
    lastReadAt: { [DEMO_USER_ID]: daysAgo(1, 4, 2), 'u-selena': daysAgo(1, 4, 2) },
  },
  {
    id: 'c-jessica-lamp',
    listingId: 'l-floor-lamp',
    buyerId: 'u-jessica',
    sellerId: DEMO_USER_ID,
    messages: [
      { id: 'm8', senderId: 'u-jessica', text: 'Hey! Could you hold the lamp until Friday?', sentAt: daysAgo(0, 5, 30) },
    ],
    updatedAt: daysAgo(0, 5, 30),
    lastReadAt: { 'u-jessica': daysAgo(0, 5, 30) },
  },
  {
    id: 'c-mike-headphones',
    listingId: 'l-headphones',
    buyerId: DEMO_USER_ID,
    sellerId: 'u-mike',
    messages: [
      { id: 'm9', senderId: DEMO_USER_ID, text: 'Do the headphones come with a case?', sentAt: daysAgo(3, 2) },
      { id: 'm10', senderId: 'u-mike', text: 'Yes, the original hard case is included.', sentAt: daysAgo(3, 1) },
    ],
    updatedAt: daysAgo(3, 1),
    lastReadAt: { [DEMO_USER_ID]: daysAgo(3, 1), 'u-mike': daysAgo(3, 1) },
  },
]
