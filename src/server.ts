import path from 'path';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/trpcRouter';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 4000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get('/test', (req: Request, res: Response) => {
  res.json({
    message: 'This is coming from the TypeScript Express server',
  });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
