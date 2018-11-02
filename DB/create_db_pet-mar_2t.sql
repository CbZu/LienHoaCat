-- MySQL Script generated by MySQL Workbench
-- Fri Jun 15 22:02:33 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema lhc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lhc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lhc` DEFAULT CHARACTER SET utf8 ;
USE `lhc` ;

-- -----------------------------------------------------
-- Table `lhc`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `dob` INT NULL,
  `phone` INT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NULL,
  `create_time` INT NULL,
  `type_id` INT NULL,
  `password` VARCHAR(255) NULL,
  `image` VARCHAR(255) NULL,
  `username` VARCHAR (20) NULL,
  `address` VARCHAR(255) NULL,
  `bank_account` VARCHAR(255) NULL,
  `bank_address` VARCHAR(255) NULL,
  `bank` VARCHAR(255) NULL,
  PRIMARY KEY (`user_id`, `email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));


-- -----------------------------------------------------
-- Table `lhc`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`cart` (
  `user_id` INT NOT NULL,
  `product_id` INT NULL,
  `amount` INT NULL,
  `payment_id` INT NULL,
  `create_time` INT NULL,
  `disct_price` DOUBLE NULL,
  `price` DOUBLE NULL,
  `status_id` INT NULL);


-- -----------------------------------------------------
-- Table `lhc`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`category` (
  `cat_id` INT NOT NULL AUTO_INCREMENT,
  `folder_id` INT NOT NULL,
  `cat_name` VARCHAR(255) character set utf8 NOT NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE INDEX `cat_name_UNIQUE` (`cat_name` ASC));

CREATE TABLE IF NOT EXISTS `lhc`.`treefolder` (
  `folder_id` INT NOT NULL AUTO_INCREMENT,
  `folder_name` VARCHAR(255) character set utf8 NOT NULL,
  PRIMARY KEY (`folder_id`),
  UNIQUE INDEX `cat_name_UNIQUE` (`folder_name` ASC));


-- -----------------------------------------------------
-- Table `lhc`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`type` (
  `type_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`type_id`));


-- -----------------------------------------------------
-- Table `lhc`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `cat_id` INT NOT NULL,
  `create_time` INT NULL,
  `price` DOUBLE NULL,
  `name` VARCHAR(255)  character set utf8 NULL,
  `size` VARCHAR(10) NULL,
  `image` VARCHAR(255) NULL,
  `description` VARCHAR(3) character set utf8 NULL,
  `code` VARCHAR(20) NULL,
  `disct_price` DOUBLE NULL,
  PRIMARY KEY (`product_id`));
  
  -- -----------------------------------------------------
-- Table `lhc`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`size` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `create_time` INT NULL,
  `price` DOUBLE NULL,
  `size` VARCHAR(10) NULL,
  `code` VARCHAR(20) NULL,
  `disct_price` DOUBLE NULL,
  PRIMARY KEY (`product_id`));

-- -----------------------------------------------------
-- Table `lhc`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`payment` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `sum` DOUBLE NULL,
  `status_id` INT NULL,
	`create_time` INT NULL,
    `title` VARCHAR(255) NULL,
    `pay_type` VARCHAR(1) NULL,
    `promotion` DOUBLE NULL,
    `total` DOUBLE NULL,
    `seen_flag` VARCHAR(1) NULL,
  PRIMARY KEY (`payment_id`));


-- -----------------------------------------------------
-- Table `lhc`.`places`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`places` (
  `place_id` INT NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(255) NULL,
  `city` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`place_id`),
  UNIQUE INDEX `place_id_UNIQUE` (`place_id` ASC));


-- -----------------------------------------------------
-- Table `lhc`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lhc`.`status` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`status_id`));
  
CREATE TABLE IF NOT EXISTS `lhc`.`description` (
  `description_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(2000) character set utf8 NULL,
  PRIMARY KEY (`description_id`));

CREATE TABLE IF NOT EXISTS `lhc`.`promotion` (
  `promotion_id` INT NOT NULL AUTO_INCREMENT,
   `title` VARCHAR(255) NULL,
  `description` VARCHAR(2000) character set utf8 NULL,
  `effective_date` INT NULL,
  `expired_date` INT NULL,
  `image` VARCHAR(255) NULL,
   `seen_flag` VARCHAR(1) NULL,
   `user_id` INT NULL,
  PRIMARY KEY (`promotion_id`));
  
  CREATE TABLE IF NOT EXISTS `lhc`.`notification` (
 `notification_id` INT NOT NULL AUTO_INCREMENT,
   `title` VARCHAR(255) NULL,
  `description` VARCHAR(2000) character set utf8 NULL,
  `create_time` INT NULL,
   `image` VARCHAR(255) NULL,
   `user_id` INT  NULL,
    `seen_flag` VARCHAR(1) NULL,
  PRIMARY KEY (`notification_id`));
  
   CREATE TABLE IF NOT EXISTS `lhc`.`image` (
 `product_id` INT NOT NULL,
   `url` VARCHAR(255) NULL,
  `type` VARCHAR(1) character set utf8 NULL);
  
CREATE TABLE IF NOT EXISTS `lhc`.`wishlist` (
  `user_id` INT NOT NULL,
  `product_id` INT NULL,
  `amount` INT NULL,
  `create_time` INT NULL,
  `disct_price` DOUBLE NULL,
  `price` DOUBLE NULL,
  `status_id` INT NULL);
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
