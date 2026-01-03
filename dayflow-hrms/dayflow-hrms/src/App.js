
import React, { useState } from 'react';

function App() {
  import AttendanceView from './AttendanceView';
  // Demo users
  const [users, setUsers] = useState([
    { id: 1, employeeId: 'E001', email: 'admin@company.com', password: 'password', role: 'admin', name: 'Admin User' },
    { id: 2, employeeId: 'E002', email: 'john@company.com', password: 'password', role: 'employee', name: 'John Doe' },
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'dashboard'
  const [pendingVerification, setPendingVerification] = useState(null);

  // Sign Up
  const SignUp = () => {
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
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        {!showVerify ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="Employee ID" className="w-full px-3 py-2 border rounded" />
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full px-3 py-2 border rounded" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border rounded" />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border rounded" />
            <select name="role" value={form.role} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="employee">Employee</option>
              <option value="admin">Admin/HR</option>
            </select>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
            <div className="text-center text-sm mt-2">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setView('login')}>Sign In</span></div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-3">
            <div className="text-center text-gray-700">A verification code has been sent to your email. (Demo code: 123456)</div>
            <input value={code} onChange={e => setCode(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Enter verification code" />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Verify</button>
          </form>
        )}
      </div>
    );
  };

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
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border rounded" />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border rounded" />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
          <div className="text-center text-sm mt-2">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setView('signup')}>Sign Up</span></div>
        </form>
      </div>
    );
  };

  // Admin/HR Dashboard
  const AdminDashboard = () => (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Admin Dashboard</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Employee List</h3>
        <ul className="divide-y">
          {users.filter(u => u.role === 'employee').map(emp => (
            <li key={emp.id} className="flex justify-between items-center py-2">
              <span>{emp.name} ({emp.email})</span>
              <button className="text-blue-600 text-sm" onClick={() => alert('Switch to employee view (not implemented)')}>Switch</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Leave Approvals</h3>
        <ul className="divide-y">
          <li className="py-2 flex justify-between items-center">No leave requests yet.</li>
        </ul>
      </div>
      <button className="mt-6 w-full bg-gray-200 py-2 rounded" onClick={() => { setCurrentUser(null); setView('login'); }}>Logout</button>
    </div>
  );

  // Employee Dashboard with navigation
  const [empView, setEmpView] = useState('dashboard'); // 'dashboard' | 'profile' | 'attendance' | 'leave' | 'payroll'

  const EmployeeDashboard = () => (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Employee Dashboard</h2>
      {empView === 'dashboard' && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="bg-blue-100 rounded p-4 font-semibold" onClick={() => setEmpView('profile')}>Profile</button>
            <button className="bg-green-100 rounded p-4 font-semibold" onClick={() => setEmpView('attendance')}>Attendance</button>
            <button className="bg-yellow-100 rounded p-4 font-semibold" onClick={() => setEmpView('leave')}>Leave Requests</button>
            <button className="bg-purple-100 rounded p-4 font-semibold" onClick={() => setEmpView('payroll')}>Payroll</button>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="font-semibold mb-2">Recent Activity</div>
            <ul className="text-sm text-gray-700">
              <li>Welcome, {currentUser?.name}!</li>
              <li>Your last login: Today</li>
              <li>Attendance: Present</li>
            </ul>
          </div>
        </>
      )}
      {empView === 'profile' && (
        <ProfileView user={currentUser} isAdmin={false} onBack={() => setEmpView('dashboard')} onUpdate={updated => setCurrentUser(updated)} />
      )}
          <div>
            <label className="block text-xs">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block text-xs">Profile Picture URL</label>
            <input name="profilePic" value={form.profilePic} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block text-xs">Job Title</label>
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block text-xs">Department</label>
            <input name="department" value={form.department} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label className="block text-xs">Salary</label>
            <input name="salary" value={form.salary} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
// (ProfileView code removed, now imported from './ProfileView')
      {empView === 'attendance' && (
        <AttendanceView user={currentUser} onBack={() => setEmpView('dashboard')} />
      )}
      {empView === 'leave' && (
        <div>
          <h3 className="font-semibold mb-2">Leave Requests</h3>
          <div className="mb-4">(Leave application and status will go here)</div>
          <button className="bg-gray-200 py-2 px-4 rounded" onClick={() => setEmpView('dashboard')}>Back</button>
        </div>
      )}
      {empView === 'payroll' && (
        <div>
          <h3 className="font-semibold mb-2">Payroll</h3>
          <div className="mb-4">(Payroll details will go here)</div>
          <button className="bg-gray-200 py-2 px-4 rounded" onClick={() => setEmpView('dashboard')}>Back</button>
        </div>
      )}
    </div>
  );
}

export default App;

      {empView === 'leave' && (
        <div>
          <h3 className="font-semibold mb-2">Leave Requests</h3>
          <div className="mb-4">(Leave application and status will go here)</div>
          <button className="bg-gray-200 py-2 px-4 rounded" onClick={() => setEmpView('dashboard')}>Back</button>
        </div>
      )}
      {empView === 'payroll' && (
        <div>
          <h3 className="font-semibold mb-2">Payroll</h3>
          <div className="mb-4">(Payroll details will go here)</div>
          <button className="bg-gray-200 py-2 px-4 rounded" onClick={() => setEmpView('dashboard')}>Back</button>
        </div>
      )}
      <button className="mt-6 w-full bg-gray-200 py-2 rounded" onClick={() => { setCurrentUser(null); setView('login'); }}>Logout</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Dayflow - Human Resource Management System</h1>
        {view === 'signup' && <SignUp />}
        {view === 'login' && <SignIn />}
        {view === 'dashboard' && (
          currentUser?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />
        )}
      </div>
    </div>
  );
}

export default App;
