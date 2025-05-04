-- Run this file to initialize the database
CREATE DATABASE IF NOT EXISTS Operation_Health;
USE Operation_Health;

-- User table definition
CREATE TABLE IF NOT EXISTS User (
	UserID     BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username   VARCHAR(32)  NOT NULL UNIQUE,
    Forename   VARCHAR(64)  NOT NULL,
    Surname    VARCHAR(64)  NOT NULL,
    Email      VARCHAR(128) NOT NULL UNIQUE,
    DOB		   DATE             NULL,
    Password   VARCHAR(128) NOT NULL,
    Height     INT              NULL CONSTRAINT CHECK ( Height >= 0 ),
    Weight     INT              NULL CONSTRAINT CHECK ( Width  >= 0 ),
    DateJoined DATE			NOT NULL DEFAULT (CURDATE())
);

-- UserGroup table definition
CREATE TABLE IF NOT EXISTS UserGroup (
	GroupID   BIGINT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    GroupName VARCHAR(32) NOT NULL,
    UserCount INT         NOT NULL DEFAULT 1
);

-- UserGroupMembership table definition
CREATE TABLE IF NOT EXISTS UserGroupMembership (
    GroupID BIGINT                  NOT NULL,
    UserID  BIGINT                  NOT NULL,
    Role    ENUM("Member", "Admin") NOT NULL DEFAULT ("Member"),
    PRIMARY KEY (GroupID, UserID),
    FOREIGN KEY (GroupID) REFERENCES UserGroup(GroupID) ON DELETE CASCADE,
    FOREIGN KEY (UserID)  REFERENCES User(UserID)       ON DELETE CASCADE
);

-- Goal table definition
CREATE TABLE IF NOT EXISTS Goal (
    GoalID   BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserID   BIGINT NOT NULL,
    Duration INT,
    Distance INT,
    Calories INT,
    Weight   INT,
    Date     DATE   NOT NULL DEFAULT (CURDATE()),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- Consumable definition (best word I could think for combining the Food & Drink tables)
-- Nutrition values are per 100g (if Food) or per 100ml (if Drink) & rounded to 1 d.p
CREATE TABLE IF NOT EXISTS Consumable (
	ConsumableID  BIGINT                NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name		  VARCHAR(32)			NOT NULL,
    Type          ENUM('Food', 'Drink') NOT NULL,
    Energy        INT,
    Fat           FLOAT(1),
    Saturates     FLOAT(1),
    Carbohydrates FLOAT(1),
    Sugars        FLOAT(1),
    Fibre         FLOAT(1),
    CONSTRAINT C_Saturates CHECK ( Saturates <= Fat ),
    CONSTRAINT C_Sugars    CHECK ( Sugars    <= Carbohydrates )
);

-- Meal table definition
CREATE TABLE IF NOT EXISTS Meal (
    MealID BIGINT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name   VARCHAR(32) NOT NULL DEFAULT 'Unamed Meal'
);

-- MealConsumable table definition
CREATE TABLE IF NOT EXISTS MealConsumable (
	MealID       BIGINT NOT NULL,
    ConsumableID BIGINT NOT NULL,
    PRIMARY KEY (MealID, ConsumableID),
    FOREIGN KEY (MealID)       REFERENCES Meal(MealID)             ON DELETE CASCADE,
    FOREIGN KEY (ConsumableID) REFERENCES Consumable(ConsumableID) ON DELETE CASCADE
);

-- DietEntry table definition
CREATE TABLE IF NOT EXISTS DietEntry (
    EntryID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserID  BIGINT NOT NULL,
    MealID  BIGINT NOT NULL,
    Date    DATE   NOT NULL DEFAULT (CURDATE()),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (MealID) REFERENCES Meal(MealID) ON DELETE CASCADE
);

-- ExerciseEntry table definition
CREATE TABLE IF NOT EXISTS ExerciseEntry (
	EntryID  BIGINT                                                                           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Activity ENUM('Running', 'Walking', 'Swimming', 'Cycling', 'Squats', 'Pushups', 'Situps') NOT NULL,
    UserID   BIGINT                                                                           NOT NULL,
    Duration INT,
    Distance INT,
    Calories INT,
    Date     DATE NOT NULL DEFAULT (CURDATE())
);