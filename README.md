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

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
