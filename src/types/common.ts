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
