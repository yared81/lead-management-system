'use client';
import { useState, useEffect } from 'react';
import LeadForm from '../components/LeadForm';
import LeadTable from '../components/LeadTable';
import Toast from '../components/Toast';
import DeleteModal from '../components/DeleteModal';

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${apiUrl}/leads`);
      if (res.ok) setLeads(await res.json());
    } catch (err) {
      showToast('Could not load leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLeadAdded = () => {
    fetchLeads();
    showToast('Lead added successfully');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${apiUrl}/leads/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== deleteTarget.id));
        showToast(`${deleteTarget.name} removed`, 'error');
      }
    } catch {
      showToast('Delete failed', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const filtered = leads.filter(lead => {
    const q = search.toLowerCase();
    const matchesSearch = lead.name.toLowerCase().includes(q) || lead.email.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total', value: leads.length, key: 'All', color: 'text-gray-900' },
    { label: 'New', value: leads.filter(l => l.status === 'New').length, key: 'New', color: 'text-blue-600' },
    { label: 'Engaged', value: leads.filter(l => l.status === 'Engaged').length, key: 'Engaged', color: 'text-indigo-600' },
    { label: 'Won', value: leads.filter(l => l.status === 'Closed_Won').length, key: 'Closed_Won', color: 'text-green-600' },
    { label: 'Lost', value: leads.filter(l => l.status === 'Closed_Lost').length, key: 'Closed_Lost', color: 'text-red-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.map(({ label, value, key, color }) => (
          <button
            key={key}
            onClick={() => setStatusFilter(statusFilter === key ? 'All' : key)}
            className={`bg-white border rounded-xl px-4 py-4 text-left transition-all hover:shadow-sm ${
              statusFilter === key ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'
            }`}
          >
            <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </button>
        ))}
      </div>

      {/* Two column layout: form left, table right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Add Lead form — left column */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Add Lead</h2>
          <LeadForm
            onLeadAdded={handleLeadAdded}
            onError={(msg) => showToast(msg, 'error')}
          />
        </div>

        {/* Leads table — right 2 columns */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Loading...</div>
          ) : (
            <LeadTable
              leads={filtered}
              allLeads={leads}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onDeleteClick={setDeleteTarget}
            />
          )}
        </div>
      </div>

      <DeleteModal
        lead={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
