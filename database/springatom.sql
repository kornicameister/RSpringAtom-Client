SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `springatom`;
CREATE SCHEMA IF NOT EXISTS `springatom`
  DEFAULT CHARACTER SET utf8
  COLLATE utf8_general_ci;
USE `springatom`;

-- -----------------------------------------------------
-- Table `springatom`.`SUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SUser`;

CREATE TABLE IF NOT EXISTS `springatom`.`SUser` (
  `idSUser` INT         NOT NULL,
  `login`   VARCHAR(45) NOT NULL,
  `secPass` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idSUser`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC),
  UNIQUE INDEX `secPass_UNIQUE` (`secPass` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SMechanic`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SMechanic`;

CREATE TABLE IF NOT EXISTS `springatom`.`SMechanic` (
  `idSMechanic` INT         NOT NULL AUTO_INCREMENT,
  `fName`       VARCHAR(25) NOT NULL,
  `lName`       VARCHAR(45) NOT NULL,
  `email`       VARCHAR(45) NOT NULL,
  `disabled`    TINYINT(1)  NOT NULL,
  PRIMARY KEY (`idSMechanic`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_SMechanic_1_idx` (`idSMechanic` ASC),
  CONSTRAINT `fk_SMechanic_1`
  FOREIGN KEY (`idSMechanic`)
  REFERENCES `springatom`.`SUser` (`idSUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `springatom`.`SClient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SClient`;

CREATE TABLE IF NOT EXISTS `springatom`.`SClient` (
  `idSClient` INT         NOT NULL AUTO_INCREMENT,
  `fName`     VARCHAR(25) NOT NULL,
  `lName`     VARCHAR(45) NOT NULL,
  `email`     VARCHAR(45) NOT NULL,
  `disabled`  TINYINT(1)  NOT NULL DEFAULT 0,
  PRIMARY KEY (`idSClient`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_SClient_1_idx` (`idSClient` ASC),
  CONSTRAINT `fk_SClient_1`
  FOREIGN KEY (`idSClient`)
  REFERENCES `springatom`.`SUser` (`idSUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SContactType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SContactDataType`;

CREATE TABLE IF NOT EXISTS `springatom`.`SContactDataType` (
  `idSContactDataType` INT         NOT NULL AUTO_INCREMENT,
  `type`               VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idSContactDataType`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SClientContactData`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SClientContactData`;

CREATE TABLE IF NOT EXISTS `springatom`.`SClientContactData` (
  `idSClientDetails` INT         NOT NULL AUTO_INCREMENT,
  `client`           INT         NOT NULL,
  `value`            VARCHAR(45) NOT NULL,
  `type`             INT         NOT NULL,
  PRIMARY KEY (`idSClientDetails`),
  INDEX `fk_SClientContactData_1_idx` (`type` ASC),
  INDEX `fk_SClientContactData_2_idx` (`client` ASC),
  CONSTRAINT `fk_SClientContactData_1`
  FOREIGN KEY (`type`)
  REFERENCES `springatom`.`SContactDataType` (`idSContactDataType`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SClientContactData_2`
  FOREIGN KEY (`client`)
  REFERENCES `springatom`.`SClient` (`idSClient`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SClientProblemReportType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SClientProblemReportType`;

CREATE TABLE IF NOT EXISTS `springatom`.`SClientProblemReportType` (
  `idSClientProblemReportType` INT         NOT NULL AUTO_INCREMENT,
  `type`                       VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idSClientProblemReportType`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SAppointment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SAppointment`;

CREATE TABLE IF NOT EXISTS `springatom`.`SAppointment` (
  `idSAppointment` INT       NOT NULL AUTO_INCREMENT,
  `startDate`      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate`        TIMESTAMP NULL,
  `startTime`      TIME      NOT NULL,
  `endTime`        TIME      NOT NULL,
  PRIMARY KEY (`idSAppointment`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SClientProblemReport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SClientProblemReport`;

CREATE TABLE IF NOT EXISTS `springatom`.`SClientProblemReport` (
  `idSClientProblemReport` INT         NOT NULL AUTO_INCREMENT,
  `client`                 INT         NOT NULL,
  `type`                   INT         NOT NULL,
  `appointment`            INT         NULL,
  `value`                  VARCHAR(45) NULL,
  `assigned`               TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idSClientProblemReport`),
  INDEX `fk_SClientProblemReport_1_idx` (`client` ASC),
  INDEX `fk_SClientProblemReport_2_idx` (`type` ASC),
  INDEX `fk_SClientProblemReport_3_idx` (`appointment` ASC),
  CONSTRAINT `fk_SClientProblemReport_1`
  FOREIGN KEY (`client`)
  REFERENCES `springatom`.`SClient` (`idSClient`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SClientProblemReport_2`
  FOREIGN KEY (`type`)
  REFERENCES `springatom`.`SClientProblemReportType` (`idSClientProblemReportType`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SClientProblemReport_3`
  FOREIGN KEY (`appointment`)
  REFERENCES `springatom`.`SAppointment` (`idSAppointment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SRole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SRole`;

CREATE TABLE IF NOT EXISTS `springatom`.`SRole` (
  `role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`role`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SUserToRole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SUserToRole`;

CREATE TABLE IF NOT EXISTS `springatom`.`SUserToRole` (
  `idSUser` INT         NOT NULL,
  `idSRole` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idSUser`, `idSRole`),
  INDEX `fk_SUserToRole_1_idx` (`idSUser` ASC),
  INDEX `fk_SUserToRole_2_idx` (`idSRole` ASC),
  CONSTRAINT `fk_SUserToRole_1`
  FOREIGN KEY (`idSUser`)
  REFERENCES `springatom`.`SUser` (`idSUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SUserToRole_2`
  FOREIGN KEY (`idSRole`)
  REFERENCES `springatom`.`SRole` (`role`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SCarMaster`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SCarMaster`;

CREATE TABLE IF NOT EXISTS `springatom`.`SCarMaster` (
  `idSCarMaster`  INT          NOT NULL,
  `brand`         VARCHAR(45)  NOT NULL,
  `model`         VARCHAR(45)  NOT NULL,
  `thumbnailPath` VARCHAR(100) NULL DEFAULT '/dummy/path/to/thumbnail',
  PRIMARY KEY (`idSCarMaster`),
  INDEX `sCarMasterBrandIndex` USING BTREE (`brand` ASC),
  INDEX `sCarMasterModelIndex` (`model` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SCar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SCar`;

CREATE TABLE IF NOT EXISTS `springatom`.`SCar` (
  `idSCar`             INT         NOT NULL AUTO_INCREMENT,
  `carMaster`          INT         NOT NULL,
  `registrationNumber` VARCHAR(45) NOT NULL,
  `vinNumber`          VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSCar`),
  INDEX `fk_SCar_1_idx` (`carMaster` ASC),
  CONSTRAINT `fk_SCar_1`
  FOREIGN KEY (`carMaster`)
  REFERENCES `springatom`.`SCarMaster` (`idSCarMaster`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SAppointmentTaskType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SAppointmentTaskType`;

CREATE TABLE IF NOT EXISTS `springatom`.`SAppointmentTaskType` (
  `idSAppointmentTaskType` INT         NOT NULL AUTO_INCREMENT,
  `type`                   VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idSAppointmentTaskType`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SAppointmentTask`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SAppointmentTask`;

CREATE TABLE IF NOT EXISTS `springatom`.`SAppointmentTask` (
  `idSAppointmentTask` INT         NOT NULL AUTO_INCREMENT,
  `appointment`        INT         NOT NULL,
  `type`               INT         NOT NULL,
  `task`               VARCHAR(45) NULL,
  PRIMARY KEY (`idSAppointmentTask`),
  INDEX `fk_SAppointmentTask_1_idx` (`appointment` ASC),
  INDEX `fk_SAppointmentTask_2_idx` (`type` ASC),
  CONSTRAINT `fk_SAppointmentTask_1`
  FOREIGN KEY (`appointment`)
  REFERENCES `springatom`.`SAppointment` (`idSAppointment`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SAppointmentTask_2`
  FOREIGN KEY (`type`)
  REFERENCES `springatom`.`SAppointmentTaskType` (`idSAppointmentTaskType`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SAppointmentWorkerLink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SAppointmentWorkerLink`;

CREATE TABLE IF NOT EXISTS `springatom`.`SAppointmentWorkerLink` (
  `idSAppointmentWorkerLink` INT       NOT NULL AUTO_INCREMENT,
  `assigned`                 TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `appointment`              INT       NOT NULL,
  `assignee`                 INT       NOT NULL,
  `reporter`                 INT       NOT NULL,
  PRIMARY KEY (`idSAppointmentWorkerLink`),
  INDEX `fk_SAppointmentWorkerLink_1_idx` (`assignee` ASC),
  INDEX `fk_SAppointmentWorkerLink_2_idx` (`reporter` ASC),
  INDEX `fk_SAppointmentWorkerLink_3_idx` (`appointment` ASC),
  CONSTRAINT `fk_SAppointmentWorkerLink_1`
  FOREIGN KEY (`assignee`)
  REFERENCES `springatom`.`SMechanic` (`idSMechanic`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SAppointmentWorkerLink_2`
  FOREIGN KEY (`reporter`)
  REFERENCES `springatom`.`SMechanic` (`idSMechanic`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SAppointmentWorkerLink_3`
  FOREIGN KEY (`appointment`)
  REFERENCES `springatom`.`SAppointment` (`idSAppointment`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SNotificationType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SNotificationType`;

CREATE TABLE IF NOT EXISTS `springatom`.`SNotificationType` (
  `idSNotificationType` INT         NOT NULL AUTO_INCREMENT,
  `type`                VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idSNotificationType`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SNotification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SNotification`;

CREATE TABLE IF NOT EXISTS `springatom`.`SNotification` (
  `idNotification` INT           NOT NULL AUTO_INCREMENT,
  `type`           INT           NOT NULL,
  `notification`   VARCHAR(1000) NULL,
  `sent`           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idNotification`),
  INDEX `fk_SClientNotification_2_idx` (`type` ASC),
  CONSTRAINT `fk_SClientNotification_2`
  FOREIGN KEY (`type`)
  REFERENCES `springatom`.`SNotificationType` (`idSNotificationType`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SClientNotification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SNotificationLink`;

CREATE TABLE IF NOT EXISTS `springatom`.`SNotificationLink` (
  `idSNotification` INT        NOT NULL AUTO_INCREMENT,
  `notification`    INT        NOT NULL,
  `mechanic`        INT        NULL,
  `client`          INT        NULL,
  `discriminator`   TINYINT    NOT NULL,
  `read`            TINYINT(1) NULL,
  PRIMARY KEY (`idSNotification`),
  INDEX `fk_SNotificationMechanicLink_1_idx` (`mechanic` ASC),
  INDEX `fk_SNotificationMechanicLink_2_idx` (`notification` ASC),
  INDEX `fk_SNotificationLink_1_idx` (`client` ASC),
  CONSTRAINT `fk_SNotificationMechanicLink_1`
  FOREIGN KEY (`mechanic`)
  REFERENCES `springatom`.`SMechanic` (`idSMechanic`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SNotificationMechanicLink_2`
  FOREIGN KEY (`notification`)
  REFERENCES `springatom`.`SNotification` (`idNotification`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SNotificationLink_1`
  FOREIGN KEY (`client`)
  REFERENCES `springatom`.`SClient` (`idSClient`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SCarRevision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SCarRevision`;

CREATE TABLE IF NOT EXISTS `springatom`.`SCarRevision` (
  `idSCarRevision` INT NOT NULL,
  `car`            INT NOT NULL,
  `revision`       INT NOT NULL,
  PRIMARY KEY (`idSCarRevision`),
  INDEX `fk_SCarRevision_1_idx` (`car` ASC),
  CONSTRAINT `fk_SCarRevision_1`
  FOREIGN KEY (`car`)
  REFERENCES `springatom`.`SCar` (`idSCar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SCarClientLink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SCarClientLink`;

CREATE TABLE IF NOT EXISTS `springatom`.`SCarClientLink` (
  `idSCarClientLink` INT NOT NULL AUTO_INCREMENT,
  `client`           INT NOT NULL,
  `carRevision`      INT NOT NULL,
  PRIMARY KEY (`idSCarClientLink`),
  INDEX `fk_SCarClientLnk_2_idx` (`client` ASC),
  INDEX `fk_SCarClientLink_2_idx` (`carRevision` ASC),
  CONSTRAINT `fk_SCarClientLink_1`
  FOREIGN KEY (`client`)
  REFERENCES `springatom`.`SClient` (`idSClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SCarClientLink_2`
  FOREIGN KEY (`carRevision`)
  REFERENCES `springatom`.`SCarRevision` (`idSCarRevision`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `springatom`.`SCarAppointmentLink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `springatom`.`SCarAppointmentLink`;

CREATE TABLE IF NOT EXISTS `springatom`.`SCarAppointmentLink` (
  `idSCarAppointmentLink` INT NOT NULL AUTO_INCREMENT,
  `appointment`           INT NOT NULL,
  `carRevision`           INT NOT NULL,
  PRIMARY KEY (`idSCarAppointmentLink`),
  INDEX `fk_SCarAppointmentLink_2_idx` (`appointment` ASC),
  INDEX `fk_SCarAppointmentLink_2_idx1` (`carRevision` ASC),
  CONSTRAINT `fk_SCarAppointmentLink_1`
  FOREIGN KEY (`appointment`)
  REFERENCES `springatom`.`SAppointment` (`idSAppointment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SCarAppointmentLink_2`
  FOREIGN KEY (`carRevision`)
  REFERENCES `springatom`.`SCarRevision` (`idSCarRevision`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;

USE `springatom`;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
