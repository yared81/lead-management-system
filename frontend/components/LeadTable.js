'use client';

const STATUS_OPTIONS = ['All', 'New', 'Engaged', 'Proposal_Sent', 'Closed_Won', 'Closed_Lost'];

const STATUS_STYLES = {
  New: 'bg-blue-50 text-blue-700',
  Engaged: 'bg-indigo-50 text-indigo-700',
  Proposal_Sent: 'bg-yellow-50 text-yellow-800',
  Closed_Won: 'bg-green-50 text-green-700',
  Closed_Lost: 'bg-red-50 text-red-600',
};

const formatStatus = (s) => s.replace('_', ' ');

export default function LeadTable({
  leads,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onDeleteClick,
}) {
  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 p-4 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : formatStatus(s)}</option>
          ))}
        </select>
        {(search || statusFilter !== 'All') && (
          <button
            onClick={() => { setSearch(''); setStatusFilter('All'); }}
            className="px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white transition"
          >
            Clear
          </button>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-400 text-sm">
            {search || statusFilter !== 'All' ? 'No leads match your search.' : 'No leads yet.'}
          </p>
        </div>
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Added</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-5 py-3.5 font-medium text-gray-900">{lead.name}</td>
                <td className="px-5 py-3.5 text-gray-500">{lead.email}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                    {formatStatus(lead.status)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-400 text-xs">
                  {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    onClick={() => onDeleteClick(lead)}
                    className="text-xs text-gray-300 group-hover:text-red-500 transition-colors hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
