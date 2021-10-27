export interface ForumReport {
    reportId:number;
    sender:string;
    user:string;
    reason:string;
    details:string;
    status:number;
    createdAt:Date;
    updatedAt:Date;
}

/**
 * Report Statuses:
 * 0 - Pending (default)
 * 1 - Denied
 * 2 - Approved
 */