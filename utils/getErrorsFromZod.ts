import { ZodError } from 'zod';

export type ErrorItem = {
    field: string;
    message: string;
};
export const getErrorsFromZod = (error: ZodError) => {
    let errorsList: ErrorItem[] = [];

    for (let i in error.errors) {
        errorsList.push({
            field: error.errors[i].path[0].toString(),
            message: error.errors[i].message,
        });
    }

    return errorsList;
};
