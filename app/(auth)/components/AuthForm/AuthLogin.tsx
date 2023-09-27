'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import styles from './AuthForms.module.css';
import { type ILoginDto } from '../../types';
import { LoginSchema } from '../../schemas';
import { authUser } from '../../services';
import { useLoadingContext } from '@/app/(shared)/states';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Title } from '@/app/(shared)/components';

function AuthLogin(): JSX.Element {
  const router = useRouter();
  const {
    state: { isLoading },
    startLoading,
    endLoading
  } = useLoadingContext();

  const onSubmit = async (data: ILoginDto): Promise<void> => {
    startLoading();
    const { errorMessage, successfulMessage } = await authUser(data);
    if (errorMessage !== null) {
      toast.error(errorMessage);
    } else {
      toast.success(successfulMessage);
      router.push('/profile');
    }
    endLoading();
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
          <Button className='mt-6' type='submit' color='primary' isDisabled={isLoading}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default AuthLogin;
