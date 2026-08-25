export interface SupportPermissions {
  view: boolean;
  edit: boolean;
  upload: boolean;
  export: boolean;
}

export type SupportPermissionKey = keyof SupportPermissions;

export const SUPPORT_PERMISSION_LABELS: Record<SupportPermissionKey, string> = {
  view: "View case",
  edit: "Add/edit information",
  upload: "Upload evidence",
  export: "Export",
};
