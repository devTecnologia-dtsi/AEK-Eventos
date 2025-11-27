# Eventos
Aplicación para gestionar todos los eventos creados o gestionados en la universidad a nivel nacional, en donde se conecta con softexpert para la creación y edición de cada uno de los asistentes al evento.

## Ambiente de pruebas

Link: [dominio del link](https://uniminuto-sandbox.campusm.exlibrisgroup.com/campusm/home#menu)

## Ambiente de producción

Link: [dominio del link](https://uniminuto.campusm.exlibrisgroup.com/campusm/home#select-profile)

## Requisitos

- Aek
- React
- node

## Instalacion

- git clone https://github.com/devTecnologia-dtsi/AEK-Eventos.git
- cd AEK-Eventos
- aek install

## Estructura del Proyecto
.
├── docs
├── src
│ ├── client
│ └── server
├── .gitignore
├── .npmignore
├── package-lock.json
├── package.json
├── README.md
├── runserver.yaml
├── webpack.config.js
└── yarn.lock

## Despliegue en local

- aek install
- aek start
- conectarse al http://localhost:5000/

## Despliegue ambiente de pruebas y produccion

- cd AEK-Eventos
- aek deploy -n 
- selecionar el ambiente en donde se quiere hacer el despliegue (sandbox o produccion)

## Tech Stack

**Client:** AEK, REACT