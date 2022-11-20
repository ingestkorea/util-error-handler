# @ingestkorea/util-error-handler

## Description
INGESTKOREA Util Error Handler for Node.js.

## Installing
```sh
npm install @ingestkorea/util-error-handler
```

## Getting Started

### Import
```js
// ES5 example
const { IngestkoreaError } = require('@ingestkorea/util-error-handler');
```

```js
// ES6+ example
import { IngestkoreaError } from '@ingestkorea/util-error-handler';
```

### Usage

Generate custom error instance.

```js
let customError = new IngestkoreaError({
    code: 500, type: 'Internal Server Error',
    message: 'Something Broken', description: 'Unhandled Error'
});
```

Async/await 
```js
const sampleVerifyCredentials = async (input: boolean): Promise<{ token: boolean }> => {
    const result = input ? true : false;
    return { token: result };
};

(async () => {
    try {
        // Sample Verify Credentials Function
        const { token } = await sampleVerifyCredentials(true);

        if (!token) throw new IngestkoreaError({
            code: 401, type: 'Unauthorized',
            message: 'Invalid Credentials', description: 'Access Token Expired'
        });

        const contents = { message: 'Verfiy Token Success' };
        return {
            statusCode: 200,
            headers: { 'content-type': 'application/json; charset=utf-8' },
            body: JSON.stringify(contents, null, 2)
        };

    } catch (err) {
        let customError = new IngestkoreaError({
            code: 500, type: 'Internal Server Error',
            message: 'Something Broken', description: 'Unhandled Error'
        });

        if (err instanceof Error) customError.error.description = `${err.name}: ${err.message}`;
        if (err instanceof IngestkoreaError) customError = err;

        const contents = { ...customError };
        return {
            statusCode: contents.error.code,
            headers: { 'content-type': 'application/json; charset=utf-8' },
            body: JSON.stringify(contents, null, 2)
        };
    };
})()
```


