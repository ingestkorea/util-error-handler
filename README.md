# @ingestkorea/util-error-handler

[![npm (scoped)](https://img.shields.io/npm/v/@ingestkorea/util-error-handler?style=flat-square)](https://www.npmjs.com/package/@ingestkorea/util-error-handler)
[![NPM downloads](https://img.shields.io/npm/dm/@ingestkorea/util-error-handler?style=flat-square)](https://www.npmjs.com/package/@ingestkorea/util-error-handler)

## Description
INGESTKOREA Utility Error Handler for Node.js.

## Installing
```sh
npm install @ingestkorea/util-error-handler
```

## Getting Started

### Pre-requisites
+ Use TypeScript v4.x

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
  const response = await sampleAPIResponseFunction(false); // (true | false)
  console.log(response)
})();
```

## License
This Utility is distributed under the [MIT License](https://opensource.org/licenses/MIT), see LICENSE for more information.
