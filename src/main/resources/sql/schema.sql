SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

SET NAMES 'utf8';
SET CHARACTER SET 'utf8';
SET SESSION collation_connection = 'utf8_general_ci';
-- -----------------------------------------------------
-- Schema diploma
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `diploma` ;

-- -----------------------------------------------------
-- Schema diploma
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `diploma` DEFAULT CHARACTER SET utf8 ;
USE `diploma` ;

-- -----------------------------------------------------
-- Table `diploma`.`city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diploma`.`city` ;

CREATE TABLE IF NOT EXISTS `diploma`.`city` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `population` LONG NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diploma`.`radionuclide`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diploma`.`radionuclide` ;

CREATE TABLE IF NOT EXISTS `diploma`.`radionuclide` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `doseRatePeroral` DOUBLE NULL,
  `doseRateInhal` DOUBLE NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `diploma`.`typeOfRisk`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diploma`.`typeOfRisk` ;

CREATE TABLE IF NOT EXISTS `diploma`.`typeOfRisk` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NULL,
  `consumptionAmount` DOUBLE NULL,
  PRIMARY KEY (`id`))

  ENGINE = InnoDB;






SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;