export const TryCatch = (fn: Function) => {
  return async (req: any, res: any, next: any) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
