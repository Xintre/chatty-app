# Chatty app 🦀

This is an Apollo Client GraphQL-based chat application in React Native using [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It has been prepared according to TheWidlarzGroup's recruitment task guidelines and uses their [GraphQL API](https://chat.thewidlarzgroup.com/api/graphql).

## Screenshots 📸

| Playground screen         | Login screen         | Signup & login                        | Chats                |
| ------------------------- | -------------------- | ------------------------------------- | -------------------- |
| [](./docs/playground.mp4) | [](./docs/login.mp4) | [](./docs/signup_prefilled_login.mp4) | [](./docs/chats.mp4) |

## Usage 📱

There are a few easter-eggs in the app:

- long press the `Sign up` button on **LogIn screen** to show **Playground screen** demonstrating components
- at any time, long press the title on the top to log out (precisely: forget the token and reset the `AuthContext` state)

## Code style 💫

This project involves the following tools:

- prettier for code formatting
- eslint for code linting
- lefthook for git hooks to lint code before commits

## Implementation process 🛠️

This project has been planned in a kanban project board on GitHub, which you can find [here](https://github.com/users/Xintre/projects/1/views/1?visibleFields=%5B"Title"%2C"Assignees"%2C"Status"%2C"Milestone"%2C"Labels"%2C"Linked+pull+requests"%5D). Provided the project's timespan had been longer, I would've used the standard Gantt chart approach, however since the primary assumption was to complete the whole project in 3 days, I had to wrap it in a kanban (Gantt suports >= days time unit).

All [issues](https://github.com/Xintre/chatty-app/issues) and pull requests have been linked to the project board, so you can easily track the progress of the project.

Convention for commit naming follows the [Conventional Commits standard](https://www.conventionalcommits.org/en/v1.0.0/).

Branch `main` is the upstream branch, also used for development. Each issue is developed in a separate branch, named descriptive of the feature contained. Branch `main` has protection rules set up so that it cannot be pushed to, instead Pull Requests are required and each project item is linked to the project board as an issue tied with a PR.

Each issue contains labels informing of the area of improvement that is to be implemented.

There also exist 2 milestones: [`Required`](https://github.com/Xintre/chatty-app/milestone/1) and [`Extra features`](https://github.com/Xintre/chatty-app/milestone/2) that separate the required features from the extra ones. Normally, I would use versions here, but this is a short demo project for free.

## Continuous Integration 🔄

This project contains a single GH Actions [workflow for CI](./.github/workflows/ci.yml) that simply installs dependencies with NPM and runs `npm run lint` to ensure valid code style (even though it should be enforced by GIT pre-commit hooks - as a secondary check). Merging of PRs is configured to be **blocked** until all status checks of GH Actions are "pass".

## Technical details

### Used libraries 📚

- [React Native](https://reactnative.dev) + Expo for cross-platform mobile development
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL queries and mutations
- [React Navigation](https://reactnavigation.org) for navigation with [Expo Router](https://docs.expo.dev/router/introduction)
- [Expo google-fonts](https://github.com/expo/google-fonts) for required fonts (here: Poppins and Open Sans)
- [Expo vector-icons](https://icons.expo.fyi/Index) for icons (here used in IconButtons)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) for secure user's token storage
- [email-validator](https://www.npmjs.com/package/email-validator) for validating email address (here in LogIn and SignUp screens)
- [Lodash](https://lodash.com/) for utils (here for picking wanted variants of fonts and capitalizing displayed error message)
- [moment.js](https://momentjs.com) for date formatting (here: for relative time differences in humanized format)
- [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat) for easy implementation of chat view

### Directories structure & aliases 🖊️

#### Aliases

| Alias         | Path             | Description                              |
| ------------- | ---------------- | ---------------------------------------- |
| `@components` | `src/components` | Reusable components                      |
| `@hooks`      | `src/hooks`      | Reusable hook for useAuthContext         |
| `@context`    | `src/context`    | Context for AuthContextProvider          |
| `@assets`     | `src/assets`     | For easy access to images                |
| `@styles`     | `src/styles`     | For reusable styles                      |
| `@constants`  | `src/constants`  | For reusable constants as specific types |
| `@graphql`    | `src/graphql`    | For GraphQL queries and mutations        |

#### Directories structure

```
src
├── app
│   ├── _layout.tsx - Layout for all screens
│   ├── chats.tsx - Chat list screen
│   ├── chat.tsx - Chat room screen (displays messages)
│   ├── index.tsx - Rendering app
│   ├── logIn.tsx - Login screen
│   ├── signUp.tsx - Sign up screen
│   └── playground.tsx - Demo of all custom-made components
├── assets
├── components
│   ├── common - shared components (in all screens)
│   │   └── Screen.tsx - Screen wrapper component, renders each screen content wrapped in a common-style layout (top bar with title, optional subtitle, return / action buttons)
│   ├── design
│   │   ├── Button.tsx - Custom button component
│   │   ├── Divider.tsx - Custom divider component (used only in Playground for better readability)
│   │   ├── IconButton.tsx - Custom icon button component
│   │   ├── RoomListItem.tsx - List of rooms component
│   │   ├── Text.tsx - Custom text component
│   │   └── TextInput.tsx - Custom text input component
│   └── misc
│       └── Loader.tsx - Loading component (uses ActivityIndicator)
├── constants
│   ├── SecureStoreKeys.tsx - Constants with key names for key-value storage used for SecureStore
│   └── types.ts - Typings for types returned from GraphQL queries
├── context
│   └── AuthContext.tsx - Context for storing information about user's authentication state and providing it to all app components from _layout.tsx
├── graphql
│   ├── mutations.ts - GraphQL mutations
│   └── queries.ts - GraphQL queries
├── hooks
│   └── useAuthContext.ts - Shorthand hook for useContext(AuthContext)
├── styles
│   ├── colors.ts - Color palette
│   ├── fonts.ts - Fonts used in the app
│   └── index.ts - Common global styles re-used in many components and screens
└── utils.ts - Utility functions
```

### Which screen is where + router params list 📂

| Screen name | Route name               | Params                                                                                                                            |
| ----------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Chat list   | `src/app/chats.tsx`      | -                                                                                                                                 |
| Chat        | `src/app/chat.tsx`       | `roomID`, `roomName`                                                                                                              |
| Log in      | `src/app/logIn.tsx`      | `email`, `password` (optional - both parameters used for pre-filling login inputs when user completes registration in signUp.tsx) |
| Sign up     | `src/app/signUp.tsx`     | -                                                                                                                                 |
| Playground  | `src/app/playground.tsx` | -                                                                                                                                 |

### Queries and mutations 📡

#### Queries

File: `src/graphql/queries.ts`

| Name                         | Description        | Variables |
| ---------------------------- | ------------------ | --------- |
| `GET_USERS_ROOMS_QUERY`      | Gets user's rooms  | -         |
| `GET_MESSAGES_IN_ROOM_QUERY` | Gets room messages | `id`      |

#### Mutations

File: `src/graphql/mutations.ts`

| Name                     | Description                       | Variables                                                            | Results                             |
| ------------------------ | --------------------------------- | -------------------------------------------------------------------- | ----------------------------------- |
| `SEND_MESSAGE_MUTATION`  | Sends a message                   | `body`, `roomID`                                                     | `body` (unused, but fetched anyway) |
| `LOGIN_USER_MUTATION`    | Logs user in and gets token       | `email`, `password`                                                  | `token`                             |
| `REGISTER_USER_MUTATION` | Registers user and gets user's id | `email`, `firstName`, `lastName`, `password`, `passwordConfirmation` | `id`                                |

## Get started 🚀

1. Install dependencies

   ```bash
   npm install
   ```

````

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
````
