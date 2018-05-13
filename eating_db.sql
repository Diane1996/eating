/*
Navicat MySQL Data Transfer

Source Server         : 123
Source Server Version : 100119
Source Host           : localhost:3306
Source Database       : eating_db

Target Server Type    : MYSQL
Target Server Version : 100119
File Encoding         : 65001

Date: 2018-05-13 19:08:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for eating_admin
-- ----------------------------
DROP TABLE IF EXISTS `eating_admin`;
CREATE TABLE `eating_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `admin_role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_admin
-- ----------------------------
INSERT INTO `eating_admin` VALUES ('1', 'admin', 'admin', '1');

-- ----------------------------
-- Table structure for eating_cart
-- ----------------------------
DROP TABLE IF EXISTS `eating_cart`;
CREATE TABLE `eating_cart` (
  `id` int(11) NOT NULL,
  `open_id` varchar(45) NOT NULL,
  `food_id` varchar(45) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_id_idx` (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_cart
-- ----------------------------
INSERT INTO `eating_cart` VALUES ('1', '123456', '145001', '1');

-- ----------------------------
-- Table structure for eating_category
-- ----------------------------
DROP TABLE IF EXISTS `eating_category`;
CREATE TABLE `eating_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(45) NOT NULL,
  `category_name` varchar(45) DEFAULT NULL,
  `category_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_category
-- ----------------------------
INSERT INTO `eating_category` VALUES ('23', '84907a88', '烤鱼', null);
INSERT INTO `eating_category` VALUES ('24', 'b71216e7', '饭', null);
INSERT INTO `eating_category` VALUES ('25', '766d599b', '面食', null);
INSERT INTO `eating_category` VALUES ('26', 'e41dee50', '刺身', null);
INSERT INTO `eating_category` VALUES ('27', '546e3dca', '汤', null);
INSERT INTO `eating_category` VALUES ('28', '931b4641', '寿司拼盘', null);
INSERT INTO `eating_category` VALUES ('29', 'd9e30d41', '天罗妇', null);

-- ----------------------------
-- Table structure for eating_food
-- ----------------------------
DROP TABLE IF EXISTS `eating_food`;
CREATE TABLE `eating_food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_id` varchar(45) NOT NULL,
  `price` double DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `sales` int(11) DEFAULT NULL,
  `category_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_food
-- ----------------------------
INSERT INTO `eating_food` VALUES ('1', '145001', '15', '../../img/eatingIMG/sushi/Sushi.png', '寿司', null, '');

-- ----------------------------
-- Table structure for eating_order
-- ----------------------------
DROP TABLE IF EXISTS `eating_order`;
CREATE TABLE `eating_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(45) NOT NULL,
  `open_id` varchar(45) NOT NULL,
  `total_price` float(11,0) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `first_picture` varchar(255) DEFAULT NULL,
  `payment` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `create_time` varchar(45) DEFAULT NULL,
  `payment_time` varchar(45) DEFAULT NULL,
  `orderRece_time` varchar(45) DEFAULT NULL,
  `deliver_time` varchar(45) DEFAULT NULL,
  `end_time` varchar(45) DEFAULT NULL,
  `cancel_time` varchar(45) DEFAULT NULL,
  `refund_time` varchar(45) DEFAULT NULL,
  `desk_num` int(11) DEFAULT NULL,
  `people_nem` int(11) DEFAULT NULL,
  `receiver_id` varchar(45) DEFAULT NULL,
  `remark` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_order
-- ----------------------------
INSERT INTO `eating_order` VALUES ('30', '6bf473dd', '123456', '0', '1', '寿司', '../../img/eatingIMG/sushi/Sushi.png', null, '0', '2018-01-22 22:51:27', null, null, null, null, null, null, '1', null, '3eb2fd78', null);
INSERT INTO `eating_order` VALUES ('31', '80ba0f90', '123456', '0', '0', '寿司', '../../img/eatingIMG/sushi/Sushi.png', null, '0', '2018-01-24 21:18:32', null, null, null, null, null, null, '1', null, '3eb2fd78', null);
INSERT INTO `eating_order` VALUES ('32', '3d093da8', '123456789', '0', '2', '寿司', '../../img/eatingIMG/sushi/Sushi.png', null, '0', '2018-01-24 21:18:32', null, null, null, null, null, null, '1', null, '3eb2fd78', null);

-- ----------------------------
-- Table structure for eating_order_item
-- ----------------------------
DROP TABLE IF EXISTS `eating_order_item`;
CREATE TABLE `eating_order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_id` varchar(45) NOT NULL,
  `order_id` varchar(45) NOT NULL,
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_order_item
-- ----------------------------
INSERT INTO `eating_order_item` VALUES ('1', '145001', '6bf473dd', '1');
INSERT INTO `eating_order_item` VALUES ('2', '145001', '80ba0f90', '1');
INSERT INTO `eating_order_item` VALUES ('3', '145001', '3d093da8', '1');

-- ----------------------------
-- Table structure for eating_order_shipping
-- ----------------------------
DROP TABLE IF EXISTS `eating_order_shipping`;
CREATE TABLE `eating_order_shipping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(45) NOT NULL,
  `receiver_id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `created` varchar(45) NOT NULL,
  `version` int(11) NOT NULL,
  `isDelete` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_order_shipping
-- ----------------------------
INSERT INTO `eating_order_shipping` VALUES ('9', '123456', '3eb2fd78', '李先生', '13912341234', '成都', '2018-01-20 13:08:19', '1', '1');
INSERT INTO `eating_order_shipping` VALUES ('10', '123456', '0894afd5', '张先生', '13912341234', '成都', '2018-01-20 13:28:04', '1', '1');
INSERT INTO `eating_order_shipping` VALUES ('11', '123456', '3eb2fd78', '李先生', '13912341235', '成都', '2018-01-20 14:31:47', '2', '1');
INSERT INTO `eating_order_shipping` VALUES ('12', 'ouRz30Egtyd9mifQmowivbtjzj9k', 'd17ae5d3', '张三', '13913412341', '13412341234', '2018-05-12 14:27:48', '1', '1');
INSERT INTO `eating_order_shipping` VALUES ('13', 'ouRz30Egtyd9mifQmowivbtjzj9k', 'dc38a646', '李四', '19112341234', '我的家在东北', '2018-05-12 14:29:27', '1', '0');
INSERT INTO `eating_order_shipping` VALUES ('14', 'ouRz30Egtyd9mifQmowivbtjzj9k', 'd17ae5d3', '张三', '13913412341', '吾问无为谓无无', '2018-05-12 14:49:03', '2', '1');
INSERT INTO `eating_order_shipping` VALUES ('15', 'ouRz30Egtyd9mifQmowivbtjzj9k', 'd17ae5d3', '张三', '13913412341', '233333333', '2018-05-12 15:21:47', '3', '1');
INSERT INTO `eating_order_shipping` VALUES ('16', 'ouRz30Egtyd9mifQmowivbtjzj9k', 'dc38a646', '小仙女', '13912345678', '小仙女的家', '2018-05-12 15:31:09', '2', '0');
INSERT INTO `eating_order_shipping` VALUES ('17', 'ouRz30Egtyd9mifQmowivbtjzj9k', '9afa58c3', '王小明', '13912345678', '我住在日本', '2018-05-12 15:31:46', '1', '0');
INSERT INTO `eating_order_shipping` VALUES ('18', 'ouRz30Egtyd9mifQmowivbtjzj9k', 'dc38a646', '小仙女', '13912345678', '小仙女的家1314号', '2018-05-12 15:33:41', '3', '0');

-- ----------------------------
-- Table structure for eating_restaurant
-- ----------------------------
DROP TABLE IF EXISTS `eating_restaurant`;
CREATE TABLE `eating_restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `remark` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_restaurant
-- ----------------------------
INSERT INTO `eating_restaurant` VALUES ('1', '123', '123', '123', '123');

-- ----------------------------
-- Table structure for eating_user
-- ----------------------------
DROP TABLE IF EXISTS `eating_user`;
CREATE TABLE `eating_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid_UNIQUE` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eating_user
-- ----------------------------
INSERT INTO `eating_user` VALUES ('1', '1', '张三', null);
INSERT INTO `eating_user` VALUES ('2', 'ouRz30Egtyd9mifQmowivbtjzj9k', '小白', 'https://wx.qlogo.cn/mmopen/vi_32/3jhutiapKYwn9ib9uy4EWMtYwKrMuoic6trwhjqbiaAhNWxknRMb41N0Wic51scmSbFmpN0VWmE3UtNqm3BGFmhMumQ/132');
