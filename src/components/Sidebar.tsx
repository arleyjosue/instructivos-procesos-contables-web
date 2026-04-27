{/* <div className="grid grid-cols-[280px_1fr] min-h-screen"> */ }

interface SidebarProps {
  content: Content[];
  setInsId: React.Dispatch<React.SetStateAction<string>>;
  insId: string;
}
interface Content {
  id: string;
  title: string;
  category: string;
  slug: string;
}

export const Sidebar = ({ content, setInsId, insId }: SidebarProps) => {

  return (
    <aside className="sticky top-0 h-screen p-4 bg-white dark:bg-gray-900">
      <nav aria-label="Lista de Instructivos">
        <ul className="space-y-2"></ul>
          {content.map((item) => (
            <div key={item.id} className="mb-2">
              <button onClick={() => setInsId(item.id)} className={`${insId === item.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'} w-full text-left px-3 py-2 rounded-md transition-colors duration-200`}>
                <span className="font-semibold">{item.title}</span> 
                <span className="text-[12px]">{" - "}{item.category}</span>
              </button>
            </div>
          ))} 
      </nav>
    </aside>
  )
}

// </div>