import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api.studio.thegraph.com/query/67019/uniswap-fork/version/latest',
  documents: 'src/**/*.gql',
  hooks: { afterAllFileWrite: ['prettier --write'] },
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: []
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
