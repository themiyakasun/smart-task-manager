import AuthForm from 'components/forms/AuthForm';
import { LoginSchema } from 'lib/validation';
import React from 'react';

const SignIn = () => {
  return (
    <div className='w-md'>
      <AuthForm
        type='SIGNIN'
        schema={LoginSchema}
        defaultValues={{ email: '', password: '' }}
      />
    </div>
  );
};

export default SignIn;
