export interface CardTypes {
  id: string;
  title: string;
  column: string;
}

export interface ColumnProps {
  title: string;
  headingColor: string;
  cards: CardTypes[];
  column: string;
  setCards: React.Dispatch<React.SetStateAction<CardTypes[]>>;
}

export interface CardProps {
  title: string;
  id: string;
  column: string;
  handleDragStart: (e: React.DragEvent, card: CardTypes) => void;
}

export interface DropIndicatorProps {
  beforeId: string | null;
  column: string;
}

export interface BurnBarrelProps {
  setCards: React.Dispatch<React.SetStateAction<CardTypes[]>>;
}

export interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<CardTypes[]>>;
}