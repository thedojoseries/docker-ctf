FROM node:carbon

ARG BACKEND_IP

ENV BACKEND_IP $BACKEND_IP

COPY . /code

WORKDIR /code

RUN sed -i "s/__BACKEND_IP__/$BACKEND_IP/g" src/app/components/TodoContainer.jsx && \
    sed -i "s/__BACKEND_IP__/$BACKEND_IP/g" src/app/store/sagas.js && \
    npm install

CMD [ "npm", "run", "dev" ]
