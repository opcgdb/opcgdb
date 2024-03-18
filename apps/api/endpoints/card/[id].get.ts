import type { Request, Response } from 'express';

import query from '../../queries/getCardByID.js';
import { CardByIdParamsSchema, CardsByIdQuerySchema } from '../../types.js';

const getCardByID = (req: Request, res: Response) => {
  try {
    const { id } = CardByIdParamsSchema.parse(req.params);
    const { lang } = CardsByIdQuerySchema.parse(req.query);
    const qres = query(id!, lang); // Adding ! is safe as if it's underfined zod will throw an error and we won't get here
    res.status(qres.status).json({ ...qres });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getCardByID;