-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: challenge_db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `idAccount` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `clientName` varchar(50) DEFAULT NULL,
  `responsableName` varchar(200) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`idAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Account 1','Client 1','Responsable 1','2023-03-17','2023-03-17'),(2,'Account 2','Client 2','Responsable 2','2023-03-17','2023-03-17'),(3,'Account 5','Test 5','Responsable 5','2023-03-17','2023-03-17');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `idRole` int NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'User'),(2,'Admin'),(3,'Super user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `idTeam` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) DEFAULT NULL,
  `idAccount` int DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`idTeam`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Team 3',2,'2023-03-17','2023-03-17'),(2,'Team 2',2,'2023-03-17','2023-03-17'),(3,'New Team',3,'2023-03-17','2023-03-17');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamusers`
--

DROP TABLE IF EXISTS `teamusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamusers` (
  `idTeamUser` int NOT NULL AUTO_INCREMENT,
  `idUser` int DEFAULT NULL,
  `idTeam` int DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`idTeamUser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamusers`
--

LOCK TABLES `teamusers` WRITE;
/*!40000 ALTER TABLE `teamusers` DISABLE KEYS */;
INSERT INTO `teamusers` VALUES (1,4,2,'2023-03-17','2023-03-17','2023-03-17','2023-03-17'),(2,5,3,'2023-03-17','2023-03-17','2023-03-17','2023-03-17');
/*!40000 ALTER TABLE `teamusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `englishLevel` varchar(10) DEFAULT NULL,
  `knowledge` varchar(200) DEFAULT NULL,
  `idRole` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `cvUrl` varchar(600) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Vicente Mata Velasco','C1','React JS. Angular JS',3,'vicente@gmail.com','$2b$10$y7xSflgAQUt2Tz01/tyXReXqCXFUICYLQ8uvqrZWMUkCK29yFU8dO','http://c1234567','2023-03-17','2023-03-20'),(2,'Jose Peralez','A2','Angular js',2,'jose@gmail.com','$2b$10$9fOJDuwv7kRToV35qitNne1E58RGOGod2ctrLXZdLSAS9Fz2wMdsy','http:123123','2023-03-17','2023-03-17'),(3,'Armando Peralez','B2','React js, angular js',1,'armando@gmail.com','$2b$10$/rtCf8Vz2Z4BevVovS/SfePtKFc9148D6a4NmfzpUF74WMVegreVG','http://fgdfgdfg','2023-03-17','2023-03-17'),(4,'User1','B1','Sql Server',1,'user@gmail.com','$2b$10$dlaMT3Z7ZwNfk1x1lgaCp.b30rzYAaxz/9SNlSk/Sn66n0Krb9KPS','http://1323233','2023-03-17','2023-03-17'),(5,'User Test chente','C2','Angullar JS, React js',1,'usertest@gmail.com','$2b$10$fN6crdJaG8jsdKFrV3555uShNjr9WudjlCxxguePz86B2eAw6jmry','Http://12sdfdsgfd','2023-03-17','2023-03-17'),(12,'Test 1','B1','React JS. Vue JS',3,'test@gmail.com','$2b$10$El/k1iX5NlEx3ZhMAml1Le205Hj1pYLJl3ebCYatUws8d4bew.1Qy','http://c123456','2023-03-20','2023-03-20');
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

-- Dump completed on 2023-03-19 21:18:29
