# Operation: Health
A health tracker web application developed using Node.js and the Express.js framework

## Installation
### Prerequisites:
* Must have Node.js installed on your system
* Must have a local/hosted MySQL database connection set up

#### To initialise the project:
```
npm init -y
```

#### To install the project dependencies:
```
npm install
```

#### Configuring MySQL
Make sure you have installed and configured [MySQL](https://www.mysql.com) - MySQL Workbench recommended.
Once you have set up MySQL, copy the ```DEFAULT.env``` file and rename it to ```.env``` and configure appropriately.
Assuming the .env file is correct the application should initialize with no problem.
To create the database you must run the `DDL.sql` file and it will create the database and the neccessary tables.

## Usage
### Starting the application:
#### In the terminal, enter:
``` 
npm run dev
```

or

```
npm run start
```

The former script should be used for development
