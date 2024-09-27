FROM node:10 as build
COPY . /usr/app/
WORKDIR /usr/app/
RUN npm install

FROM node:10 as runtime
WORKDIR /usr/app/
COPY --from=build /usr/app/node_modules /usr/app/node_modules
COPY --from=build /usr/app/*.js /usr/app/
COPY --from=build /usr/app/*.json /usr/app/
COPY --from=build /usr/app/*.sh /usr/app/

ENTRYPOINT ["/usr/app/entrypoint.sh"]
