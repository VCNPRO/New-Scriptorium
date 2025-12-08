'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Card, Badge } from '../ui';
import { Icons } from '../Icons';
import { User } from '../../types'; // Assuming User type is defined in types.ts

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Error al cargar usuarios');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleInvite = async () => {
    if (!inviteEmail) return;
    console.log(`Invitar a: ${inviteEmail}`);
    // This would call a POST /api/admin/invite endpoint
    // For now, just show a success message
    alert(`Invitación enviada a ${inviteEmail} (simulación).`);
    setInviteEmail('');
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'researcher' | 'user') => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cambiar el rol');
      }

      const result = await response.json();
      
      // Update the user in the local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: result.user.role } : user
        )
      );

    } catch (e: any) {
      console.error(e.message);
      // Revert the select box on error by re-fetching users
      fetchUsers(); 
    }
  };


  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-wood-900 mb-8">Gestión de Usuarios</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* User List */}
        <div className="lg:col-span-2">
            <Card title="Usuarios Registrados" className="shadow-none">
                <div className="flex flex-col">
                    {loading && <p>Cargando usuarios...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-wood-800/60 uppercase bg-parchment-200/50">
                                <tr>
                                    <th className="px-4 py-3">Nombre</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Rol</th>
                                    <th className="px-4 py-3">Fecha de Registro</th>
                                    <th className="px-4 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="border-b border-wood-800/10 hover:bg-wood-800/5">
                                        <td className="px-4 py-3 font-bold">{user.name}</td>
                                        <td className="px-4 py-3 font-mono">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <Badge color={user.role === 'admin' ? 'green' : user.role === 'researcher' ? 'copper' : 'wood'}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-right">
                                            <select 
                                                defaultValue={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                                                className="bg-parchment-100 border border-wood-800/20 text-wood-900 text-xs font-bold font-serif px-2 py-1 rounded-sm focus:outline-none focus:border-copper-500"
                                            >
                                                <option value="user">Usuario</option>
                                                <option value="researcher">Investigador</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>
        </div>

        {/* Invite Form */}
        <div>
            <Card title="Invitar Nuevo Usuario" className="shadow-none">
                <div className="space-y-4">
                    <p className="text-sm font-serif text-wood-800/80">
                        Introduce el email del nuevo usuario. Recibirá una invitación para unirse a la plataforma.
                    </p>
                    <Input 
                        type="email"
                        placeholder="email@ejemplo.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <Button onClick={handleInvite} className="w-full">
                        <Icons.UserPlus className="w-4 h-4 mr-2" />
                        Enviar Invitación
                    </Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
