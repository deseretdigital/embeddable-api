FROM node:9.2.0
WORKDIR /code
ADD ./package.json /code/package.json
RUN npm install
ADD ./app /code/app
ADD ./lib /code/lib
CMD npm run start
EXPOSE 80
EXPOSE 443
