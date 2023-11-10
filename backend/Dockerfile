FROM alpine:3.12 as gitclone

RUN apk add --no-cache git && \
    mkdir -p /code && \
    cd /code && \
    git clone https://github.com/thedojoseries/react-todo-backend

FROM alpine:3.12

RUN apk add --no-cache nodejs npm

COPY --from=gitclone /code/react-todo-backend /code/react-todo-backend

WORKDIR /code/react-todo-backend

RUN npm install

CMD ["npm", "run", "server-dev"]
