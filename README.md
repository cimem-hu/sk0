# Configuration

The application is a webapplication, should communicate with differnt protocols on different ports.

Start the commands with enviroment variables, like

```bash
PORT=3001 npm run start
```

or setup the `.env` file in the root directory.

# Running the application

## With source code

> [!WARNING]  
> The following description presumes that everyone is using the same node and npm version. If you want to run it with docker look at the [run with docker](#with-docker) section.

Go to the

1. sk0-front
2. sk0-back

folders and issue the following commands:

### Install

```bash
npm i # to install the dependencies

#or

npm ci #to install the necessary dependencies to run the application
```

### Build

```bash
npm run build # to build the applications
```

### Run

> [!NOTE]  
> The built frontend application application should be served as a static asset directory.

In the `sk0-front` folder

> [!TIP]  
> You can use the global installation of the angular cli [here](https://angular.io/cli#installing-angular-cli), after that there is no need for the `npx` prefix.

```bash
npx ng serve

#or

npx ng serve -o # for opening the angular app
```

In the `sk0-back` folder

```bash
npm run start

# or

npm run build && node dist/main.js
```

## With docker

### Prerequirements

A [docker](https://www.docker.com/) engine and the [docker compose](https://docs.docker.com/compose/) subcommand (optionally).

### Manually

Run the following docker commands in the

1. sk0-front
2. sk0-back

folders.

```bash
docker build -t {{tagname}} .

# or in development mode

docker build -t {{tagname}} . -f Dockerfile.development
```

Run the docker images based on the containers, that you created.

### With docker compose

Run the following in the root of the folder.

> [!NOTE]  
> On docker versions, different architectures and operating systems the docker compose subcommand might be `docker compose` or `docker-compose`.
> To start the application in development mode, the minimum docker version requirement is 2.22.

You can run the following command to start the application in different modes.

**Development mode:**

```bash
docker compose -f docker-compose.dev.yml watch
```

In development mode you can access the application on the following ports:

1. [http://localhost:4200](http://localhost:4200) for the frontend
2. [http://localhost:3000](http://localhost:3000) for the backend

**Production mode:**

```bash
docker compose up

# or in detached mode

docker compose up -d
```
