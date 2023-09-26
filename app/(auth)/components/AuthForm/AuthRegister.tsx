'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import styles from './AuthForms.module.css';
import { type ICreateUserDto } from '../../types';
import { RegisterSchema } from '../../schemas';
import { createUser } from '../../services';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Title } from '@/app/(shared)/components';

function AuthRegister(): JSX.Element {
  const router = useRouter();

  const onSubmit = async (data: ICreateUserDto): Promise<void> => {
    const { errorMessage, successfulMessage } = await createUser(data);
    if (errorMessage !== null) {
      toast.error(errorMessage);
    } else {
      toast.success(successfulMessage);
      router.push('/profile');
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, getFieldProps }) => (
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Title size='medium' color='var(--default)' text='Sign up' />
          <Input
            {...getFieldProps('name')}
            color='primary'
            type='text'
            label='Username'
            isInvalid={!!(errors.name !== undefined && touched.name !== undefined && touched.name)}
            errorMessage={errors.name}
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
          <Button className='mt-6' type='submit' color='primary'>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default AuthRegister;
