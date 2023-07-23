import { renderHook } from '@testing-library/react';
import { usePositions } from 'src/hooks';
import { describe, expect, it } from 'vitest';

import { providerWrapper } from './utils/providerWrapper';

describe('usePositions', () => {
  it('should load on render', () => {
    const { result } = renderHook(
      () => usePositions({ chain: 1, token: '0x6b175474e89094c44da98b954eedeac495271d0f' }),
      {
        wrapper: providerWrapper,
      },
    );

    expect((result as any).status === 'loading');
  });
});
