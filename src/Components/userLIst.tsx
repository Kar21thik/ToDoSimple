// src/Components/UserList.tsx
import React, { useState } from 'react';
import { useUsers, User } from './hooks/useUsers';


const UserList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');

  const {
    data: users,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useUsers();

  // const {
  //   data: posts,
  //   isLoading: loadingPosts,
  //   error: errorPosts,
  // } = usePosts();

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-l-lg ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 rounded-r-lg ${
            activeTab === 'posts' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Posts
        </button>
      </div>

      {activeTab === 'users' && (
        <>
          {loadingUsers && <p className="text-blue-600 text-center">Loading users...</p>}
          {errorUsers && <p className="text-red-600 text-center">Error fetching users</p>}
          <ul className="space-y-4">
            {users?.map((user: User) => (
              <li key={user.id} className="bg-white p-4 rounded shadow">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-gray-600">@{user.username}</p>
                <p className="text-gray-800">{user.email}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* {activeTab === 'posts' && (
        <>
          {loadingPosts && <p className="text-blue-600 text-center">Loading posts...</p>}
          {errorPosts && <p className="text-red-600 text-center">Error fetching posts</p>}
          <ul className="space-y-4">
            {posts?.slice(0, 10).map((post: Post) => (
              <li key={post.id} className="bg-white p-4 rounded shadow">
                <p className="text-lg font-semibold">{post.title}</p>
                <p className="text-gray-700">{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )} */}
    </div>
  );
};

export default UserList;
