-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: eating_db
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Table structure for table `eating_admin`
--

DROP TABLE IF EXISTS `eating_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `admin_role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_admin`
--

LOCK TABLES `eating_admin` WRITE;
/*!40000 ALTER TABLE `eating_admin` DISABLE KEYS */;
INSERT INTO `eating_admin` VALUES (1,'admin','admin',1);
/*!40000 ALTER TABLE `eating_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_cart`
--

DROP TABLE IF EXISTS `eating_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_cart` (
  `id` int(11) NOT NULL,
  `open_id` varchar(45) NOT NULL,
  `food_id` varchar(45) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_id_idx` (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_cart`
--

LOCK TABLES `eating_cart` WRITE;
/*!40000 ALTER TABLE `eating_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `eating_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_category`
--

DROP TABLE IF EXISTS `eating_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(45) NOT NULL,
  `category_name` varchar(45) DEFAULT NULL,
  `category_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_category`
--

LOCK TABLES `eating_category` WRITE;
/*!40000 ALTER TABLE `eating_category` DISABLE KEYS */;
INSERT INTO `eating_category` VALUES (1,'123','abc','345'),(19,'133','afc','345'),(20,'144','afc','345'),(22,'1001','快餐','789');
/*!40000 ALTER TABLE `eating_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_food`
--

DROP TABLE IF EXISTS `eating_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_id` varchar(45) NOT NULL,
  `food_price` double DEFAULT NULL,
  `food_picture` varchar(255) DEFAULT NULL,
  `food_name` varchar(45) DEFAULT NULL,
  `food_sales` int(11) DEFAULT NULL,
  `category_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_food`
--

LOCK TABLES `eating_food` WRITE;
/*!40000 ALTER TABLE `eating_food` DISABLE KEYS */;
INSERT INTO `eating_food` VALUES (1,'145001',12.11,'qwe','担担面',45,'1001'),(2,'10644e1f',12.11,'qwe','担担面',45,'1001'),(3,'f519db41',12.11,'qwe','担担面',45,'1001'),(4,'748ebdcb',12.11,'qwe','担担面',45,'1001'),(5,'116a132a',12.11,'qwe','担担面',45,'1001'),(6,'ca0e55e3',12.11,'qwe','担担面',45,'1001'),(7,'a9e91d59',12.11,'qwe','担担面',45,'1001'),(8,'a0c80680',12.11,'qwe','担担面',45,'1001'),(9,'489db5c8',12.11,'qwe','担担面',45,'1001');
/*!40000 ALTER TABLE `eating_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_order`
--

DROP TABLE IF EXISTS `eating_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(45) NOT NULL,
  `open_id` varchar(45) NOT NULL,
  `payment` varchar(45) DEFAULT NULL,
  `shipping_fee` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `create_time` varchar(45) DEFAULT NULL,
  `payment_time` varchar(45) DEFAULT NULL,
  `orderRece_time` varchar(45) DEFAULT NULL,
  `deliver_time` varchar(45) DEFAULT NULL,
  `end_time` varchar(45) DEFAULT NULL,
  `cancel_time` varchar(45) DEFAULT NULL,
  `refund_time` varchar(45) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `desk_num` int(11) DEFAULT NULL,
  `people_nem` int(11) DEFAULT NULL,
  `receiver_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_order`
--

LOCK TABLES `eating_order` WRITE;
/*!40000 ALTER TABLE `eating_order` DISABLE KEYS */;
INSERT INTO `eating_order` VALUES (1,'12','12',NULL,NULL,2,NULL,NULL,'2017-12-28 18:19:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `eating_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_order_item`
--

DROP TABLE IF EXISTS `eating_order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_id` varchar(45) NOT NULL,
  `order_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_order_item`
--

LOCK TABLES `eating_order_item` WRITE;
/*!40000 ALTER TABLE `eating_order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `eating_order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_order_shipping`
--

DROP TABLE IF EXISTS `eating_order_shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_order_shipping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(45) NOT NULL,
  `receiver_id` varchar(45) NOT NULL,
  `receiver_name` varchar(45) NOT NULL,
  `receiver_phone` varchar(45) NOT NULL,
  `receiver_address` varchar(45) NOT NULL,
  `created` varchar(45) NOT NULL,
  `updated` varchar(45) DEFAULT NULL,
  `receiver_version` int(11) NOT NULL,
  `receiver_isDelete` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_order_shipping`
--

LOCK TABLES `eating_order_shipping` WRITE;
/*!40000 ALTER TABLE `eating_order_shipping` DISABLE KEYS */;
INSERT INTO `eating_order_shipping` VALUES (1,'123','123','123','123','123','123','123',123,1233),(2,'123','1','123','123','34','123','123',12,123),(3,'345','345','345','345','345','345','345',3,345),(4,'123','123','123','123','123','132','123',124,123),(5,'123','1','123','123','123','123','123',123,123);
/*!40000 ALTER TABLE `eating_order_shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_restaurant`
--

DROP TABLE IF EXISTS `eating_restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `remark` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_restaurant`
--

LOCK TABLES `eating_restaurant` WRITE;
/*!40000 ALTER TABLE `eating_restaurant` DISABLE KEYS */;
INSERT INTO `eating_restaurant` VALUES (1,'123','123','123','123');
/*!40000 ALTER TABLE `eating_restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating_user`
--

DROP TABLE IF EXISTS `eating_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eating_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid_UNIQUE` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating_user`
--

LOCK TABLES `eating_user` WRITE;
/*!40000 ALTER TABLE `eating_user` DISABLE KEYS */;
INSERT INTO `eating_user` VALUES (1,'1','张三',NULL);
/*!40000 ALTER TABLE `eating_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-05  9:58:50
