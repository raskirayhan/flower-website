import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { Button } from '../components/ui/Button.js';
import { Badge } from '../components/ui/Badge.js';
import { Toast } from '../components/ui/Toast.js';
import { formatCurrency } from '../lib/utils.js';

export const DashboardPage: React.FC = () => {
  const { user, demoLogin } = useAuth();
  const currentRole = user?.role || 'ADMIN';
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || 'Sarah Jenkins');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 234-5678');
  const [profileBio, setProfileBio] = useState('Urban gardener and orchid lover.');
  const [profileSaving, setProfileSaving] = useState(false);

  // Table filters & pagination
  const [statusFilter, setStatusFilter] = useState('all');
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleRoleChange = (role: 'USER' | 'ADMIN' | 'MANAGER') => {
    demoLogin(role);
    setToastMessage(`Switched active view to ${role} Role`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setTimeout(() => {
      setProfileSaving(false);
      setToastMessage('Profile details saved successfully!');
    }, 800);
  };

  // Sidebar menus per role
  const userMenu = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'My Orders', icon: '📦' },
    { id: 'wishlist', label: 'Plant Wishlist', icon: '💖' },
    { id: 'profile', label: 'Account Profile', icon: '👤' },
  ];

  const adminMenu = [
    { id: 'overview', label: 'System Overview', icon: '📊' },
    { id: 'orders', label: 'All Orders', icon: '📦' },
    { id: 'inventory', label: 'Plant Inventory', icon: '🌿' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'profile', label: 'Store Settings', icon: '⚙️' },
  ];

  const managerMenu = [
    { id: 'overview', label: 'Manager Overview', icon: '📊' },
    { id: 'orders', label: 'Dispatch & Orders', icon: '🚚' },
    { id: 'inventory', label: 'Stock Management', icon: '🌿' },
    { id: 'analytics', label: 'Greenhouse Analytics', icon: '📈' },
    { id: 'profile', label: 'Supplier Notes', icon: '📝' },
  ];

  const currentMenu =
    currentRole === 'ADMIN' ? adminMenu : currentRole === 'MANAGER' ? managerMenu : userMenu;

  const ordersData = [
    { id: 'FM-8901', customer: 'Sarah Jenkins', item: 'Peace Lily Air Purifier', amount: 38.0, status: 'Dispatched', date: '2026-10-25' },
    { id: 'FM-8902', customer: 'Rayhan Raski', item: 'Velvet Ecuadorian Roses', amount: 54.0, status: 'Delivered', date: '2026-10-24' },
    { id: 'FM-8903', customer: 'Marcus Vance', item: 'Kyoto Heritage Juniper Bonsai', amount: 88.0, status: 'Processing', date: '2026-10-23' },
    { id: 'FM-8904', customer: 'Elena Rostova', item: 'Royal White Phalaenopsis Orchid', amount: 46.0, status: 'Delivered', date: '2026-10-22' },
    { id: 'FM-8905', customer: 'Sophia Chen', item: 'Blushing Peony Bridal Bouquet', amount: 78.0, status: 'Processing', date: '2026-10-21' },
  ];

  const filteredOrders = ordersData.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      o.customer.toLowerCase().includes(tableSearch.toLowerCase()) ||
      o.item.toLowerCase().includes(tableSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(tableSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-xl bg-[#E95A08] flex items-center justify-center text-white text-xl">
              🌸
            </span>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">Floral Portal</h2>
              <Badge variant="primary" className="text-[10px] py-0 px-2">
                {currentRole} Role
              </Badge>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {currentMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === item.id
                    ? 'bg-[#E95A08] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Role Switcher */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-2">
            Switch Role Mode
          </label>
          <div className="flex gap-1">
            <button
              onClick={() => handleRoleChange('USER')}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                currentRole === 'USER' ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              User
            </button>
            <button
              onClick={() => handleRoleChange('ADMIN')}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                currentRole === 'ADMIN' ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleChange('MANAGER')}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                currentRole === 'MANAGER' ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              Manager
            </button>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-6 sm:p-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold font-serif text-slate-900 dark:text-slate-100 capitalize">
              {activeTab} Management
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Active workspace for <strong className="text-slate-700 dark:text-slate-200">{user?.name}</strong> ({currentRole})
            </p>
          </div>
          <Badge variant="success" className="self-start sm:self-auto py-1 px-3">
            ● Live Synchronized
          </Badge>
        </div>

        {/* AI Co-Pilot Recommendation Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#2D6A4F] text-white flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Flora AI Co-Pilot Insight
              </h4>
              <p className="text-xs text-emerald-100 mt-0.5">
                Weekend bridal orders are trending up +28%. Restock Peace Lily hydration pods to prevent dispatch bottlenecks.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-xl bg-white/20 text-xs font-bold">
            Confidence: 96%
          </span>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Total Revenue (MTD)</span>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">$42,850.00</p>
                <span className="text-xs font-bold text-emerald-600 mt-2 block">+14.2% vs last month</span>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Orders Dispatched</span>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">1,280</p>
                <span className="text-xs font-bold text-emerald-600 mt-2 block">+8.6% on-time</span>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Customer Satisfaction</span>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">4.95 / 5.0</p>
                <span className="text-xs font-bold text-[#E95A08] mt-2 block">100% Stems Guaranteed</span>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Greenhouse Humidity</span>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">68%</p>
                <span className="text-xs font-bold text-blue-500 mt-2 block">Optimal Climate</span>
              </div>
            </div>

            {/* Dynamic Responsive SVG Chart */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Monthly Sales & Revenue Growth (Dynamic SVG)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">May – October 2026 performance trend</p>
                </div>
                <Badge variant="primary">+$42.8k YTD</Badge>
              </div>

              {/* Clean SVG Area Chart */}
              <div className="w-full h-56 flex items-end">
                <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E95A08" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#E95A08" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20,120 Q 100,90 180,70 T 340,40 T 480,20 L 480,140 L 20,140 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M 20,120 Q 100,90 180,70 T 340,40 T 480,20"
                    fill="none"
                    stroke="#E95A08"
                    strokeWidth="3"
                  />
                  {/* Data Points */}
                  <circle cx="20" cy="120" r="4" fill="#E95A08" />
                  <circle cx="110" cy="95" r="4" fill="#E95A08" />
                  <circle cx="200" cy="70" r="4" fill="#E95A08" />
                  <circle cx="290" cy="55" r="4" fill="#E95A08" />
                  <circle cx="380" cy="35" r="4" fill="#E95A08" />
                  <circle cx="480" cy="20" r="4" fill="#E95A08" />
                </svg>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-4 px-2">
                <span>May ($18.4k)</span>
                <span>Jun ($24.2k)</span>
                <span>Jul ($29.8k)</span>
                <span>Aug ($33.5k)</span>
                <span>Sep ($38.9k)</span>
                <span>Oct ($42.8k)</span>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table Tab */}
        {(activeTab === 'orders' || activeTab === 'overview') && (
          <div className="mt-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Recent Orders & Dispatch Table
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Filterable and paginated real-time order records.</p>
              </div>

              {/* Table Filters */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Filter by customer, ID..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <option value="all">All Status</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="pb-3 px-2">Order ID</th>
                    <th className="pb-3 px-2">Customer</th>
                    <th className="pb-3 px-2">Botanical Item</th>
                    <th className="pb-3 px-2">Amount</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-2 font-mono font-bold text-slate-900 dark:text-slate-100">{ord.id}</td>
                      <td className="py-3.5 px-2 font-medium text-slate-700 dark:text-slate-300">{ord.customer}</td>
                      <td className="py-3.5 px-2 text-slate-600 dark:text-slate-400">{ord.item}</td>
                      <td className="py-3.5 px-2 font-bold text-slate-900 dark:text-slate-100">{formatCurrency(ord.amount)}</td>
                      <td className="py-3.5 px-2">
                        <Badge
                          variant={
                            ord.status === 'Delivered'
                              ? 'success'
                              : ord.status === 'Dispatched'
                              ? 'primary'
                              : 'warning'
                          }
                        >
                          {ord.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-2 text-slate-400">{ord.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Profile Settings Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Account Profile & Contact Information
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Update your preferences, nursery delivery coordinates, and notification alerts.
            </p>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Bio & Floral Preferences
                </label>
                <textarea
                  rows={3}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <Button type="submit" variant="primary" size="md" isLoading={profileSaving} className="self-start mt-2">
                Save Profile Changes
              </Button>
            </form>
          </div>
        )}
      </main>

      <Toast
        message={toastMessage || ''}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
