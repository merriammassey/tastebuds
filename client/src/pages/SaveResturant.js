import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// do we need auth on this page? 
// import AuthService from '../utils/auth'; 

import { searchRestaurants } from "./SearchRestaurants"

//

/// need to link API here maybe throught the serach resturants page that is where the api is 


const SavedResturants = () => {
    const [userData, setUserData] = useState({});
    // use this to determine if `useEffect()` hook needs to run again
    const userDataLength = Object.keys(userData).length

 // if we need this to be protected// uncomment the below code    
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }

//         const response = await getMe(token);

//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }

//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);



    // do we log in here or not? 
    // IF YES i NEED TO GET USER DATA 

    ///  it looks like you are serach 
    // ever thing in Seatch Resturant is searchRestaurants()
    // restaurantData - has all the info from yelp 

// function that accepts the resturants data from the data base
const 


    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    <h1>Resturant Options</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    this is where saved returants will go
                    {/* {userData.savedResturants.length
            ? `Viewing ${userData.savedResturants.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'} */}
                </h2>
                <CardColumns>
                    Map saved Resturants.
                    {userData.savedResturants.map((resturant) => {
                        return (
                            <Card
                                key={resturant.resturantId}
                                border='dark'>
                                below would be for a resturant image how are we getting it from yelp?
                                {/* {resturant.image ? <Card.Img src={resturant.image} alt={`The cover for ${resturant.name}`} variant='top' /> : null} */}
                                <Card.Body>
                                    <Card.Title>
                                        Resturant Name
                                        {/* {resturant.name} */}
                                    </Card.Title>
                                    <p className='small'>Let's try:
                                    </p>
                                    <Card.Text>
                                        Rendered discription from yelp
                                        {/* {resturant.description} */}
                                    </Card.Text>
                                    <Button>

                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}

                </CardColumns>
            </Container>
        </>
    )


};

export default SavedResturants;
