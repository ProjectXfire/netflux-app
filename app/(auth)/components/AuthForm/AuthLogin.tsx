'use client';

import { Formik, Form } from 'formik';
import styles from './AuthForms.module.css';
import { type ILoginDto } from '../../types';
import { LoginSchema } from '../../schemas';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Title } from '@/app/(shared)/components';

function AuthLogin(): JSX.Element {
  const onSubmit = (data: ILoginDto): void => {
    console.log(data);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, getFieldProps }) => (
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Title size='medium' color='var(--default)' text='Sign In' />
          <Input
            {...getFieldProps('email')}
            color='primary'
            type='email'
            label='Email'
            isInvalid={
              !!(errors.email !== undefined && touched.email !== undefined && touched.email)
            }
            errorMessage={errors.email}
          />
          <Input
            {...getFieldProps('password')}
            color='primary'
            type='password'
            label='Password'
            isInvalid={
              !!(
                errors.password !== undefined &&
                touched.password !== undefined &&
                touched.password
              )
            }
            errorMessage={errors.password}
          />
          <Button type='submit' color='primary'>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default AuthLogin;
