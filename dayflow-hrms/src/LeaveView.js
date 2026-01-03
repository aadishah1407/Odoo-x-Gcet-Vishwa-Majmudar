import React from 'react';

function LeaveView({ user, isAdmin, onBack, onSubmit, leaves, onApprove, onReject }) {
  const [form, setForm] = React.useState({ type: '', from: '', to: '', reason: '' });
  const [msg, setMsg] = React.useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.from || !form.to || !form.reason) {
      setMsg('All fields required');
      return;
    }
    onSubmit({ ...form, status: 'Pending', employeeId: user.employeeId, name: user.name });
    setForm({ type: '', from: '', to: '', reason: '' });
    setMsg('Leave request submitted!');
    setTimeout(() => setMsg(''), 1500);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Leave Requests</h3>
      {!isAdmin && (
        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
          <select name="type" value={form.type} onChange={handleChange} className="w-full px-2 py-1 border rounded">
            <option value="">Select Type</option>
            <option value="Sick">Sick Leave</option>
            <option value="Casual">Casual Leave</option>
            <option value="Earned">Earned Leave</option>
          </select>
          <input name="from" type="date" value={form.from} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          <input name="to" type="date" value={form.to} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          <input name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" className="w-full px-2 py-1 border rounded" />
          {msg && <div className="text-green-600 text-xs">{msg}</div>}
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Apply</button>
        </form>
      )}
      <table className="w-full text-xs mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-1">Type</th>
            <th className="p-1">From</th>
            <th className="p-1">To</th>
            <th className="p-1">Reason</th>
            <th className="p-1">Status</th>
            <th className="p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 && (
            <tr><td colSpan={6} className="text-center p-2">No leave requests yet.</td></tr>
          )}
          {leaves.map((lv, idx) => (
            <tr key={idx}>
              <td className="p-1">{lv.type}</td>
              <td className="p-1">{lv.from}</td>
              <td className="p-1">{lv.to}</td>
              <td className="p-1">{lv.reason}</td>
              <td className="p-1">{lv.status}</td>
              <td className="p-1">
                {isAdmin && lv.status === 'Pending' && (
                  <>
                    <button className="bg-green-600 text-white px-2 py-1 rounded mr-1" onClick={() => onApprove(idx)}>Approve</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => onReject(idx)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-gray-200 py-2 px-4 rounded" onClick={onBack}>Back</button>
    </div>
  );
}

export default LeaveView;
