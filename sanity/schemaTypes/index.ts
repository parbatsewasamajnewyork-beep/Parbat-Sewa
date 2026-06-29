import { type SchemaTypeDefinition } from 'sanity';
import { event } from './event';
import { lifeMember } from './lifeMember';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, lifeMember],
};
