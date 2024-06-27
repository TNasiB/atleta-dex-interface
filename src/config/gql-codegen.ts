import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://146.190.68.0:8000/subgraphs/name/ianlapham/uniswap-v3',
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
