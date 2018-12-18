# SCMP Poll Application
The test submission of Georgios Papanikolaou,

## How to start
- Have docker and docker-compose installed on your computer
- docker-compose up -d
- Access your DB using a MYSQL client and insert the contents of seed.sql file at root directory. To see the login information of the database please see the docker-compose.yml file. database/user = scmp, password = CABinNYQRwu8XqcRqxdxQEAG
- cd scmp-poll to access the react Application
- npm install to install all the modules needed
- npm run start to start the Application
- A window will open at localhost:3000
- Server is running at localhost:8086
- Any questions contact my at 60179180 or skoumas.net@gmail.com

## Folders
- _ build contains the docker compose Build
- _ data is where mySQL data is being stored
- _ server contains our node js backend system
- _ test contains our backend system tests
- scmp-poll is the reactJS application

## Notes
- To be honest I did not quite get what is the difference of the Poll Listing and the Poll Page. Im my mind it would make sense if they were called Poll Listings and Poll Results. Poll Listing would have the polls with only the options available (and not the final results) and the Poll Results will show only the results.
- I lack the testing experience and given the limited time (see bullet 2). It is my goal to work with a TDD as so far in my career was not needed.
- Please note that I am still working while doing this test so my time was limited.
- I used NODEJS as the backend which did cost me a bit of time figuring out how to get the POST request data. Usually I go with Laravel but I found it a bit too much to the needs of this Application.
- The NodeJS code can be optimised a lot however I choose to give this test in time.
- I used poll.json as a source of data along with the database mySQL in which I store the votes.
- I manually map the data from the json file with the mysql data
- I am using components in reactsJS to do the visualisation.

## Todos
- Handle errors in NodeJS and in ReactJS (redirect to new screen if data unavailable etc)
- Find better SVG pie chart library to use or write own component
- Write Unit tests in reactJS and also nodeJS.
- Perform End-to-End testing with each deployment
- Allow user to vote only once by building register/login system or try using localStorage and unique Browser IDs
