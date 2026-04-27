import { PortableTextBlock } from 'next-sanity';

export interface IInstructivo {
  _id: string;
  title: string;
  slug: { current: string };
  body: PortableTextBlock[]; // Reemplaza 'any' por este tipo oficial
  category?: string;
}