export interface ILink {
  href: string;
  label: string;
}

export type TLinks = ILink[];

export interface IModalHandlers {
  type: string;
  label: string;
}

export type TModalHandlers = IModalHandlers[];

export interface ClaimPayload {
  businessEmail: string;
  businessPhone: string;
  jobTitle: string;
  message: string;
  entityId: number;
}
