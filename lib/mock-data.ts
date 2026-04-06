export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'
export type ControlStatus = 'pass' | 'fail' | 'partial' | 'not-tested'
export type ScanStatus = 'completed' | 'scheduled' | 'in-progress' | 'failed'
export type ResourceStatus = 'compliant' | 'at-risk' | 'non-compliant'

export interface SecondaryMetric {
  label: string
  value: number
  color: 'teal' | 'cyan' | 'blue'
}

export interface ScanEvent {
  id: string
  title: string
  status: ScanStatus
  timestamp: string
  resourceCount?: number
}

export interface StatCard {
  id: string
  label: string
  value: string | number
  delta: string
  deltaPositive: boolean
  icon: string
}

export interface AIFinding {
  id: string
  title: string
  description: string
  status?: string
  severity: Severity
  source: string
  timestamp: string
  soc2Control: string
  soc2Name: string
  affectedResource: string
  remediationUrl: string
}

export interface ComplianceControl {
  id: string
  name: string
  description: string
  category: string
  status: ControlStatus
  lastReviewed: string
  owner: string
  evidenceRate: number // 0–100: % of required evidence artifacts collected
}

export interface ActivityEvent {
  id: string
  type: 'alert' | 'resolution' | 'login' | 'policy' | 'scan'
  message: string
  source: string
  timestamp: string
  severity?: Severity
}

export interface ThreatDataPoint {
  date: string
  threats: number
  resolved: number
  critical: number
}

export interface AzureResource {
  id: string
  label: string
  resourceType?: string
  complianceScore: number // 0–100
  status: ResourceStatus
  controlCount: number // # of SOC 2 controls that cover this resource type
  openFindings: number
}

// ─── Stat cards ──────────────────────────────────────────────────────────────

export const statCards: StatCard[] = [
  {
    id: 'open-findings',
    label: 'Open Findings',
    value: 5,
    delta: '2 require immediate action',
    deltaPositive: false,
    icon: 'AlertOctagon',
  },
  {
    id: 'soc2-readiness',
    label: 'SOC 2 Readiness',
    value: '74%',
    delta: '↑ 4% this month',
    deltaPositive: true,
    icon: 'ShieldCheck',
  },
  {
    id: 'evidence-gathered',
    label: 'Evidence Gathered',
    value: '34/41',
    delta: '7 requests outstanding',
    deltaPositive: false,
    icon: 'FolderCheck',
  },
  {
    id: 'critical-cves',
    label: 'Critical CVEs',
    value: 4,
    delta: '2 require immediate action',
    deltaPositive: false,
    icon: 'Bug',
  },
]

// ─── AI findings ─────────────────────────────────────────────────────────────
// Descriptions name the specific resource. Controls align with complianceControls statuses.

