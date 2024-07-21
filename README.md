# AngularChartsApp

## Important Notes

- **Firebase Realtime Database**: We use Firebase Realtime Database to provide real-time updates and seamless data synchronization. This choice supports efficient data handling and scalability for the project.

- **Firebase Credentials**: For review purposes, Firebase credentials have been committed to the repository. In a professional setting, these credentials should be stored securely and managed through environment variables. Ensure to add the `src/environments/environment.ts` file to `.gitignore` to prevent accidental exposure of sensitive information.

- **Security**: Always handle sensitive information such as API keys and credentials through environment variables. Configure these in `src/environments/environment.ts` and ensure that this file is not committed to version control.

## Technologies Used

- **Angular**: Framework for building the frontend of the application, providing a robust structure for single-page applications (SPAs) with modular development and dependency injection.

- **NgRx**: State management library for Angular applications, used for managing application state in a predictable way, ensuring a consistent and maintainable state across the application.

- **Highcharts**: Library for creating interactive charts, used to visualize data in a user-friendly manner.

- **Angular Material**: UI component library for Angular applications, providing modern and responsive components for user interfaces.

- **Firebase Realtime Database**: Used as the backend to handle data storage and real-time updates.

## Setup and Configuration

For detailed setup instructions, refer to the documentation on setting up Angular, NgRx, and Firebase.

For any additional configuration specific to this project, refer to the respective technology documentation.

For more detailed information on Firebase setup and configuration, refer to the official [Firebase documentation](https://firebase.google.com/docs).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
