/* 
Require this module in the beginning of every entry point of the application. Mind that it has side-effects because of changing `process.env` variable. This module relies on the Node.js caching mechanism (https://stackoverflow.com/questions/11937859/stateful-singleton-modules) so it's safe to import it twice in the same script (only the first `import` statement will be executed)
*/

// First, install `dotenv` using `npm i -S dotenv`, so you can import it and use here
const dotenv = require('dotenv')

// The export will consist all the environment variables changed by `dotenv`
module.exports = dotenv.config({ path: '.env' })