export const aiFindings: AIFinding[] = [
  {
    id: 'finding-1',
    title: 'Over-Privileged Service Principal',
    description:
      "'app-prod-deploy' holds Owner role on the subscription — scope down to Contributor on target resource groups only.",
    severity: 'critical',
    source: 'Microsoft Entra ID',
    timestamp: '2 hours ago',
    soc2Control: 'CC6.1',
    soc2Name: 'Logical Access',
    affectedResource: 'app-prod-deploy (SP)',
    remediationUrl:
      'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices',
  },
  {
    id: 'finding-2',
    title: 'MFA Not Enforced on Privileged Accounts',
    description:
      "Conditional Access policy gap: 'admin@contoso.com' and 'svc-deploy@contoso.com' can authenticate without MFA.",
    severity: 'high',
    source: 'Microsoft Entra ID',
    timestamp: '4 hours ago',
    soc2Control: 'CC6.2',
    soc2Name: 'Authentication',
    affectedResource: '2 admin accounts',
    remediationUrl:
      'https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-policy-admin-mfa',
  },
  {
    id: 'finding-3',
    title: 'Storage Access Keys Unrotated (127 days)',
    description:
      "'stgprodbackup01' account keys exceed the 90-day rotation policy — disable key-based auth and migrate to managed identity.",
    severity: 'high',
    source: 'Microsoft Defender for Cloud',
    timestamp: '6 hours ago',
    soc2Control: 'CC6.3',
    soc2Name: 'Access Provisioning',
    affectedResource: 'stgprodbackup01',
    remediationUrl:
      'https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal',
  },
  {
    id: 'finding-4',
    title: 'SQL Server Allows Unencrypted Connections',
    description:
      "'sql-prod-eastus' has Minimal TLS Version set to None — cleartext connections accepted on port 1433.",
    severity: 'medium',
    source: 'Microsoft Defender for Cloud',
    timestamp: '1 day ago',
    soc2Control: 'C1.2',
    soc2Name: 'Secure Communications',
    affectedResource: 'sql-prod-eastus',
    remediationUrl:
      'https://learn.microsoft.com/en-us/azure/azure-sql/database/connectivity-settings?tabs=azure-portal#minimal-tls-version',
  },
  {
    id: 'finding-5',
    title: 'Tenant Password Policy Below CIS Baseline',
    description:
      'Azure AD allows 6-character passwords with no complexity requirement. CIS Azure Benchmark L1 requires 14+ characters.',
    severity: 'medium',
    source: 'Azure Policy',
    timestamp: '1 day ago',
    soc2Control: 'CC6.1',
    soc2Name: 'Logical Access',
    affectedResource: 'contoso.onmicrosoft.com',
    remediationUrl:
      'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises',
  },
]

// ─── Compliance controls ──────────────────────────────────────────────────────
// statuses must be consistent with aiFindings above:
//   CC6.1 → partial (critical + medium findings active)
//   CC6.2 → fail    (high finding: MFA gap)
//   CC6.3 → partial (high finding: key rotation)
//   C1.2  → partial (medium finding: TLS)
//   A1.2  → fail    (no active finding but DR plan untested)

export const complianceControls: ComplianceControl[] = [
  {
    id: 'CC6.1',
    name: 'Logical & Physical Access Controls',
    description:
      'Access restricted via least-privilege RBAC; quarterly access reviews; service principal roles scoped to resource groups',
    category: 'Logical Access',
    status: 'partial',
    lastReviewed: '2026-03-25',
    owner: 'Security Team',
    evidenceRate: 72,
  },
  {
    id: 'CC6.2',
    name: 'Authentication & MFA Enforcement',
    description:
      'MFA required for all privileged accounts via Conditional Access; SSPR enabled; phishing-resistant auth for admins',
    category: 'Logical Access',
    status: 'fail',
    lastReviewed: '2026-03-24',
    owner: 'Security Team',
    evidenceRate: 45,
  },
  {
    id: 'CC6.3',
    name: 'Access Provisioning & Deprovisioning',
    description:
      'Joiner/mover/leaver process documented; storage keys rotated within 90 days; KV-managed secrets for service accounts',
    category: 'Logical Access',
    status: 'partial',
    lastReviewed: '2026-03-21',
    owner: 'Security Team',
    evidenceRate: 62,
  },
  {
    id: 'CC7.2',
    name: 'Encryption at Rest',
    description:
      'All storage accounts and SQL databases encrypted with AES-256; CMK stored in Key Vault with automatic rotation',
    category: 'Encryption',
    status: 'pass',
    lastReviewed: '2026-03-24',
    owner: 'Infrastructure',
    evidenceRate: 94,
  },
  {
    id: 'CC8.1',
    name: 'Change Management Process',
    description:
      'Change requests require approval and rollback plan; deployments gated to approved Azure DevOps pipelines',
    category: 'Change Management',
    status: 'partial',
    lastReviewed: '2026-03-22',
    owner: 'DevOps',
    evidenceRate: 58,
  },
  {
    id: 'A1.1',
    name: 'Backup & Recovery Procedures',
    description:
      'Azure Backup configured for all Tier-1 workloads; geo-redundant storage; monthly restore tests documented',
    category: 'Availability',
    status: 'pass',
    lastReviewed: '2026-03-20',
    owner: 'Operations',
    evidenceRate: 88,
  },
  {
    id: 'A1.2',
    name: 'Disaster Recovery Plan',
    description:
      'DR runbook exists; failover to East US 2 secondary region; annual tabletop test not yet completed for FY26',
    category: 'Availability',
    status: 'fail',
    lastReviewed: '2026-03-18',
    owner: 'Risk Management',
    evidenceRate: 23,
  },
  {
    id: 'C1.1',
    name: 'Data Classification & Handling',
    description:
      'Microsoft Purview sensitivity labels applied across M365 and Azure Data Lake; DLP policies block external sharing of Confidential data',
    category: 'Confidentiality',
    status: 'pass',
    lastReviewed: '2026-03-25',
    owner: 'Data Protection',
    evidenceRate: 91,
  },
  {
    id: 'C1.2',
    name: 'Encryption in Transit (TLS)',
    description:
      'TLS 1.2+ enforced on App Gateway and API Management; SQL server TLS enforcement gap identified in prod',
    category: 'Confidentiality',
    status: 'partial',
    lastReviewed: '2026-03-10',
    owner: 'Network Security',
    evidenceRate: 61,
  },
  {
    id: 'I1.1',
    name: 'Data Integrity Controls',
    description:
      'SHA-256 checksums validated on all pipeline data imports; Azure Monitor alerts on unexpected write ops to prod containers',
    category: 'Integrity',
    status: 'pass',
    lastReviewed: '2026-03-23',
    owner: 'Database Team',
    evidenceRate: 87,
  },
]

