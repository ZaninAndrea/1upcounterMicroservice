# 1Up Counter
You can use this microservice to count anything (website visits, package usage, cookies eaten, ...)

The main version is hosted at [https://dazzling-thunder.glitch.me/](https://dazzling-thunder.glitch.me/)

## Usage
### Create a counter
Make a `GET` request on the route `/new/counterName` to create a new counter, you will be returned the secret for that counter.
Optional parameters:
- `secret`: to set a custom secret
- `protected`: if enabled the route `/up/counterName` will be protected, so you will have to put the secret in the query to up the counter
- `hidden`: if eneabled the route `/total/counterName` will be protected

### Up a counter
Make a `GET` request on the route `/up/counterName` to 1Up the counter, if the counter is protected you need to pass the secret in the query like this `/up/counterName?secret=yoursecret`

### Read a counter
Make a `GET` request on the route `/total/counterName` to read the counter, if the counter is hidden you will have to pass the secret like this `/total/counterName?secret=yoursecret`

### Delete a counter
Make a `GET` request on the route `/delete/counterName` to remove the counter, this route is always protected, so you have to pass the secret too like this `/remove/counterName?secret=yoursecret`

## Remix
This project is made on [Glitch](https://glitch.com) using [PouchDB](https://pouchdb.com/)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/https://dazzling-thunder.glitch.me/)