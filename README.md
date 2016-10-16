M-Server is a mini http server like python SimpleHttpServer that without any dependencies;

<p align="center">
    <a href="https://circleci.com/gh/nunnly/m-server/tree/master"><img src="https://img.shields.io/circleci/project/nunnly/m-server/master.svg" alt="Build Status"></a>
    <a href="https://www.npmjs.com/package/m-server"><img src="https://img.shields.io/npm/dt/m-server.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/m-server"><img src="https://img.shields.io/npm/v/m-server.svg" alt="Version"></a>
    <a href="https://www.npmjs.com/package/m-server"><img src="https://img.shields.io/npm/l/m-server.svg" alt="License"></a>
     
</p>

## useage

Install

```javascript
npm install -g m-server
```

Cd in your path

```javascript
m-server
```

You can see something like this;

```javascript
-------------------------------------------------------------
Mini http server running on port 7000 !
You can open the floowing urls to view files.
127.0.0.1:7000
192.168.1.9:7000
192.168.99.1:7000
Have fun ^_^
-------------------------------------------------------------
```

## option

> -p You can specify the port

```javascript
m-server -p 3001
```

