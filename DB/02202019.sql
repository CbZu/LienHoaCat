ALTER TABLE `lhc`.`promotion` modify COLUMN description varchar(40000) ;
ALTER TABLE `lhc`.`description` modify COLUMN description varchar(40000) ;
ALTER TABLE `lhc`.`treefolder` add column `index` int null ;
update `lhc`.`treefolder` t set t.index = 1;