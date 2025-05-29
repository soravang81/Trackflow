'use client';

import React, { useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
  role: 'vendor' | 'delivery' | 'customer';
  type: 'login' | 'signup';
}

const AuthForm: React.FC<Props> = ({ role, type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      role,
      action: type === 'login' ? 'signin' : 'signup',
    });
    
    if (result?.ok) {
      const session = await getSession()
      toast('Success!');
      console.log(session?.user.token)
      if(!session?.user.token) return
      if (typeof window !== 'undefined') {
        console.log('window is defined');
        console.log('setting token:', session?.user.token);
        setTimeout(() => {
          localStorage.setItem("token", session.user.token);
        }, 300); 
      }
      if (role === 'vendor') router.push('/vendor');
      else if (role === 'delivery') router.push('/delivery');
      else router.push('/customer');
    } else {
      toast('Login failed: ' + (result?.error || 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{type.toUpperCase()} ({role})</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        {type}
      </button>
    </form>
  );
};

export default AuthForm;
