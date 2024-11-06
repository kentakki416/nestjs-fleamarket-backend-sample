export enum BookStatus {
  RENTABLE = 'RENTABLE',
  LENT_OUT = 'LENT_OUT',
}

export interface Book {
  id: string;
  name: string;
  status: BookStatus;
}
