export default function Toast({ message, type }) {
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-xs animate-slide-in ${
      type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'
    }`}>
      <span className="text-base">{type === 'error' ? '✕' : '✓'}</span>
      {message}
    </div>
  );
}
