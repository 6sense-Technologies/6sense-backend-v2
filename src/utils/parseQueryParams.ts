import { Request } from 'express';

export const parseQueryParams = (req: Request) => {
  const { limit, offset, sort } = req.query;
  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;
  const parsedSort = sort ? String(sort) : "desc";

  return { parsedLimit, parsedOffset, parsedSort };
};
