# wizdo
Web app for Kik Hackathon

SETUP INFROMATION
//install nodejs if not installed
sudo apt-get install nodejs
//check version
nodejs -v
//install node package modules
sudo apt-get install npm
//check version
npm -v
//install express
npm install -g express
npm install -g express-generator
express --version

//install mongodb
sudo apt-get install mongodb-server
mongod --version

//install nodejs driver for mongodb
npm install mongodb

//mongodb commands
sudo service mongodb start
sudo service mongod stop
sudo service mongod restart

//modify for small files
sudo nano /etc/mongodb.conf
//add this line to bottom of file and save
smallfiles=true
//then restart mongod

//Create base express 4.0 files
express ./wizdo
cd ./wizdo/
//install dependendencies with log output
npm install -d

//install mongoose this will also update package.json
npm install mongoose --save

//Fix can't load bison error
sudo apt-get install gcc make build-essential
npm update


WEB API INFROMATION

url:3000/login
Set to GET
CLick URL PAram
All key-value pairs to login as User
click send
if !exists
    No Login Data

url:3000/signup
Set to POST
Set to x-www-form-urlencoded
All key-value pairs to create User
if exists
    Account is not created
else
    Account is created





