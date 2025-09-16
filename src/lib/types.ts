export type Stat = {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ElementType;
};

export type Debtor = {
  id: string;
  name: string;
  amountDue: number;
  lastContact: string;
  status: 'Promise' | 'Pending' | 'High Risk';
};

export type PerformanceMetric = {
  month: string;
  collections: number;
  calls: number;
};

export type CallLog = {
  id: string;
  debtorName: string;
  date: string;
  duration: string;
  outcome: 'Payment Promised' | 'No Answer' | 'Follow-up Required' | 'Collected';
  agent: string;
};

export type Task = {
  id: string;
  title: string;
  dueDate: Date;
  status: 'To-Do' | 'In Progress' | 'Completed';
  debtorName: string;
};

export type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
};
