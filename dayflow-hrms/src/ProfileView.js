import React from 'react';

function ProfileView({ user, isAdmin, onBack, onUpdate }) {
  const [form, setForm] = React.useState({
    name: user.name,
    email: user.email,
    employeeId: user.employeeId,
    address: user.address || '',
    phone: user.phone || '',
    profilePic: user.profilePic || '',
    jobTitle: user.jobTitle || '',
    department: user.department || '',
    salary: user.salary || '',
  });
  const [edit, setEdit] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEdit(false);
    setMsg('Profile updated!');
    onUpdate({ ...user, ...form });
    setTimeout(() => setMsg(''), 1500);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Profile</h3>
      <form onSubmit={handleSave} className="space-y-2">
        <div>
          <label className="block text-xs">Employee ID</label>
          <input name="employeeId" value={form.employeeId} disabled className="w-full px-2 py-1 border rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-xs">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs">Email</label>
          <input name="email" value={form.email} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs">Address</label>
          <input name="address" value={form.address} onChange={handleChange} disabled={!edit && !isAdmin} className="w-full px-2 py-1 border rounded" />
        </div>
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
        </div>
        {msg && <div className="text-green-600 text-xs">{msg}</div>}
        <div className="flex gap-2 mt-2">
          {!edit && <button type="button" className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setEdit(true)}>Edit</button>}
          {edit && <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>}
          <button type="button" className="bg-gray-200 px-3 py-1 rounded" onClick={onBack}>Back</button>
        </div>
      </form>
      {form.profilePic && <img src={form.profilePic} alt="Profile" className="w-20 h-20 rounded-full mt-4 mx-auto" />}
    </div>
  );
}

export default ProfileView;
