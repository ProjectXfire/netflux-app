'use client';

import { Formik, Form } from 'formik';
import styles from './AuthForms.module.css';
import { type ICreateUserDto } from '../../types';
import { RegisterSchema } from '../../schemas';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Title } from '@/app/(shared)/components';

function AuthRegister(): JSX.Element {
  const onSubmit = (data: ICreateUserDto): void => {
    console.log(data);
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, getFieldProps }) => (
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Title size='medium' color='var(--default)' text='Sign up' />
          <Input
            {...getFieldProps('username')}
            color='primary'
            type='text'
            label='Username'
            isInvalid={
              !!(
                errors.username !== undefined &&
                touched.username !== undefined &&
                touched.username
              )
            }
            errorMessage={errors.username}
          />
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default AuthRegister;
