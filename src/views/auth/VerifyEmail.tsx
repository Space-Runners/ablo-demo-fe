import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { verifyEmail } from '@/api/auth';

function VerifyEmail() {
  const { search } = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const token = searchParams.get('token');

    verifyEmail(token).then(() => {
      window.location.href = '/auth';
    });
  }, []);

  return <div />;
}

export default VerifyEmail;
