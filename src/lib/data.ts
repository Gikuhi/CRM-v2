

import type { Stat, Debtor, PerformanceMetric, CallLog, Task, Conversation, Message, DialerLead, AgentPerformance, CollectionFunnelData, TeamMember, User, PtpOffer, AdminCallStats, AdminCollectionsStat, UserProfile, SuperAdminStat, SystemHealthStat, RecentActivity, Organization, CallDispositionLog, Team } from './types';
import { Phone, CheckCircle, Target, Banknote } from 'lucide-react';

export const dashboardStats: Stat[] = [
  { title: 'Calls Made', value: '68', change: '+5 vs yesterday', changeType: 'increase', icon: Phone },
  { title: 'Payment Promises', value: '7', change: '-2 vs yesterday', changeType: 'decrease', icon: CheckCircle },
  { title: 'Collections', value: '$2,350', change: '+$300 vs yesterday', changeType: 'increase', icon: Banknote },
  { title: 'Call Success Ratio', value: '12.4%', change: '+0.8%', changeType: 'increase', icon: Target },
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
    { id: 'cl1', debtorName: 'Jane Doe', date: '2024-07-30 10:15 AM', duration: '5m 32s', outcome: 'Payment Promised', agent: 'Peris Wanyangi', rpc_status: true },
    { id: 'cl2', debtorName: 'John Smith', date: '2024-07-30 09:45 AM', duration: '2m 10s', outcome: 'No Answer', agent: 'Peris Wanyangi', rpc_status: false },
    { id: 'cl3', debtorName: 'Sam Wilson', date: '2024-07-29 03:20 PM', duration: '12m 05s', outcome: 'Collected', agent: 'Peris Wanyangi', rpc_status: true },
    { id: 'cl4', debtorName: 'Maria Garcia', date: '2024-07-29 11:00 AM', duration: '8m 45s', outcome: 'Follow-up Required', agent: 'Peris Wanyangi', rpc_status: true },
    { id: 'cl5', debtorName: 'Peter Jones', date: '2024-07-28 04:55 PM', duration: '1m 30s', outcome: 'No Answer', agent: 'Peris Wanyangi', rpc_status: false },
];

export const tasks: Task[] = [
    { id: 't1', title: 'Follow up with John Smith', dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), status: 'To-Do', debtorName: 'John Smith' },
    { id: 't2', title: 'Verify payment from Jane Doe', dueDate: new Date(), status: 'In Progress', debtorName: 'Jane Doe' },
    { id: 't3', title: 'Send final notice to Sam Wilson', dueDate: new Date(new Date().setDate(new Date().getDate() - 1)), status: 'Completed', debtorName: 'Sam Wilson' },
    { id: 't4', title: 'Prepare documents for Maria Garcia', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'To-Do', debtorName: 'Maria Garcia' },
];

export const conversations: Conversation[] = [
    { id: 'c1', name: 'Andrew Mayaka (Supervisor)', avatar: 'AM', lastMessage: 'Great work on the Q3 campaign numbers!' },
    { id: 'c2', name: 'System Announcements', avatar: 'SA', lastMessage: 'Reminder: System maintenance this Friday at 10 PM.' },
    { id: 'c3', name: 'Grace Akinyi', avatar: 'GA', lastMessage: 'Can you help me with the Jones account?' },
];

export const messages: Message[] = [
    { id: 'm1', sender: 'Andrew Mayaka', content: 'Hey, great work on the Q3 campaign numbers! Your success rate is up by 5%.', timestamp: '10:30 AM', isCurrentUser: false },
    { id: 'm2', sender: 'You', content: 'Thanks, Andrew! The new script is working wonders.', timestamp: '10:31 AM', isCurrentUser: true },
    { id: 'm3', sender: 'Andrew Mayaka', content: 'Glad to hear it. Keep it up.', timestamp: '10:31 AM', isCurrentUser: false },
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
  { id: 'd5', name: 'Sarah Miller', phone: '555-0105', amountDue: 540.00, lastContact: '2024-07-25' },
  { id: 'd6', name: 'James Wilson', phone: '555-0106', amountDue: 980.75, lastContact: '2024-07-19' },
  { id: 'd7', name: 'Patricia Martinez', phone: '555-0107', amountDue: 120.00, lastContact: '2024-07-28' },
  { id: 'd8', name: 'Robert Anderson', phone: '555-0108', amountDue: 3050.00, lastContact: '2024-07-10' },
  { id: 'd9', name: 'Linda Thomas', phone: '555-0109', amountDue: 400.00, lastContact: '2024-07-29' },
  { id: 'd10', name: 'Daniel Jackson', phone: '555-0110', amountDue: 175.50, lastContact: '2024-07-27' },
];

