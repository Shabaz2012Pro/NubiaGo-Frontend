import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Edit, 
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Download,
  UserPlus
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Badge from '../../components/atoms/Badge';
import { clsx } from 'clsx';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'buyer' | 'supplier';
  verified: boolean;
  status: 'active' | 'inactive' | 'suspended';
  memberSince: string;
  lastLogin?: string;
  ordersCount: number;
  totalSpent: number;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
          role: 'buyer',
          verified: true,
          status: 'active',
          memberSince: '2023-01-15',
          lastLogin: '2024-06-24T10:30:00Z',
          ordersCount: 12,
          totalSpent: 1250.75
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '+2345678901',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
          role: 'buyer',
          verified: true,
          status: 'active',
          memberSince: '2023-03-22',
          lastLogin: '2024-06-23T14:45:00Z',
          ordersCount: 8,
          totalSpent: 875.50
        },
        {
          id: '3',
          firstName: 'Robert',
          lastName: 'Johnson',
          email: 'robert.johnson@example.com',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
          role: 'supplier',
          verified: true,
          status: 'active',
          memberSince: '2022-11-10',
          lastLogin: '2024-06-24T09:15:00Z',
          ordersCount: 0,
          totalSpent: 0
        },
        {
          id: '4',
          firstName: 'Emily',
          lastName: 'Davis',
          email: 'emily.davis@example.com',
          phone: '+4567890123',
          role: 'buyer',
          verified: false,
          status: 'inactive',
          memberSince: '2024-05-05',
          ordersCount: 1,
          totalSpent: 49.99
        },
        {
          id: '5',
          firstName: 'Michael',
          lastName: 'Admin',
          email: 'michael.admin@nubiago.com',
          phone: '+5678901234',
          avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
          role: 'admin',
          verified: true,
          status: 'active',
          memberSince: '2022-01-01',
          lastLogin: '2024-06-24T08:30:00Z',
          ordersCount: 0,
          totalSpent: 0
        }
      ];

      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (user.phone && user.phone.includes(searchQuery));
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'date':
          comparison = new Date(a.memberSince).getTime() - new Date(b.memberSince).getTime();
          break;
        case 'orders':
          comparison = a.ordersCount - b.ordersCount;
          break;
        case 'spent':
          comparison = a.totalSpent - b.totalSpent;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'buyer', label: 'Buyer' },
    { value: 'supplier', label: 'Supplier' }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return <Badge variant="error" size="sm">Admin</Badge>;
      case 'supplier':
        return <Badge variant="primary" size="sm">Supplier</Badge>;
      case 'buyer':
        return <Badge variant="success" size="sm">Buyer</Badge>;
      default:
        return <Badge variant="default" size="sm">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="success" size="sm" className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Active</span>
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="default" size="sm" className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Inactive</span>
          </Badge>
        );
      case 'suspended':
        return (
          <Badge variant="error" size="sm" className="flex items-center space-x-1">
            <XCircle className="w-3 h-3" />
            <span>Suspended</span>
          </Badge>
        );
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  return (
    <AdminLayout title="Users" subtitle="Manage user accounts">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={setSearchQuery}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          
          <div className="flex gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
          
          <Button
            variant="primary"
            leftIcon={<UserPlus className="w-4 h-4" />}
            className="bg-red-600 hover:bg-red-700"
          >
            Add User
          </Button>
        </div>
      </div>
      
      {/* Users Table */}
      <Card variant="default" padding="md">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-800 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('name')}>
                      <span>User</span>
                      {sortBy === 'name' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('email')}>
                      <span>Email</span>
                      {sortBy === 'email' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Role</th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('date')}>
                      <span>Joined</span>
                      {sortBy === 'date' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('orders')}>
                      <span>Orders</span>
                      {sortBy === 'orders' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('spent')}>
                      <span>Spent</span>
                      {sortBy === 'spent' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={`${user.firstName} ${user.lastName}`} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                            <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            {user.firstName} {user.lastName}
                          </p>
                          {user.verified ? (
                            <div className="flex items-center space-x-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              <span>Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-xs text-yellow-600">
                              <XCircle className="w-3 h-3" />
                              <span>Unverified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-600 dark:text-neutral-400">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-1 text-xs text-neutral-500">
                          <Phone className="w-3 h-3" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-500">
                      {new Date(user.memberSince).toLocaleDateString()}
                      {user.lastLogin && (
                        <div className="text-xs">
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                      {user.ordersCount}
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                      ${user.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-1">
                          <Eye className="w-4 h-4 text-neutral-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500 dark:text-neutral-400">No users found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {!isLoading && filteredUsers.length > 0 && (
          <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700 px-4 py-3 sm:px-6">
            <div className="flex items-center">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
};

export default AdminUsers;