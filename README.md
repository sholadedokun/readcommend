# Readcommend
# Development environment

## Docker Desktop

Make sure you have the latest version of Docker Desktop installed, with sufficient memory allocated to it, otherwise you might run into errors such as:

```
app_1         | Killed
app_1         | npm ERR! code ELIFECYCLE
app_1         | npm ERR! errno 137.
```

If that happens, first try running the command again, but if it doesn't help, try increasing the amount of memory allocated to Docker in Preferences > Resources.

## Starting front-end app and database

In this repo's root dir, run this command to start the front-end app (on port 8080) and PostgreSQL database (on port 5432):

```bash
$ docker-compose up --build
```

(later you can press Ctrl+C to stop this docker composition when you no longer need it)

Wait for everything to build and start properly.

## Connecting to database

During development, you can connect to and experiment with the PostgreSQL database by running this command:

```bash
$ ./psql.sh
```

Then, on the psql CLI, test as follows:

```psql
readcommend=# \dt
```

If everything went well, you should get this result:

```psql
    List of relations
 Schema |  Name  | Type  |  Owner
--------+--------+-------+----------
 public | author | table | postgres
 public | book   | table | postgres
 public | era    | table | postgres
 public | genre  | table | postgres
 public | size   | table | postgres
(5 rows)
```

To exit the PostgreSQL session, type `\q` and press `ENTER`.

## Accessing front-end app

Point your browser to http://localhost:8080

Be patient, the first time it might take up to 1 or 2 minutes for parcel to build and serve the front-end app.

You should see the front-end app appear, with all components displaying error messages because the back-end service does not exist yet.

# Deploying and running back-end microservice


- ### In production mode
This uses the same docker compose file as the database and frontend deploy, so run the same  `$ docker-compose up --build` command  in the repo's root direcoty and wait for the containers to be started. Navigate to http://localhost:8080 and the App should be fully functional according to the requirements.
  
  
- ### In developement mode
Make sure the production containers are not running (use `ctrl + c` to kill the docker containers) then, navigate to the `./service/SearchEngine` directory in the repo and run this command:
  ```bash
    $ npm run dev 
  ```
   to start the backend service in a dev mode.

  Start a new terminal and run
  ```bash
  $ docker-compose up --build
  ```
  to start only the frontend app and database, wait for a few mins for all the containers to be started. 

  This mode adds a breakpoint when the apps first load or when "debugger" is encounter during execution. Follow the instructions given [here](https://nodejs.org/en/docs/guides/debugging-getting-started#inspector-clients) to continue the debbuger in an headless chrome. The app should now be fully functional in http://localhost:8080.
  ##### Running Test
  - Normal mode: `npm run test`
  - Debbuger mode: `npm run test:watch`
  - Coverage mode : `npm run test:coverage`