// ─── Azure resource nodes (resource map + compliance rates chart) ─────────────

export const azureResources: AzureResource[] = [
  { id: 'identity',  label: 'Identity',  complianceScore: 42, status: 'non-compliant', controlCount: 3, openFindings: 3 },
  { id: 'storage',   label: 'Storage',   complianceScore: 82, status: 'compliant',     controlCount: 4, openFindings: 1 },
  { id: 'keyvault',  label: 'Key Vault', complianceScore: 91, status: 'compliant',     controlCount: 2, openFindings: 0 },
  { id: 'network',   label: 'Network',   complianceScore: 61, status: 'at-risk',       controlCount: 1, openFindings: 1 },
  { id: 'compute',   label: 'Compute',   complianceScore: 65, status: 'at-risk',       controlCount: 2, openFindings: 0 },
  { id: 'logging',   label: 'Logging',   complianceScore: 87, status: 'compliant',     controlCount: 2, openFindings: 0 },
]

// ─── Activity events ──────────────────────────────────────────────────────────

export const activityEvents: ActivityEvent[] = [
  {
    id: 'event-1',
    type: 'alert',
    message: "Critical finding: 'app-prod-deploy' service principal holds Owner on subscription",
    source: 'Microsoft Entra ID',
    timestamp: 'Just now',
    severity: 'critical',
  },
  {
    id: 'event-2',
    type: 'resolution',
    message: 'IAM policy remediation completed — 3 stale role assignments removed',
    source: 'Automated Remediation',
    timestamp: '15 mins ago',
    severity: 'info',
  },
  {
    id: 'event-3',
    type: 'login',
    message: "'admin@contoso.com' signed in without MFA from IP 104.21.x.x",
    source: 'Entra Sign-in Logs',
    timestamp: '45 mins ago',
  },
  {
    id: 'event-4',
    type: 'policy',
    message: 'Azure Policy initiative "CIS Azure 2.0" assigned to production subscription',
    source: 'Azure Policy',
    timestamp: '2 hours ago',
  },
  {
    id: 'event-5',
    type: 'scan',
    message: 'NSG audit complete — 2 rules allow unrestricted inbound on port 22',
    source: 'Defender for Cloud',
    timestamp: '3 hours ago',
    severity: 'high',
  },
  {
    id: 'event-6',
    type: 'alert',
    message: 'Anomalous bulk-read detected on stgprodbackup01 — 4.2 GB in 8 minutes',
    source: 'Microsoft Sentinel',
    timestamp: '5 hours ago',
    severity: 'medium',
  },
]

