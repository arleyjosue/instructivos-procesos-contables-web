import { createClient } from 'next-sanity';
import imageUrlBuilder, { SanityImageSource } from '@sanity/image-url';
// Importamos el tipo para la fuente de la imagen
// import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-04-27",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

// Reemplazamos 'any' por 'SanityImageSource'
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}