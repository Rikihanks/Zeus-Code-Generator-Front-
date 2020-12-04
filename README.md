# ZeusCodeGenerator

  

Front-End for the Zeus Code Generator project.

  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

  

## Development server

  

Requires node and angular cli installed.

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Usage
Zeus Code Generator, Zeus from now on, is a tool to generate the always repetitive code from Services, Interfaces and DTOs in a project that uses the DAO pattern.

It will take an input containing the Entity name, and its fields, much like you would define it in an Entity class in java, and it will generate the Services, Interfaces and DTOs asociated to that entity to save time and repetitive coding.

Enter localhost:4200, in the center panel called **ENTITY INFO** you can fill the current Entity data, once its done click Add Entity to save it to your **ENTITIES**. Do this for every entity that you want its services and dto's to be generated.

Once you are done, head to the **GENERATE CODE** panel and download a zip file containing the classes generated for your entities. Add this files to your project and resolve the needed dependencies.

The app is case sensitive, ensure you define your entities properties the same way you would do it in a Java class.
