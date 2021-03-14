# mice-buster

This application is about a cat who wnat to catch a mouse. Cat lures a mouse and waits for its timeout ( 3 seconds ). Mouse waits for random timeout ( up to 5 seconds ) and jumps for lure or doesn't based on a random wish.

Mouse is a microservice that has a lure() endpoint. Cat is a microservice that can be asked for mouse().

In essence, the general purpose is to keep the cat holder from waiting for mouse to be brought to him/her in the cat's teeth. This assumes that cat is loyal to a holder and will try to seek for mouse at some later times as it is assumed tyhat cat holder still needs a mouse after it was not brought to him due to the timeout which is a guarantee of the cat's response.

To try to seek for mouse after the timeout it is assumed that the record in a queue manager is created, thus the mock queue id function is used. Cat holder is assumed to ask for that exact his mouse request's results later on that queue id and perhaps find it in cat's storage if it was found, or find out how many tries were performed, will the tries be made in future and the reault of the cat's action if there is the one. (it's a TBD ...)

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```
You also need `docker-compose` to run this.

## Run the application

```sh
docker-compose up
```

Open http://127.0.0.1:3000 in your browser. See the specs and a Swagger UI of a mouse microservice. Try to lure()

Open http://127.0.0.1:3001 in your browser. See the specs and a Swagger UI of a cat microservice. Try get mouse()
