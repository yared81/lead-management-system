'use client';
import { useState, useEffect } from 'react';
import LeadForm from '../components/LeadForm';
import LeadTable from '../components/LeadTable';

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/leads`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">Lead Manager</h1>
        
        <LeadForm onLeadAdded={fetchLeads} />
        
        <hr className="my-8 border-gray-200" />
        
        <h2 className="text-xl font-semibold mb-4">All Leads</h2>
        {loading ? (
          <p className="text-gray-500">Loading leads...</p>
        ) : (
          <LeadTable leads={leads} />
        )}
      </div>
    </main>
  );
}
