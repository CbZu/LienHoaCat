CREATE TABLE `lhc`.`settingshop` (
  `transportMethod` VARCHAR(100) NULL,
  `paymentMethod` VARCHAR(100) NULL,
  `freeShip` INT NULL,
  `defaultShip` INT NULL);

ALTER TABLE `lhc`.`settingshop` 
ADD COLUMN `id` INT NOT NULL FIRST,
ADD PRIMARY KEY (`id`);

INSERT INTO `lhc`.`settingshop` (id, transportMethod, paymentMethod, freeShip, defaultShip)
VALUES (0, 'ghtk', 'COD', 300000, 30000);