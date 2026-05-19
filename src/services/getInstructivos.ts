// import { IInstructivo } from "../interfaces/IInstructivo";
// import { client } from "../lib/sanity.client";


// export const getInstructivos = async (): Promise<IInstructivo[]> => {
//   const query = `*[_type == "instructivo"]{
//     _id,
//     title,
//     slug,
//     body,
//     "category": category->title
//   }`;

//   // Usamos revalidate para el secreto del "Sin Redeploy" [cite: 21, 269]
//   return await client.fetch(query, {}, { next: { revalidate: 60 } });
// };

'use server';

import { ICategory } from "../interfaces/ICategory";
import { IInstructivo } from "../interfaces/IInstructivo";
import { client } from "../lib/sanity.client";


/**
 * 1. Obtener TODAS las categorías para pintarlas en los Tabs/Select
 */
export const getCategories = async (): Promise<ICategory[]> => {
  const query = `*[_type == "category"]{
    _id,
    title,
    slug
  }`;
  
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
};

/**
 * 2. Obtener instructivos filtrados por una categoría específica
 * @param categorySlug El slug de la categoría seleccionada
 */
export const getInstructivosByCategory = async (categoryId: string): Promise<IInstructivo[]> => {
  // El operador "&&" nos permite filtrar por tipo Y por la referencia de la categoría
  const query = `*[_type == "instructivo" && references($categoryId)]{
    _id,
    title,
    slug,
    body,
    "category": category->title
  }`;

  return await client.fetch(query, { categoryId }, { next: { revalidate: 60 } });
};

/**
 * 3. Tu query original (opcional, por si quieres mostrar "Todos" al inicio)
 */
export const getInstructivos = async (): Promise<IInstructivo[]> => {
  const query = `*[_type == "instructivo"]{
    _id,
    title,
    slug,
    body,
    "category": category->title
  }`;

  return await client.fetch(query, {}, { next: { revalidate: 60 } });
};