FROM node:10.15.3

RUN apt update \
	&& apt install vim git bash make python -y \
	&& apt install g++ openssh-client -y \
    && apt install mongodb-clients -y 

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Install .NET Core
RUN dotnet_version=3.1.1 \
    && curl -SL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Runtime/$dotnet_version/dotnet-runtime-$dotnet_version-linux-x64.tar.gz \
    && dotnet_sha512='991a89ac7b52d3bf6c00359ce94c5a3f7488cd3d9e4663ba0575e1a5d8214c5fcc459e2cb923c369c2cdb789a96f0b1dfb5c5aae1a04df6e7f1f365122072611' \
    && echo "$dotnet_sha512 dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -ozxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet

RUN npm install -g node-gyp typescript artillery artillery-plugin-expect

ENV PATH="/home/api/bin/linux:${PATH}"

ENV DBHOST=sdiomongo
ENV NODE_ENV=development
ENV PORT=3000
ENV DEBUG=app*,api*
ENV DEV_EMAIL_TO=email_address@when_developping.com
ENV MAIL_HOST=smtphost
ENV MAIL_PORT=587
ENV MAIL_USER=smtpuser
ENV MAIL_PASSWORD=smtppass
ENV MAIL_FROM=contact@email.com
ENV DBUSER=
ENV DBPASS=
ENV DBPORT=27017
ENV DBNAME=sdio
ENV DBPREFIXPROD=1


# From this point on ... no more cache

WORKDIR /home
RUN mkdir api
COPY . /home/api
WORKDIR /home/api
RUN npm install
RUN npm run tsc
RUN mkdir ignored
RUN mkdir logs

# Clone Bin
RUN git clone https://github.com/bimaps/ifc2json.git bin

# Download IfcConvert
RUN curl -SL --output bin/linux/IfcConvert.zip https://s3.amazonaws.com/ifcopenshell-builds/IfcConvert-v0.6.0-25d86a5-linux64.zip
RUN curl -SL --output bin/macos/IfcConvert.zip https://s3.amazonaws.com/ifcopenshell-builds/IfcConvert-v0.6.0-25d86a5-macos64.zip
RUN curl -SL --output bin/win/IfcConvert.zip https://s3.amazonaws.com/ifcopenshell-builds/IfcConvert-v0.6.0-517b819-win64.zip
RUN unzip -o bin/linux/IfcConvert.zip -d bin/linux && rm bin/linux/IfcConvert.zip
RUN unzip -o bin/macos/IfcConvert.zip -d bin/macos && rm bin/macos/IfcConvert.zip
RUN unzip -o bin/win/IfcConvert.zip -d bin/win && rm bin/win/IfcConvert.zip

CMD node build/server.js
