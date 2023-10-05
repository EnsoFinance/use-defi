/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/v1/defiTokens": {
    /** Returns defi tokens that have a yield, available to use at the /route endpoints. Includes underlying tokens, APYs, TVLs, and more. */
    get: operations["DefiTokensController_defiTokens"];
  };
  "/api/v1/baseTokens": {
    /** Returns base tokens available to use at the /route endpoint */
    get: operations["BaseTokensController_baseTokens"];
  };
  "/api/v1/networks": {
    /** Returns networks supported by the API */
    get: operations["NetworksController_networks"];
  };
  "/api/v1/projects": {
    /** Returns projects and relevant protocols available to use in bundle shortcuts */
    get: operations["ProjectsController_projects"];
  };
  "/api/v1/prices/{chainId}/{address}": {
    /** Returns price for defi token or base token */
    get: operations["PricesController_getPrice"];
  };
  "/api/v1/actions": {
    /** Returns actions available to use in bundle shortcuts */
    get: operations["ActionsController_findAll"];
  };
  "/api/v1/standards": {
    /** Returns standards and methods available to use in bundle shortcuts */
    get: operations["StandardsController_standards"];
  };
  "/api/v1/shortcuts/route": {
    /** Best route from a token to another */
    get: operations["RouterController_routeShortcutTransaction"];
    /** Best route from a token to another */
    post: operations["RouterController_postRouteShortcutTransaction"];
  };
  "/api/v1/wallet": {
    /** Returns EnsoWallet address details */
    get: operations["WalletController_wallet"];
  };
  "/api/v1/wallet/approve": {
    /** Returns transaction that approves your EnsoWallet to spend tokens */
    get: operations["WalletController_createApproveTransaction"];
  };
  "/api/v1/wallet/balances": {
    get: operations["WalletController_walletBalances"];
  };
  "/api/v1/shortcuts/bundle": {
    /** Bundle a list of actions into a single tx */
    post: operations["BundleController_bundleShortcutTransaction"];
  };
  "/api/v1/shortcuts/builder": {
    /** Build a shortcut from multiple contract calls */
    post: operations["BuilderController_builderShortcutTransaction"];
  };
  "/api/v1/shortcuts/static/ipor": {
    /** Get transaction for IPOR shortcut */
    post: operations["IporController_iporShortcutTransaction"];
  };
  "/api/v1/shortcuts/quote": {
    /** Quote from a token to another */
    get: operations["QuoteController_quote"];
    /** Simulate a route */
    post: operations["QuoteController_quoteMultipath"];
  };
  "/api/experimental/multichain/shortcut/route": {
    post: operations["SocketController_multichainRouteShortcutTransactionWithSocket"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    PoolToken: {
      /** @example 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84 */
      address: string;
      /** @example Liquid staked Ether 2.0 */
      name: string;
      /** @example stETH */
      symbol: string;
      /** @example 18 */
      decimals: number;
      /** @example 1 */
      chain: number;
      /** @example lido */
      project: string;
      /** @example lido */
      protocol: string;
      /** @example 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84 */
      poolAddress: string;
      /** @example 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84 */
      primaryAddress: string;
      /**
       * @example [
       *   "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
       * ]
       */
      underlyingTokens: string[];
    };
    Protocol: {
      /** @example lido */
      name: string;
      /** @example lido */
      slug: string;
      /** @example https://icons.llama.fi/lido.png */
      logo: string;
      /** @example https://lido.fi/ */
      url: string;
      /** @example Liquidity for staked assets. Daily rewards, no lock ups. Available for Ethereum, Solana, Polygon, Terra, Kusama & Polkadot. */
      description: string;
      /** @example LidoFinance */
      twitter: string;
      /** @example Liquid Staking */
      category: string;
      /**
       * @example [
       *   1
       * ]
       */
      chainIds: number[];
    };
    DefiToken: {
      /** @example 3.8 */
      apy?: number;
      /** @example null */
      apyBase?: number;
      /** @example 0 */
      apyReward?: number;
      /** @example 1 */
      chainId: number;
      /** @example 0xae7ab96520de3a18e5e111b5eaab095312d7fe84:0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */
      id: string;
      /** @example Liquid staked Ether 2.0 */
      name: string;
      /** @example 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84 */
      poolAddress: string;
      /** @example 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84 */
      primaryAddress: string;
      /** @example stETH */
      subtitle: string;
      /** @example [] */
      rewardPoolTokens: string[];
      token?: components["schemas"]["PoolToken"];
      tokenAddress: string;
      tvl: number;
      underlyingTokens: string[];
      project: string;
      protocol: components["schemas"]["Protocol"];
    };
    BaseToken: {
      /** @example PieDAO BTC++ */
      name: string;
      /** @example BTC++ */
      symbol: string;
      /** @example 0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd */
      address: string;
      /** @example 18 */
      decimals: number;
      /** @example https://metadata-service-dev.herokuapp.com/api/token/1/0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd/icon */
      logoURI: string;
      /** @example 1 */
      chainId: number;
    };
    Network: {
      /** @example 1 */
      id: number;
      /** @example Ethereum */
      name: string;
    };
    Project: {
      /** @example Iron Bank */
      title: string;
      /** @example iron-bank */
      id: string;
      /** @example compound */
      protocol: string;
      /**
       * @example [
       *   1,
       *   10
       * ]
       */
      chainIds: string;
      /** @example Test Description */
      description: string;
      /** @example @handle */
      twitter: string;
      /** @example Lending */
      category: string;
      /** @example 523 */
      poolCount: number;
    };
    Price: {
      /** @example 8 */
      decimals: number;
      /** @example 27052 */
      price: number;
      /** @example 0x2260fac5e5542a773aa44fbcfedf7c193bc2c599 */
      address: string;
      /** @example WBTC */
      symbol: string;
      /** @example 0.99 */
      confidence: number;
      /** @example 1695197412 */
      timestamp: number;
      /** @example 1 */
      chainId: number;
    };
    Action: {
      /** @enum {string} */
      action: "approve" | "borrow" | "deposit" | "harvest" | "permittransferfrom" | "redeem" | "repay" | "apiswap" | "swap" | "transfer" | "transferfrom" | "withdraw" | "route" | "split";
      inputs: {
        [key: string]: string | undefined;
      };
    };
    StandardAction: {
      /** @enum {string} */
      action: "approve" | "borrow" | "deposit" | "harvest" | "permittransferfrom" | "redeem" | "repay" | "apiswap" | "swap" | "transfer" | "transferfrom" | "withdraw" | "route" | "split";
      inputs: {
        [key: string]: string | undefined;
      };
      name: string;
      functionNames: string[];
      supportedChains: components["schemas"]["Network"][];
    };
    Standard: {
      protocol: components["schemas"]["Protocol"];
      forks: components["schemas"]["Protocol"][];
      actions: components["schemas"]["StandardAction"][];
    };
    Hop: {
      tokenIn: string[];
      positionInId: string[];
      tokenOut: string[];
      positionOutId: string[];
      protocol: string;
      action: string;
      primary: string;
      internalRoutes: string[];
    };
    Transaction: {
      data: string;
      to: string;
      from: string;
      value: string;
    };
    RouteShortcutTransaction: {
      /** @description The route the shortcut will use */
      route: components["schemas"]["Hop"][];
      gas: number;
      amountOut: string[];
      /** @description Price impact in basis points, null if USD price not found */
      priceImpact: number;
      /** @description Block number the transaction was created on */
      createdAt: number;
      /** @description The tx object to use in `ethers` */
      tx: components["schemas"]["Transaction"];
    };
    RouteShortcutInputs: {
      /**
       * @description Chain ID of the network to execute the transaction on
       * @default 1
       */
      chainId?: number;
      /**
       * @description Ethereum address of the wallet to send the transaction from
       * @default 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
       */
      fromAddress: string;
      /** @description Flag that indicates whether to calculate and return the price impact of the transaction */
      priceImpact?: boolean | null;
      /**
       * @deprecated
       * @description Flag that indicates if gained tokenOut should be sent to EOA
       */
      toEoa?: boolean | null;
      /**
       * @description Ethereum address of the receiver of the tokenOut
       * @example 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
       */
      receiver?: string;
      /**
       * @description Amount of tokenIn to swap in wei
       * @example [
       *   "1000000000000000000"
       * ]
       */
      amountIn: string[];
      /**
       * @description Minimum amount out in wei. If specified, slippage should not be specified
       * @example [
       *   "1000000000000000000"
       * ]
       */
      minAmountOut?: string[];
      /**
       * @description Slippage in basis points (1/10000). If specified, minAmountOut should not be specified
       * @default 300
       * @example 300
       */
      slippage?: string;
      /**
       * @description Ethereum address of the token to swap from. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
       * @example [
       *   "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
       * ]
       */
      tokenIn: string[];
      /**
       * @description Ethereum address of the token to swap to. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
       * @example [
       *   "0x6b175474e89094c44da98b954eedeac495271d0f"
       * ]
       */
      tokenOut: string[];
    };
    Wallet: {
      address: string;
      isDeployed: boolean;
    };
    WalletApproveTransaction: {
      /** @description The tx object to use in `ethers` */
      tx: Record<string, never>;
      /** @description The gas estimate for the transaction */
      gas: string;
      /** @description The token address to approve */
      token: string;
      /** @description The amount of tokens to approve */
      amount: string;
      /** @description The spender address to approve */
      spender: string;
    };
    ActionToBundle: {
      protocol: string;
      /** @enum {string} */
      action: "approve" | "borrow" | "deposit" | "harvest" | "permittransferfrom" | "redeem" | "repay" | "apiswap" | "swap" | "transfer" | "transferfrom" | "withdraw" | "route" | "split";
      args: Record<string, never>;
    };
    CallsToBuild: {
      address: string;
      method: string;
      value?: string;
      /**
       * @example [
       *   123,
       *   true,
       *   {
       *     "id": 123
       *   }
       * ]
       */
      args?: unknown[][];
      abi?: string;
    };
    BuilderShortcutRequestDto: {
      /**
       * @description List of calls to build
       * @example [
       *   {
       *     "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
       *     "method": "deposit",
       *     "value": "1000000000000000000",
       *     "args": []
       *   },
       *   {
       *     "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
       *     "method": "balanceOf",
       *     "args": [
       *       "0x89ba58Cc0e8bcbC1108dbD6F33356a136a021C62"
       *     ]
       *   },
       *   {
       *     "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
       *     "method": "withdraw",
       *     "args": [
       *       {
       *         "useOutputOfCallAt": 1
       *       }
       *     ]
       *   }
       * ]
       */
      calls: components["schemas"]["CallsToBuild"][];
    };
    IporShortcutInput: {
      /**
       * @description Amount of tokenIn in wei
       * @example 1000000000000000
       */
      amountIn: string;
      /**
       * @description Address of the tokenIn. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
       * @example 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
       */
      tokenIn: string;
      /**
       * @description Address of the tokenBToBuy
       * @example 0x0e6c016417A0108b76E35939EE7F8F922a4Ef638
       */
      tokenBToBuy: string;
      /**
       * @description Percentage of tokenB to buy in basis points (1/10000)
       * @example 5000
       */
      percentageForTokenB: string;
      /**
       * @description Slippage in basis points (1/10000). Default is 300
       * @default 300
       * @example 300
       */
      slippage?: string;
    };
    IporShortcutTransaction: {
      /** @description Block number the transaction was created on */
      createdAt: number;
      /** @description The tx object to use in `ethers` */
      tx: components["schemas"]["Transaction"];
    };
    Step: {
      tokenIn: string;
      tokenOut: string;
      protocol: string;
      action: string;
      primary: string;
    };
    Path: {
      /**
       * @description Amount of tokenIn to swap in wei
       * @example 1000000000000000000
       */
      amountIn: string;
      /** @description Ordered array of steps to build */
      path: components["schemas"]["Step"][];
    };
    QuoteRouteInputs: {
      /**
       * @description Chain ID of the network to execute the transaction on
       * @default 1
       */
      chainId?: number;
      /**
       * @description Ethereum address of the wallet to send the transaction from
       * @example 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
       */
      fromAddress?: string;
      /** @description Ordered array of paths that you want to simulate */
      route: components["schemas"]["Path"][];
    };
    Quote: {
      /** @description The route the shortcut will use */
      route: components["schemas"]["Hop"][];
      gas: number;
      amountOut: string[];
      /** @description Price impact in basis points, null if USD price not found */
      priceImpact: number;
    };
    MultichainRouteShortcutInputsIn: {
      /**
       * @description Chain ID of the token to swap from
       * @example 42161
       */
      sourceChainId: number;
      /**
       * @description Address of the token to swap from. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
       * @example 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
       */
      token: string;
    };
    MultichainRouteShortcutInputsOut: {
      /**
       * @description Chain ID of the token to swap to
       * @example 1
       */
      destinationChainId: number;
      /**
       * @description Address of the token to swap from. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
       * @example 0xae7ab96520de3a18e5e111b5eaab095312d7fe84
       */
      token: string;
    };
    MultichainRouteShortcutInputsBase: {
      /**
       * @description Amount of tokenIn to swap in wei
       * @example 1000000000000000000
       */
      amountIn: string;
      /**
       * @description Slippage in basis points (1/10000)
       * @default 300
       * @example 300
       */
      slippage?: string;
      /**
       * @description Address and chain of the token to swap from
       * @example {
       *   "sourceChainId": 42161,
       *   "token": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
       * }
       */
      in: components["schemas"]["MultichainRouteShortcutInputsIn"];
      /**
       * @description Address and chain of the token to swap to
       * @example {
       *   "destinationChainId": 1,
       *   "token": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
       * }
       */
      out: components["schemas"]["MultichainRouteShortcutInputsOut"];
      /**
       * @description Address of the user
       * @example 0x93621DCA56fE26Cdee86e4F6B18E116e9758Ff11
       */
      fromAddress: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /** Returns defi tokens that have a yield, available to use at the /route endpoints. Includes underlying tokens, APYs, TVLs, and more. */
  DefiTokensController_defiTokens: {
    parameters: {
      query?: {
        /**
         * @description Address of an underlying token
         * @example 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
         */
        underlyingAddress?: unknown;
        /**
         * @description Address of the token to search for
         * @example 0xc4AD29ba4B3c580e6D59105FFf484999997675Ff
         */
        tokenAddress?: unknown;
        /**
         * @description Protocol of the token to search for
         * @example curve-dex
         */
        protocol?: unknown;
        /**
         * @description Project of the token to search for
         * @example curve-dex
         */
        project?: unknown;
        /**
         * @description Symbol of the token to search for
         * @example crv3crypto
         */
        symbol?: unknown;
        /**
         * @description Chain ID of the token to search for
         * @example 1
         */
        chainId?: unknown;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["DefiToken"][];
        };
      };
    };
  };
  /** Returns base tokens available to use at the /route endpoint */
  BaseTokensController_baseTokens: {
    parameters: {
      query: {
        /**
         * @description Address of the token to search for
         * @example 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
         */
        address: unknown;
        /**
         * @description Symbol of the token to search for
         * @example USDC
         */
        symbol?: unknown;
        /**
         * @description Name of the token to search for
         * @example USD Coin
         */
        name?: unknown;
        /**
         * @description Chain ID of the token to search for
         * @example 1
         */
        chainId?: unknown;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["BaseToken"][];
        };
      };
    };
  };
  /** Returns networks supported by the API */
  NetworksController_networks: {
    parameters: {
      query?: {
        /**
         * @description Title of the network to search for
         * @example Ethereum
         */
        name?: unknown;
        /**
         * @description Chain ID of the network to search for
         * @example 1
         */
        chainId?: unknown;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Network"][];
        };
      };
    };
  };
  /** Returns projects and relevant protocols available to use in bundle shortcuts */
  ProjectsController_projects: {
    parameters: {
      query?: {
        /**
         * @description Protocol of the project to search for
         * @example aave-v3
         */
        protocol?: unknown;
        /**
         * @description ID of the project to search for
         * @example aave-v3
         */
        id?: unknown;
        /**
         * @description Title of the project to search for
         * @example aave-v3
         */
        title?: unknown;
        /**
         * @description Chain ID of the project to search for
         * @example 1
         */
        chainId?: unknown;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Project"][];
        };
      };
    };
  };
  /** Returns price for defi token or base token */
  PricesController_getPrice: {
    parameters: {
      path: {
        /**
         * @description Address of the token to search for
         * @example 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
         */
        address: unknown;
        /**
         * @description Chain ID of the network to search for
         * @example 1
         */
        chainId: unknown;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Price"];
        };
      };
    };
  };
  /** Returns actions available to use in bundle shortcuts */
  ActionsController_findAll: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Action"][];
        };
      };
    };
  };
  /** Returns standards and methods available to use in bundle shortcuts */
  StandardsController_standards: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Standard"][];
        };
      };
    };
  };
  /** Best route from a token to another */
  RouterController_routeShortcutTransaction: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /** @description Ethereum address of the wallet to send the transaction from */
        fromAddress: string;
        /** @description Flag that indicates whether to calculate and return the price impact of the transaction */
        priceImpact?: boolean | null;
        /**
         * @deprecated
         * @description Flag that indicates if gained tokenOut should be sent to EOA
         */
        toEoa?: boolean | null;
        /**
         * @description Ethereum address of the receiver of the tokenOut
         * @example 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
         */
        receiver?: string;
        /**
         * @description Amount of tokenIn to swap in wei
         * @example [
         *   "1000000000000000000"
         * ]
         */
        amountIn: string[];
        /**
         * @description Minimum amount out in wei. If specified, slippage should not be specified
         * @example [
         *   "1000000000000000000"
         * ]
         */
        minAmountOut?: string[];
        /**
         * @description Slippage in basis points (1/10000). If specified, minAmountOut should not be specified
         * @example 300
         */
        slippage?: string;
        /**
         * @description Ethereum address of the token to swap from. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
         * @example [
         *   "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
         * ]
         */
        tokenIn: string[];
        /**
         * @description Ethereum address of the token to swap to. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
         * @example [
         *   "0x6b175474e89094c44da98b954eedeac495271d0f"
         * ]
         */
        tokenOut: string[];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RouteShortcutTransaction"];
        };
      };
      400: never;
    };
  };
  /** Best route from a token to another */
  RouterController_postRouteShortcutTransaction: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RouteShortcutInputs"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RouteShortcutTransaction"];
        };
      };
      400: never;
    };
  };
  /** Returns EnsoWallet address details */
  WalletController_wallet: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /** @description Ethereum address of the wallet to send the transaction from */
        fromAddress: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Wallet"][];
        };
      };
    };
  };
  /** Returns transaction that approves your EnsoWallet to spend tokens */
  WalletController_createApproveTransaction: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /** @description Ethereum address of the wallet to send the transaction from */
        fromAddress: string;
        /** @description ERC20 token address of the token to approve */
        tokenAddress: string;
        /** @description Amount of tokens to approve in wei */
        amount: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["WalletApproveTransaction"];
        };
      };
    };
  };
  WalletController_walletBalances: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /** @description Ethereum address of the eoaAddress to check balances wallet for */
        eoaAddress: string;
        tokenType: "defiTokens" | "baseTokens" | null;
      };
    };
    responses: {
      200: never;
    };
  };
  /** Bundle a list of actions into a single tx */
  BundleController_bundleShortcutTransaction: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /** @description Ethereum address of the wallet to send the transaction from */
        fromAddress: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ActionToBundle"][];
      };
    };
    responses: {
      200: never;
    };
  };
  /** Build a shortcut from multiple contract calls */
  BuilderController_builderShortcutTransaction: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /** @description Ethereum address of the wallet to send the transaction from */
        fromAddress: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["BuilderShortcutRequestDto"];
      };
    };
    responses: {
      201: never;
    };
  };
  /** Get transaction for IPOR shortcut */
  IporController_iporShortcutTransaction: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /** @description Ethereum address of the wallet to send the transaction from */
        fromAddress: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["IporShortcutInput"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["IporShortcutTransaction"];
        };
      };
    };
  };
  /** Quote from a token to another */
  QuoteController_quote: {
    parameters: {
      query: {
        /** @description Chain ID of the network to execute the transaction on */
        chainId?: number;
        /**
         * @description Ethereum address of the wallet to send the transaction from
         * @example 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
         */
        fromAddress?: string;
        /**
         * @description Ethereum address of the token to swap from. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
         * @example [
         *   "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
         * ]
         */
        tokenIn: string[];
        /**
         * @description Ethereum address of the token to swap from. For ETH, use 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
         * @example [
         *   "0x6b175474e89094c44da98b954eedeac495271d0f"
         * ]
         */
        tokenOut: string[];
        /**
         * @description Amount of tokenIn to swap in wei
         * @example [
         *   "1000000000000000000"
         * ]
         */
        amountIn: string[];
        /** @description Flag that indicates whether to calculate and return the price impact of the transaction */
        priceImpact?: boolean | null;
      };
    };
    responses: {
      200: never;
    };
  };
  /** Simulate a route */
  QuoteController_quoteMultipath: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["QuoteRouteInputs"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Quote"];
        };
      };
      400: never;
    };
  };
  SocketController_multichainRouteShortcutTransactionWithSocket: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["MultichainRouteShortcutInputsBase"];
      };
    };
    responses: {
      201: never;
    };
  };
}