// ─── Threat trend data ────────────────────────────────────────────────────────

export const threatTrendData: ThreatDataPoint[] = [
  { date: 'Mar 22', threats: 14, resolved: 9,  critical: 2 },
  { date: 'Mar 23', threats: 18, resolved: 12, critical: 3 },
  { date: 'Mar 24', threats: 16, resolved: 14, critical: 2 },
  { date: 'Mar 25', threats: 22, resolved: 18, critical: 4 },
  { date: 'Mar 26', threats: 28, resolved: 19, critical: 5 },
  { date: 'Mar 27', threats: 25, resolved: 22, critical: 3 },
  { date: 'Mar 28', threats: 23, resolved: 23, critical: 1 },
  { date: 'Mar 29', threats: 20, resolved: 19, critical: 2 },
  { date: 'Mar 30', threats: 26, resolved: 20, critical: 3 },
  { date: 'Mar 31', threats: 24, resolved: 24, critical: 1 },
  { date: 'Apr 01', threats: 19, resolved: 18, critical: 0 },
  { date: 'Apr 02', threats: 23, resolved: 19, critical: 2 },
  { date: 'Apr 03', threats: 27, resolved: 25, critical: 3 },
  { date: 'Apr 04', threats: 23, resolved: 20, critical: 1 },
]

// ─── SOC 2 secondary metrics (drives donut rings) ────────────────────────────
// Avg = (68 + 74 + 81) / 3 = 74 — matches statCards soc2-readiness

export const soc2SecondaryMetrics: SecondaryMetric[] = [
  { label: 'Security',        value: 68, color: 'teal' },
  { label: 'Availability',    value: 74, color: 'cyan' },
  { label: 'Confidentiality', value: 81, color: 'blue' },
]

// ─── Recent automated scans ───────────────────────────────────────────────────

export const recentScans: ScanEvent[] = [
  {
    id: 'scan-1',
    title: 'IAM Role Permissions Audit',
    status: 'completed',
    timestamp: '3 hours ago',
    resourceCount: 24,
  },
  {
    id: 'scan-2',
    title: 'Storage Account Security Review',
    status: 'completed',
    timestamp: '5 hours ago',
    resourceCount: 8,
  },
  {
    id: 'scan-3',
    title: 'Encryption Policy Validation',
    status: 'scheduled',
    timestamp: 'In 2 hours',
    resourceCount: 12,
  },
  {
    id: 'scan-4',
    title: 'Network Security Group Audit',
    status: 'in-progress',
    timestamp: 'Running now',
    resourceCount: 6,
  },
  {
    id: 'scan-5',
    title: 'Key Vault Access Policy Review',
    status: 'completed',
    timestamp: '8 hours ago',
    resourceCount: 11,
  },
  {
    id: 'scan-6',
    title: 'Azure AD MFA Enforcement Check',
    status: 'completed',
    timestamp: '12 hours ago',
    resourceCount: 4,
  },
  {
    id: 'scan-7',
    title: 'Public IP Exposure Scan',
    status: 'completed',
    timestamp: '1 day ago',
    resourceCount: 19,
  },
  {
    id: 'scan-8',
    title: 'Log Analytics Workspace Configuration',
    status: 'scheduled',
    timestamp: 'Tomorrow 9:00 AM',
    resourceCount: 3,
  },
  {
    id: 'scan-9',
    title: 'Defender for Cloud Recommendations Sync',
    status: 'in-progress',
    timestamp: 'Running now',
    resourceCount: 7,
  },
  {
    id: 'scan-10',
    title: 'Storage Account Public Container Audit',
    status: 'failed',
    timestamp: '2 days ago',
    resourceCount: 5,
  },
  {
    id: 'scan-11',
    title: 'TLS Policy Baseline Validation',
    status: 'completed',
    timestamp: '3 days ago',
    resourceCount: 15,
  },
  {
    id: 'scan-12',
    title: 'Azure Policy Assignment Drift Check',
    status: 'scheduled',
    timestamp: 'In 6 hours',
    resourceCount: 9,
  },
]
