use lhc;
CREATE TABLE `can` (
  `A` int(11) NOT NULL,
  `CAN` varchar(45) DEFAULT NULL,
  `AC` int(11) DEFAULT NULL,
  PRIMARY KEY (`A`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `folder_id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`cat_name`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

CREATE TABLE `chi` (
  `B` int(11) NOT NULL,
  `CHI` varchar(45) DEFAULT NULL,
  `PHATHOMENH` varchar(100) DEFAULT NULL,
  `BC` int(11) DEFAULT NULL,
  PRIMARY KEY (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `description` (
  `description_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`description_id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;

CREATE TABLE `discount` (
  `product_id` int(11) NOT NULL,
  `effective_date` int(11) DEFAULT NULL,
  `expired_date` int(11) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `image` (
  `product_id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `mang` (
  `id` int(11) NOT NULL,
  `MANG` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `seen_flag` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `sum` double DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pay_type` varchar(1) DEFAULT NULL,
  `promotion` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `seen_flag` varchar(1) DEFAULT NULL,
  `ship` varchar(1) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `voucher` varchar(11) DEFAULT NULL,
  `shipfee` int(11) DEFAULT NULL,
  `shipcode` varchar(20) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

CREATE TABLE `places` (
  `place_id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`place_id`),
  UNIQUE KEY `place_id_UNIQUE` (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) NOT NULL,
  `create_time` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(3) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `menh` varchar(255) DEFAULT NULL,
  `tuoi` varchar(255) DEFAULT NULL,
  `mau` varchar(255) DEFAULT NULL,
  `information` varchar(255) DEFAULT NULL,
  `entity` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

CREATE TABLE `promotion` (
  `promotion_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `effective_date` int(11) DEFAULT NULL,
  `expired_date` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `seen_flag` varchar(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`promotion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

CREATE TABLE `settingshop` (
  `id` int(11) NOT NULL,
  `transportMethod` varchar(100) DEFAULT NULL,
  `paymentMethod` varchar(100) DEFAULT NULL,
  `freeShip` int(11) DEFAULT NULL,
  `defaultShip` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `size` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `thuoctinh` (
  `product_id` int(11) NOT NULL,
  `mau` varchar(255) DEFAULT NULL,
  `tuoi` varchar(255) DEFAULT NULL,
  `menh` varchar(255) DEFAULT NULL,
  `sizefrom` int(11) DEFAULT NULL,
  `sizeto` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `treefolder` (
  `folder_id` int(11) NOT NULL AUTO_INCREMENT,
  `folder_name` varchar(255) NOT NULL,
  PRIMARY KEY (`folder_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`folder_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

CREATE TABLE `type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `dob` int(11) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `bank_address` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `checked` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

CREATE TABLE `voucher` (
  `voucher_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `percent` int(11) DEFAULT NULL,
  `effective_date` int(11) DEFAULT NULL,
  `expired_date` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`voucher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `wishlist` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
INSERT INTO `user` VALUES (1,'huyt71@gmail.com',19930828,'1663036577','admin','Tran',20181110,1,'21232f297a57a5a743894a0e4a801fc3','','admin','Vinh Long','123456','bank address','HSBC','M','Y');
INSERT INTO `places` VALUES (6,'Việt Nam','Ho Chi Minh','address',1);
INSERT INTO `treefolder` VALUES (1,'VIP');
INSERT INTO `category` VALUES (1,1,'VIP',NULL);
INSERT INTO `settingshop` VALUES (0,'ghtk;','tm;ttd;',150000,30000);
INSERT INTO `mang` VALUES (0,'MOC'),(1,'KIM'),(2,'THUY'),(3,'HOA'),(4,'THO');
INSERT INTO `can` VALUES (0,'CANH',4),(1,'TAN',4),(2,'NHAM',5),(3,'QUY',5),(4,'GIAP',1),(5,'AT',1),(6,'BINH',2),(7,'DINH',2),(8,'MAU',3),(9,'KY',3);
INSERT INTO `chi` VALUES (0,'THAN','Nh Lai i Nht',1),(1,'DAU','Bt ng Minh Vng',1),(2,'TUAT','Pht A Di ',2),(3,'HOI','Pht A Di ',2),(4,'TI','Thin Th Thin Nhn B Tt',0),(5,'SUU','H Khng Tng B Tt',0),(6,'DAN','H Khng Tng B Tt',1),(7,'MAO','Vn Th B Tt',1),(8,'THIN','Ph Hin B Tt',2),(9,'TY','Ph Hin B Tt',2),(10,'NGO','i Th Ch B Tt',0),(11,'MUI','Nh Lai i Nht',0);
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lin3ho@cac123';