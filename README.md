# Bunny Jupper


Welcome to my webpack starter for microverse

### Setup

clone repo and run

```bash
npm install
```

### Project structure
* Write your html in `src/index.html` file.
* Write your javascript in `src/`. 
* Write your styles in `src/index.scss` and import it in `index.js`
```js
import 'index.scss';
```

## For development
You have live updates for javacript and scss in `localhost:3000`. Refresh after changes to html.

1. Run this in your terminal and keep it running, the project will be available live with hot reloading at `localhost:3000`. Happy programming : )
```bash
npm run dev
```
2. Keep the import for scss in `index.js` if you want scss styles.
```js
import 'index.scss';
```

You can change localhost:port number in webpack/webpack.config.dev.js's port property
```js
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: "3000", //change here to your port
  }
```
### Html in dist folder 
if you want html in dist folder instead of src folder
remove the plugin `HtmlWebpackPlugin`. You can also remove the `Dotenv` plugin if you are not using any `.env` file.

```js
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({         //remove this line
      filename: "index.html",       // remove this line
      template: "/src/index.html",  //remove this line
      inject: true,                 // remove this line
    }),                             // remove this line
  ],
```

### Env file for environment variables such as API_KEY
create an `.env` file for your variables
```.env
API_KEY=20r8304283yourkeyexample
```
and import it in js

```js
const API_KEY  = process.env.API_KEY
```
* Your eslint might use destructuring syntax `{ API_KEY }`. As said in the documentation for dotenv-webpack, please use the syntax I have shown above if the environment variable is `undefined`

if you are not using any environment variables, you can also safely remove the `new Dotenv()` plugin from the webpack config files.

## For linters
All commands have --fix appended internally already.

One command for all linters
```
npm run linters
```

### Standalone linters
* eslint
```bash
npm run eslint
```
* stylelint
```bash
npm run lint
```
* webhint
```bash
npm run hint
```

## For production
One command to create production code and publish it live on github. Run this after project completion. Also helpful for lighthouse linter on github pull request.

```bash
npm run publish
```
or seperately run,

1. Build final production project build
```bash
npm run build
```
2. Run in terminal to push your created`dist` folder to github to get a live website on github
```bash
npm run live
```

### Thank you for using the project.
## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!

## Author

👤 **Samrood Ali**

- GitHub: [@samroodAli](https://github.com/samroodAli)
- LinkedIn: [Samrood-Ali](https://www.linkedin.com/in/samrood-ali/)


### Attributions

Some of the webpack Plugins and loaders are from the template found here :point_right: [Click me for the template](https://github.com/photonstorm/phaser3-project-template)
