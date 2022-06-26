# SmartFit 💪

## Goal:✅

in this app a client can get into Fitness creating a profile , menu , workout and adding exercises . this app contains Deep Learning model which can show one trainee how to fix his postiure in diffrent exercises with the camera all you need to do is to picture yourself in the app and it will show you which parts in the exrecsie you can fix

A user can use this software to get into fitness by making a profile, diet, workout, and exercises. This program features a Deep Learning model that can show one trainee how to correct his posture in various scenarios using the camera. All you have to do is picture yourself in the app, and it will show you which portions of the experience you can correct.

Rignt now I've accomplished with basic CRUD operations such as adding one's profile , authenticating , adding an exrecise and etc

![1650996540865.png](image/README/Login.png)


## Run:✅

> cd app && docker-compose --env-file ./.env  up -d --build

and then [http://localhost:3004/]()

Please first sign up and then you will be authenticated to do rest operations


if you wish to run the app in another port on host server side or docker port you can do it by changing 
the ports number in .env file and run the same command as before


## To Be Added:✅

* the ML model
* remove proxy from package.json , handle build react 

## Notes: ✒️


if you want to init with diffrent user for database please change MONGO_INITDB_USER and MONGO_INITDB_PWD to 
whatever you like such as : MONGO_INITDB_USER=Moshe MONGO_INITDB_PWD=1234

please if you want to change any port do that through the .env file 
by changing DATABASE_HOST you need to change the name of the service "database" in docker-compose 
recommended : DO NOT TOUCH
also , MONGO_INITDB_DATABASE please dont touch right now the backend is couted to SmartFit
  




