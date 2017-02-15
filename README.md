
# Movement 2017 Concierge

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
npm i pm2 -g
```

### Build

```
npm run build
```

The build uses *gulp* to run the set of tasks defined in *gulpfile.js*. 

*build* is a continuous build option - the gulp build will
set up watches and rerun build elements as file changes are saved.
*build-stage* is a one time build option, run again to build a new stage output.

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

The live site is deployed to AWS on every git push on the main branch.

Yes. That's correct. Push to the main branch and update the live site.

The hooks are in git settings for this repo. Under 'Intergration and Services'

Look for 'AWS CodeDepoly' and 'GitHub Auto-Deployment'

Once the repo is pushed to AWS, the file `./appspec.yml' is read to determine how to build and deploy the app.

Following that breadcrumb trail will help you understand that process. (Hint: see ./stage/after-install.sh)

By default the server will run on HTTP port 3000, in order to point port 80 AWS requires the following:

````
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
````

The HTTPS server will run on HTTP port 4000, in order to point port 443 AWS requires the following:

````
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 4000
````

## License

MIT
