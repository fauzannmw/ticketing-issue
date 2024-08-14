declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    name: string;
    email: string;
    userId: string;
    divisionId?: number;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: User;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}

export interface ColumnProps {
  title: string;
  headingColor: string;
  cards: CardTypes[];
  status: string;
  setCards: React.Dispatch<React.SetStateAction<CardTypes[]>>;
}

export interface CardProps {
  id: string;
  issue: string;
  status: string;
  authorName: string;
  handleDragStart: (e: React.DragEvent, card: CardTypes) => void;
}

export interface CardTypes {
  id: string;
  issue: string;
  status: string;
  authorName: string;
  
}

export interface DropIndicatorProps {
  beforeId: string | null;
  status: string;
}

export interface BurnBarrelProps {
  setCards: React.Dispatch<React.SetStateAction<CardTypes[]>>;
}

export interface AddCardProps {
  status: string;
  setCards: React.Dispatch<React.SetStateAction<CardTypes[]>>;
}
