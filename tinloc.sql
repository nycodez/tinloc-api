-- MySQL dump 10.13  Distrib 5.7.23, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: tinloc
-- ------------------------------------------------------
-- Server version	5.7.20

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
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matches` (
  `id` varchar(60) NOT NULL,
  `closed` tinyint(1) NOT NULL DEFAULT '0',
  `common_friend_count` int(1) NOT NULL DEFAULT '0',
  `common_like_count` int(1) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `dead` tinyint(1) NOT NULL DEFAULT '0',
  `last_activity_date` datetime DEFAULT NULL,
  `message_count` int(3) DEFAULT NULL,
  `muted` tinyint(1) NOT NULL DEFAULT '0',
  `pending` tinyint(1) NOT NULL DEFAULT '0',
  `super_liker` varchar(60) DEFAULT NULL,
  `is_super_like` tinyint(1) NOT NULL DEFAULT '0',
  `is_boost_match` tinyint(1) NOT NULL DEFAULT '0',
  `is_super_boost_match` tinyint(1) NOT NULL DEFAULT '0',
  `is_experiences_match` tinyint(1) NOT NULL DEFAULT '0',
  `is_fast_match` tinyint(1) NOT NULL DEFAULT '0',
  `is_opener` tinyint(1) NOT NULL DEFAULT '0',
  `person_id` varchar(60) NOT NULL,
  `person_bio` mediumtext CHARACTER SET utf8,
  `person_birth_date` datetime DEFAULT NULL,
  `person_name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `following` tinyint(1) NOT NULL DEFAULT '0',
  `following_moments` tinyint(1) NOT NULL DEFAULT '0',
  `has_harassing_feedback` tinyint(1) NOT NULL DEFAULT '0',
  `person_distance_mi` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `person` (`person_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pictures` (
  `id` varchar(60) NOT NULL,
  `person_id` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'tinloc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-28  2:14:22
