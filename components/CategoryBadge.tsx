const categoryColors: Record<string, string> = {
  'File System': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  'Developer Tools': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Database': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Search': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'Utilities': 'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300',
  'AI': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'Browser': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Communication': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  'Maps': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

const fallback = 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300'

export default function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[category] ?? fallback}`}
    >
      {category}
    </span>
  )
}
