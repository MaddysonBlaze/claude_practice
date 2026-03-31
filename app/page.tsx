import { mcpServers, categories } from '@/lib/data/mcp-servers'
import ServerSearch from '@/components/ServerSearch'

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Discover MCP Servers
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-500 dark:text-gray-400">
          A curated directory of open-source{' '}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            Model Context Protocol
          </a>{' '}
          servers. Find the right tool for your AI agent.
        </p>
      </div>

      {/* Search + Cards */}
      <ServerSearch servers={mcpServers} categories={categories} />
    </div>
  )
}
