# ACME Learning Center Web Application (learning-center)

## Summary

ACME Learning Center Application, illustrating REST client with axios on a simulated API with json-server, using Vue Framework and PrimeVue UI Component Library. The application also shows how to support in-app navigation routing.

## Features

The application includes the following features:

- REST client with axios
- Simulated API with json-server
- PrimeVue UI Component Library
- In-app navigation routing
- Reusable components
- State management with Pinia
- Internationalization (i18n)
- Domain-Driven Design (DDD) approach

## Documentation

The project includes comprehensive documentation to support development and maintenance:

- **User Stories**: User stories with acceptance criteria for the current features are available in [`docs/user-stories.md`](docs/user-stories.md)
- **Software Architecture**: The C4 Model software architecture context and container diagrams can be found in [`docs/software-architecture.dsl`](docs/software-architecture.dsl)
- **Class Diagram**: UML class diagram showing the software structure is located in [`docs/class-diagram.puml`](docs/class-diagram.puml)

These documents provide essential information about the requirements, design, and structure for the application. Although the current version of the application interacts with a Fake API, the software architecture is considering the future interaction with an ASP.NET Core Web API backend.

## Framework and Dependencies

The application is developed with [Vue Framework](https://vuejs.org/) and the following dependencies:

- Axios (https://axios-http.com/)
- PrimeVue (https://primevue.org/)
- Vue Router (https://router.vuejs.org/)
- json-server (https://github.com/typicode/json-server/tree/v0)
- Vue i18n (https://vue-i18n.intlify.dev/)
- Pinia (https://pinia.vuejs.org/)

## Fake API Start

Write the following commands in the terminal to start the fake/mock API server.