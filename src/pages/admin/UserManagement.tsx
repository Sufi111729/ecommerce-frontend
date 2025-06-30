import { useEffect, useState } from 'react'
import { Edit, Trash, ShieldCheck } from 'lucide-react'

interface Role {
  id: number
  name: string
}

interface User {
  id: number
  username: string
  email: string
  roles: Role[]
  status: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = () => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:8080/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users')
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch(() => setError('Failed to fetch users'))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = (id: number) => {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:8080/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => fetchUsers())
      .catch(() => setError('Failed to delete user'))
  }

  const handleToggleStatus = (id: number) => {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:8080/api/admin/users/${id}/status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => fetchUsers())
      .catch(() => setError('Failed to toggle status'))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      {error && <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>}

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">All Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {user.roles.map((role) => role.name.replace('ROLE_', '')).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      className="text-green-600 hover:text-green-900"
                      title="Toggle Status"
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900" title="Edit Role (to be implemented)">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
