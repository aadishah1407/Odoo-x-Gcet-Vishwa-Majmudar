import React, { useState } from 'react';
import AttendanceView from './AttendanceView';
import ProfileView from './ProfileView';
import './App.css';

function App() {
  // Demo users
  const [users, setUsers] = useState([
    { id: 1, employeeId: 'E001', email: 'admin@company.com', password: 'password', role: 'admin', name: 'Admin User' },
    { id: 2, employeeId: 'E002', email: 'john@company.com', password: 'password', role: 'employee', name: 'John Doe' },
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'dashboard'
  const [pendingVerification, setPendingVerification] = useState(null);
  const [empView, setEmpView] = useState('dashboard');
  function SignUp() {
    const [form, setForm] = useState({ employeeId: '', name: '', email: '', password: '', role: 'employee' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showVerify, setShowVerify] = useState(false);
    const [code, setCode] = useState('');
    const [sentCode] = useState('123456');

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      if (!form.employeeId || !form.email || !form.password || !form.name) {
        setError('All fields are required.');
        return;
      }
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) {
        setError('Invalid email address.');
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      setShowVerify(true);
      setPendingVerification(form);
    };

    const handleVerify = (e) => {
      e.preventDefault();
      if (code === sentCode) {
        setUsers((prev) => [...prev, { ...pendingVerification, id: prev.length + 1 }]);
        setSuccess('Registration successful! You can now sign in.');
        setShowVerify(false);
        setPendingVerification(null);
        setTimeout(() => setView('login'), 1500);
      } else {
        setError('Incorrect verification code.');
      }
    };

    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        {!showVerify ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
              <input 
                name="employeeId" 
                value={form.employeeId} 
                onChange={handleChange} 
                placeholder="E.g., E001" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange} 
                placeholder="Minimum 6 characters" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <select 
                name="role" 
                value={form.role} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition bg-white"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin/HR</option>
              </select>
            </div>
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">{error}</div>}
            {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">{success}</div>}
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
            >
              Create Account
            </button>
            <div className="text-center text-gray-600 mt-4">
              Already have an account? <span className="text-blue-600 cursor-pointer font-semibold hover:underline" onClick={() => setView('login')}>Sign In</span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
              A verification code has been sent to your email. <strong>Demo code: 123456</strong>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
              <input 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                placeholder="Enter 6-digit code" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">{error}</div>}
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
            >
              Verify & Complete Registration
            </button>
          </form>
        )}
      </div>
    );
  }

  // Sign In
  const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      const found = users.find(u => u.email === form.email && u.password === form.password);
      if (!found) {
        setError('Invalid email or password.');
        return;
      }
      setCurrentUser(found);
      setView('dashboard');
    };

    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              value={form.password} 
              onChange={handleChange} 
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">{error}</div>}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
          >
            Sign In
          </button>
          <div className="text-center text-gray-600 mt-4">
            Don't have an account? <span className="text-blue-600 cursor-pointer font-semibold hover:underline" onClick={() => setView('signup')}>Sign Up</span>
          </div>
        </form>
      </div>
    );
  };

  // Admin/HR Dashboard
  const AdminDashboard = () => (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage employees, approvals, and records</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee List Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
          </div>
          <ul className="space-y-3">
            {users.filter(u => u.role === 'employee').map(emp => (
              <li key={emp.id} className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold text-gray-800">{emp.name}</p>
                  <p className="text-sm text-gray-600">{emp.email}</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">View</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Leave Approvals Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H6a6 6 0 016 6v3h1a1 1 0 100 2h-1.22l1.123 2.246a1 1 0 11-1.789.894L12.608 9h-3.216l1.123 2.246a1 1 0 11-1.789.894L9.22 9H7a1 1 0 100 2h1v3a6 6 0 01-6-6V5z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Leave Approvals</h2>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm">No pending leave requests</p>
            <p className="text-2xl font-bold text-green-600 mt-2">0</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 3H3z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Attendance</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-50 p-3 rounded">
              <p className="text-gray-600 text-xs">Present</p>
              <p className="text-2xl font-bold text-green-600">{users.filter(u => u.role === 'employee').length}</p>
            </div>
            <div className="bg-red-50 p-3 rounded">
              <p className="text-gray-600 text-xs">Absent</p>
              <p className="text-2xl font-bold text-red-600">0</p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.454z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">System</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users:</span>
              <span className="font-semibold text-gray-800">{users.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Admins:</span>
              <span className="font-semibold text-gray-800">{users.filter(u => u.role === 'admin').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Employees:</span>
              <span className="font-semibold text-gray-800">{users.filter(u => u.role === 'employee').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Employee Dashboard with navigation
  const EmployeeDashboard = () => (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Employee Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {currentUser?.name}!</p>
      
      {empView === 'dashboard' && (
        <>
          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button 
              onClick={() => setEmpView('profile')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-6 shadow-lg transition transform hover:scale-105"
            >
              <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
              <p className="font-semibold">My Profile</p>
              <p className="text-xs opacity-90">View & Edit</p>
            </button>

            <button 
              onClick={() => setEmpView('attendance')}
              className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg p-6 shadow-lg transition transform hover:scale-105"
            >
              <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H6a6 6 0 016 6v3h1a1 1 0 100 2h-1.22l1.123 2.246a1 1 0 11-1.789.894L12.608 9h-3.216l1.123 2.246a1 1 0 11-1.789.894L9.22 9H7a1 1 0 100 2h1v3a6 6 0 01-6-6V5z" clipRule="evenodd"></path>
              </svg>
              <p className="font-semibold">Attendance</p>
              <p className="text-xs opacity-90">Check In/Out</p>
            </button>

            <button 
              onClick={() => setEmpView('leave')}
              className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg p-6 shadow-lg transition transform hover:scale-105"
            >
              <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              <p className="font-semibold">Leave</p>
              <p className="text-xs opacity-90">Apply & Status</p>
            </button>

            <button 
              onClick={() => setEmpView('payroll')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg p-6 shadow-lg transition transform hover:scale-105"
            >
              <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155.03.299.076.438.114l.738.737a7.5 7.5 0 11-8.341-8.341l.737.738c.039.139.084.283.114.438.358 1.495.378 2.521.043 3.626l-.113.848c-.096.646-.073.822.05 1.02.173.268.65.604 1.667.79.53.1 1.395.523 4.331 4.459s4.358 3.801 4.459 4.331c.186 1.017.522 1.494.79 1.667.198.123.374.146 1.02.05l.848-.113c1.105-.335 2.13-.315 3.626.043.155.03.299.076.438.114a7.5 7.5 0 11-8.341-8.341z"></path>
              </svg>
              <p className="font-semibold">Payroll</p>
              <p className="text-xs opacity-90">View Salary</p>
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-semibold">Today's Status</p>
              <p className="text-3xl font-bold text-green-600 mt-2">Present</p>
              <p className="text-gray-600 text-xs mt-2">9:00 AM - Check In</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-semibold">Leave Balance</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">12 Days</p>
              <p className="text-gray-600 text-xs mt-2">Annual Leave Remaining</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm font-semibold">This Month</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">18 Days</p>
              <p className="text-gray-600 text-xs mt-2">Days Worked</p>
            </div>
          </div>
        </>
      )}

      {empView === 'profile' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>
          <ProfileView user={currentUser} isAdmin={false} onBack={() => setEmpView('dashboard')} onUpdate={updated => setCurrentUser(updated)} />
        </div>
      )}

      {empView === 'attendance' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance</h2>
          <AttendanceView user={currentUser} onBack={() => setEmpView('dashboard')} />
        </div>
      )}

      {empView === 'leave' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave Requests</h2>
          <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-blue-700">Leave management system is coming soon!</p>
          </div>
          <button 
            onClick={() => setEmpView('dashboard')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Back to Dashboard
          </button>
        </div>
      )}

      {empView === 'payroll' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payroll</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 rounded">
              <p className="text-gray-600 text-sm">Basic Salary</p>
              <p className="text-3xl font-bold text-green-600 mt-2">$5,000</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded">
              <p className="text-gray-600 text-sm">Net Salary</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">$4,500</p>
            </div>
          </div>
          <button 
            onClick={() => setEmpView('dashboard')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );

  // Main App render
  return (
    <div className="app-container" style={{ minHeight: '100vh' }}>
      {view === 'login' || view === 'signup' ? (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          <div style={{ width: '100%', maxWidth: '450px' }}>
            {/* Logo Section */}
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
              animation: 'slideInDown 0.6s ease-out'
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '10px',
                textShadow: '0 4px 6px rgba(0,0,0,0.2)'
              }}>
                📊 Dayflow
              </div>
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '16px',
                margin: 0,
                letterSpacing: '0.5px'
              }}>
                Human Resource Management System
              </p>
              <div style={{
                height: '3px',
                width: '60px',
                background: 'white',
                margin: '15px auto 0',
                borderRadius: '2px'
              }}></div>
            </div>

            {/* Card Section */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              padding: '40px',
              animation: 'slideInUp 0.6s ease-out'
            }}>
              {view === 'login' && <SignIn />}
              {view === 'signup' && <SignUp />}
            </div>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              marginTop: '30px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '14px'
            }}>
              <p>© 2026 Dayflow HRMS. All rights reserved.</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', height: '100vh', background: '#f0f4f8' }}>
          {/* Sidebar */}
          <div style={{
            width: '280px',
            background: 'linear-gradient(180deg, #2d3748 0%, #1a202c 100%)',
            color: 'white',
            padding: '30px 20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            overflowY: 'auto'
          }}>
            <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#60a5fa', margin: '0 0 5px 0' }}>Dayflow</h1>
              <p style={{ fontSize: '13px', color: '#cbd5e0', margin: 0 }}>HRMS Portal</p>
            </div>

            <div style={{
              background: 'rgba(96, 165, 250, 0.15)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              borderLeft: '4px solid #60a5fa'
            }}>
              <p style={{ fontSize: '12px', color: '#cbd5e0', margin: '0 0 8px 0' }}>LOGGED IN AS</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>{currentUser?.name}</p>
              <p style={{ fontSize: '12px', color: '#a0aec0', margin: 0, textTransform: 'capitalize' }}>
                {currentUser?.role === 'admin' ? '👨‍💼 Administrator' : '👤 Employee'}
              </p>
            </div>

            <button 
              onClick={() => { setCurrentUser(null); setView('login'); }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f56565 0%, #c53030 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(245, 101, 101, 0.3)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🚪 Logout
            </button>
          </div>

          {/* Main Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '40px'
          }}>
            {currentUser?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

