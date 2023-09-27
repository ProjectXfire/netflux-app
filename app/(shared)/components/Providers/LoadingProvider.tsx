'use client';

import { LoadingProvider } from '../../states';

interface Props {
  children: React.ReactNode;
}

function LoadingProv({ children }: Props): JSX.Element {
  return <LoadingProvider>{children}</LoadingProvider>;
}
export default LoadingProv;
