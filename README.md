# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

Requires Ruby 2.4.0

```bash
\curl -sSL https://get.rvm.io | bash
source ~/.rvm/scripts/rvm
rvm install ruby-2.4.0
rvm use ruby-2.4.0
```

* Development Environment Setup

Install bundler if necessary:

```bash
sudo gem install bundler
```

Install dependencies:

```bash
bundle install
cd client && npm install && cd ..
```

Create the database

```bash
rake db:create && rake db:migrate
```

Start the dev server

```bash
rake start
```

* How to run the test suite

```bash
bundle exec rspec
```

* How to run linters

```bash
npm --prefix client run lint
```

* How to auto-fix linting issues (that can be autofixed)

```bash
npm --prefix client run lint-fix
```

* Services (job queues, cache servers, search engines, etc.)

* API Deployment instructions

To deploy the API:

```bash
git push heroku master
```

* Client Deployment instructions

First clone the client repo:

```bash
git clone git@github.com:amarcher/tabbit-client.git
```

Then build the client and copy it into the client repo:

```bash
npm --prefix client run build
cp -R client/build/* ../PATH/TO/REPO/tabbit-client/public_html/
```

Then commit the changes and deploy to both github & heroku:

```bash
cd ../PATH/TO/REPO/tabbit-client/
git add -A
git commit -m 'next version'
git push origin master && git push heroku master
```
