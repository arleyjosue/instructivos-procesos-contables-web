import { getCategories, getInstructivosByCategory } from "../services/getInstructivos";
import { ContentPage } from "../components/ContentPage";

export default async function Home() {
  const categorias = await getCategories();
  
  // Traemos los instructivos de la primera categoría para que la página no abra vacía
  const primerCatId = categorias[0]?._id || "";
  const instructivosIniciales = await getInstructivosByCategory(primerCatId); 

  return (
    <>
      <ContentPage 
        initialContent={instructivosIniciales} 
        categories={categorias} 
        // Pasamos la acción del servidor como prop directa
        fetchInstructivosByCat={getInstructivosByCategory} 
      />
    </>
  );
}