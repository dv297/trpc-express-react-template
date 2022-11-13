import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../src/trpc/trpcRouter';

export const trpc = createTRPCReact<AppRouter>();
