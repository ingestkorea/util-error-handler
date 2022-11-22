# @ingestkorea/util-error-handler

## Description
INGESTKOREA Util Error Handler for Node.js.

## Installing
```sh
npm install @ingestkorea/util-error-handler
```

## Getting Started

### Import
```ts
// ES5 example
const { IngestkoreaError } = require('@ingestkorea/util-error-handler');
```

```ts
// ES6+ example
import { IngestkoreaError } from '@ingestkorea/util-error-handler';
```

### Usage

#### Create custom error instance.
```ts
let customError = new IngestkoreaError({
    code: 500, type: 'Internal Server Error',
    message: 'Something Broken', description: 'Unhandled Error'
});
```

#### Async/await (sample api response)
```ts
const sampleAPIResponseFunction = async (input: boolean) => {
    try {
        if (!input) throw new IngestkoreaError({
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
};

(async () => {
    const response = await sampleAPIResponseFunction(true | false);
    console.log(response)
})();
```


