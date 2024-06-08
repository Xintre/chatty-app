# Chatty app

This is an Apollo Client GraphQL-based chat application in React Native using [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It has been prepared according to TheWidlarzGroup's recruitment task guidelines and uses their [GraphQL API](https://chat.thewidlarzgroup.com/api/graphql).

## Implementation process

This project has been planned in a kanban project board on GitHub. You can find it [here](https://github.com/users/Xintre/projects/1). Provided the project's timespan had been longer, I would've used the standard Gantt chart approach, however since the primary assumption was to complete the whole project in 3 days, I had to wrap it in a kanban (Gantt suports >= days time unit).

All [issues](https://github.com/Xintre/chatty-app/issues) and pull requests have been linked to the project board, so you can easily track the progress of the project.

Each issue contains labels informing of the area of improvement that is to be implemented.

There also exist 2 milestones: `Required` and `Extra features` that separate the required features from the extra ones. Normally, I would use versions here, but this is a short demo project for free :)

## Technologies

- [React Native](https://reactnative.dev) + Expo for cross-platform mobile development
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL queries and mutations
- [React Navigation](https://reactnavigation.org) for navigation with Expo router

## Code style

This project involves the following tools:

- prettier for code formatting
- eslint for code linting
- lefthook for git hooks to lint code before commits

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
