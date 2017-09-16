
# Movement Vote Concierge

Web application for donor interaction with the groups supported by Movement
2018.

## Development setup

Clone the *Github* repo, then install the dependencies using *npm*.

```
git clone https://github.com/movement-2016/concierge.git
cd concierge
npm install
```

You will need some global tools

```
npm i gulp -g
npm i babel -g
```

### Build

```bash
npm run build
```

*build* is a continuous build option - it will
set up watches and rerun build elements as file changes are saved.
`npm run build-stage` is a one time build option for poduction.

### Development Server

In a terminal, continuous server operation, updating on changes,
can be activated with

```
npm run start
```

The *nodemon* utility provides restart on update.

### Client

After starting a server instance, open a browser and then access the
application at http://localhost:3000

## Deployment

Deploy to AWS S3 bucket.

```bash
npm run deploy
```
N.B. As of this writing changes deployed are NOT tied to this repo - this is a temporary situation. For now, *please* make sure to `git push` before deploying.

## License

MIT
