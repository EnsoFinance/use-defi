import { useContext } from 'react';

import { UseDeFiContext } from '../../provider/UseDeFiProvider';

export const useDeFiContext = () => {
  const context = useContext(UseDeFiContext);

  if (!context) {
    throw new Error(
      'Please wrap your application with the `UseDeFiProvider` component in order to use `use-defi` hooks.',
    );
  }

  return context;
};
