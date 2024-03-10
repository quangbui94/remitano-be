import { CustomerError } from '@shared/ErrorCustom';
import { Request, Response, NextFunction } from 'express';

export default (err: CustomerError, req: Request, res: Response, next: NextFunction) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    })
}
