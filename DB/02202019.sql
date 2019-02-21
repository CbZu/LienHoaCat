ALTER TABLE `lhc`.`promotion` modify COLUMN description varchar(40000) ;
ALTER TABLE `lhc`.`description` modify COLUMN description varchar(40000) ;
ALTER TABLE `lhc`.`category` add column `index` int null ;