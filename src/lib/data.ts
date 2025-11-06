

import type { Stat, Debtor, PerformanceMetric, CallLog, Task, Conversation, Message, DialerLead, AgentPerformance, CollectionFunnelData, TeamMember, User, PtpOffer, AdminCallStats, AdminCollectionsStat, UserProfile, SuperAdminStat, SystemHealthStat, RecentActivity, Organization } from './types';
import { Phone, CheckCircle, Target, Banknote } from 'lucide-react';

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

export const teamMembers: TeamMember[] = [
    { id: 'tm1', name: 'Alice Johnson', email: 'alice@collectpro.com', status: 'Online', accountsAssigned: 25, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'tm2', name: 'Bob Williams', email: 'bob@collectpro.com', status: 'On Call', accountsAssigned: 30, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 'tm3', name: 'Charlie Brown', email: 'charlie@collectpro.com', status: 'Offline', accountsAssigned: 22, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
];

export const users: User[] = [
    { id: 'u1', name: 'Admin User', role: 'Admin', createdAt: '2024-01-10' },
    { id: 'u2', name: 'Supervisor One', role: 'Supervisor', createdAt: '2024-01-15' },
    { id: 'u3', name: 'Supervisor Two', role: 'Supervisor', createdAt: '2024-01-18' },
    { id: 'u4', name: 'Supervisor Three', role: 'Supervisor', createdAt: '2024-01-20' },
    { id: 'u5', name: 'Agent One', role: 'Agent', createdAt: '2024-02-20' },
    { id: 'u6', name: 'Agent Two', role: 'Agent', createdAt: '2024-02-22' },
    { id: 'u7', name: 'Agent Three', role: 'Agent', createdAt: '2024-03-01' },
    { id: 'u8', name: 'Agent Four', role: 'Agent', createdAt: '2024-03-05' },
    { id: 'u9', name: 'Agent Five', role: 'Agent', createdAt: '2024-03-10' },
    { id: 'u10', name: 'Agent Six', role: 'Agent', createdAt: '2024-03-12' },
];

export const ptpOffers: PtpOffer[] = [
  { id: 1, frequency: 'Once Off', noPayments: 1, settlementBal: 'Ksh 25,360.00', initialAmount: 'Ksh 0.00', amount: 'Ksh 22,360.00', capitalDiscount: 10, interestDiscount: 10, feeDiscount: 10, discountAmount: 'Ksh 22,360.00', initialPaymentMethod: 'Direct Deposit', monthlyInstallment: 'Ksh 22,360.00', totalInterest: 0, totalCost: 'Ksh 0.00', totalPayment: 'Ksh 22,360.00', totalSaving: 'Ksh 2,360.00', paymentMethod: 'Direct Deposit', action: 'Use as PTP' },
  { id: 2, frequency: 'Once Off', noPayments: 1, settlementBal: 'Ksh 25,360.00', initialAmount: 'Ksh 0.00', amount: 'Ksh 22,360.00', capitalDiscount: 10, interestDiscount: 10, feeDiscount: 10, discountAmount: 'Ksh 22,360.00', initialPaymentMethod: 'Direct Deposit', monthlyInstallment: 'Ksh 22,360.00', totalInterest: 0, totalCost: 'Ksh 0.00', totalPayment: 'Ksh 22,360.00', totalSaving: 'Ksh 2,360.00', paymentMethod: 'Direct Deposit', action: 'Request Auth' },
  { id: 3, frequency: 'Monthly', noPayments: 3, settlementBal: 'Ksh 25,360.00', initialAmount: 'Ksh 0.00', amount: 'Ksh 7,614.00', capitalDiscount: 10, interestDiscount: 10, feeDiscount: 10, discountAmount: 'Ksh 22,360.00', initialPaymentMethod: 'Direct Deposit', monthlyInstallment: 'Ksh 7,614.00', totalInterest: 0, totalCost: 'Ksh 0.00', totalPayment: 'Ksh 22,360.00', totalSaving: 'Ksh 2,360.00', paymentMethod: 'Direct Deposit', action: 'Request Auth' },
  { id: 4, frequency: 'Monthly', noPayments: 27, settlementBal: 'Ksh 25,360.00', initialAmount: 0, amount: 947.7, capitalDiscount: 0, interestDiscount: 0, feeDiscount: 0, discountAmount: 'Ksh 0.00', initialPaymentMethod: 'Direct Deposit', monthlyInstallment: 'Ksh 947.00', totalInterest: 0, totalCost: 'Ksh 0.00', totalPayment: 'Ksh 25,360.00', totalSaving: 'Ksh 0.00', paymentMethod: 'Direct Deposit', action: 'Validating' },
  { id: 5, frequency: 'Monthly', noPayments: 27, settlementBal: 'Ksh 25,360.00', initialAmount: 0, amount: 'Ksh 640.00', capitalDiscount: 0, interestDiscount: 0, feeDiscount: 0, discountAmount: 'Ksh 0.00', initialPaymentMethod: 'Direct Deposit', monthlyInstallment: 'Ksh 947.00', totalInterest: 0, totalCost: 'Ksh 0.00', totalPayment: 'Ksh 25,360.00', totalSaving: 'Ksh 0.00', paymentMethod: 'Direct Deposit', action: 'Validating' }
];

export const adminCallStats: AdminCallStats[] = [
    { period: "Today", callsMade: 320, callsAnswered: 280, callsCancelled: 40 },
    { period: "Yesterday", callsMade: 450, callsAnswered: 400, callsCancelled: 50 },
    { period: "Last Week", callsMade: 2100, callsAnswered: 1850, callsCancelled: 250 },
    { period: "Last Month", callsMade: 8500, callsAnswered: 7800, callsCancelled: 700 },
];

export const adminCollectionsData: AdminCollectionsStat[] = [
    { period: 'Today', amount: 5231 },
    { period: 'Yesterday', amount: 7890 },
    { period: 'Last Week', amount: 45231 },
    { period: 'Last Month', amount: 189500 },
];

export const superAdminOverviewStats: SuperAdminStat[] = [
    { title: "Total Organizations", value: "3", change: "+1", changeType: "increase" },
    { title: "Total Users", value: "22", change: "+5", changeType: "increase" },
    { title: "Active Campaigns", value: "4", change: "-1", changeType: "decrease" },
    { title: "Total Revenue", value: "$250,345", change: "+8%", changeType: "increase" },
];

export const systemHealthStats: SystemHealthStat[] = [
    { metric: "API Server Uptime", value: "99.98%", status: "Healthy", details: "Last check: 1 min ago" },
    { metric: "Database Connectivity", value: "OK", status: "Healthy", details: "All instances responding" },
    { metric: "CPU Usage", value: "58%", status: "Warning", details: "Spike detected in org-2" },
    { metric: "Memory Usage", value: "75%", status: "Healthy", details: "Stable" },
    { metric: "Active Calls", value: "1,432", status: "Healthy", details: "Load is nominal" },
];

export const recentSuperAdminActivities: RecentActivity[] = [
    { id: "sa-1", user: "Super Admin", action: "Created new organization 'FinCorp'", date: "2024-08-01 10:00 AM" },
    { id: "sa-2", user: "Super Admin", action: "Assigned 'Pro' plan to 'DebtSolve'", date: "2024-08-01 09:45 AM" },
    { id: "sa-3", user: "Super Admin", action: "Disabled user 'test@example.com'", date: "2024-07-31 04:30 PM" },
];

export const organizations: Organization[] = [
    { id: "org-1", name: "DebtSolve Inc.", admin: "Jane Doe", userCount: 12, status: "Active", plan: "Pro" },
    { id: "org-2", name: "CreditRevive", admin: "John Smith", userCount: 8, status: "Active", plan: "Basic" },
    { id: "org-3", name: "FinRecovery LLC", admin: "Peter Jones", userCount: 2, status: "Inactive", plan: "Enterprise" },
];