export const agentPerformance: AgentPerformance[] = [
    { id: 'ap1', rank: 1, name: 'Peris Wanyangi', collections: 5200, callsMade: 150, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'ap2', rank: 2, name: 'John Okoro', collections: 4800, callsMade: 120, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 'ap3', rank: 3, name: 'Grace Akinyi', collections: 6100, callsMade: 180, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    { id: 'ap4', rank: 4, name: 'Samuel Mwangi', collections: 4500, callsMade: 140, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    { id: 'ap5', rank: 5, name: 'Fatuma Ali', collections: 4200, callsMade: 130, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];

export const collectionFunnelData: CollectionFunnelData[] = [
    { name: 'Initial Contact', value: 400 },
    { name: 'Promise to Pay', value: 150 },
    { name: 'Payment Plan', value: 80 },
    { name: 'Paid in Full', value: 250 },
];

export const teamMembers: TeamMember[] = [
    { id: 'tm1', name: 'Peris Wanyangi', email: 'peris.w@example.com', status: 'Online', accountsAssigned: 25, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'tm2', name: 'John Okoro', email: 'john.o@example.com', status: 'On Call', accountsAssigned: 30, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 'tm3', name: 'Grace Akinyi', email: 'grace.a@example.com', status: 'Offline', accountsAssigned: 22, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    { id: 'tm4', name: 'Samuel Mwangi', email: 'samuel.m@example.com', status: 'Online', accountsAssigned: 28, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    { id: 'tm5', name: 'Fatuma Ali', email: 'fatuma.a@example.com', status: 'Break', accountsAssigned: 18, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];

export const users: User[] = [
    { id: 'u1', name: 'Super Admin', role: 'Super Admin', createdAt: '2024-01-05' },
    { id: 'u2', name: 'Andrew Mayaka', role: 'Admin', createdAt: '2024-01-10' },
    { id: 'u3', name: 'Beatrice Njeri', role: 'Supervisor', createdAt: '2024-01-15' },
    { id: 'u4', name: 'Peris Wanyangi', role: 'Agent', createdAt: '2024-02-20' },
    { id: 'u5', name: 'John Okoro', role: 'Agent', createdAt: '2024-02-22' },
    { id: 'u6', name: 'Grace Akinyi', role: 'Agent', createdAt: '2024-03-01' },
    { id: 'u7', name: 'Samuel Mwangi', role: 'Agent', createdAt: '2024-03-05' },
    { id: 'u8', name: 'Fatuma Ali', role: 'Agent', createdAt: '2024-03-10' },
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

export const dispositionCategories = [
    'Paid / Settled',
    'Promise to Pay (PTP)',
    'Call Back Later',
    'Wrong Number',
    'Not Interested',
    'Disconnected / No Answer',
    'Transferred to Supervisor',
    'Do Not Call (DNC)',
    'Customer Requested Callback',
    'Follow-Up Scheduled',
    'Unreachable',
    'Other'
];

export const wrapMatterDispositions = {
    'CONTACT MADE': [
        'PTP Given',
        'PTP Kept',
        'Paid in Full',
        'Partial Payment Made',
        'Will Pay Today',
        'Disputed Debt',
        'Requires Manager Call-Back',
        'Negotiated Settlement',
        'Payment Arrangement Setup',
        'Wrong Amount Dispute',
        'Awaiting Confirmation of Payment',
    ],
    'NO CONTACT / UNSUCCESSFUL': [
        'No Answer',
        'Line Busy',
        'Phone Switched Off',
        'Invalid Number',
        'Call Dropped',
        'Contacted Wrong Person',
        'Do Not Call (DNC)',
    ],
    'FOLLOW-UP / RESCHEDULED': [
        'Call Back Requested',
        'Promise Verification Pending',
        'Follow-Up Tomorrow',
        'Client Requested Delay',
    ],
    'ESCALATIONS / OTHER': [
        'Escalated to Supervisor',
        'Legal Action Recommended',
        'Disconnected / Write-Off',
        'Settled / Account Closed',
        'Deceased / Unrecoverable',
    ],
};


export const dispositionLogs: CallDispositionLog[] = [
    { call_id: 'disp-1', agent_id: 'u4', lead_id: 'd1', disposition_type: 'Promise to Pay (PTP)', disposition_notes: 'Promised to pay next Friday.', timestamp: '2024-08-01 11:30 AM', call_duration: '4m 15s', campaign_id: 'q3-push', outcome_score: 4, debtorName: 'Emily White', rpc_status: true },
    { call_id: 'disp-2', agent_id: 'u4', lead_id: 'd2', disposition_type: 'Not Interested', disposition_notes: 'Stated they are not interested in any offers.', timestamp: '2024-08-01 10:45 AM', call_duration: '1m 20s', campaign_id: 'q3-push', outcome_score: 1, debtorName: 'Michael Brown', rpc_status: true },
    { call_id: 'disp-3', agent_id: 'u4', lead_id: 'd3', disposition_type: 'Paid / Settled', disposition_notes: 'Paid full amount via card.', timestamp: '2024-07-31 02:10 PM', call_duration: '8m 55s', campaign_id: 'q3-push', outcome_score: 5, debtorName: 'Jessica Green', rpc_status: true },
    { call_id: 'disp-4', agent_id: 'u4', lead_id: 'd4', disposition_type: 'Do Not Call (DNC)', disposition_notes: 'Customer was very angry and requested to be put on DNC list.', timestamp: '2024-07-31 01:05 PM', call_duration: '2m 30s', campaign_id: 'q3-push', outcome_score: 1, debtorName: 'Chris Taylor', rpc_status: true },
    { call_id: 'disp-5', agent_id: 'u4', lead_id: 'd5', disposition_type: 'Call Back Later', disposition_notes: '', timestamp: '2024-07-30 09:00 AM', call_duration: '0m 45s', campaign_id: 'q3-push', outcome_score: 3, debtorName: 'Sarah Miller', rpc_status: false },
];

export const mockTeams: Team[] = [
    {
        team_id: "team-alpha-01",
        org_id: "org-1",
        team_name: "Team Alpha",
        description: "Focused on high-value debt recovery.",
        leader_id: "u3",
        leader_name: "Beatrice Njeri",
        members: [
            { user_id: 'u4', name: 'Peris Wanyangi', role: 'Agent' },
            { user_id: 'u5', name: 'John Okoro', role: 'Agent' },
        ],
        campaign_id: "q3-push",
        campaign_name: "Debt Recovery",
        created_at: "2024-07-15"
    },
    {
        team_id: "team-bravo-02",
        org_id: "org-1",
        team_name: "Team Bravo",
        description: "Handles customer retention and follow-ups.",
        leader_id: "sup-temp-2",
        leader_name: "Sarah Kamau",
        members: [
            { user_id: 'u6', name: 'Grace Akinyi', role: 'Agent' },
            { user_id: 'u7', name: 'Samuel Mwangi', role: 'Agent' },
            { user_id: 'u8', name: 'Fatuma Ali', role: 'Agent' },
        ],
        campaign_id: "retention-24",
        campaign_name: "Customer Retention",
        created_at: "2024-07-18"
    },
     {
        team_id: "team-delta-03",
        org_id: "org-2",
        team_name: "Team Delta",
        description: "Manages new account activations.",
        leader_id: "sup-temp-3",
        leader_name: "Kevin Otieno",
        members: [
            { user_id: 'agent-temp-1', name: 'Agent 1', role: 'Agent' },
            { user_id: 'agent-temp-2', name: 'Agent 2', role: 'Agent' },
        ],
        campaign_id: "new-accounts-q3",
        campaign_name: "New Accounts",
        created_at: "2024-08-01"
    }
];

export const mockCampaigns = [
    { id: 1, name: 'Q3 Financial Push', type: 'Outbound', status: 'Active', supervisor: 'Andrew Mayaka', leads: 5000, progress: 65 },
    { id: 2, name: 'New Leads Outreach', type: 'Outbound', status: 'Active', supervisor: 'Beatrice Njeri', leads: 7500, progress: 40 },
    { id: 3, name: 'Inbound Customer Service', type: 'Inbound', status: 'Active', supervisor: 'Andrew Mayaka', leads: null, progress: 100 },
    { id: 4, name: 'Past-Due Follow-up', type: 'Outbound', status: 'Paused', supervisor: 'Beatrice Njeri', leads: 2500, progress: 80 },
];
