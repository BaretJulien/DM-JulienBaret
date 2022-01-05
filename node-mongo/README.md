# Docker Compose
## NodeJS + MongoDB
### Requirements
- Node >= 14
- MongoDB: an available MongoDB server running on port `27017` and host `mongo` with the root username as `root` and the root password as `verysecret`.

### How to run
Install dependencies with NPM
```sh
npm install
```

Run the application in development mode
```sh
npm run dev
```

Application should be available at [http://localhost:3000](http://localhost:3000)

Modifying the `views/home/mustache` file should automatically update and reload the application.