import React from 'react';

function AttendanceView({ user, onBack }) {
  const today = new Date();
  const [records, setRecords] = React.useState(() => {
    // Demo: generate last 7 days with random status
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      arr.push({
        date: d.toISOString().slice(0, 10),
        status: ['Present', 'Absent', 'Half-day', 'Leave'][Math.floor(Math.random()*4)],
        checkIn: '',
        checkOut: '',
      });
    }
    return arr;
  });
  const [checkedIn, setCheckedIn] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const handleCheckIn = () => {
    if (checkedIn) return;
    setCheckedIn(true);
    setRecords(recs => recs.map(r =>
      r.date === today.toISOString().slice(0,10)
        ? { ...r, checkIn: new Date().toLocaleTimeString(), status: 'Present' }
        : r
    ));
    setMsg('Checked in!');
    setTimeout(() => setMsg(''), 1200);
  };
  const handleCheckOut = () => {
    if (!checkedIn) return;
    setCheckedIn(false);
    setRecords(recs => recs.map(r =>
      r.date === today.toISOString().slice(0,10)
        ? { ...r, checkOut: new Date().toLocaleTimeString() }
        : r
    ));
    setMsg('Checked out!');
    setTimeout(() => setMsg(''), 1200);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Attendance (Past 7 Days)</h3>
      <table className="w-full text-xs mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-1">Date</th>
            <th className="p-1">Status</th>
            <th className="p-1">Check-In</th>
            <th className="p-1">Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.date} className={r.date === today.toISOString().slice(0,10) ? 'font-bold' : ''}>
              <td className="p-1">{r.date}</td>
              <td className="p-1">{r.status}</td>
              <td className="p-1">{r.checkIn || '-'} </td>
              <td className="p-1">{r.checkOut || '-'} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mb-2">
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleCheckIn} disabled={checkedIn}>Check In</button>
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleCheckOut} disabled={!checkedIn}>Check Out</button>
      </div>
      {msg && <div className="text-green-700 text-xs mb-2">{msg}</div>}
      <button className="bg-gray-200 py-2 px-4 rounded" onClick={onBack}>Back</button>
    </div>
  );
}

export default AttendanceView;
