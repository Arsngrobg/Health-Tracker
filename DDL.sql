-- Run this file to initialize the database
CREATE DATABASE IF NOT EXISTS Operation_Health;
USE Operation_Health;

-- User table definition
CREATE TABLE IF NOT EXISTS User (
    UserID     BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username   VARCHAR(32)  NOT NULL UNIQUE CONSTRAINT C_ValidUsr CHECK ( Username REGEXP '^[a-zA-Z0-9_]+$' ),
    Forename   VARCHAR(64)  NOT NULL        CONSTRAINT C_ValidFor CHECK ( Forename REGEXP '^[a-zA-Z-]+$'    ),
    Surname    VARCHAR(64)  NOT NULL        CONSTRAINT C_ValidSur CHECK ( Surname  REGEXP '^[a-zA-Z-]+$'    ),
    Email      VARCHAR(128) NOT NULL UNIQUE CONSTRAINT C_ValidAdd CHECK ( Email    REGEXP '^.+@.+\..+$'     ),
    DOB	       DATE             NULL,
    Password   VARCHAR(128) NOT NULL,
    Height     INT              NULL CONSTRAINT C_HeightPos CHECK ( Height >= 0 ),
    Weight     INT              NULL CONSTRAINT C_weightPos CHECK ( Weight >= 0 ),
    DateJoined DATE         NOT NULL DEFAULT ( CURDATE() )
);

-- UserGroup table definition
-- Group is not shown on the discovery tab if private is true - private is FALSE by default
CREATE TABLE IF NOT EXISTS UserGroup (
    GroupID   BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    GroupName VARCHAR(32)  NOT NULL,
    UserCount INT          NOT NULL DEFAULT 1,
    GroupDesc VARCHAR(300)     NULL DEFAULT NULL CONSTRAINT C_DescMty CHECK ( TRIM(GroupDesc) != '' ),
    Private   BOOLEAN      NOT NULL DEFAULT FALSE
);

-- UserGroupMembership table definition
-- Users can define a consumable but so can the database
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
    Date     DATE   NOT NULL DEFAULT ( CURDATE() ),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- Consumable definition (best word I could think for combining the Food & Drink tables)
-- Nutrition values are per 100g (if Food) or per 100ml (if Drink) & rounded to 1 d.p
CREATE TABLE IF NOT EXISTS Consumable (
    ConsumableID  BIGINT                NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserID        BIGINT                    NULL,
    Name		  VARCHAR(32)			NOT NULL,
    Type          ENUM('Food', 'Drink') NOT NULL,
    Energy        INT,
    Fat           FLOAT(1),
    Saturates     FLOAT(1),
    Carbohydrates FLOAT(1),
    Sugars        FLOAT(1),
    Fibre         FLOAT(1),
    Protein       FLOAT(1),
    Amount        INT,  
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    CONSTRAINT C_SatLTOEFat  CHECK ( Saturates <= Fat ),
    CONSTRAINT C_SugLTOECarb CHECK ( Sugars    <= Carbohydrates )
);

-- Meal table definition
CREATE TABLE IF NOT EXISTS Meal (
    MealID BIGINT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserID BIGINT          NULL DEFAULT NULL,
    Name   VARCHAR(32) NOT NULL DEFAULT 'Unnamed Meal',
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- MealConsumable table definition
-- The relationship table consisting of a one-to-many relationship between a meal and any number of consumable
CREATE TABLE IF NOT EXISTS MealConsumable (
    MealID       BIGINT NOT NULL,
    ConsumableID BIGINT NOT NULL,
    PRIMARY KEY (MealID, ConsumableID),
    FOREIGN KEY (MealID)       REFERENCES Meal(MealID)             ON DELETE CASCADE,
    FOREIGN KEY (ConsumableID) REFERENCES Consumable(ConsumableID) ON DELETE CASCADE
);

-- DietEntry table definition
-- 
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
    Duration INT    CONSTRAINT C_DurPos CHECK ( Duration > 0 )										   DEFAULT (0),
    Distance INT    CONSTRAINT C_DisPos CHECK ( Distance > 0 )								  		   DEFAULT (0),
    Count    INT    CONSTRAINT C_CouPos CHECK ( Count > 0 )								      NOT NULL DEFAULT (1),
    Calories INT    CONSTRAINT C_CalPos CHECK ( Calories > 0 )								  NOT NULL,
    Date     DATE                                                                             NOT NULL DEFAULT ( CURDATE() )
);
