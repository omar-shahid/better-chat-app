declare namespace Express {
  export interface Request {
    session: {
      uid: string;
    };
  }
}
