export const INGESTKOREA_DEFAULT_ERROR = [
    { code: 400, type: 'Bad Request', message: 'Invalid Request' },
    { code: 400, type: 'Bad Request', message: 'Invalid Params' },
    { code: 401, type: 'Unauthorized', message: 'Invalid Credentials' },
    { code: 401, type: 'Unauthorized', message: 'Invalid Signature' },
    { code: 403, type: 'Forbidden', message: 'Access Denied' },
    { code: 404, type: 'Not Found', message: 'Invalid Resource' },
    { code: 500, type: 'Internal Server Error', message: 'Something Broken' },
    { code: 504, type: 'Gateway Timeout', message: 'Request Timeout' },
] as const;

export type IngestkoreaDefaultError = (typeof INGESTKOREA_DEFAULT_ERROR)[number];

export type ErrorCode = IngestkoreaDefaultError['code']
export type ErrorType = IngestkoreaDefaultError['type']
export type ErrorMessage = IngestkoreaDefaultError['message']
export type ErrorDescription = any

export interface IngestkoreaErrorInput {
    code: ErrorCode
    type: ErrorType
    message: ErrorMessage
    description?: ErrorDescription
};

export class IngestkoreaError {
    error: IngestkoreaErrorInput
    constructor(input: IngestkoreaErrorInput) {
        this.error = {
            ...input
        };
    };
};

export const ingestkoreaErrorCodeChecker = (code: any): code is ErrorCode => {
    return INGESTKOREA_DEFAULT_ERROR.filter(info => info.code === code).length ? true : false;
};