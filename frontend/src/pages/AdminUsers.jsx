import { useEffect, useState } from "react";
import { fetchAllUsers, updateUserRole, updateUserStatus } from "../api/adminApi";
import { useSelector } from "react-redux";

const ROLES = ["student", "instructor", "admin"];

function AdminUsers() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const load = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRoleChange = async (userId, role) => {
    setUpdatingId(userId);
    try {
      const updated = await updateUserRole(userId, role);
      setUsers((prev) => prev.map((u) => (u._id === userId ? updated : u)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    setUpdatingId(userId);
    try {
      const updated = await updateUserStatus(userId, !currentStatus);
      setUsers((prev) => prev.map((u) => (u._id === userId ? updated : u)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink mb-6">User management</h2>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : (
        <div className="border border-ink/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink/5 text-ink/50 font-mono text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u._id === currentUser._id;
                return (
                  <tr key={u._id} className="border-t border-ink/10">
                    <td className="px-4 py-3 font-medium text-ink">
                      {u.name} {isSelf && <span className="text-ink/40 font-mono text-xs">(you)</span>}
                    </td>
                    <td className="px-4 py-3 text-ink/60">{u.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        disabled={isSelf || updatingId === u._id}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="border border-ink/15 rounded-md px-2 py-1 text-sm disabled:opacity-50"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-xs px-2 py-1 rounded ${
                          u.isActive ? "bg-teal/10 text-teal" : "bg-red-50 text-red-500"
                        }`}
                      >
                        {u.isActive ? "active" : "deactivated"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        disabled={isSelf || updatingId === u._id}
                        onClick={() => handleToggleStatus(u._id, u.isActive)}
                        className="text-sm font-medium text-navy hover:underline disabled:opacity-40 disabled:no-underline"
                      >
                        {u.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;