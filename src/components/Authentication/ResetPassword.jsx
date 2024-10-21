import React, { useState } from 'react';
import { resetPassword } from '../../api/api';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({ email, password });
      console.log('Password reset successful:', response.data);
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ResetPassword;
