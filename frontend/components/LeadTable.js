export default function LeadTable({ leads }) {
  if (!leads || leads.length === 0) {
    return <p className="text-gray-500 italic">No leads found. Add one above!</p>;
  }

  const total = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const wonLeads = leads.filter(l => l.status === 'Closed_Won').length;

  const formatStatus = (s) => s.replace('_', ' ');

  const getStatusBadge = (status) => {
    const badges = {
      New: 'bg-gray-100 text-gray-700',
      Engaged: 'bg-blue-100 text-blue-700',
      Proposal_Sent: 'bg-yellow-100 text-yellow-800',
      Closed_Won: 'bg-green-100 text-green-700',
      Closed_Lost: 'bg-red-100 text-red-700',
    };
    const classes = badges[status] || 'bg-gray-100 text-gray-700';
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes}`}>{formatStatus(status)}</span>;
  };

  return (
    <div>
      <div className="flex gap-4 mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <span className="font-semibold text-gray-900">Total: {total}</span>
        <span>New: {newLeads}</span>
        <span>Won: {wonLeads}</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-900">Name</th>
              <th className="px-4 py-3 font-medium text-gray-900">Email</th>
              <th className="px-4 py-3 font-medium text-gray-900">Status</th>
              <th className="px-4 py-3 font-medium text-gray-900">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900 font-medium">{lead.name}</td>
                <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                <td className="px-4 py-3">{getStatusBadge(lead.status)}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
