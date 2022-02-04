# Eisenhower_Matrix_To_Do_List_BackendV2

## Steps to follow

1. Clone the repository to your local computer.
2. Install MongoDB on your computer (description of how to do this is below)
2. Open the terminal and install the packages: `npm install`.
4. Run your application `node app.js`
5. Test your Endpoints with Curl or Postman.

# ![mongodb-ar21](https://user-images.githubusercontent.com/48514587/152645741-ee73c639-7d65-44f7-be08-70fd4f589292.svg) 

## Components

  - `mongod` - The database server.
  - `mongos` - Sharding router.
  - `mongo`  - The database shell (uses interactive javascript).

## Documentation

  https://docs.mongodb.com/manual/

![Expressjs](https://user-images.githubusercontent.com/48514587/152646316-bcb5d2aa-1b96-4f47-9147-5b703542519b.svg)

## Customize configuration
See [Configuration Reference](https://expressjs.com/).


## Running
### Compiles and hot-reloads for development

To run a single server database:

  ```bash
    $ sudo mkdir -p /data/db
    $ ./mongod
    $
    $ # The mongo javascript shell connects to localhost and test database by default:
    $ ./mongo
    > help
  ```
### Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
node app.js
```