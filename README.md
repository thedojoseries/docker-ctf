# Docker CTF

In this CTF (Capture The Flag), you will learn how to deploy a 3-tier TODO application to AWS using Docker! Below are all the tasks that were originally published at [devslop.ctfd.io](https://devslop.ctfd.io).

# Table Of Contents

- [Introduction (1 Point)](#introduction-1-point)
  * [Architecture](#architecture)
  * [Capture The Flag](#capture-the-flag)
- [Getting Started (5 Points)](#getting-started-5-points)
  * [Accessing the AWS Console](#accessing-the-aws-console)
  * [Accessing your Cloud9 Environment](#accessing-your-cloud9-environment)
  * [Enable Auto-Save (optional)](#enable-auto-save-optional)
  * [Cloning the TODO App Repository](#cloning-the-todo-app-repository)
- [Task 1: Building and Running the Client Application (1000 Points)](#task-1-building-and-running-the-client-application-1000-points)
  * [Dockerfile](#dockerfile)
  * [Capture The Flag](#capture-the-flag-1)
- [Task 2: Pushing a Docker Image to DockerHub (1500 Points)](#task-2-pushing-a-docker-image-to-dockerhub-1500-points)
  * [Capture The Flag](#capture-the-flag-2)
- [Task 3: Deploying to the Remote Docker Host (2700 Points)](#task-3-deploying-to-the-remote-docker-host-2700-points)
  * [Capture The Flag](#capture-the-flag-3)
  * [Available Hints](#available-hints)
    + [Hints](#hints)
      - [Obtaining the instance's public IP address (700 points)](#obtaining-the-instance's-public-ip-address-700-points)
      - [Exposing a container port to the host and making it accessible via the Internet (800 points)](#exposing-a-container-port-to-the-host-and-making-it-accessible-via-the-internet-800-points)
- [Task 4: Building and Running The Backend (5000 Points)](#task-4-building-and-running-the-backend-5000-points)
  * [Bridge Network](#bridge-network)
  * [Dockerfile](#dockerfile-1)
  * [Capture The Flag](#capture-the-flag-4)
  * [Available Hint](#available-hint)
    + [Copying the backend repository folder from the first stage into the second stage (500 Points)](#copying-the-backend-repository-folder-from-the-first-stage-into-the-second-stage-500-points)
- [Task 5: Running the Backend in the Correct Network (4500 Points)](#task-5-running-the-backend-in-the-correct-network-4500-points)
  * [Capture The Flag](#capture-the-flag-5)
- [Task 6: Starting the Database (4700 Points)](#task-6-starting-the-database-4700-points)
  * [Bridge Network](#bridge-network-1)
  * [Dockerfile](#dockerfile-2)
  * [Capture The Flag](#capture-the-flag-6)
- [Task 7: Connecting the Backend to the Database - Part 1 (2500 Points)](#task-7-connecting-the-backend-to-the-database---part-1-2500-points)
  * [Capture The Flag](#capture-the-flag-7)
- [Task 8: Connecting the Backend to the Database - Part 2 (15000 Points)](#task-8-connecting-the-backend-to-the-database---part-2-15000-points)
  * [Capture The Flag](#capture-the-flag-8)
- [Task 9: Connecting the Backend to the Database - Part 3 (3300 Points)](#task-9-connecting-the-backend-to-the-database---part-3-3300-points)
  * [Capture The Flag](#capture-the-flag-9)
- [Task 10: Connecting the Frontend to the Backend (4500 Points)](#task-10-connecting-the-frontend-to-the-backend-4500-points)
  * [The Final Test](#the-final-test)
  * [Capture The Flag](#capture-the-flag-10)
  * [Available Hints](#available-hints-1)
      - [Replacing BACKEND_IP during build time (500 points)](#replacing-backend-ip-during-build-time-500-points)
- [Flags](#flags)

# Introduction (1 Point)

In this first-ever DevSlop Game Day, you will containerize an existing three-tier TODO application and deploy it to a Docker host on AWS. The final solution, which can be seen in the diagram below, will be broken down into multiple tasks and each task will award you points if all the steps are executed successfully. 
As previously mentioned, you will need a [DockerHub](https://hub.docker.com/) account. If you haven't created one, please do so now. Otherwise, let's have a look at the solution's architecture.

## Architecture

Here's the diagram of the solution you will be building in this competition:

<img src="https://docker-ctf-images.s3.amazonaws.com/architecture.jpeg" alt="architecture" width="650" height="550"/>

In summary:

* There will be 3 containers: Front-end (client application), Backend (server application) and the Database
* Each container will be running on its own Docker network **inside the same Docker host (i.e. an EC2 instance)**
* The Front-end should be accessible from the Internet and it should communicate with the Backend also through the Internet
* The backend and the database should communicate with each other privately inside the same Docker host.
* By the end of this competition, you will have deployed a fully functional TODO application

## Capture The Flag

> *Read what [Capture The Flag](https://dev.to/atan/what-is-ctf-and-how-to-get-started-3f04) is if you're not familiar with the term.*

During this competition, you will have to capture and submit multiple "flags", which are secrets that will be revealed or will need to be calculated after successfully executing all the steps of each one of the tasks. For each obtained flag, you will have to submit it using the following format:

```
DevSlopCTF{FLAG}
```

**PS: please note that all flags are case sensitive, meaning that uppercase and lowercase letters are NOT the same.**

After submitting the correct flag, you will earn points (each task will award you different amount of points). Let's submit the first flag of the competition so you know how it works. 

The first flag is: `ok`. Submit the following in the text field below to earn **1 point**: `DevSlopCTF{ok}`

# Getting Started (5 Points)

In this task, we'll go through a few steps to make sure you have access to an AWS Console and the code which you will be working on.

## Accessing the AWS Console

To access the AWS Console, take a look at your Discord team channel name and find out your team number (e.g. team1, team2, team3 etc). Then click on one of the links below:

* team1 to team40 - [Click here to sign in to AWS](https://docker-ctf.signin.aws.amazon.com/console)
* team41 to team50 - [Click here to sign in to AWS](https://docker-ctf-2.signin.aws.amazon.com/console)

Your IAM User and its password will be provided to you via your team channel on Discord.

## Accessing your Cloud9 Environment

**The steps below should be followed by EVERYONE in the team**

We've set up a [Cloud9 environment](https://aws.amazon.com/cloud9/) for your team. If you haven't heard of Cloud9 yet, it's an AWS solution for teams to write and debug code together just with a web browser (it's basically an IDE which you can access through the AWS Console, everyone sees in real time all the code changes being made and you also have access to a terminal).
After you've logged in to AWS, click on **Services** at the top and type in `Cloud9`. That will take you to the Cloud9 console. You should see your team's environment (team1 has been used as example only):

<img src="https://docker-ctf-images.s3.amazonaws.com/cloud9-environments.png" alt="cloud9-env" width="900" height="300"/><br />

Click on **Open IDE**. This will be your team's workspace for this Dojo (you don't need to write code in your local computer, but if you want to develop locally and copy and paste to Cloud9, that is totally fine).

## Enable Auto-Save (optional)

To configure Cloud9 to save files automatically, do the following. Click on the Cloud9 icon on the top-left corner and then on Preferences:

![step-01](https://docker-ctf-images.s3.amazonaws.com/cloud9-step-01.png)

At the bottom, click on Experimental:
![step-02](https://docker-ctf-images.s3.amazonaws.com/cloud9-step-02.png)

Finally, click on drop down and then on `After Delay`, which will cause files to be saved after a second or so:
![step-03](https://docker-ctf-images.s3.amazonaws.com/cloud9-step-03.png)

## Cloning the TODO App Repository

As a first step, let's clone this repository to your Cloud9 environment as it contains all the files you will need to start this challenge. This is the URL: [https://github.com/thedojoseries/docker-ctf](https://github.com/thedojoseries/docker-ctf)

In your Cloud9 environment, go to the terminal (it should show up at the bottom of the page) and type in the following:

```
git clone https://github.com/thedojoseries/docker-ctf
```

After cloning the repository and cd'ing into it, you should see the following files and folders:

```
$ ls -l 
total 76
drwxrwxr-x 2 ec2-user ec2-user  4096 MMM D 19:01 backend
drwxrwxr-x 2 ec2-user ec2-user  4096 MMM D 19:01 database
drwxrwxr-x 3 ec2-user ec2-user  4096 MMM D 19:01 frontend
drwxrwxr-x 8 ec2-user ec2-user  4096 MMM D 19:01 .git
-rw-rw-r-- 1 ec2-user ec2-user 51343 MMM D 19:01 README.md
```

Now let's begin! Submit the flag `I am ready` using the format `DevSlopCTF{FLAG}` (i.e. `DevSlopCTF{I am ready}`) to unlock the first task and earn 5 more points!

# Task 1: Building and Running the Client Application (1000 Points)

The **frontend** folder contains all the files needed in order to run the **client application** (which will also be referred to as "frontend" sometimes). Since the goal of this challenge is to create Docker containers, let's see how we can create a Docker image for this application.

## Dockerfile

Docker images can be automatically created using a [Dockerfile](https://docs.docker.com/engine/reference/builder/). Let's have a look at the Dockerfile in the **frontend** directory:

```
FROM <IMAGE>

RUN <COMMANDS>

COPY <SRC> <DEST>

CMD [ "executable" ]
```

This Dockerfile is simply a template and cannot be used as-is. Use the following information to fill out the Dockerfile:

* Use `node:carbon` as the base image (see [FROM](https://docs.docker.com/engine/reference/builder/#from))
* Copy the current directory (.) to /code (see [COPY](https://docs.docker.com/engine/reference/builder/#copy))
* Make /code the Working Directory (see [WORKDIR](https://docs.docker.com/engine/reference/builder/#workdir))
* Install all the dependencies using the command **npm install** (see [RUN](https://docs.docker.com/engine/reference/builder/#run))
* Run the following command when the container comes up: **npm run dev** (see [CMD](https://docs.docker.com/engine/reference/builder/#cmd))

When you're done, use the `build` command to build the Docker image (please ignore the `npm WARN` messages during the build):

```
docker build -t dd-fe .
```

PS 1: The `-t` option is for *tagging*. In this case `dd-fe` is the name of your image.
PS 2: The dot (`.`) at the end indicates to Docker that the Dockerfile is in the current directory.

Once the images has been built, you can view it using the `images` command:

```
$ docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
dd-fe               latest              4c047fc8432e        3 minutes ago       1.07GB
node                carbon              8eeadf3757f4        10 months ago       901MB
```

To run the container, use the `run` command, passing the `--rm` option to remove the container once it stops running:

```
docker run --rm dd-fe

> docker-dojo-fe@1.0.0 dev /code
> webpack-dev-server --open --host 0.0.0.0 --port 8080

ℹ ｢wds｣: Project is running at http://0.0.0.0:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: 404s will fallback to /index.html
⚠ ｢wds｣: Unable to open browser. If you are running in a headless environment, please do not use the --open flag
[BABEL] Note: The code generator has deoptimised the styling of /code/node_modules/react-dom/cjs/react-dom.development.js as it exceeds the max of 500KB.
ℹ ｢wdm｣: Hash: 104d1215cdcac375e62e
Version: webpack 4.30.0
Time: 4349ms
Built at: 2019-05-08 20:44:58
                               Asset      Size  Chunks             Chunk Names
291a9d331c48885d1d8c9e13e0ae0a0b.jpg   457 KiB          [emitted]
                           bundle.js  1.64 MiB    main  [emitted]  main
Entrypoint main = bundle.js
[0] multi (webpack)-dev-server/client?http://0.0.0.0:8080 ./src/app 40 bytes {main} [built]
[./node_modules/ansi-html/index.js] 4.26 KiB {main} [built]
[./node_modules/loglevel/lib/loglevel.js] 6.84 KiB {main} [built]
[./node_modules/querystring-es3/index.js] 126 bytes {main} [built]
[./node_modules/react-dom/index.js] 1.32 KiB {main} [built]
[./node_modules/react/index.js] 189 bytes {main} [built]
[./node_modules/strip-ansi/index.js] 162 bytes {main} [built]
[./node_modules/url/url.js] 22.2 KiB {main} [built]
[./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:8080] (webpack)-dev-server/client?http://0.0.0.0:8080 8.26 KiB {main} [built]
[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.59 KiB {main} [built]
[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.05 KiB {main} [built]
[./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
[./node_modules/webpack/hot/emitter.js] (webpack)/hot/emitter.js 75 bytes {main} [built]
[./src/app/components/Main.jsx] 1.36 KiB {main} [built]
[./src/app/index.jsx] 184 bytes {main} [built]
    + 159 hidden modules
ℹ ｢wdm｣: [REDACTED].
```  

## Capture The Flag

If you did everything correctly, once the container is running, you will see a message at the very bottom on the right-hand side of `ℹ ｢wdm｣:`. The message has been hidden from the output above and replaced with `[REDACTED]`. First, kill the container by pressing `CTRL+C` twice. Then, grab the message **without the period at the end** and calculate its SHA-256 Hash. Feel free to use a command-line application or an online calculator. 
The flag will be the **first 6 characters of the Hash**. Submit the correct flag using the format `DevSlopCTF{FLAG}` to earn **1000 points**!

# Task 2: Pushing a Docker Image to DockerHub (1500 Points)

At the moment, the container is running on your Cloud9 environment, which cannot be reached from the Internet and you will not be able to access your client application. Therefore, you will need to deploy the container to another Docker host which can be reached from the Internet. This Docker host is an EC2 instance running in the same AWS account as your Cloud9 environment.

Kill the running container (press `CTRL+C` twice) before proceeding.

Because you built the image in Cloud9, you will need to push it to a Docker repository so that you can download it in the Docker host. The Docker repository we're talking about here is called [DockerHub](https://hub.docker.com/). If you haven't created an account, you will need to do so before proceeding. If you're working in a team, decide which account will be used (only one account should be used).

To push the image, you will use the `push` command ([Read more about the push command](https://docs.docker.com/engine/reference/commandline/push/)). However, if you try to push your Docker image as-is, you will get the following message:

```
$ docker push dd-fe

(...)
denied: requested access to the resource is denied
```

Read the following documentation to understand how to push an image to DockerHub: [https://docs.docker.com/docker-hub/repos/](https://docs.docker.com/docker-hub/repos/). Here are the requirements to push your image to your DockerHub account:

* The repository you will create on DockerHub should be **public**. 
* The tag of the image should be `latest`

Don't hesitate to contact one of the organizers if you have any questions about how images should be named.

## Capture The Flag

Once you're able to successfully push the image to your DockerHub account, you should see the following message at the bottom of the `docker push` command output:

```
[W1]: [W2]: [W3]:[HASH] [W4]: [SIZE]
```

What are the values of W1, W2, W3 and W4? The flag for this task will be a concatenation of W1, W2, W3 and W4 separated by colon (`:`) like so: `W1:W2:W3:W4`. 
For example, if you had the following output:

```
foo: bar: baz:1234567890 qux: 3611
```

Then the flag would be `foo:bar:baz:qux`. Submit the correct flag using the format `DevSlopCTF{FLAG}` to earn **1500 points**!

# Task 3: Deploying to the Remote Docker Host (2700 Points)

> During the competition, all teams were provided with a Docker host on AWS

Before you deploy the client application, you will need to get access to the Docker host as already discussed. From the Cloud9 terminal, SSH into an EC2 instance using the following information:

* The SSH username should be `ec2-user`
* The IP Address of the instance should be `10.0.X.99`, where `X` is the number of your team. For example, team1's IP address will be `10.0.1.99`, team2's will be `10.0.2.99` and so on.
* Use the same password you used to log in to your AWS account.

Once you're in the host, run the command `docker run hello-world` to make sure Docker is working and you should get the following output:

```
[ec2-user@ip-X-X-X-X ~]$ docker run hello-world

(...)
Hello from Docker!
(...)
```

If you got the `Hello from Docker` message back, you're good to go!

Now pull the image you pushed to DockerHub using the `pull` command:

```
docker pull <frontend-image-name>
```

Run `docker images` to confirm the image was pulled successfully. Next, run the container:

```
docker run -d <frontend-image-name>
```

After you run this command, you will see a hash (i.e. the container ID). Copy that hash and run:

```
docker logs -f <hash>
```

The command above will show the output of the client application. When you see:

```
(...)
[0] multi (webpack)-dev-server/client?http://0.0.0.0:8080 ./src/app 40 bytes {main} [built]
[./node_modules/ansi-html/index.js] 4.26 KiB {main} [built]
[./node_modules/loglevel/lib/loglevel.js] 6.84 KiB {main} [built]
[./node_modules/querystring-es3/index.js] 126 bytes {main} [built]
[./node_modules/react-dom/index.js] 1.32 KiB {main} [built]
[./node_modules/react/index.js] 189 bytes {main} [built]
[./node_modules/strip-ansi/index.js] 162 bytes {main} [built]
[./node_modules/url/url.js] 22.2 KiB {main} [built]
[./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:8080] (webpack)-dev-server/client?http://0.0.0.0:8080 8.26 KiB {main} [built]
[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.59 KiB {main} [built]
[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.05 KiB {main} [built]
[./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
[./node_modules/webpack/hot/emitter.js] (webpack)/hot/emitter.js 75 bytes {main} [built]
[./src/app/components/Main.jsx] 1.36 KiB {main} [built]
[./src/app/index.jsx] 184 bytes {main} [built]
    + 159 hidden modules
ℹ ｢wdm｣: Compiled successfully.
```

That means the client application is ready. Kill the `logs -f` process by pressing `CTRL+C` (don't worry, you won't kill the container).

Before you access the application in your web browser, you need to obtain the **public IP** of the docker host. Use whatever tool you deem necessary to achieve that.  

Once you obtain the public IP address, go to your browser and type in the IP of your Docker host and **specify port 8080** (e.g., X.X.X.X:8080). Can you see an interface like this?

<img src="https://docker-ctf-images.s3.amazonaws.com/image-1.png" alt="ui" width="950" height="350"/>

You probably can't (yet)! To fix that, you need to expose port 8080 in the container to the host and port 8080 in the host to the external world so the website is accessible via the Internet. If you're not familiar with what publishing ports means in Docker, [read the Container networking](https://docs.docker.com/engine/reference/commandline/run/) page.

To publish ports and make the website accessible via the Internet, you will need to stop the container and run it again using a certain Docker CLI option to publish the aforementioned ports.

## Capture The Flag

Once you're able to successfully load the website, click on the blue **Login** button. At the moment, you will not be able to log in because the client application is not connected to the backend application. Let's find out which URL the website is calling whenever you click on the Login button. 

To find that out, [open your Browser's developer tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools). Look for a tab called **Network** and click on it. Now that you can see all API calls being made by the website, click on the Login button again and you should see an API call to the `authenticate` endpoint being made and failing. What's the **domain AND port** the website is sending the POST request to? That's the flag! For example, if the website was sending a request to `http://example.com:5656/authenticate`, the flag would be `example.com:5656`. Submit the correct flag (domain and port separated by colon) using the format `DevSlopCTF{FLAG}` to earn **2700 points**! And remember that the flag is case sensitive.

## Available Hints

Here are the available hints for this task and how much points you will lose by unlocking them:

* How to obtain the instance's public IP address - **700 points**
* How to expose a container port to the host and making it accessible via the Internet - **800 points**

### Hints

#### Obtaining the instance's public IP address (700 points)

To obtain the public IP of the ec2 instance, run the following command in your terminal:

```
curl ifconfig.co
```

Use the IP above to access the front-end.

#### Exposing a container port to the host and making it accessible via the Internet (800 points)

**Hint 1**

To expose container ports to the  host and making them available via the Internet, use the `-p` option. For example to expose port 80 in a container and map it to port 9999 in the Docker host, you'd specify `-p 9999:80` in the `docker run` command. However, note that this is only an example. Read the task to find out which port to expose.

**Hint 2**

After running the container, you can have a look at the ports being exposed. If you see the following:

```
127.0.0.1:8080->8080/tcp
```

That means the container can only be accessed through port 8080 from within the host. If you want the container to be accessible from outside the host, the output should look like:

```
0.0.0.0:8080->8080/tcp
```

**Hint 3**

The only ports allowed to receive traffic from outside our EC2 instances are 8080 and 7777. If you run your container on any other port and it needs to be able to receive traffic from outside, it won't work.

# Task 4: Building and Running The Backend (5000 Points)

Now things will start to get interesting! Let's talk about Docker networks. **Read the first 3 (three) paragraphs** of the following documentation page: https://docs.docker.com/network/bridge/

## Bridge Network

Before we start developing a Dockerfile for the Backend application, let's create a bridge network for the Backend container. **In the Docker host**, use the command `docker network` to `create` a network called `backend` (do not run this command in the Cloud9 environment, you need to run it in the docker host).

After successfully creating the network, list the networks (you should see the following): 

```
$ docker network list
NETWORK ID          NAME                DRIVER              SCOPE
e52edcff0c1e        backend             bridge              local
57c19bd7421b        bridge              bridge              local
4a3cd7ddc34d        host                host                local
3895c7b02506        none                null                local
```

**Go back to the Cloud9 environment to develop a Dockerfile for the Backend.**

## Dockerfile

Here's the difference between the frontend and the backend directories in the repository: the frontend contains all the files necessary to run the application. But, what about the backend? It only contains an empty Dockerfile (how exciting!).

The backend Dockerfile will look a bit different than the frontend's Dockerfile as you will perform a [Multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/). Here's all the information you will need in order to develop the backend's Dockerfile:

* Your Dockerfile should have 2 (two) FROM statements. Both statements should use this image: **alpine:3.12**
* The first stage in your Dockerfile should install git (use the command: `apk add --no-cache git`) and clone the backend repository: [https://github.com/thedojoseries/react-todo-backend](https://github.com/thedojoseries/react-todo-backend)
* Once the repository is cloned, create a second stage using the same image: **alpine:3.12**. 
* The second stage should install Node.js and NPM (use the command: `apk add --no-cache nodejs npm`) and copy the backend repository folder from the first stage into the second stage
* Once the repository is copied over, run `npm install` to install all the dependencies
* The container command to run the backend application should be: `npm run server-dev`

After you build the image and run the container, you should see the following:

```
$ docker run <backend-image-name>

> docker-dojo-be@1.0.0 server-dev /code
> nodemon src/server --exec babel-node src/server

[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node src/server src/server`
Server running, listening on port  7777

(...)
(node:58) UnhandledPromiseRejectionWarning: [REDACTED]: failed to connect to server [undefined:27017] on first connect [Error: getaddrinfo ENOTFOUND undefined
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:66:26) {
  name: '[REDACTED]'
}]
(...)
```

The error you are seeing is expected because the backend is trying to connect to the database, which is not running yet.

## Capture The Flag

The flag for this task will be the name of the error, which has been replaced in the output above with `[REDACTED]`. Submit the correct flag using the format `DevSlopCTF{FLAG}` to earn **5000 points**!

## Available Hint

* How to copy the backend repository folder from the first stage into the second stage - 500 points

### Copying the backend repository folder from the first stage into the second stage (500 Points)

When you clone the backend repository from GitHub in the first stage, take a look at the full path where the repository was cloned to. In the second stage, specify that full path in the `COPY --from` instruction

# Task 5: Running the Backend in the Correct Network (4500 Points)

Before you can run the backend application in the Docker host, you will need to push it to your DockerHub account (same way as you pushed the client application).

Once the backend image has been pushed, **go to the Docker host**. Earlier, we created a network for the backend application called `backend`. This means that whenever you run the backend container, you'll have to specify which network the container will run on. That can be achieved with the `--net` option. Run the backend container in the `backend` network and in background mode using the `docker run -d` command (you don't need to worry about the port for now, just run the container specifying the correct network).

## Capture The Flag

To make sure you are running the backend container in the correct network, let's [inspect](https://docs.docker.com/engine/reference/commandline/inspect/) the container. To inspect a container, you can use the `docker inspect` command. When inspecting a container, the command outputs a JSON array with an object that contains tons of information about the container. Run `docker inspect` on the backend container and find the name of the network on which the container is running.

To find the flag for this task, you will have to use [jq](https://stedolan.github.io/jq/), which has already been installed in your Docker host. With jq, you're able to use filters to query JSON objects. For example, take a look at the JSON object below:

```json
{
  "firstName": "John",
  "lastName" : "doe",
  "age"      : 26,
  "address"  : {
    "streetAddress": "naist street",
    "city"         : "Nara",
    "postalCode"   : "630-0192"
  },
  "phoneNumbers": [
    {
      "type"  : "iPhone",
      "number": "0123-4567-8888"
    },
    {
      "type"  : "home",
      "number": "0123-4567-8910"
    }
  ]
}
```

If you put that object into a file called `obj.json` and ran:

```
cat obj.json | jq .firstName
```

The command above would return:

```json
"John"
```

In this case, `.firstName` is the filter and returns the value of the key `firstName`. 

**The flag of this task** will be the jq filter that returns the **IP address of the backend container running in the backend network**. You can run the following command to input the output of `docker inspect` into jq:

```
docker inspect <BACKEND_CONTAINER_ID> | jq '<FILTER>'
```

The expected output should be the IP address in quotes:

```
"X.X.X.X"
```

ATTENTION: because the JSON object from `docker inspect` is an array, you will have to filter for the first item of the array. **Make sure you include an INDEX (i.e. a number) in your filter**. If you do not include an index in the filter, it could still work, but it will not be the correct flag.  

Find out what `<FILTER>` should be and submit it using the format `DevSlopCTF{<FILTER>}` (no single quotes around `<FILTER>`) to earn **4500 points**!

# Task 6: Starting the Database (4700 Points)

Remember when you created a Bridge network for the Backend in the Docker host? Let's do the same for the database.

## Bridge Network

Create a user-defined bridge network and call it `db`.

You should have the following networks:

```
$ docker network list
NETWORK ID          NAME                DRIVER              SCOPE
8a6c11vd618a        db                  bridge              local
e52edcff0c1e        backend             bridge              local
57c19bd7421b        bridge              bridge              local
4a3cd7ddc34d        host                host                local
3895c7b02506        none                null                local
```

The Dockerfile for the database will be the easiest one you will be building today.

## Dockerfile

Use the following information to develop the Dockerfile for the database (MongoDB) **in the Cloud9 environment**:

* Use the alpine:3.9 image
* Run the following command: `apk add --no-cache mongodb` (installs MongoDB)
* Use the command `mongod --bind_ip_all` as entrypoint. The option `--bind_ip_all` will make MongoDB bind to 0.0.0.0, meaning that it will accept incoming connections from anywhere. If you don't specify this option, MongoDB will only accept traffic coming from 127.0.0.1 (i.e. processes running on the same container), so no other container will be able to communicate with it.

Push the image to your Dockerhub account and run the container **in the Docker host** (remember to run it in the `db` network you just created):

```
$ docker run --net db <database-image-name>

2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1 port=27017 dbpath=/data/db 64-bit host=a241d165b821
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] db version v3.4.10
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] git version: 078f28920cb24de0dd479b5ea6c66c644f6326e9
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] OpenSSL version: LibreSSL 2.6.5
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] allocator: system
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] modules: none
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] build environment:
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten]     distarch: x86_64
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten]     target_arch: x86_64
2019-05-09T11:12:33.428+0000 I CONTROL  [initandlisten] options: {}
2019-05-09T11:12:33.465+0000 I STORAGE  [initandlisten] exception in initAndListen: 29 Data directory /data/db not found., terminating
2019-05-09T11:12:33.465+0000 I NETWORK  [initandlisten] shutdown: going to close listening sockets...
2019-05-09T11:12:33.465+0000 I NETWORK  [initandlisten] shutdown: going to flush diaglog...
2019-05-09T11:12:33.465+0000 I CONTROL  [initandlisten] now exiting
2019-05-09T11:12:33.466+0000 I CONTROL  [initandlisten] shutting down with code:100
```

Note how the database just shut itself down at the end. That is because MongoDB, by default, requires the path `/data/db` to exist inside the container before it runs. However, we do not want the data to be stored only in the container, because if the container dies, you will lose all the data. What you need to do is to create a directory in the host (EC2 instance) where data will be persisted. Then, when running the container, you'd just tell Docker to *mount* the **host filesystem into the container**. This way, even if the container dies, the data is still being safely stored in the host. Let's learn about [Volumes](https://docs.docker.com/storage/volumes/) next.

In Linux, Docker offers three types of mounts: [Volumes](https://docs.docker.com/storage/volumes/), [Bind mounts](https://docs.docker.com/storage/bind-mounts/) and [tmpfs mounts](https://docs.docker.com/storage/tmpfs/). You should not use tmpfs mounts for databases because data is not stored on disk, it's stored temporarily in memory. So that leaves us Volumes and Bind mounts.

From the official documentation, **Volumes** are stored in a part of the host filesystem which is **managed by Docker** (`/var/lib/docker/volumes/` on Linux). Non-Docker processes should not modify this part of the filesystem. However, **Bind mounts** may be stored **anywhere** on the host system. They may even be important system files or directories. Non-Docker processes on the Docker host or a Docker container can modify them at any time.

Docker recommends **Volumes** over **Bind mounts**, so let's go with Volumes.

[Refer to the documentation](https://docs.docker.com/storage/volumes/#create-and-manage-volumes) and create a volume called `db-vol` **in the Docker host**. Then, [run the database container one more time and specify the new volume](https://docs.docker.com/storage/volumes/#start-a-container-with-a-volume).

Now, you should get different logs:

```
(...)
2020-11-12T12:44:12.647+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1 port=27017 dbpath=/data/db 64-bit host=a947a2d0b9e0
2020-11-12T12:44:12.647+0000 I CONTROL  [initandlisten] db version v4.0.5
(...)
2020-11-12T12:44:13.208+0000 I STORAGE  [initandlisten] createCollection: local.startup_log with generated UUID: 1a178090-b449-4beb-b5d8-bf88c4af167b
2020-11-12T12:44:13.221+0000 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory '/data/db/diagnostic.data'
2020-11-12T12:44:13.222+0000 I NETWORK  [initandlisten] waiting for connections on port 27017
(...)
```

If it says `waiting for connections on port 27017`, then it worked!

The container is running in foreground. Kill the container (`CTRL+C`) and run it again in background mode.

## Capture The Flag

Remember when you used the command `docker inspect` to find out the IP Address of the container? Now, use the same command to find out which path in the Docker host is being used for the volume that you created. Once you have the path, list all the files in that directory. There will be one file with extension `.bson` (BSON is the binary encoding of JSON-like documents that MongoDB uses when storing documents in collections). The flag will be the name of the file **without the extension**. Submit the correct flag using the format `DevSlopCTF{FLAG}` to earn **4700 points**!  

# Task 7: Connecting the Backend to the Database - Part 1 (2500 Points)

The first step will be to pass in an environment variable to the backend application. Run `docker ps` in the docker host to list all the running containers, take the ID of the backend container and run `docker logs <ID>`. Pay attention to the following message:

```
(node:58) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server [undefined:27017] on first connect
```

This `undefined` means Node.js was expecting to find an environment variable in the container, but the variable was not found. Here's the portion of the Node.js code where an environment variable is expected:

```
const mongoContainerName = process.env.MONGODB_HOST
const url = `mongodb://${mongoContainerName}:27017/myorganizer`;
```

As you can see in the first line, Node.js expects an environment variable called `MONGODB_HOST` (environment variables can be accessed in Node.js using `process.env`). The value of this variable should be either the **IP address** or the **DNS name** of the MongoDB container. [If the backend and the database containers were deployed to the same user-defined bridge network, you could use a DNS name](https://stackoverflow.com/a/35691865). However, because the backend and the database are in **two separate user-defined bridge networks**, the backend container **cannot** use the database container's name to reach out to it. By default, DNS resolution only works locally in each user-defined bridge network. Therefore, the value of `MONGODB_HOST` should be an **IP address**, not an DNS name.

First, let's grab the IP address of the database container. In the docker host, run `docker inspect` on the database container and grab its IP address.

Now, shut down the backend container using the command `docker stop`. Spin up the container again in background mode, and pass in the environment variable `MONGODB_HOST`, setting it to the IP address of the database container using the `-e` option. [Read the documentation to understand how to use this option](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file).

Use `docker logs` to obtain the container logs and you should see the following:

```
> docker-dojo-be@1.0.0 server-dev /code
> nodemon src/server --exec babel-node src/server

[nodemon] 1.19.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node src/server src/server`
Server running, listening on port  7777
```

However! If you wait 30-60 seconds, you will see a new message:

```
(node:58) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server [X.X.X.X:27017] on first connect [REDACTED: connection timed out
(...)
```

By default, Docker does not allow containers in two separate bridge networks to communicate with each other. That's why you see the error above. What you need to do is to figure out a way for these two networks to be able to communicate with each other.

**PS: If you've got the message `Connected to MongoDB!`, that probably means the backend and database container are running on the same network. Make sure you run these containers using `--net` and place them in their own respective networks before proceeding to the next tasks.**

## Capture The Flag

In the error above, you saw another `REDACTED`. That's the flag. Submit it using the format `DevSlopCTF{FLAG}` to earn **2500 points**!

# Task 8: Connecting the Backend to the Database - Part 2 (15000 Points)

The next step will be to connect the Backend bridge network to the Database bridge network. This step will require a bit of networking knowledge, but don't worry, we'll guide you through what needs to be done.

Run the following command in the Docker host:

```
sudo iptables -t filter -vL
```

This will list a few chains, such as **INPUT**, **OUTPUT**, **DOCKER-ISOLATION-STAGE-1**, **DOCKER-ISOLATION-STAGE-2** etc. There are a lot of rules, but let's focus on the **DOCKER-ISOLATION-STAGE-2** chain. 

You should see something similar to the following:

```
Chain DOCKER-ISOLATION-STAGE-2 (3 references)
 pkts bytes target     prot opt in     out     source               destination
   10   600 DROP       all  --  any    br-111111111111  anywhere             anywhere
    0     0 DROP       all  --  any    br-222222222222  anywhere             anywhere
    0     0 DROP       all  --  any    docker0  anywhere             anywhere
 3128  165K RETURN     all  --  any    any     anywhere             anywhere
```

The IDs starting with `br-` are IDs for network interfaces. If you run `ifconfig`, you should see:

```
br-111111111111: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.19.0.1  netmask 255.255.0.0  broadcast 172.19.255.255
        inet6 fe80::42:b0ff:fe16:67  prefixlen 64  scopeid 0x20<link>
        ether 02:42:b0:16:00:67  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

br-222222222222: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.18.0.1  netmask 255.255.0.0  broadcast 172.18.255.255
        inet6 fe80::42:d4ff:fee2:e3c  prefixlen 64  scopeid 0x20<link>
        ether 02:42:d4:e2:0e:3c  txqueuelen 0  (Ethernet)
        RX packets 8  bytes 648 (648.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 8  bytes 648 (648.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

Your interface IDs (and maybe IPs) will probably be different, so don't worry if some information here doesn't match what you're seeing in your terminal. 

Now back to the IP table, take a look at the following two rules in the `DOCKER-ISOLATION-STAGE-2` chain:

```
   10   600 DROP       all  --  any    br-9ebf3477d04d  anywhere             anywhere
    0     0 DROP       all  --  any    br-cedb7f13e197  anywhere             anywhere
```

These two rules are responsible for dropping packets that are going out from these two Docker networks. This means that whenever the backend application in the `backend` network tries to reach out to the database in the `db` network, the traffic is dropped.

What you will have to do to allow this connection is to create two additional iptables rules:

* One allowing traffic from `backend` to the `db` network
* and another allowing traffic from `db` to the `backend` network

When creating the rules, you will need to specify which chain the rule will belong to. There should be four Docker-related chains in your IP Table: `DOCKER`, `DOCKER-ISOLATION-STAGE-1`, `DOCKER-ISOLATION-STAGE-2`, `DOCKER-USER`. Choose the most appropriate chain.

*HINT: use the `iptables` command to create the rules*

Once the rules have been created, let's see if the backend is able to connect to the database. Here's how you can test it:

* Grab the ID of the backend container and run: `docker exec -it <ID> sh`. This command will take you into the container
* Install telnet: `apk add --no-cache busybox-extras` 
* From the **backend container** try to connect to MongoDB: `telnet X.X.X.X 27017` (where `X.X.X.X` is the private IP address of the database container)

If you're able to connect, you should get the following message from `telnet`:

```
Connected to X.X.X.X
```

To exit, press `CTRL+C`, then press `e`.

## Capture The Flag

The flag for this task is hidden in the network traffic being exchanged between the backend and the database. What you will need to do is to capture the network traffic going through the database container's Network Interface and analyze it. 

To capture the network traffic going through the database container's network interface, you should use the `tcpdump` command. Run the following command, replace `br-xxxxxxxxxx` with the ID of the database container's network interface (which you should've obtained already when you ran `ifconfig`):

```
sudo tcpdump -i br-xxxxxxxxxx -nnSX
```

The command above will output the traffic going through the network interface specified. The traffic is broken down into multiple chunks where you will see at the top of each chunk information about the packet (like timestamp, source IP, destination IP, etc) and below that an Hexadecimal representation of the message on the left and an ASCII representation of the message on the right. For example:

```
15:08:23.749857 IP 172.19.0.1.35240 > 172.19.0.2.27017: Flags [P.], seq 514019149:514019180, ack 1526378127, win 1414, options [nop,nop,TS val 591804980 ecr 318629181], length 31

0x0000:  4500 0053 ae13 4000 fe06 7667 ac13 0001  E..S..@...vg....
0x0010:  ac13 0002 89a8 6989 1ea3 4f4d 5afa ae8f  ......i...OMZ...
0x0020:  8018 0586 586f 0000 0101 080a 2346 3a34  ....Xo......#F:4
0x0030:  12fd e53d 1f00 0000 0869 736d 6173 7465  ...=.....ismaste
0x0040:  7200 0102 2464 6200 0600 0000 6164 6d69  r...$db.....admi
0x0050:  6e00 00                                  n..
```

If you wait a few seconds and the backend is able to communicate with the database, you should see the following message in ASCII format:

```
E.....@...&.....
....i...Z.....Ol
....Y0..........
#F:4........t...
..............is
master...maxBson
ObjectSize......
maxMessageSizeBy
tes..l...maxWrit
eBatchSize......
localTime.E.3.u.
...logicalSessio
nTimeoutMinutes.
.....minWireVers
ion......maxWire
Version......rea
dOnly...ok......
..?.
```

Take a look at this specific line:

```
Version......rea
```

On the left-hand side, there will be an Hexadecimal representation of the string `Version......rea`. The flag is the first two (2) octets (no space) **of the Hexadecimal representation reading from right to left**. Submit the correct flag using the format `DevSlopCTF{FLAG}` to earn a whopping **15000 points**!

# Task 9: Connecting the Backend to the Database - Part 3 (3300 Points)

Now that the backend application is able to communicate with the database, let's restart it. Kill the container and run it again, but this time, expose port `7777` so the client application can later communicate with the backend. If you see the message `Connected to MongoDB!`, that means it's all working!

```
> docker-dojo-be@1.0.0 server-dev /code
> nodemon src/server --exec babel-node src/server

[nodemon] 1.19.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node src/server src/server`
Server running, listening on port  7777
Connected to MongoDB!
```

## Capture The Flag

In the Docker host, run `docker ps` and copy the ID of the database container. Then, run `docker logs <ID>`, where `<ID>` is the ID of the database container. In the logs, you will see a message saying `connection accepted from X.X.X.X:YYYY #Z (1 connection now open)` (you might see it more than once, but look at the last occurrence). Then right after, you should see a message starting with `received client metadata from X.X.X.X:YYYYY connX:`. The `received client metadata from (...)` message includes a payload (in JSON format). In this payload, you will see 3 versions in the format `<MAJOR>.<MINOR>.<PATCH>`. Get the `<MAJOR>` number of each version, multiply them and **you will have the flag for this task**. For example, if you had to multiply the minor number of the three versions below:

- 6.1.8
- 8.12.6
- 10.5.7

The result would be `1 + 12 + 5 = 18`. Submit the correct flag using the format `DevSlopCTF{FLAG}` to earn **5005 points**!

# Task 10: Connecting the Frontend to the Backend (4500 Points)

The last step will be to connect the frontend to the backend. Take a look at the code below (client application):

`frontend/src/app/components/TodoContainer.jsx`
```
import React from 'react';
import { TodoList} from './TodoList';
import axios from 'axios';
import './App.scss';
import { Link } from 'react-router-dom';

// Contaner Component
// Todo Id
window.id = 1;
export class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      tasks: []
    }
    this.apiUrl = `http://__BACKEND_IP__:7777`;
  }

(...)
```

`frontend/src/app/store/sagas.js`
```
import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import { history } from './history'
import * as mutations from './mutations';
const url = process.env.NODE_ENV === 'production' ? `` : `http://__BACKEND_IP__:7777`;

(...)
```

To connect the client to the backend, you will have to replace all occurrences of `__BACKEND_IP__` with a public IP address. You **should not** use the backend container's private IP address because the client application will be running on your web browser, in your laptop. Therefore, if you specified a private IP address which can only be accessed inside the EC2 instance, the client would never be able to reach the backend. 

Now, pay attention to the following. You cannot hardcode the IP address into the client code. You will have to replace `__BACKEND_IP__` during build time (i.e. when you're building the container image with the `docker build` command). That can be achieved by running a Unix program in a Docker `RUN` instruction.

## The Final Test

Here's the final test to see if you've completed the challenge. 

First, you should see the same interface you saw when you deployed the frontend application:

![frontend-1](https://docker-ctf-images.s3.amazonaws.com/image-2.png)

Click on the Login button. If you're still getting the message `Login incorrect`, that means the client application is not able to communicate with the server application. Otherwise, you should see the following interface:

![frontend-2](https://docker-ctf-images.s3.amazonaws.com/image-3.png)

## Capture The Flag

Once you are able to log in, you will need to find out the size of the payload being returned by the backend that contains all the tasks. To find that out, [open your Browser's developer tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools). Look for a tab called **Network** and click on it. Now that you can see all API calls being made by the client application, refresh the page where you see the tasks (if you need to log in again, just click on the blue Login button) and observe the API calls being made. One of the last API calls should be to `/tasks`. Analyze that API call and the flag will be the number of Bytes of the payload that contains all the tasks. Submit the correct flag using the format `DevSlopCTF{FLAG}` to earn the last **4500 points** of the competition!

## Available Hints

Here are the available hints for this task and how much points you will lose by unlocking them:

* How to replace __BACKEND_IP__ during build time - **500 points**

#### Replacing BACKEND_IP during build time (500 points)

To replace __BACKEND_IP__ with the Backend's IP, you can use the Unix command [sed](https://www.geeksforgeeks.org/sed-command-in-linux-unix-with-examples/). For example, to replace all occurrences of `__A__` with `__B__` on the `test.txt` file, you'd run the following:

```
sed -i "s/__A__/__B__/g" test.txt
```

# Flags

These are the flags for each one of the tasks:

* Task 1: `DevSlopCTF{c2e3ff}`
* Task 2: `DevSlopCTF{latest:digest:sha256:size}`
* Task 3: `DevSlopCTF{__backend_ip__:7777}`
* Task 4: `DevSlopCTF{MongoNetworkError}`
* Task 5: `DevSlopCTF{.[0].NetworkSettings.Networks.backend.IPAddress}`
* Task 6: `DevSlopCTF{storage}`
* Task 7: `DevSlopCTF{MongoNetworkTimeoutError}`
* Task 8: `DevSlopCTF{6561}`
* Task 9: `DevSlopCTF{144}`
* Task 10: `DevSlopCTF{754}`
