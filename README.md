# Movement 2016 Concierge

Web application for donor interaction with the groups supported by Movement
2016.

## Development setup

Clone the *Github* repo, then install the dependencies using *npm*.

```
git clone https://github.com/movement-2016/concierge.git
cd concierge
npm install
```

The database supported is *MongoDB*. For local build, a local database
instance can be used. The database name for the application in production is
*concierge*. The database name used by the test runner is *conciergeTest*.

### Build

In a terminal, build can be activated with

```
npm run [build | build-stage]
```

The build uses *gulp* to run the set of tasks defined in *gulpfile.js*. The
build options are,

- build: regular build
- build-stage: build application ready to be deployed to Heroku or similar.
The build output will be the directory concierge-stage, located in the same
parent directory as the concierge directory.

*build* is a continuous build option - the gulp build will
set up watches and rerun build elements as file changes are saved.
*build-stage* is a one time build option, run again to build a new stage output.

## Testing

Testing can be done for all components,

```
npm test
```

Or components individually,

```
npm run test-db
npm run test-server
```

### Coverage

Coverage reports are generated using,

```
npm run coverage
```

Multiple coverage runs are performed, and then a final coverage run combines
the separate results. The final report is available in
*coverage/lcov-report/index.html*

Results for the individual runs are available in the subdirectories under the
*coverage* directory.

### Server

In a terminal, continuous server operation, updating on changes,
can be activated with

```
npm start
```

The *nodemon* utility provides restart on update.

### Client

After starting a server instance, open a browser and then access the
application at http://localhost:3000

## Deployment

The build process creates the *dist* directory containing all the deployment
files (in the project directory or in the staging directory).

The entry point for the server is *main.js*.
The port number for the server can be passed on the command (-p/--port) or using
the PORT environment variable. For hosted environments, the PORT environment
variable provided by the hosting service is used.

The application also uses the following environment variables,

- SESSION_SECRET

HTTP Session secret (any text string).

## License

MIT
