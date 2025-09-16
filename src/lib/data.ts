import type { Stat, Debtor, PerformanceMetric, CallLog, Task, Conversation, Message, DialerLead, AgentPerformance, CollectionFunnelData } from './types';
import { Phone, CheckCircle, Target, Banknote, Calendar, MessageSquare, Users, AudioWaveform } from 'lucide-react';

export const dashboardStats: Stat[] = [
  { title: 'Calls Made', value: '1,204', change: '+20.1%', changeType: 'increase', icon: Phone },
  { title: 'Payment Promises', value: '89', change: '+15.2%', changeType: 'increase', icon: CheckCircle },
  { title: 'Collections', value: '$45,231', change: '+12.5%', changeType: 'increase', icon: Banknote },
  { title: 'Call Success Ratio', value: '7.4%', change: '-1.2%', changeType: 'decrease', icon: Target },
];

export const debtorQueue: Debtor[] = [
  { id: '1', name: 'John Smith', amountDue: 1250.75, lastContact: '2024-07-28', status: 'High Risk' },
  { id: '2', name: 'Maria Garcia', amountDue: 850.00, lastContact: '2024-07-29', status: 'Promise' },
  { id: '3', name: 'David Johnson', amountDue: 2400.50, lastContact: '2024-07-25', status: 'Pending' },
];

export const performanceData: PerformanceMetric[] = [
  { month: 'Jan', collections: 32000, calls: 950 },
  { month: 'Feb', collections: 41000, calls: 1100 },
  { month: 'Mar', collections: 38000, calls: 1050 },
  { month: 'Apr', collections: 45000, calls: 1200 },
  { month: 'May', collections: 42000, calls: 1150 },
  { month: 'Jun', collections: 51000, calls: 1300 },
];

export const callLogs: CallLog[] = [
    { id: 'cl1', debtorName: 'Jane Doe', date: '2024-07-30 10:15 AM', duration: '5m 32s', outcome: 'Payment Promised', agent: 'Alice' },
    { id: 'cl2', debtorName: 'John Smith', date: '2024-07-30 09:45 AM', duration: '2m 10s', outcome: 'No Answer', agent: 'Bob' },
    { id: 'cl3', debtorName: 'Sam Wilson', date: '2024-07-29 03:20 PM', duration: '12m 05s', outcome: 'Collected', agent: 'Alice' },
    { id: 'cl4', debtorName: 'Maria Garcia', date: '2024-07-29 11:00 AM', duration: '8m 45s', outcome: 'Follow-up Required', agent: 'Charlie' },
    { id: 'cl5', debtorName: 'Peter Jones', date: '2024-07-28 04:55 PM', duration: '1m 30s', outcome: 'No Answer', agent: 'Bob' },
];

export const tasks: Task[] = [
    { id: 't1', title: 'Follow up with John Smith', dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), status: 'To-Do', debtorName: 'John Smith' },
    { id: 't2', title: 'Verify payment from Jane Doe', dueDate: new Date(), status: 'In Progress', debtorName: 'Jane Doe' },
    { id: 't3', title: 'Send final notice to Sam Wilson', dueDate: new Date(new Date().setDate(new Date().getDate() - 1)), status: 'Completed', debtorName: 'Sam Wilson' },
    { id: 't4', title: 'Prepare documents for Maria Garcia', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'To-Do', debtorName: 'Maria Garcia' },
];

export const conversations: Conversation[] = [
    { id: 'c1', name: 'Alice Johnson', avatar: 'AJ', lastMessage: 'Can you check on the Smith account?' },
    { id: 'c2', name: 'Bob Williams', avatar: 'BW', lastMessage: 'All clear, payment processed.' },
    { id: 'c3', name: 'Charlie Brown', avatar: 'CB', lastMessage: 'I need the files for the Garcia case.' },
];

export const messages: Message[] = [
    { id: 'm1', sender: 'Alice Johnson', content: 'Hey, can you check on the Smith account status? I have a follow-up scheduled.', timestamp: '10:30 AM', isCurrentUser: false },
    { id: 'm2', sender: 'You', content: 'Sure, let me pull up the file. One moment.', timestamp: '10:31 AM', isCurrentUser: true },
    { id: 'm3', sender: 'Alice Johnson', content: 'Thanks!', timestamp: '10:31 AM', isCurrentUser: false },
];

export const templates = [
  { id: 'tpl1', title: 'First Contact - SMS', content: 'Hi [Debtor Name], this is [Agent Name] from CollectPro regarding your outstanding balance. Please contact us at [Phone Number] at your earliest convenience.' },
  { id: 'tpl2', title: 'Payment Promise Reminder - Email', content: 'Dear [Debtor Name],\n\nThis is a friendly reminder about the payment of [Amount] you promised on [Promise Date]. Please let us know if you need any assistance.\n\nBest,\n[Agent Name]' },
  { id: 'tpl3', title: 'Final Notice - SMS', content: 'URGENT: This is the final notice from CollectPro regarding your account. Failure to contact us at [Phone Number] within 24 hours may result in further action.' },
];

export const dialerLeads: DialerLead[] = [
  { id: 'd1', name: 'Emily White', phone: '555-0101', amountDue: 750.00, lastContact: '2024-07-20' },
  { id: 'd2', name: 'Michael Brown', phone: '555-0102', amountDue: 1500.25, lastContact: '2024-07-15' },
  { id: 'd3', name: 'Jessica Green', phone: '555-0103', amountDue: 320.50, lastContact: '2024-07-22' },
  { id: 'd4', name: 'Chris Taylor', phone: '555-0104', amountDue: 2100.00, lastContact: '2024-07-18' },
];

export const agentPerformance: AgentPerformance[] = [
    { id: 'ap1', rank: 1, name: 'Alice Johnson', collections: 15234, callsMade: 412, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'ap2', rank: 2, name: 'Bob Williams', collections: 12890, callsMade: 388, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 'ap3', rank: 3, name: 'Charlie Brown', collections: 11500, callsMade: 450, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
];

export const collectionFunnelData: CollectionFunnelData[] = [
    { name: 'Initial Contact', value: 400 },
    { name: 'Promise to Pay', value: 150 },
    { name: 'Payment Plan', value: 80 },
    { name: 'Paid in Full', value: 250 },
];
