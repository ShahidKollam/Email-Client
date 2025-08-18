-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: emts
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobileNumber` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otpExpiry` datetime DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shahid','shahidkollam333@gmail.com','$2a$10$ZX0/jBDhevv.xl1rjX7VQeb54I8Tr7J2HGvwtyNNdNKORUKXrkxPO','+918606504004',NULL,'2024-11-21 03:55:53',1,'2024-11-21 03:55:23','2024-11-21 03:57:22'),(2,'test','editer@gmail.com','$2a$10$C4ceSS1v3RuIsCnc2G4K2e99hJzPikChHXBDjlfuzzglUsNnErOTi','+918606504004',NULL,'2024-11-21 06:28:39',1,'2024-11-21 06:28:09','2024-11-21 06:29:12'),(3,'asha','ashaaryamech@gmail.com','$2a$10$s25DcX2QZOgaK1X/EPVW/.Kjj/.CVteZXzIOaUL1PrSjgncOc8kca','+918606504004',NULL,'2024-11-25 04:00:46',1,'2024-11-25 04:00:16','2024-11-25 04:01:17'),(4,'vineesh','vineeshw1994@gmail.com','$2a$10$07PvsdF0K1qrUOu/7XK2VO/UftlRHbAgPXthT7edox9Td1u88DPW6','+918606504004',NULL,'2024-11-26 08:26:56',1,'2024-11-26 08:26:26','2024-11-26 08:27:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 16:13:35
