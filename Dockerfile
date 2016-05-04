FROM node:5.9.1
ADD ./app /code/app
ADD ./lib /code/lib
ADD ./package.json /code/package.json
WORKDIR /code
RUN npm install
CMD npm run start
EXPOSE 80
