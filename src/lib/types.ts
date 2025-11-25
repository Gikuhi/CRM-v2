



import { Timestamp } from "firebase/firestore";

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
  rpc_status?: boolean;
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
  account?: string;
  balance?: number;
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
    status: 'Online' | 'Offline' | 'On Call' | 'Break';
    accountsAssigned: number;
    avatarUrl: string;
};

export type User = {
    id: string;
    name: string;
    role: 'Agent' | 'Supervisor' | 'Admin' | 'Super Admin';
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
  role: 'Agent' | 'Supervisor' | 'Admin' | 'Super Admin';
  languagePreference: string;
  themeMode: 'light' | 'dark';
  team_id?: string;
  team_name?: string;
  createdAt: Timestamp;
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

export type SuperAdminStat = {
    title: string;
    value: string;
    change: string;
    changeType: "increase" | "decrease";
};

export type SystemHealthStat = {
    metric: string;
    value: string;
    status: "Healthy" | "Warning" | "Critical";
    details: string;
};

export type RecentActivity = {
    id: string;
    user: string;
    action: string;
    date: string;
};

export type Organization = {
    id: string;
    name: string;
    admin: string;
    userCount: number;
    status: "Active" | "Inactive";
    plan: "Basic" | "Pro" | "Enterprise";
};

export type CallDisposition = {
    call_id: string;
    agent_id: string;
    lead_id: string;
    disposition_type: string;
    disposition_notes: string;
    timestamp: Timestamp;
    call_duration: string;
    campaign_id: string;
    outcome_score: number;
    rpc_status: boolean;
    rpc_timestamp?: Timestamp;
};

export type InteractionLog = {
    interaction_id: string;
    debtor_id: string;
    agent_id: string;
    agent_name: string;
    rpc_status: boolean;
    wrap_matter: string;
    notes: string;
    call_duration: string;
    created_at: string;
};


export type CallDispositionLog = Omit<CallDisposition, 'timestamp' | 'rpc_timestamp'> & {
    timestamp: string;
    rpc_timestamp?: string;
    debtorName: string;
}

export type Team = {
    team_id: string;
    org_id: string;
    team_name: string;
    description: string;
    leader_id: string;
    leader_name: string;
    members: { user_id: string; name: string; role: string }[];
    campaign_id: string;
    campaign_name: string;
    created_at: string;
};

export type DebtorProfile = {
    debtor_id: string;
    full_name: string;
    account_number: string;
    id_number: string;
    phone_numbers: string[];
    email: string;
    address: string;
    employer: string;
    occupation: string;
    total_debt: number;
    original_amount: number;
    last_payment_date: string;
    amount_paid: number;
    remaining_balance: number;
    payment_frequency: string;
    loan_type: string;
    interest_rate: number;
};

export type PtpRecord = {
    ptp_id: string;
    debtor_id: string;
    agent_id: string;
    agent_name: string;
    ptp_amount: number;
    ptp_date: string;
    payment_method: string;
    status: 'Pending' | 'Kept' | 'Broken';
    notes: string;
    created_at: string;
};

export type DebtorNote = {
    note_id: string;
    debtor_id: string;
    user_id: string;
    user_name: string;
    note_text: string;
    timestamp: string;
};

export type AgentDashboardStats = {
  nextDebtor: { name: string; account: string; balance: number, id: string; phone: string; amountDue: number; lastContact: string; };
  queueProgress: { completed: number; total: number };
  callOutcomes: { rpc: number; noAnswer: number; voicemail: number; wrongNumber: number };
  ptpToday: { debtor: string; time: string }[];
};

export type Notification = {
  id: number;
  text: string;
  time: string;
  read: boolean;
  type: 'PTP' | 'Assignment' | 'System' | 'Success';
};

export type AuditLog = {
    id: string;
    user: string;
    action: string;
    resourceId: string;
    date: string;
    organization?: string;
};
    
