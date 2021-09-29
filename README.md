# TasteBuds

## Description

A full stack web application that enables users to create a custom poll populated with restaurant data from the Yelp Fusion API so that they can survey friends, family, or coworkers and conveniently choose a place to eat based on majority vote.

[Visit the deployed app.](https://whereyouwannaeat.herokuapp.com/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Technologies](#technologies)
- [Contributions](#contributions)
- [Planned Updates](#plannedupdates)
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

### How to use the app

#### The About page explains, with a carousel of three images, how users can use the app to enjoy dining out with friends and waste less time going back and forth   about where everyone prefers to meet.

![image](https://user-images.githubusercontent.com/77468612/135192080-74fc8a18-951a-4126-b150-af67d9d76955.png)

![image](https://user-images.githubusercontent.com/77468612/135192084-6ce07771-9977-4111-b0d9-bb24f15b8282.png)

![image](https://user-images.githubusercontent.com/77468612/135192105-a560772a-63b3-454e-b9b1-9a55462db861.png)

### Search for venues

#### On the home page, users enter keywords and location and are presented with a list of relevant restaurants.

![image](https://user-images.githubusercontent.com/77468612/135192131-1ac53c44-fca9-4013-a01f-d6755162b7f1.png)

![image](https://user-images.githubusercontent.com/77468612/135192176-e254a4f0-f00a-4e83-a3f9-7314cb40d378.png)

### Create an event

#### The user selects several venues and continues to add an event name and notes on the next page. 

![image](https://user-images.githubusercontent.com/77468612/135192189-c4dd7bef-60cb-4901-91ff-6d75814d23f8.png)

#### If not signed in, the user will be prompted to sign up or sign in. They will be prompted to do so before creating an event, or they can do so at any time via the link in the navbar.

![image](https://user-images.githubusercontent.com/77468612/135192159-e83b1609-2e77-478c-8111-e068891e9b5e.png)

#### From there, the user is presented with a URL to share with invitees so they can vote. If the user is accessing the app via a mobile device, they will be presented with a variety of options to share the poll via SMS, email, Messenger, etc.

### Voting

#### Invitees can vote for one or more venues.

![image](https://user-images.githubusercontent.com/77468612/135193923-5f069974-98d1-4874-bbfa-a9df9ecf66d8.png)

### Poll results

#### Users can access poll results by selecting "My Events" from the nav bar. 

![image](https://user-images.githubusercontent.com/77468612/135192378-6c45ebc7-8faf-4b8f-b919-0ad26f715600.png)

#### When they click "View Event", they will be presented with a bar chart with poll results.

![image](https://user-images.githubusercontent.com/77468612/135192209-453f1ad1-a1e9-4245-b9c7-a9f7ebb0cfa6.png)

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[License: MIT](https://opensource.org/licenses/MIT)

## Technologies

- MongoDB
- Apollo GraphQL
- React
- Context API
- Web Share API
- Yelp Fusion API
- Heroku
- React Bootstrap
- Axios
- JWT
- OAuth 2.0

## Contributions

See the list of [contributors](https://github.com/merriammassey/tastebuds/graphs/contributors) who participated in this project along with individual commit history.

Thank you to Fullstack Bootcamp TAs including Jude Clark, Phil Cowan, and Zack Shone.

## Planned updates

At the moment, this app is a minimum viable product. We hope to make updates to improve the UI/UX, include more sophisticated authentication error handling and oAuth, and add more features including enabling invitees to add comments for the host. We also have plans to build out a mobile version of the application using React Native.

## Questions

Reach out with questions.

Email:

merriammassey@gmail.com

claire.ogesen.co@gmail.com

gms1980@icloud.com

[my GitHub profile](https://github.com/merriammassey)
