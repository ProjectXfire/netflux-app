import * as Yup from 'yup';

export const RegisterSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Must be an email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, one uppercase, one lowercase, one number and one special case character'
    )
    .required('Password is required')
});

export const LoginSchema = Yup.object({
  email: Yup.string().email('Must be an email').required('Email is required'),
  password: Yup.string().required('Password is required')
});
