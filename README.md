# Trend reports
Trend reports gives you an overview about the last activities of your kiwi devices.

## Tech-Stack
The app uses React in the frontend and NodeJS ~ Restify in backend. You can use the official React Tasks to run, build, eject the project. The Backend has one task to run the project.
Additionally you can quickly start front- and backend in the root folder of the project with `npm run` or `yarn run`.
The NodeJS server runs on **localhost:5000**.
The detailed tasks for the frontend tasks are listed on the wonderful documentation of the Create-React-app project. [create-react-app](https://github.com/facebookincubator/create-react-app)
The project uses [lowdb](https://github.com/typicode/lowdb) to create a quick and local JSON database. It will be stored in a `db.json` file located in the `/server/data` folder. If the server has a problem to create the database please check the file permissions.

### Install
To install the dependencies you run `npm install` in the folder `/client` and `/server`. Please make sure you are using Node ^v8.0.

### Usage
1. **🚀 Start servers**: `npm run`
2. **💾 Parse CSV and fill DB**: The parse process could be initiated with a POST-Request on `http://localhost:5000/parse`.
3. **🙆‍♂️ Check out reportings**: Open `http://localhost:3000` to use the React frontend.
