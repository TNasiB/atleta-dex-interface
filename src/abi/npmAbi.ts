export const npmAbi = [
  {
    inputs: [{ internalType: 'address', name: '_WETH9', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'int256', name: 'priority', type: 'int256' }
    ],
    name: 'UpdateTokenRatioPriority',
    type: 'event'
  },
  {
    inputs: [],
    name: 'WETH9',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token0', type: 'address' },
      { internalType: 'address', name: 'token1', type: 'address' },
      { internalType: 'uint256', name: 'chainId', type: 'uint256' }
    ],
    name: 'flipRatio',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'chainId', type: 'uint256' }
    ],
    name: 'tokenRatioPriority',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract INonfungiblePositionManager',
        name: 'positionManager',
        type: 'address'
      },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const
