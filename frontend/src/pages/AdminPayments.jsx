import { useEffect, useState } from "react";
import { fetchAllEnrollments } from "../api/adminApi";

function AdminPayments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllEnrollments();
        setEnrollments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalRevenue = enrollments.reduce((sum, e) => sum + e.amountPaid, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-ink">Payments</h2>
        <div className="font-mono text-sm text-ink/60">
          total: <span className="text-ink font-semibold">Rs. {totalRevenue.toLocaleString()}</span>
        </div>
      </div>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : (
        <div className="border border-ink/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink/5 text-ink/50 font-mono text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Student</th>
                <th className="text-left px-4 py-3">Course</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Transaction ID</th>
                <th className="text-left px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e._id} className="border-t border-ink/10">
                  <td className="px-4 py-3 font-medium text-ink">{e.student?.name}</td>
                  <td className="px-4 py-3 text-ink/60">{e.course?.title}</td>
                  <td className="px-4 py-3 font-mono text-ink/70">
                    Rs. {e.amountPaid.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink/40">
                    {e.transactionId}
                  </td>
                  <td className="px-4 py-3 text-ink/50">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPayments;