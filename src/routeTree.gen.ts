/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TestIndexImport } from './routes/test/index'
import { Route as SwapIndexImport } from './routes/swap/index'
import { Route as PoolsIndexImport } from './routes/pools/index'
import { Route as PoolsCreateIndexImport } from './routes/pools/create/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TestIndexRoute = TestIndexImport.update({
  path: '/test/',
  getParentRoute: () => rootRoute,
} as any)

const SwapIndexRoute = SwapIndexImport.update({
  path: '/swap/',
  getParentRoute: () => rootRoute,
} as any)

const PoolsIndexRoute = PoolsIndexImport.update({
  path: '/pools/',
  getParentRoute: () => rootRoute,
} as any)

const PoolsCreateIndexRoute = PoolsCreateIndexImport.update({
  path: '/pools/create/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/pools/': {
      id: '/pools/'
      path: '/pools'
      fullPath: '/pools'
      preLoaderRoute: typeof PoolsIndexImport
      parentRoute: typeof rootRoute
    }
    '/swap/': {
      id: '/swap/'
      path: '/swap'
      fullPath: '/swap'
      preLoaderRoute: typeof SwapIndexImport
      parentRoute: typeof rootRoute
    }
    '/test/': {
      id: '/test/'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestIndexImport
      parentRoute: typeof rootRoute
    }
    '/pools/create/': {
      id: '/pools/create/'
      path: '/pools/create'
      fullPath: '/pools/create'
      preLoaderRoute: typeof PoolsCreateIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  PoolsIndexRoute,
  SwapIndexRoute,
  TestIndexRoute,
  PoolsCreateIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/pools/",
        "/swap/",
        "/test/",
        "/pools/create/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/pools/": {
      "filePath": "pools/index.tsx"
    },
    "/swap/": {
      "filePath": "swap/index.tsx"
    },
    "/test/": {
      "filePath": "test/index.tsx"
    },
    "/pools/create/": {
      "filePath": "pools/create/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
