alter table user add column
`gender` VARCHAR(1) character set utf8 ;
DROP INDEX `email_UNIQUE` ON user;