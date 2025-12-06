import { getLinks, saveLink, deleteLink } from '../actions';
import { RefreshCcw, Save, Trash2, ExternalLink } from 'lucide-react';

export default async function Dashboard() {
  const links = await getLinks();

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-bold">Admin Command Center</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-fit">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Rotator
            </h2>
            <form action={saveLink} className="space-y-4">
              <input name="token" required placeholder="Token (e.g. promo1)" className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm text-white" />
              <input name="destination" required placeholder="Destination URL" className="w-full bg-black/50 border border-white/20 rounded p-2 text-sm text-white" />
              <div className="flex items-center gap-2">
                 <input type="checkbox" name="useExternal" id="ext" className="accent-green-500" />
                 <label htmlFor="ext" className="text-xs text-white/70">Use External API</label>
              </div>
              <button className="w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-200">
                <Save className="w-4 h-4 inline mr-2" /> Save Link
              </button>
            </form>
          </div>

          {/* List */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm text-white/70">
              <thead className="bg-white/5 text-white/50 uppercase text-xs">
                <tr><th className="p-4">Token</th><th className="p-4">Destination</th><th className="p-4 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {links.map((link: any) => (
                  <tr key={link._id}>
                    <td className="p-4 text-green-400">/{link.token}</td>
                    <td className="p-4 truncate max-w-[200px]">{link.destinationUrl}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <a href={`/${link.token}`} target="_blank" className="p-2 bg-white/10 rounded"><ExternalLink className="w-4 h-4"/></a>
                      <form action={async () => { 'use server'; await deleteLink(link.token) }}>
                        <button className="p-2 bg-red-500/20 text-red-400 rounded"><Trash2 className="w-4 h-4"/></button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
