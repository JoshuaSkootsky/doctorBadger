[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/JoshuaSkootsky/doctorBadger.svg?branch=master)](https://travis-ci.org/JoshuaSkootsky/doctorBadger)

# doctorBadger

A website for finding doctors near you. Give them a call and get medical treatment with a provider you can build an ongoing relationship with. Check it out live on Heroku: [doctorBadger](https://doctor-badger.herokuapp.com/ 'doctorBadger')

## Joshua Skootsky, March 2020

# Quick start for devs:

For local development with postgres and the createdb util:

```
createdb doctorBadger
createdb doctorBadger-test
```

Then run `npm i`

Run it on localhost with `npm run start-dev`

# Technical Rundown

## Built with Express, Sequelize, Postgres, React, and Redux

This project uses Node.js and Express for the server, Sequelize as an ORM to talk to a Postgres database, React for display components, and Redux for managing state on the front end.

## Geolocation

This app uses the [React Geolocated Higher-Order Component](https://www.npmjs.com/package/react-geolocated) for easy integration of geolocation into a React app. I had no problems integrating this into a functional component that depended on the useEffect hook to update Redux state.

## Better Doctor Web API

This app uses the [Better Doctor](http://betterdoctor.com/ 'Better Doctor') API - check out their [ developer site here](https://developer.betterdoctor.com/documentation15 'Dev API Site') .

## Secure Design and Promise Based Testing

To make this work, on the server backend of this project is a class, similar to a class that exists in an ORM like [Sequelize](https://sequelize.org/ 'Sequelize Official Site'), which on a familiar call to the database like findAll() instead makes a call to a Web API.

This allows for greater security, because the API key is read off process.env on the backend. If this was done directly in a thunk on the front end, a malicious actor could get the API key.

Furthermore, to test my own class and build up the app, I built and returned my own Promises from this class, initially reading a valid API call off local storage. This helped streamline the process of building and testing my design as the app grew.

## Continuous Integration and Delivery

I spent time at the beginning of the project setting up continuous integration and delivery. Even though it was "only" a solo project, this ended up saving me time. My lesson to teams is that it is worth knowing enough DevOps to set up continuous delievery because removing the friction from deployment means you are never waiting for someone else to deploy, and it keeps you focused on delievering functionality where it matters - off localhost and on the Cloud.

### Twelve Factor Design

This project uses the [Twelve Factor App](https://12factor.net/ 'Twelve Factor App') design principles. To quote the author, [Adam Wiggins](https://news.ycombinator.com/item?id=21416881 'Comment on Hacker News'):

> I'm the author of 12factor (although really it is an aggregation of the work and insights from many people at Heroku). It continues to surprise and please me that this piece continues to be relevant eight years later—a virtual eternity in software/internet time.
> Fun fact: I debated whether to call it "the Heroku way" or somesuch. Glad I went with a standalone name, feel like that allowed it to take on a life beyond that product. For example I doubt Google would have wanted a page about "Heroku Way app development on GCP" in their documentation. :-)

I deployed to Heroku, but the same DevOps principles would have allowed us to deploy to AWS, Google Cloud, Microsoft Azure, or another cloud computing service.

## Linting and Prettier Style

ES Lint `--fix` is integrated into the build process.

Here is the prettierrc.yml:

```
singleQuote: true
trailingComma: es5
bracketSpacing: true
```

## CD Made Simple on Heroku

To deploy continuously off master, you don't need to tell Travis to deploy to Heroku. You can tell Heroku to watch master, and it will deploy from there.

There is one caveat: you need to add a `build` script to `package.json`, or a `"heroku-postbuild"` script.

In our case,

```
"scripts": {
    "build": "webpack",
```

Does the trick, along with these configurations on Heroku's back end:

![Heroku panel, Deployment](https://i.imgur.com/37PZ6y3.png)

## Deployment

The first step to deployment on Heroku is signing in with the Heroku CLI.

After that, you have three options for deployment:

- "manually", from your local machine via the `deploy` script.
- automatically, via continuous deployment with Travis.
- automatically, via continuous deployment of the master branch from Heroku. Two points here:

* You can set up Heroku to wait for Travis CI to pass, as shown in the above image by checking a box
* You need to add a build script for Heroku to run to build because this project depends on webpack's build step.

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

- **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno

- **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.

### Deploying With Travis (Encrypt a Heroku Auth Token)

_**NOTE**_ that this step assumes that Travis-CI is already testing your code.
Continuous Integration is not about testing per se – it's about _continuously
integrating_ your changes into the live application, instead of periodically
_releasing_ new versions. CI tools can not only test your code, but then
automatically deploy your app. This is known as Continuous Deployment.
Boilermaker comes with a `.travis.yml` configuration almost ready for
continuous deployment; follow these steps to the job.

1.  Run the following commands to create a new branch:

```
git checkout master
git pull
git checkout -b f/travis-deploy
```

2.  Run the following script to finish configuring `travis.yml` :
    `npm run heroku-token`
    This will use your `heroku` CLI (that you configured previously, if
    not then see [above](#Heroku)) to generate an authentication token. It
    will then use `openssl` to encrypt this token using a public key that
    Travis has generated for you. It will then update your `.travis.yml`
    file with the encrypted value to be sent with the `secure` key under
    the `api_key`.
3.  Run the following commands to commit these changes

```
git add .travis.yml
git commit -m 'travis: activate deployment'
git push -u origin f/travis-deploy
```

4.  Make a Pull Request for the new branch, get it approved, and merge it into
    the master branch.

_**NOTE**_ that this script depends on your local `origin` Git remote matching
your GitHub URL, and your local `heroku` remote matching the name of your
Heroku app. This is only an issue if you rename your GitHub organization,
repository name or Heroku app name. You can update these values using
`git remote` and its related commands.

#### Travis CLI (Backup option for above)

There is a procedure to complete the above steps by installing the official
[Travis CLI tools][travis-cli]. This requires a recent Ruby, but this step
should not be, strictly speaking, necessary. Only explore this option when the
above has failed.

[travis-cli]: https://github.com/travis-ci/travis.rb#installation

That's it! From now on, whenever `master` is updated on GitHub, Travis
will automatically push the app to Heroku for you.

### Manual deploy off Heroku CLI

As a backup, or before you set up Continuous Delievery off master branch as above, the `npm run deploy` script will send the current state of master to Heroku.

1.  Make sure that all your work is fully committed and merged into your
    master branch on Github.
2.  If you currently have an existing branch called "deploy", delete
    it now (`git branch -d deploy`). We will use a dummy branch
    with the name `deploy` (see below), so and the script below will error if a
    branch with that name already exists.
3.  `npm run deploy`
    _ this will cause the following commands to happen in order:
    _ `git checkout -b deploy`: checks out a new branch called
    `deploy`. Note that the name `deploy` here is not magical, but it needs
    to match the name of the branch we specify when we push to our `heroku`
    remote.
    _ `webpack -p`: webpack will run in "production mode"
    _ `git add -f public/bundle.js public/bundle.js.map`: "force" add
    these files which are listed in `.gitignore`.
    _ `git commit --allow-empty -m 'Deploying'`: create a commit, even
    if nothing changed
    _ `git push --force heroku deploy:master`: push your local
    `deploy` branch to the `master` branch on `heroku`
    _ `git checkout master`: return to your master branch
    _ `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our
production server to be cluttered up with dev dependencies like
`webpack`, but at the same time we don't want our development
git-tracking to be cluttered with production build files like
`bundle.js`! By doing these steps, we make sure our development and
production environments both stay nice and clean!

### OAuth

- To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  - You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials

## Setup

For local development with postgres and the createdb util:

```
createdb doctorBadger
createdb doctorBadger-test
```

- By default, running `npm test` will use `doctorBadger-test`, while
  regular development uses the `doctorBadger` database.

- Create a file called `secrets.js` in the project root
  - This file is listed in `.gitignore`, and will _only_ be required
    in your _development_ environment
  - Its purpose is to attach the secret environment variables that you
    will use while developing
  - However, it's **very** important that you **not** push it to
    Github! Otherwise, _prying eyes_ will find your secret API keys!
  - It might look like this:

```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.
