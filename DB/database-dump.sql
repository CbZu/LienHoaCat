-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: lhc
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.16.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `can`
--

DROP TABLE IF EXISTS `can`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `can` (
  `A` int(11) NOT NULL,
  `CAN` varchar(45) DEFAULT NULL,
  `AC` int(11) DEFAULT NULL,
  PRIMARY KEY (`A`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `can`
--

LOCK TABLES `can` WRITE;
/*!40000 ALTER TABLE `can` DISABLE KEYS */;
INSERT INTO `can` VALUES (0,'CANH',4),(1,'TAN',4),(2,'NHAM',5),(3,'QUY',5),(4,'GIAP',1),(5,'AT',1),(6,'BINH',2),(7,'DINH',2),(8,'MAU',3),(9,'KY',3);
/*!40000 ALTER TABLE `can` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT '',
  `size` varchar(50) DEFAULT '',
  `code` varchar(20) DEFAULT '',
  `pos` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `folder_id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`cat_name`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi`
--

DROP TABLE IF EXISTS `chi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chi` (
  `B` int(11) NOT NULL,
  `CHI` varchar(45) DEFAULT NULL,
  `PHATHOMENH` varchar(100) DEFAULT NULL,
  `BC` int(11) DEFAULT NULL,
  PRIMARY KEY (`B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi`
--

LOCK TABLES `chi` WRITE;
/*!40000 ALTER TABLE `chi` DISABLE KEYS */;
INSERT INTO `chi` VALUES (0,'THAN','Nh Lai i Nht',1),(1,'DAU','Bt ng Minh Vng',1),(2,'TUAT','Pht A Di ',2),(3,'HOI','Pht A Di ',2),(4,'TI','Thin Th Thin Nhn B Tt',0),(5,'SUU','H Khng Tng B Tt',0),(6,'DAN','H Khng Tng B Tt',1),(7,'MAO','Vn Th B Tt',1),(8,'THIN','Ph Hin B Tt',2),(9,'TY','Ph Hin B Tt',2),(10,'NGO','i Th Ch B Tt',0),(11,'MUI','Nh Lai i Nht',0);
/*!40000 ALTER TABLE `chi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `description`
--

DROP TABLE IF EXISTS `description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `description` (
  `description_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`description_id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `description`
--

LOCK TABLES `description` WRITE;
/*!40000 ALTER TABLE `description` DISABLE KEYS */;

/*!40000 ALTER TABLE `description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discount` (
  `product_id` int(11) NOT NULL,
  `effective_date` int(11) DEFAULT NULL,
  `expired_date` int(11) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;

/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `product_id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;

/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mang`
--

DROP TABLE IF EXISTS `mang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mang` (
  `id` int(11) NOT NULL,
  `MANG` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mang`
--

LOCK TABLES `mang` WRITE;
/*!40000 ALTER TABLE `mang` DISABLE KEYS */;
INSERT INTO `mang` VALUES (0,'MOC'),(1,'KIM'),(2,'THUY'),(3,'HOA'),(4,'THO');
/*!40000 ALTER TABLE `mang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `phone` varchar(11) DEFAULT '',
  `name` varchar(50) DEFAULT '',
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;

/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `places` (
  `place_id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`place_id`),
  UNIQUE KEY `place_id_UNIQUE` (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (6,'Vit Nam','Ho Chi Minh','address',1),(41,'','','101/3 Lê Hồng Phong, p2, q5, TP.HCM',44),(45,NULL,NULL,'101/3, Lê Hồng Phong, P2, Q5',48),(46,NULL,NULL,'101/3, Lê Hồng Phong, P2, Q5',49),(47,NULL,NULL,'101/3, Lê Hồng Phong, P2, Q5',50),(48,NULL,NULL,'101/3, Lê Hồng Phong, P2, Q5',51);
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) NOT NULL,
  `create_time` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `menh` varchar(255) DEFAULT NULL,
  `tuoi` varchar(255) DEFAULT NULL,
  `mau` varchar(255) DEFAULT NULL,
  `information` varchar(255) DEFAULT NULL,
  `entity` int(11) DEFAULT NULL,
  `validFlag` varchar(1) DEFAULT '1',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settingshop`
--

DROP TABLE IF EXISTS `settingshop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settingshop` (
  `id` int(11) NOT NULL,
  `transportMethod` varchar(100) DEFAULT NULL,
  `paymentMethod` varchar(100) DEFAULT NULL,
  `freeShip` int(11) DEFAULT NULL,
  `defaultShip` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settingshop`
--

LOCK TABLES `settingshop` WRITE;
/*!40000 ALTER TABLE `settingshop` DISABLE KEYS */;
INSERT INTO `settingshop` VALUES (0,'ghtk;','tm;COD;ck;',200000,30000);
/*!40000 ALTER TABLE `settingshop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `size` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuoctinh`
--

DROP TABLE IF EXISTS `thuoctinh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thuoctinh` (
  `product_id` int(11) NOT NULL,
  `mau` varchar(255) DEFAULT NULL,
  `tuoi` varchar(255) DEFAULT NULL,
  `menh` varchar(255) DEFAULT NULL,
  `sizefrom` int(11) DEFAULT NULL,
  `sizeto` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuoctinh`
--

LOCK TABLES `thuoctinh` WRITE;
/*!40000 ALTER TABLE `thuoctinh` DISABLE KEYS */;

/*!40000 ALTER TABLE `thuoctinh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treefolder`
--

DROP TABLE IF EXISTS `treefolder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treefolder` (
  `folder_id` int(11) NOT NULL AUTO_INCREMENT,
  `folder_name` varchar(255) NOT NULL,
  `index` int(11) DEFAULT NULL,
  PRIMARY KEY (`folder_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`folder_name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treefolder`
--

LOCK TABLES `treefolder` WRITE;
/*!40000 ALTER TABLE `treefolder` DISABLE KEYS */;

/*!40000 ALTER TABLE `treefolder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'huyt71@gmail.com',19930828,'1663036577','admin','Tran',20181110,1,'21232f297a57a5a743894a0e4a801fc3','','admin','Vinh Long','123456','bank address','HSBC','M','Y'),(44,'',19951027,'0962190841','Nguyễn Hữu Bảo','',20190212,2,'9395b0b56e6be3814f8f9b90054b839a',NULL,'0962190841',NULL,NULL,NULL,NULL,'M','Y'),(48,'',0,'0962190849','Nguyễn Hữu Bảo',NULL,20190306,2,'akfgbksjdahfkljdash',NULL,'0962190849',NULL,NULL,NULL,NULL,'M',NULL),(49,'',19951027,'0962190848','Nguyễn Hữu Bảo',NULL,20190306,2,'9395b0b56e6be3814f8f9b90054b839a',NULL,'0962190848',NULL,NULL,NULL,NULL,'M',NULL),(50,'',19951027,'0866146613','Bảo',NULL,20190330,2,'9395b0b56e6be3814f8f9b90054b839a',NULL,'0866146613',NULL,NULL,NULL,NULL,'M',NULL),(51,'',0,'0962190899','Bảo',NULL,20190330,2,'akfgbksjdahfkljdash',NULL,'0962190899',NULL,NULL,NULL,NULL,'M',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (4,'XUAN2019',20,20190212,20190501,99,50000,'Mừng xuân kỷ hợi 2019');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlist` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `disct_price` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-08  0:39:22
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lin3ho@cac123';
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
