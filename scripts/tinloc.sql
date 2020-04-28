CREATE DATABASE `tinloc` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE `distances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `match_id` varchar(60) DEFAULT NULL,
  `person_id` varchar(60) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `origin_code` char(3) DEFAULT NULL,
  `distance_mi` int(5) DEFAULT NULL,
  `distance_km` int(5) DEFAULT NULL,
  `possible_cities` text,
  `verified_city` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`match_id`),
  KEY `index3` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `pictures` (
  `id` varchar(60) NOT NULL,
  `person_id` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tinloc`.`locations` (
  `id` INT NOT NULL,
  `airport_code` CHAR(3) NULL,
  `city` VARCHAR(50) NULL,
  `country` VARCHAR(50) NULL,
  `center_latitude` VARCHAR(20) NULL,
  `center_longitude` VARCHAR(20) NULL,
  PRIMARY KEY (`id`));
