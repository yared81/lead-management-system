'use client';
import { useState } from 'react';

export default function LeadForm({ onLeadAdded, onError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, status: 'New' }),
      });

      const data = await res.json();

      if (!res.ok) {
        onError?.(data.error || 'Failed to add lead');
      } else {
        setName('');
        setEmail('');
        onLeadAdded?.();
      }
    } catch {
      onError?.('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
        <input
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all"
      >
        {isSubmitting ? 'Adding...' : 'Add Lead'}
      </button>
    </form>
  );
}
