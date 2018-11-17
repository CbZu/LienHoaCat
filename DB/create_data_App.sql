CREATE TABLE `lhc`.`can` (
  `A` INT NOT NULL,
  `CAN` VARCHAR(45) NULL,
  `AC` INT NULL,
  PRIMARY KEY (`A`));
  
insert lhc.can value(0, 'CANH', 4);
insert lhc.can value(1, 'TÂN', 4);
insert lhc.can value(2,'NHÂM',5);
insert lhc.can value(3,'QUÝ',5);
insert lhc.can value(4,'GIÁP',1);
insert lhc.can value(5,'ẤT',1);
insert lhc.can value(6,'BÍNH',2);
insert lhc.can value(7,'ĐINH',2);
insert lhc.can value(8,'MẬU',3);
insert lhc.can value(9,'KỶ',3);

CREATE TABLE `lhc`.`chi` (
  `B` INT NOT NULL,
  `CHI` VARCHAR(45) NULL,
  `PHATHOMENH` VARCHAR(100) NULL,
  `BC` INT NULL,
  PRIMARY KEY (`B`));

insert lhc.chi value(0,'THÂN','Như Lai Đại Nhật',1);
insert lhc.chi value(1,'DẬU','Bất Động Minh Vương',1);
insert lhc.chi value(2,'TUẤT','Phật A Di Đà',2);
insert lhc.chi value(3,'HỢI','Phật A Di Đà',2);
insert lhc.chi value(4,'TÝ','Thiên Thủ Thiên Nhãn Bồ Tát',0);
insert lhc.chi value(5,'SỬU','Hư Không Tạng Bồ Tát',0);
insert lhc.chi value(6,'DẦN','Hư Không Tạng Bồ Tát',1);
insert lhc.chi value(7,'MÃO','Văn Thù Bồ Tát',1);
insert lhc.chi value(8,'THÌN','Phổ Hiền Bồ Tát',2);
insert lhc.chi value(9,'TỴ','Phổ Hiền Bồ Tát',2);
insert lhc.chi value(10,'NGỌ','Đại Thế Chí Bồ Tát',0);
insert lhc.chi value(11,'MÙI','Như Lai Đại Nhật',0);

CREATE TABLE `lhc`.`mang` (
  `id` INT NOT NULL,
  `MANG` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

insert lhc.mang value(0,'MỘC');
insert lhc.mang value(1,'KIM');
insert lhc.mang value(2,'THỦY');
insert lhc.mang value(3,'HỎA');
insert lhc.mang value(4,'THỔ');


