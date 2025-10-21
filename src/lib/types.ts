
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

export type DialerLead = {
  id: string;
  name: string;
  phone: string;
  amountDue: number;
  lastContact: string;
};

export type AgentPerformance = {
    id: string;
    rank: number;
    name: string;
    collections: number;
    callsMade: number;
    avatarUrl: string;
};

export type CollectionFunnelData = {
    name: string;
    value: number;
};

export type TeamMember = {
    id: string;
    name: string;
    email: string;
    status: 'Online' | 'Offline' | 'On Call';
    accountsAssigned: number;
    avatarUrl: string;
};

export type User = {
    id: string;
    name: string;
    role: 'Agent' | 'Supervisor';
    createdAt: string;
};

export type PtpOffer = {
    id: number;
    frequency: string;
    noPayments: number;
    settlementBal: string | number;
    initialAmount: string | number;
    amount: string | number;
    capitalDiscount: number;
    interestDiscount: number;
    feeDiscount: number;
    discountAmount: string | number;
    initialPaymentMethod: string;
    monthlyInstallment: string | number;
    totalInterest: number;
    totalCost: string | number;
    totalPayment: string | number;
    totalSaving: string | number;
    paymentMethod: string;
    action: 'Use as PTP' | 'Request Auth' | 'Validating';
}

export type UserProfile = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  role: 'Agent' | 'Supervisor' | 'Admin';
  languagePreference: string;
  themeMode: 'light' | 'dark';
};

export type NotificationPreferences = {
  id: string;
  userId: string;
  emailAlertsEnabled: boolean;
  smsAlertsEnabled: boolean;
  inAppNotificationsEnabled: boolean;
};

export type SystemConfiguration = {
    id: string;
    callTimeout: number;
    maxConcurrentCalls: number;
    recordingEnabled: boolean;
}

export type AdminCallStats = {
    period: string;
    callsMade: number;
    callsAnswered: number;
    callsCancelled: number;
};

export type AdminCollectionsStat = {
    period: string;
    amount: number;
};
