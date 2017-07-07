Solit, a true HMR server in memory.
===================
Hot server. It's so lit. 🔥🔥🔥

**Getting started**

    npm install --save solit
    
Then add this to your scripts

    "scripts": {
      "dev": "solit",
      "build": "solit build",
      "start": "solit start"
    }

Ten add a `src/server/index.js` directory

In that index.js file, add

    import express from 'express'
    const app = express()
    app.get('/', (req, res) => {
      res.json({ hello: 'world' })
    })
    export default app

And that is all!

**Run in development**

    npm run dev

**Build for production**

    npm run build

**Run in production**

    npm run start


Alternatively, you can

    npm install -g solit


and run `solit`, `solit build`, or `solit start` straight from the command line.


**Configuration**

Add a `solit.config.js` file in the directory of your `package.json` file.

then add

    module.exports = {
      /* your sweet config */
    }

The default configuration is

	module.exports =  {
      this.rootDir = './',
      this.srcDir = './src/server',
      this.buildDir = 'dist/server',
      this.filename = 'server.js', // output filename
      this.host = '127.0.0.1',
      this.port = 3000,
      this.env = {} // just HOST and PORT.
    }

