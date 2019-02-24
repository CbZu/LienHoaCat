ALTER TABLE `lhc`.`cart` add column `pos` varchar(1) null;
update cart set pos = ' ';