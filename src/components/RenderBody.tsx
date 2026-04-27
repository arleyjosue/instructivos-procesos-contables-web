import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { PortableTextBlock } from 'next-sanity';
import { urlFor } from '../lib/sanity.client';

// Definimos interfaces para los valores que recibimos de Sanity
interface ImageValue {
  alt?: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface YouTubeValue {
  url: string;
}

// Usamos el tipo 'PortableTextComponents' para validar todo el objeto
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => (
      <div className="my-6">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Imagen del proceso'}
          width={800}
          height={450}
          className="rounded-lg shadow-lg"
        />
      </div>
    ),
    youtube: ({ value }: { value: YouTubeValue }) => {
      const id = value.url.split('v=')[1];
      return (
        <div className="aspect-video my-8">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            className="w-full h-full rounded-md"
            allowFullScreen
          />
        </div>
      );
    },
  },
  marks: {
    // Para las marcas (estilos), el valor contiene las propiedades personalizadas como 'hex'
    textColor: ({ children, value }: { children: React.ReactNode; value?: { color: string } }) => (
      <span style={{ color: value?.color }}>{children}</span>
    ),
    link: ({ children, value }: { children: React.ReactNode; value?: { href: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    // Balas para listas no ordenadas
    bullet: ({ children }) => (
      <ul className="list-disc ml-8 my-4 space-y-2">
        {children}
      </ul>
    ),
    // Números para listas ordenadas
    number: ({ children }) => (
      <ol className="list-decimal ml-8 my-4 space-y-2">
        {children}
      </ol>
    ),
  },

  listItem: {
    // Estilo para cada ítem de la lista
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },  
};

export default function RenderBody({ content }: { content: PortableTextBlock[] }) {
  console.log('content ================ ',content[2].children)
  return (
    <div className="prose max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}