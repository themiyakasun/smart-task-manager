import AuthForm from 'components/forms/AuthForm';
import { SignupSchema } from 'lib/validation';
import React from 'react';

const SignUp = () => {
  return (
    <div className='w-md'>
      <AuthForm
        type='SIGNUP'
        schema={SignupSchema}
        defaultValues={{ name: '', email: '', password: '' }}
      />
    </div>
  );
};

export default SignUp;
