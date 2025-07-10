// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      return res.data;
    },
  });
};
