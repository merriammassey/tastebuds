# TasteBuds

## Description

A full stack web application that enables users to create a custom poll populated with restaurant data from the Yelp Fusion API so that they can survey friends, family, or coworkers and conveniently choose a place to eat based on majority vote.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Technologies](#technologies)
- [Contributions](#contributions)
- [Questions](#questions)

## Installation

### Prerequisites

You will need MongoDB installed if you want to run this application locally. For help installing MongoDB, visit
````
https://docs.mongodb.com/manual/installation/
````
Once installed, make sure the MongoDB daemon is running with the following command line command:
````
$ mongod
````

### Installing

Git clone the repository to your local machine. To connect to your local Mongo database, you will need to add an .env file in the root of your cloned repository containing the following code:
````
MONGO_DB="mongodb://localhost/<you decide the name here>"
````

Next, cd into the repository you cloned and install the necessary dependencies by running:
````
$ npm i
````

You will then be able to start the app locally by runnning:
````
$ npm run develop
````

## Usage

Users enter keywords and location on the homepage and are presented with a list of relevant restaurants. Then, they may select several and click the button at the bottom and enter details about the event on the next page. After clicking the button to submit those details, the user will be directed to a page they can share with their friends where friends can vote and results are tallied. Upon signing in, the user can view saved events on the My Events page.

## Screenshot

![image](https://user-images.githubusercontent.com/77468612/124701548-a4273300-dea3-11eb-9531-fac227f44bc2.png)

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[License: MIT](https://opensource.org/licenses/MIT)

## Technologies

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Apollo
- GraphQL
- React
- Context API
- Heroku
- Yelp Fusion API
- React Bootstrap
- Axios
- JWT

## Contributions

Built by George Schimmel, Claire Ogesen, and Merriam Massey.

Thank you to Fullstack Bootcamp TAs including Jude Clark, Phil Cowan, and Zack Shone.

## Questions

Reach out with questions.

Email:
merriammassey@gmail.com
claire.ogesen.co@gmail.com
gms1980@icloud.com

GitHub [my GitHub profile](https://github.com/merriammassey)
