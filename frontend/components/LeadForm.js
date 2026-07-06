'use client';
import { useState } from 'react';

export default function LeadForm({ onLeadAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('New');
  
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg({ text: '', type: '' });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, status }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg({ text: data.error || 'Server error', type: 'error' });
      } else {
        setMsg({ text: 'Lead saved successfully!', type: 'success' });
        setName('');
        setEmail('');
        setStatus('New');
        onLeadAdded();
      }
    } catch (err) {
      setMsg({ text: 'Network error', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg.text && (
        <div className={`p-3 rounded-md text-sm ${
          msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
        }`}>
          {msg.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            required 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            required 
            type="email" 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={status} 
            onChange={e => setStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Engaged">Engaged</option>
            <option value="Proposal_Sent">Proposal Sent</option>
            <option value="Closed_Won">Closed Won</option>
            <option value="Closed_Lost">Closed Lost</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? 'Saving...' : 'Add Lead'}
      </button>
    </form>
  );
}
