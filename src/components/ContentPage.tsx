'use client';
import { useState } from "react";
import { IInstructivo } from "../interfaces/IInstructivo"
import RenderBody from "./RenderBody"
import { Sidebar } from "./Sidebar"

export const ContentPage = ({ content }: { content: IInstructivo[] }) => {
  const [insId, setInsId] = useState(content[0]?._id || "");

  return (
    <div className="relative grid grid-cols-[280px_1fr] min-h-screen bg-zinc-50 font-sans dark:bg-black">

      <Sidebar content={content.map((instructivo) => ({ id: instructivo._id, title: instructivo.title, category: instructivo.category || 'sin categoría', slug: instructivo.slug.current }))} setInsId={setInsId} insId={insId} />

      <main className="w-full flex-col items-center justify-between py-10 px-16 bg-white dark:bg-black sm:items-start">
        {content.filter((instructivo) => instructivo._id === insId).map((instructivo) => (
          <div key={instructivo._id} className="w-full mb-8 p-6 transition-shadow duration-300">
            <RenderBody content={instructivo.body} />
          </div>
        ))}
      </main>
    </div>
  )
}