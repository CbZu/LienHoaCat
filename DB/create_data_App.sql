DROP TABLE IF EXISTS `lhc`.`can`;
CREATE TABLE `lhc`.`can` (
  `A` INT NOT NULL,
  `CAN` VARCHAR(45) character set utf8 NULL,
  `AC` INT NULL,
  PRIMARY KEY (`A`));
  
insert lhc.can value(0, 'CANH', 4);
insert lhc.can value(1, 'TAN', 4);
insert lhc.can value(2,'NHAM',5);
insert lhc.can value(3,'QUY',5);
insert lhc.can value(4,'GIAP',1);
insert lhc.can value(5,'AT',1);
insert lhc.can value(6,'BINH',2);
insert lhc.can value(7,'DINH',2);
insert lhc.can value(8,'MAU',3);
insert lhc.can value(9,'KY',3);

DROP TABLE IF EXISTS `lhc`.`chi`;
CREATE TABLE `lhc`.`chi` (
  `B` INT NOT NULL,
  `CHI` VARCHAR(45) NULL,
  `PHATHOMENH` VARCHAR(100) character set utf8 NULL,
  `BC` INT NULL,
  PRIMARY KEY (`B`));

insert lhc.chi value(0,'THAN','Như Lai Đại Nhật',1);
insert lhc.chi value(1,'DAU','Bất Động Minh Vương',1);
insert lhc.chi value(2,'TUAT','Phật A Di Đà',2);
insert lhc.chi value(3,'HOI','Phật A Di Đà',2);
insert lhc.chi value(4,'TI','Thiên Thủ Thiên Nhãn Bồ Tát',0);
insert lhc.chi value(5,'SUU','Hư Không Tạng Bồ Tát',0);
insert lhc.chi value(6,'DAN','Hư Không Tạng Bồ Tát',1);
insert lhc.chi value(7,'MAO','Văn Thù Bồ Tát',1);
insert lhc.chi value(8,'THIN','Phổ Hiền Bồ Tát',2);
insert lhc.chi value(9,'TY','Phổ Hiền Bồ Tát',2);
insert lhc.chi value(10,'NGO','Đại Thế Chí Bồ Tát',0);
insert lhc.chi value(11,'MUI','Như Lai Đại Nhật',0);

DROP TABLE IF EXISTS `lhc`.`mang`;
CREATE TABLE `lhc`.`mang` (
  `id` INT NOT NULL,
  `MANG` VARCHAR(45) character set utf8 NULL,
  PRIMARY KEY (`id`));

insert lhc.mang value(0,'MỘC');
insert lhc.mang value(1,'KIM');
insert lhc.mang value(2,'THỦY');
insert lhc.mang value(3,'HỎA');
insert lhc.mang value(4,'THỔ');


