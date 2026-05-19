'use client';
import { ICategory } from "../interfaces/ICategory";

interface SidebarProps {
  catId: string;
  onCategoryChange: (newCatId: string) => void; // Cambiado aquí
  content: Content[];
  categories: ICategory[];
  setInsId: React.Dispatch<React.SetStateAction<string>>;
  insId: string;
  isPending?: boolean; // Prop opcional para deshabilitar interacciones en carga
}

interface Content {
  id: string;
  title: string;
  category: string;
  slug: string;
}

export const Sidebar = ({ categories, content, setInsId, insId, catId, onCategoryChange, isPending }: SidebarProps) => {
  return (
    <aside className="sticky top-0 h-screen py-10 px-4 bg-gray-100 dark:bg-gray-900">
      <h2>Selecciona una categoría</h2>
      <select 
        className="block w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 focus:outline-none disabled:opacity-50" 
        onChange={(e) => onCategoryChange(e.target.value)} // Llama al manejador que dispara la acción
        value={catId}
        disabled={isPending}
      >
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </select>

      <h2 className="pt-4 pb-2">INSTRUCTIVOS</h2>
      <nav aria-label="Lista de Instructivos">
        {content.map((item) => (
          <div key={item.id} className="mb-2">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setInsId(item.id)} 
                  className={`${insId === item.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'} w-full text-left px-3 py-2 rounded-md transition-colors duration-200`}
                >
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-[12px]">{" - "}{item.category}</span>
                </button>
              </li>
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};