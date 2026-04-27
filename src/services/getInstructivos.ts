import { IInstructivo } from "../interfaces/IInstructivo";
import { client } from "../lib/sanity.client";


export const getInstructivos = async (): Promise<IInstructivo[]> => {
  const query = `*[_type == "instructivo"]{
    _id,
    title,
    slug,
    body,
    "category": category->title
  }`;

  // Usamos revalidate para el secreto del "Sin Redeploy" [cite: 21, 269]
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
};