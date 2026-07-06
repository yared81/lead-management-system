'use client';
import { useState, useEffect } from 'react';

export default function EditModal({ lead, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('New');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setEmail(lead.email);
      setStatus(lead.status);
    }
  }, [lead]);

  if (!lead) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(lead.id, { name, email, status });
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onCancel} className="fixed inset-0 z-50 bg-black opacity-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Edit Lead</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
              >
                <option value="New">New</option>
                <option value="Engaged">Engaged</option>
                <option value="Proposal_Sent">Proposal Sent</option>
                <option value="Closed_Won">Closed Won</option>
                <option value="Closed_Lost">Closed Lost</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
