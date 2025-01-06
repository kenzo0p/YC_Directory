import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { Startup } from './startup'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author ,Startup],
}
