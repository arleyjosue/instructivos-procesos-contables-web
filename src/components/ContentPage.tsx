'use client';
import { useState, useTransition } from "react";
import { IInstructivo } from "../interfaces/IInstructivo";
import { ICategory } from "../interfaces/ICategory";
import RenderBody from "./RenderBody";
import { Sidebar } from "./Sidebar";

interface ContentPageProps {
  initialContent: IInstructivo[];
  categories: ICategory[];
  fetchInstructivosByCat: (categoryId: string) => Promise<IInstructivo[]>;
}

export const ContentPage = ({ initialContent, categories, fetchInstructivosByCat }: ContentPageProps) => {
  const [instructivos, setInstructivos] = useState<IInstructivo[]>(initialContent);
  const [catId, setCatId] = useState(categories[0]?._id || "");
  const [insId, setInsId] = useState(initialContent[0]?._id || "");
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (newCatId: string) => {
    setCatId(newCatId);
    startTransition(async () => {
      try {
        const nuevosInstructivos = await fetchInstructivosByCat(newCatId);
        setInstructivos(nuevosInstructivos);
        setInsId(nuevosInstructivos[0]?._id || "");
      } catch (error) {
        console.error("Error al traer los nuevos instructivos:", error);
      }
    });
  };

  return (
    <div className="relative grid grid-cols-[280px_1fr] min-h-screen bg-zinc-50 font-sans dark:bg-black">
      
      <Sidebar
        catId={catId}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        isPending={isPending}
        content={instructivos.map((instructivo) => ({
          id: instructivo._id,
          title: instructivo.title,
          category: instructivo.category || 'sin categoría',
          slug: instructivo.slug.current
        }))}
        setInsId={setInsId}
        insId={insId}
      />
      <main className={`relative w-full flex flex-col py-10 px-16 bg-white dark:bg-black sm:items-start
        ${isPending ? "h-screen overflow-hidden" : "min-h-screen"}`}
      >
        
        {isPending && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 dark:bg-black/20 backdrop-blur-sm">
            <p className="text-sm text-zinc-400 animate-pulse mb-4">Consultando instructivos...</p>
            <div className="spinner" />
          </div>
        )}

        <div className={`w-full ${isPending ? "h-full overflow-hidden opacity-50" : "transition-opacity"}`}>
          {instructivos.filter((instructivo) => instructivo._id === insId).map((instructivo) => (
            <div key={instructivo._id} className="w-full mb-8 p-6 transition-shadow duration-300">
              <RenderBody content={instructivo.body} />
            </div>
          ))}

          {instructivos.length === 0 && !isPending && (
            <p className="text-zinc-500 text-center py-10">
              No hay instructivos disponibles para esta categoría.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};