import { Response, Request, NextFunction } from 'express';

export let getApi = (req: Request, res: Response) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};
