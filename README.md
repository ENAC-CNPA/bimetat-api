# BIMETAT-API

## For developers

<br>

### Environment Requirements
1. NodeJS v10.15.3 (optional : use NVM on [Linux/OSX](https://github.com/nvm-sh/nvm) or [Windows](https://github.com/coreybutler/nvm-windows)  )
2. NPM : 7.6.2 (need to run `npm install -g npm`)
3. Install package : `npm install -g node-gyp typescript artillery artillery-plugin-expect ts-node`
4. Clone this `api` repo
5. Clone Ifc2Json in api folder : `git clone https://github.com/bimaps/ifc2json.git bin`
6. Create in api folder : `mkdir ignored`
7. Copy and configure : `cp .env.sample .env`
8. Install api package : `npm install`


### Run API
1. Build api : `npm run tsc`
2. Start api : `npm run nodemon`

<br>
<br>

---

<br>
<br>

## Build Docker image


1. Run  `npm install`
2. Run (adapt with your image name)  
        ```
        docker build -t bimetat-api --no-cache --network=sdionet .
        docker tag bimetat-api:latest bimetat-api:$VERSION
        docker push bimetat-api:$VERSION
        docker push bimetat-api:latest
        ```

<br>
<br>

## Docker deployment

<br>

### Host Path structure

```
mkdir ~/sdio
mkdir ~/sdio/mongodb
mkdir ~/sdio/mongodb/db
mkdir ~/sdio/mongodb/log
mkdir ~/sdio/mongodb/backup
mkdir ~/sdio/redis
mkdir ~/sdio/apps
mkdir ~/sdio/apps/uploads-files
mkdir ~/sdio/apps/uploads
mkdir ~/sdio/apps/temp-files
mkdir ~/sdio/apps/logs
mkdir ~/sdio/apps/nginx
mkdir ~/sdio/apps/ssl-private
mkdir ~/sdio/backups

```

<br>
<br>


## Initialization of the environment

The steps **Docker network** and **Startup data set** concerning only the first installation of the environment (100% clean).

<br>
<br>

### Docker network
`docker network create --driver bridge sdionet`

<br>

### Startup data set

The dataset (mongo dump) can be obtained on request. Procedure to be performed after setting up the MongoDB Container.


Steps to restore the dataset :

1. Place dataset in folder (unziped) : `~/sdio/mongodb`
2. Getting in of the Docker :  `docker exec -it sdiomongo bash`
3. Start restoration :
    - environment **Prod** : `mongorestore --db sdioprod --drop ~/sdio/mongodb/*folder-dump*`
    - environment **Dev** : `mongorestore --db sdio --drop ~/sdio/mongodb/*folder-dump*`
4. Getting out of the Docker `exit`

<br>
<br>

### MongoDB (database)

`docker run --restart always --name sdiomongo -p 27017:27017 -d -v ~/sdio/mongodb:/data -v ~/sdio/mongodb/db:/data/db --network=sdionet mongo:4.2`


<br>
<br>

### Redis (cache)

`docker run --restart always --name sdioredis -p 6379:6379 -d --network=sdionet -v ~/sdio/redis:/data redis:latest redis-server --appendonly yes`


<br>
<br>

### API

<br>

#### Prod (default)
`docker run --restart always --name sdioapi -p 3001:3001 -d --network=sdionet -v ~/sdio/apps/uploads:/home/api/uploads -v ~/sdio/apps/uploads-files:/home/api/uploads-files -v ~/sdio/apps/temp-files:/home/api/ignored -v ~/sdio/apps/logs:/home/api/logs --env DBNAME=sdio --env NODE_ENV=production bimetat-api:latest`


#### Dev
`docker run --restart always --name sdioapi -p 3001:3001 -d --network=sdionet -v ~/sdio/apps/uploads:/home/api/uploads -v ~/sdio/apps/uploads-files:/home/api/uploads-files -v ~/sdio/apps/temp-files:/home/api/ignored -v ~/sdio/apps/logs:/home/api/logs --env DBNAME=sdio --env NODE_ENV=development bimetat-api:latest`


#### Env. variables
- DB Name : `--env DBNAME=sdio`
- Node env : `---env NODE_ENV=development`
- Notification mail : `--env DEV_EMAIL_TO=devnotif@example.com`
- SMTP mail : `--env MAIL_HOST=mail.example.com`
- SMPT port : `--env MAIL_PORT=587`
- User mail : `--env MAIL_USER=noreply@example.com`
- Mail password : `--env MAIL_PASSWORD=yourpass`
- Mail sender : `--env MAIL_FROM=hello@example.com`


