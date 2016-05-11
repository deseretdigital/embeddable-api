FROM node:5.9.1
ADD ./package.json /code/package.json
RUN npm install
ADD ./app /code/app
ADD ./lib /code/lib
WORKDIR /code
CMD npm run start
EXPOSE 80
