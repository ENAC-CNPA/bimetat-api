# BIMETAT-API



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

Les points **Docker network** et **Jeu de données Bim-état** concernant uniquement la 1re mise en place de l'environnement (100% vierge).

The points **Docker network** and **Startup data set** concerning only the first installation of the environment (100% clean).

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

### MongoDB

`docker run --restart always --name sdiomongo -p 27017:27017 -d -v ~/sdio/mongodb:/data -v ~/sdio/mongodb/db:/data/db --network=sdionet mongo:3.4`


<br>
<br>

### API

<br>

#### Prod (default)
`docker run --restart always --name sdioapi -p 3001:3001 -d --network=sdionet -v ~/sdio/apps/uploads:/home/api/uploads -v ~/sdio/apps/uploads-files:/home/api/uploads-files -v ~/sdio/apps/temp-files:/home/api/ignored -v ~/sdio/apps/logs:/home/api/logs --env DBNAME=sdio --env NODE_ENV=production bimetat-api:latest`


#### Dev
`docker run --restart always --name sdioapi -p 3001:3001 -d --network=sdionet -v ~/sdio/apps/uploads:/home/api/uploads -v ~/sdio/apps/uploads-files:/home/api/uploads-files -v ~/sdio/apps/temp-files:/home/api/ignored -v ~/sdio/apps/logs:/home/api/logs --env DBNAME=sdio --env NODE_ENV=development bimetat-api:latest`


