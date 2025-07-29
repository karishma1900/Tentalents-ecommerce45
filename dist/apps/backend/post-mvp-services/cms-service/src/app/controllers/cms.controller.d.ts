import { Request, Response, NextFunction } from 'express';
export declare const createPage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPageBySlug: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatePage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deletePage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const listPages: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
