-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: driver_app
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activitylog`
--

DROP TABLE IF EXISTS `activitylog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activitylog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `activitylog_userId_idx` (`userId`),
  KEY `activitylog_createdAt_idx` (`createdAt`),
  CONSTRAINT `activitylog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitylog`
--

LOCK TABLES `activitylog` WRITE;
/*!40000 ALTER TABLE `activitylog` DISABLE KEYS */;
INSERT INTO `activitylog` VALUES (1,'LOGIN','تسجيل دخول',1,'2026-02-06 22:12:33.357'),(2,'LOGIN','تسجيل دخول',1,'2026-02-06 22:12:55.040'),(3,'LOGIN','تسجيل دخول',1,'2026-02-06 22:13:02.414'),(4,'LOGIN','تسجيل دخول',1,'2026-02-06 22:24:03.432'),(5,'LOGIN','تسجيل دخول',1,'2026-02-06 22:27:29.712'),(6,'LOGIN','تسجيل دخول',1,'2026-02-06 22:48:54.104'),(7,'LOGIN','تسجيل دخول',1,'2026-02-06 22:50:55.276'),(8,'LOGIN','تسجيل دخول',1,'2026-02-06 22:50:55.430'),(9,'LOGIN','تسجيل دخول',1,'2026-02-06 22:54:17.785'),(10,'LOGIN','تسجيل دخول',1,'2026-02-06 22:55:12.936'),(11,'LOGIN','تسجيل دخول',1,'2026-02-06 22:55:25.466'),(12,'LOGIN','تسجيل دخول',1,'2026-02-06 22:56:06.195'),(13,'LOGIN','تسجيل دخول',1,'2026-02-06 22:56:14.642'),(14,'LOGIN','تسجيل دخول',1,'2026-02-06 22:57:22.655'),(15,'LOGIN','تسجيل دخول',1,'2026-02-06 23:03:00.387'),(16,'LOGIN','تسجيل دخول',1,'2026-02-06 23:17:22.703'),(17,'LOGIN','تسجيل دخول',1,'2026-02-07 00:05:21.007'),(18,'LOGIN','تسجيل دخول',1,'2026-02-07 00:06:42.657'),(19,'LOGIN','تسجيل دخول',1,'2026-02-07 00:18:59.479'),(20,'LOGIN','تسجيل دخول',1,'2026-02-07 00:19:31.601'),(21,'LOGIN','تسجيل دخول',1,'2026-02-07 00:19:39.565'),(22,'LOGIN','تسجيل دخول',1,'2026-02-07 00:19:56.660'),(23,'LOGIN','تسجيل دخول',1,'2026-02-07 00:20:51.078'),(24,'LOGIN','تسجيل دخول',1,'2026-02-07 00:27:14.237'),(25,'LOGIN','تسجيل دخول',1,'2026-02-07 00:27:40.388'),(26,'LOGIN','تسجيل دخول',1,'2026-02-07 00:29:32.875'),(27,'LOGIN','تسجيل دخول',1,'2026-02-07 00:32:42.337'),(28,'LOGIN','تسجيل دخول',1,'2026-02-07 00:33:09.466'),(29,'LOGIN','تسجيل دخول',1,'2026-02-07 00:34:26.166'),(30,'LOGIN','تسجيل دخول',1,'2026-02-07 00:34:34.535'),(31,'LOGIN','تسجيل دخول',1,'2026-02-07 00:34:43.394'),(32,'LOGIN','تسجيل دخول',1,'2026-02-07 00:35:07.256'),(33,'LOGIN','تسجيل دخول',1,'2026-02-07 00:35:11.527'),(34,'LOGIN','تسجيل دخول',1,'2026-02-07 00:35:32.437'),(35,'ADMIN_USER_EDIT','تعديل بيانات المستخدم #2: ahmed magdi',1,'2026-02-07 00:36:11.860'),(36,'LOGIN','تسجيل دخول',1,'2026-02-07 00:36:33.582'),(37,'ADMIN_USER_EDIT','تعديل بيانات المستخدم #2: ahmed magdi',1,'2026-02-07 00:36:33.693'),(38,'LOGIN','تسجيل دخول',2,'2026-02-07 00:36:40.960'),(39,'LOGIN','تسجيل دخول',1,'2026-02-07 01:18:47.560'),(40,'LOGIN','تسجيل دخول',2,'2026-02-07 01:21:14.760'),(41,'LOGIN','تسجيل دخول',2,'2026-02-07 01:31:51.760'),(42,'LOGIN','تسجيل دخول',2,'2026-02-07 01:36:40.715'),(43,'LOGIN','تسجيل دخول',2,'2026-02-07 01:42:19.438'),(44,'LOGIN','تسجيل دخول',2,'2026-02-07 01:50:28.813'),(45,'LOGIN','تسجيل دخول',2,'2026-02-07 01:51:09.465'),(46,'LOGIN','تسجيل دخول',2,'2026-02-07 01:56:00.710'),(47,'LOGIN','تسجيل دخول',1,'2026-02-13 16:41:18.780'),(48,'LOGIN','تسجيل دخول',2,'2026-02-13 16:45:58.111'),(49,'LOGIN','تسجيل دخول',2,'2026-02-13 17:20:54.056'),(50,'LOGIN','تسجيل دخول',2,'2026-02-13 17:30:20.085'),(51,'LOGIN','تسجيل دخول',2,'2026-02-13 17:30:24.875'),(52,'LOGIN','تسجيل دخول',2,'2026-02-13 17:30:37.564'),(53,'LOGIN','تسجيل دخول',2,'2026-02-13 17:30:38.286'),(54,'LOGIN','تسجيل دخول',2,'2026-02-13 17:31:09.757'),(55,'LOGIN','تسجيل دخول',2,'2026-02-13 17:31:41.024'),(56,'LOGIN','تسجيل دخول',1,'2026-02-14 10:14:01.351'),(57,'LOGIN','تسجيل دخول',2,'2026-02-14 10:16:20.452'),(58,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 10:53:00.704'),(59,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 10:53:45.417'),(60,'EXPENSE_ADD','إضافة مصروف: 700 ج.م',2,'2026-02-14 10:54:22.170'),(61,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 10:55:59.524'),(62,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 10:56:41.536'),(63,'EXPENSE_ADD','إضافة مصروف: 660 ج.م',2,'2026-02-14 10:57:55.128'),(64,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 11:00:17.397'),(65,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 11:01:04.610'),(66,'EXPENSE_ADD','إضافة مصروف: 585 ج.م',2,'2026-02-14 11:02:22.318'),(67,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 12:21:17.927'),(68,'INCOME_DELETE','حذف دخل #74',2,'2026-02-14 12:21:39.563'),(69,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 12:22:02.558'),(70,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 12:22:36.850'),(71,'EXPENSE_ADD','إضافة مصروف: 547 ج.م',2,'2026-02-14 12:25:45.563'),(72,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 12:27:08.088'),(73,'EXPENSE_ADD','إضافة مصروف: 770 ج.م',2,'2026-02-14 12:28:20.798'),(74,'EXPENSE_ADD','إضافة مصروف: 2950 ج.م',2,'2026-02-14 12:28:56.411'),(75,'LOGIN','تسجيل دخول',1,'2026-02-14 18:15:53.603'),(76,'LOGIN','تسجيل دخول',2,'2026-02-14 18:16:52.309'),(77,'LOGIN','تسجيل دخول',2,'2026-02-14 18:36:20.018'),(78,'EXPENSE_ADD','إضافة مصروف: 10000 ج.م',2,'2026-02-14 18:54:41.328'),(79,'EXPENSE_UPDATE','تعديل مصروف #49',2,'2026-02-14 18:57:25.124'),(80,'EXPENSE_UPDATE','تعديل مصروف #51',2,'2026-02-14 19:03:21.572'),(81,'INCOME_DELETE','حذف دخل #132',2,'2026-02-14 19:23:29.338'),(82,'EXPENSE_DELETE','حذف مصروف #51',2,'2026-02-14 19:23:36.541'),(83,'EXPENSE_ADD','إضافة مصروف: 10000 ج.م',2,'2026-02-14 19:25:41.962'),(84,'EXPENSE_UPDATE','تعديل مصروف #52',2,'2026-02-14 19:27:00.908'),(85,'LOGIN','تسجيل دخول',2,'2026-02-14 19:48:25.410'),(86,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 19:55:59.015'),(87,'INCOME_UPDATE','تعديل دخل #133',2,'2026-02-14 19:56:20.793'),(88,'LOGIN','تسجيل دخول',2,'2026-02-14 20:07:04.818'),(89,'EXPENSE_ADD','إضافة مصروف: 675 ج.م',2,'2026-02-14 20:08:22.538'),(90,'EXPENSE_DELETE','حذف مصروف #43',2,'2026-02-14 20:10:22.522'),(91,'EXPENSE_UPDATE','تعديل مصروف #38',2,'2026-02-14 20:11:17.313'),(92,'EXPENSE_UPDATE','تعديل مصروف #47',2,'2026-02-14 20:11:45.967'),(93,'EXPENSE_UPDATE','تعديل مصروف #47',2,'2026-02-14 20:11:55.807'),(94,'EXPENSE_ADD','إضافة مصروف: 735 ج.م',2,'2026-02-14 20:14:05.055'),(95,'EXPENSE_UPDATE','تعديل مصروف #29',2,'2026-02-14 20:14:53.628'),(96,'EXPENSE_UPDATE','تعديل مصروف #28',2,'2026-02-14 20:15:07.118'),(97,'EXPENSE_ADD','إضافة مصروف: 600 ج.م',2,'2026-02-14 20:17:03.038'),(98,'EXPENSE_DELETE','حذف مصروف #25',2,'2026-02-14 20:37:43.261'),(99,'EXPENSE_DELETE','حذف مصروف #39',2,'2026-02-14 20:42:32.637'),(100,'EXPENSE_UPDATE','تعديل مصروف #54',2,'2026-02-14 20:44:56.827'),(101,'EXPENSE_UPDATE','تعديل مصروف #54',2,'2026-02-14 20:45:17.816'),(102,'EXPENSE_UPDATE','تعديل مصروف #54',2,'2026-02-14 20:45:35.936'),(103,'EXPENSE_DELETE','حذف مصروف #32',2,'2026-02-14 20:46:06.872'),(104,'EXPENSE_UPDATE','تعديل مصروف #44',2,'2026-02-14 20:48:07.492'),(105,'LOGIN','تسجيل دخول',2,'2026-02-14 20:55:13.365'),(106,'INCOME_UPDATE','تعديل دخل #126',2,'2026-02-14 21:00:30.028'),(107,'EXPENSE_UPDATE','تعديل مصروف #42',2,'2026-02-14 21:02:26.174'),(108,'EXPENSE_UPDATE','تعديل مصروف #48',2,'2026-02-14 21:17:26.504'),(109,'EXPENSE_DELETE','حذف مصروف #53',2,'2026-02-14 21:56:39.105'),(110,'EXPENSE_ADD','إضافة مصروف: 664 ج.م',2,'2026-02-14 22:02:46.367'),(111,'EXPENSE_ADD','إضافة مصروف: 750 ج.م',2,'2026-02-14 22:03:15.630'),(112,'EXPENSE_ADD','إضافة مصروف: 700 ج.م',2,'2026-02-14 22:03:29.171'),(113,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:05:54.785'),(114,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:06:09.565'),(115,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:06:27.346'),(116,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:06:42.993'),(117,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:07:03.647'),(118,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:07:31.586'),(119,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:07:46.012'),(120,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:07:57.856'),(121,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:08:04.555'),(122,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:10:12.737'),(123,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:10:41.483'),(124,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:10:57.601'),(125,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:11:04.507'),(126,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:11:13.899'),(127,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:13:58.576'),(128,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:14:25.003'),(129,'INCOME_UPDATE','تعديل دخل #148',2,'2026-02-14 22:15:32.097'),(130,'INCOME_UPDATE','تعديل دخل #148',2,'2026-02-14 22:15:46.179'),(131,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:17:16.162'),(132,'INCOME_UPDATE','تعديل دخل #150',2,'2026-02-14 22:18:32.731'),(133,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:19:10.994'),(134,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-14 22:19:25.002'),(135,'EXPENSE_ADD','إضافة مصروف: 85 ج.م',2,'2026-02-14 22:40:06.465'),(136,'EXPENSE_UPDATE','تعديل مصروف #59',2,'2026-02-14 22:49:31.968'),(137,'LOGIN','تسجيل دخول',2,'2026-02-20 18:00:45.861'),(138,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:02:25.556'),(139,'INCOME_UPDATE','تعديل دخل #153',2,'2026-02-20 18:02:47.017'),(140,'INCOME_DELETE','حذف دخل #153',2,'2026-02-20 18:02:57.474'),(141,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:03:14.096'),(142,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:03:31.507'),(143,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:03:44.532'),(144,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:04:05.985'),(145,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:08:31.797'),(146,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:08:52.055'),(147,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:09:36.046'),(148,'EXPENSE_ADD','إضافة مصروف: 120 ج.م',2,'2026-02-20 18:10:40.895'),(149,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:12:40.881'),(150,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-20 18:13:06.135'),(151,'EXPENSE_ADD','إضافة مصروف: 800 ج.م',2,'2026-02-20 18:14:26.568'),(152,'EXPENSE_UPDATE','تعديل مصروف #61',2,'2026-02-20 18:15:21.894'),(153,'EXPENSE_ADD','إضافة مصروف: 2983 ج.م',2,'2026-02-20 18:18:16.201'),(154,'EXPENSE_UPDATE','تعديل مصروف #62',2,'2026-02-20 18:18:58.945'),(155,'EXPENSE_ADD','إضافة مصروف: 11934 ج.م',2,'2026-02-20 18:25:33.754'),(156,'EXPENSE_UPDATE','تعديل مصروف #62',2,'2026-02-20 18:26:20.562'),(157,'EXPENSE_UPDATE','تعديل مصروف #62',2,'2026-02-20 18:26:40.683'),(158,'EXPENSE_ADD','إضافة مصروف: 5200 ج.م',2,'2026-02-20 18:31:06.256'),(159,'EXPENSE_UPDATE','تعديل مصروف #63',2,'2026-02-20 18:33:18.018'),(160,'EXPENSE_DELETE','حذف مصروف #63',2,'2026-02-20 18:34:56.633'),(161,'EXPENSE_ADD','إضافة مصروف: 11933.97 ج.م',2,'2026-02-20 18:36:32.030'),(162,'EXPENSE_DELETE','حذف مصروف #65',2,'2026-02-20 18:37:29.177'),(163,'EXPENSE_ADD','إضافة مصروف: 11934 ج.م',2,'2026-02-20 18:38:33.702'),(164,'LOGIN','تسجيل دخول',2,'2026-02-24 22:20:26.613'),(165,'EXPENSE_ADD','إضافة مصروف: 30 ج.م',2,'2026-02-24 22:22:26.662'),(166,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:22:50.518'),(167,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:23:07.874'),(168,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:23:26.537'),(169,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:25:21.424'),(170,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:25:32.626'),(171,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:27:22.545'),(172,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:27:36.516'),(173,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:28:32.908'),(174,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-24 22:28:57.225'),(175,'EXPENSE_ADD','إضافة مصروف: 110 ج.م',2,'2026-02-24 22:31:07.060'),(176,'EXPENSE_ADD','إضافة مصروف: 700 ج.م',2,'2026-02-24 22:31:22.427'),(177,'EXPENSE_UPDATE','تعديل مصروف #66',2,'2026-02-24 22:33:37.167'),(178,'EXPENSE_ADD','إضافة مصروف: 5967 ج.م',2,'2026-02-24 22:34:24.455'),(179,'EXPENSE_UPDATE','تعديل مصروف #66',2,'2026-02-24 22:35:35.851'),(180,'EXPENSE_UPDATE','تعديل مصروف #70',2,'2026-02-24 22:35:46.956'),(181,'LOGIN','تسجيل دخول',2,'2026-02-28 19:23:47.759'),(182,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:26:23.994'),(183,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:26:52.457'),(184,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:28:56.932'),(185,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:29:13.361'),(186,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:29:30.459'),(187,'INCOME_UPDATE','تعديل دخل #171',2,'2026-02-28 19:30:56.184'),(188,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:31:21.796'),(189,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:31:39.576'),(190,'EXPENSE_ADD','إضافة مصروف: 700 ج.م',2,'2026-02-28 19:33:01.156'),(191,'EXPENSE_ADD','إضافة مصروف: 700 ج.م',2,'2026-02-28 19:33:13.649'),(192,'EXPENSE_UPDATE','تعديل مصروف #69',2,'2026-02-28 19:34:45.093'),(193,'LOGIN','تسجيل دخول',2,'2026-02-28 19:42:24.617'),(194,'INCOME_ADD','إضافة 1 دخل',2,'2026-02-28 19:49:20.574'),(195,'LOGIN','تسجيل دخول',1,'2026-02-28 20:07:56.992'),(196,'LOGIN','تسجيل دخول',2,'2026-02-28 20:13:56.952'),(197,'LOGIN','تسجيل دخول',2,'2026-03-01 20:28:19.258'),(198,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-01 20:29:19.322'),(199,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-01 20:29:46.027'),(200,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-01 20:30:06.648'),(201,'EXPENSE_UPDATE','تعديل مصروف #70',2,'2026-03-01 20:31:37.783'),(202,'INCOME_UPDATE','تعديل دخل #181',2,'2026-03-01 20:33:52.003'),(203,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-02 21:39:34.864'),(204,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-02 21:40:36.327'),(205,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-02 21:41:37.208'),(206,'INCOME_UPDATE','تعديل دخل #184',2,'2026-03-05 15:20:24.298'),(207,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:20:47.153'),(208,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:21:01.681'),(209,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:21:19.777'),(210,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:23:22.398'),(211,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:23:34.830'),(212,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:23:49.856'),(213,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:25:00.474'),(214,'INCOME_ADD','إضافة 1 دخل',2,'2026-03-05 15:25:11.711'),(215,'EXPENSE_ADD','إضافة مصروف: 700 ج.م',2,'2026-03-05 15:26:11.932'),(216,'VEHICLE_ADD','إضافة سيارة: هيونداى  اكسنت RB ',2,'2026-03-05 15:30:04.431'),(217,'LOGIN','تسجيل دخول',2,'2026-03-08 22:13:52.751'),(218,'LOGIN','تسجيل دخول',1,'2026-03-09 15:10:32.628');
/*!40000 ALTER TABLE `activitylog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ad`
--

DROP TABLE IF EXISTS `ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('BANNER_TEXT','BANNER_LINK','BANNER_VIDEO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'BANNER_TEXT',
  `imageUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci,
  `linkUrl` text COLLATE utf8mb4_unicode_ci,
  `videoUrl` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ad_active_idx` (`active`),
  KEY `ad_order_idx` (`order`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ad`
--

LOCK TABLES `ad` WRITE;
/*!40000 ALTER TABLE `ad` DISABLE KEYS */;
INSERT INTO `ad` VALUES (7,'وفّر أكثر مع محطات وقود أدنوك','BANNER_TEXT','https://images.unsplash.com/photo-1545262810-a5c4ef7b1b8a?w=800&q=80','احصل على خصم 10% على كل تعبئة وقود عند استخدام بطاقة أدنوك للسائقين. العرض ساري حتى نهاية الشهر. سجّل الآن واستفد من التوفير!',NULL,NULL,1,0,'2026-03-09 15:55:16.898','2026-03-09 15:55:16.898'),(8,'تأمين شامل للسيارات بأقل قسط','BANNER_TEXT','https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80','تأمين شامل لسيارتك يبدأ من 150 جنيه شهرياً. تغطية كاملة ضد الحوادث والسرقة والكوارث الطبيعية. تواصل معنا الآن!',NULL,NULL,1,2,'2026-03-09 15:55:16.898','2026-03-09 15:55:16.898'),(9,'صيانة سيارتك بأفضل الأسعار','BANNER_LINK','https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80',NULL,'https://www.autodoc.co.uk',NULL,1,1,'2026-03-09 15:55:16.898','2026-03-09 15:55:16.898');
/*!40000 ALTER TABLE `ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alertsetting`
--

DROP TABLE IF EXISTS `alertsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alertsetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alertType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameAr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `limitAmount` double DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alertsetting_userId_alertType_key` (`userId`,`alertType`),
  KEY `alertsetting_userId_idx` (`userId`),
  CONSTRAINT `alertsetting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alertsetting`
--

LOCK TABLES `alertsetting` WRITE;
/*!40000 ALTER TABLE `alertsetting` DISABLE KEYS */;
INSERT INTO `alertsetting` VALUES (1,'fuel','تجاوز حد الوقود',1,500,2,'2026-02-16 21:23:34.037','2026-02-16 21:23:34.037'),(2,'maintenance','صيانة مستحقة',1,NULL,2,'2026-02-16 21:23:34.037','2026-02-16 21:23:34.037'),(3,'daily','المصروفات اليومية',0,40,2,'2026-02-16 21:23:34.037','2026-02-16 21:23:34.037'),(4,'insurance','تجديد التأمين',0,NULL,2,'2026-02-16 21:23:34.037','2026-02-16 21:23:34.037');
/*!40000 ALTER TABLE `alertsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameAr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#6366f1',
  `commission` double NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `logo` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_name_key` (`name`),
  KEY `company_active_idx` (`active`),
  KEY `company_order_idx` (`order`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'uber','اوبر','#ffffff',0,1,0,'2026-03-09 15:11:14.035','2026-03-09 15:42:05.171','https://play-lh.googleusercontent.com/n109V9dur2NFwV7Fbr8lwlU-isXRR0K7Q-pvp1LCyRwTVP2DfJaR-dklmXzK0MhQuz9E=w240-h480-rw'),(2,'DIDi','دي دى','#ffffff',0,1,1,'2026-03-09 15:12:54.667','2026-03-09 15:42:17.989','https://play-lh.googleusercontent.com/X1GZZp-EDG7u5r5LPQ0wvRb_DjBAWy10zlaZ9AOZ8j6nBK8-3EzZDZdHoeymgLzrH1E=w240-h480-rw'),(3,'indrive','اندريف','#ffffff',0,1,2,'2026-03-09 15:13:39.439','2026-03-09 15:42:11.833','https://play-lh.googleusercontent.com/2Sg4XierPqz0hVUA8rRNteutJhaUE4YMPQIN-wDIJ1x5piXeHA6G1-UWXj_n4R29F_o');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `errorlog`
--

DROP TABLE IF EXISTS `errorlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `errorlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `stack` text COLLATE utf8mb4_unicode_ci,
  `route` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `errorlog_createdAt_idx` (`createdAt`),
  KEY `errorlog_userId_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `errorlog`
--

LOCK TABLES `errorlog` WRITE;
/*!40000 ALTER TABLE `errorlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `errorlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customCategory` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `expense_userId_idx` (`userId`),
  KEY `expense_date_idx` (`date`),
  CONSTRAINT `expense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (16,'2025-10-26','fuel',NULL,700,'',2,'2026-02-14 10:54:22.163'),(17,'2025-10-28','fuel',NULL,660,'',2,'2026-02-14 10:57:55.122'),(18,'2025-10-30','fuel',NULL,585,'',2,'2026-02-14 11:02:22.312'),(19,'2025-11-03','fuel',NULL,547,'',2,'2026-02-14 12:25:45.556'),(20,'2025-11-05','fuel',NULL,770,'',2,'2026-02-14 12:28:20.790'),(21,'2025-11-05','maintenance',NULL,2950,'صيانه 1000 ك',2,'2026-02-14 12:28:56.404'),(22,'2025-11-09','fuel',NULL,674,'بنزين',2,'2026-02-14 18:41:14.661'),(23,'2025-11-09','other',NULL,150,'',2,'2026-02-14 18:41:14.675'),(24,'2025-11-10','other','other',50,'معطر سيارة',2,'2026-02-14 18:41:14.685'),(26,'2025-11-17','fuel',NULL,627,'بنزين',2,'2026-02-14 18:41:14.696'),(27,'2025-11-19','fuel',NULL,680,'بنزين',2,'2026-02-14 18:41:14.702'),(28,'2025-11-24','fuel',NULL,705,'',2,'2026-02-14 18:41:14.708'),(29,'2025-11-25','mobile',NULL,150,'',2,'2026-02-14 18:41:14.714'),(30,'2025-11-27','fuel',NULL,400,'بنزين',2,'2026-02-14 18:41:14.719'),(31,'2025-11-29','fuel',NULL,685,'بنزين',2,'2026-02-14 18:41:14.724'),(33,'2025-12-06','fuel',NULL,645,'بنزين',2,'2026-02-14 18:41:14.735'),(34,'2025-12-07','maintenance','(NULL)',2983,'قسط غبور',2,'2026-02-14 18:41:14.739'),(35,'2025-12-09','fuel',NULL,704,'بنزين',2,'2026-02-14 18:41:14.744'),(36,'2025-12-11','fuel',NULL,700,'بنزين',2,'2026-02-14 18:41:14.749'),(37,'2025-12-20','fuel',NULL,658,'بنزين',2,'2026-02-14 18:41:14.753'),(38,'2025-12-21','mobile',NULL,100,'',2,'2026-02-14 18:41:14.758'),(40,'2025-12-24','fuel',NULL,695,'بنزين',2,'2026-02-14 18:41:14.768'),(41,'2025-12-29','fuel',NULL,600,'بنزين',2,'2026-02-14 18:41:14.773'),(42,'2025-12-30','other','other',3000,'خروج اطعام وفانوس دكاه',2,'2026-02-14 18:41:14.777'),(44,'2026-01-05','other','other',30,'عرض خصم',2,'2026-02-14 18:41:14.785'),(45,'2026-01-06','fuel',NULL,700,'بنزين',2,'2026-02-14 18:41:14.789'),(46,'2026-01-09','other','other',30,'عرض خصم',2,'2026-02-14 18:41:14.793'),(47,'2026-01-12','mobile',NULL,100,'',2,'2026-02-14 18:41:14.798'),(48,'2026-01-25','fuel',NULL,675,'',2,'2026-02-14 18:41:14.803'),(49,'2026-01-28','fuel',NULL,700,'',2,'2026-02-14 18:41:14.808'),(50,'2026-01-30','other','other',30,'عرض خصم',2,'2026-02-14 18:41:14.813'),(52,'2026-01-30','other','other',10000,'اعلانات تم ارسال 10 الف لمصطفى ',2,'2026-02-14 19:25:41.955'),(54,'2025-12-04','other','other',735,'دفع مخالفات المرور',2,'2026-02-14 20:14:05.047'),(55,'2025-11-10','fuel',NULL,600,'',2,'2026-02-14 20:17:03.031'),(56,'2026-02-02','fuel',NULL,664,'',2,'2026-02-14 22:02:46.359'),(57,'2026-02-07','fuel',NULL,750,'',2,'2026-02-14 22:03:15.622'),(58,'2026-02-11','fuel',NULL,700,'',2,'2026-02-14 22:03:29.164'),(59,'2026-02-03','cleaning',NULL,850,'مستلزمات تنظيف',2,'2026-02-14 22:40:06.457'),(60,'2026-02-18','other','شحن رصيد اندريف  fawry',120,'',2,'2026-02-20 18:10:40.886'),(61,'2026-02-18','fuel',NULL,800,'يوم زيارة غبور',2,'2026-02-20 18:14:26.560'),(62,'2026-02-04','maintenance',NULL,2983,'قسيط غبور ',2,'2026-02-20 18:18:16.193'),(64,'2026-02-18','maintenance',NULL,5200,'صيانه 10 الف ',2,'2026-02-20 18:31:06.250'),(66,'2026-02-20','maintenance',NULL,5967,'قسط غبور ( لدفعه الأولى )',2,'2026-02-20 18:38:33.694'),(67,'2026-02-21','other','عرض خصم DiDi',30,'',2,'2026-02-24 22:22:26.655'),(68,'2026-02-21','other','تسديد مخالفة المرور',110,'',2,'2026-02-24 22:31:07.051'),(69,'2026-02-28','fuel',NULL,700,'',2,'2026-02-24 22:31:22.418'),(70,'2026-02-25','maintenance','الدفعه الثانيه تقسيط غبور',5967,'',2,'2026-02-24 22:34:24.447'),(71,'2026-02-24','fuel',NULL,700,'',2,'2026-02-28 19:33:01.146'),(72,'0008-02-28','fuel',NULL,700,'',2,'2026-02-28 19:33:13.643'),(73,'2026-03-04','fuel',NULL,700,'',2,'2026-03-05 15:26:11.926');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goal`
--

DROP TABLE IF EXISTS `goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `month` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `targetAmount` double NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `goal_userId_month_key` (`userId`,`month`),
  KEY `goal_userId_idx` (`userId`),
  CONSTRAINT `goal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal`
--

LOCK TABLES `goal` WRITE;
/*!40000 ALTER TABLE `goal` DISABLE KEYS */;
/*!40000 ALTER TABLE `goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `income`
--

DROP TABLE IF EXISTS `income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `income_userId_idx` (`userId`),
  KEY `income_date_idx` (`date`),
  CONSTRAINT `income_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income`
--

LOCK TABLES `income` WRITE;
/*!40000 ALTER TABLE `income` DISABLE KEYS */;
INSERT INTO `income` VALUES (68,'2025-10-25','Didi',494,'',2,'2026-02-14 10:53:00.687'),(69,'2025-10-26','Didi',604,'',2,'2026-02-14 10:53:45.412'),(70,'2025-10-27','Didi',1220.8,'',2,'2026-02-14 10:55:59.516'),(71,'2025-10-28','Didi',1257.88,'',2,'2026-02-14 10:56:41.529'),(72,'2025-10-29','Didi',1217,'',2,'2026-02-14 11:00:17.390'),(73,'2025-10-30','Didi',1125,'',2,'2026-02-14 11:01:04.603'),(75,'2025-11-03','Didi',1216,'',2,'2026-02-14 12:22:02.547'),(76,'2025-11-04','Didi',1155,'',2,'2026-02-14 12:22:36.842'),(77,'2025-11-05','Didi',861,'',2,'2026-02-14 12:27:08.079'),(78,'2025-11-08','Didi',493.84,'',2,'2026-02-14 18:41:14.634'),(79,'2025-11-08','Uber',713,'',2,'2026-02-14 18:41:14.634'),(80,'2025-11-09','Didi',764.27,'',2,'2026-02-14 18:41:14.634'),(81,'2025-11-09','Uber',720,'',2,'2026-02-14 18:41:14.634'),(82,'2025-11-10','Didi',290.6,'',2,'2026-02-14 18:41:14.634'),(83,'2025-11-10','Uber',113,'',2,'2026-02-14 18:41:14.634'),(84,'2025-11-11','Didi',537.27,'',2,'2026-02-14 18:41:14.634'),(85,'2025-11-11','Uber',180,'',2,'2026-02-14 18:41:14.634'),(86,'2025-11-15','Didi',983.19,'',2,'2026-02-14 18:41:14.634'),(87,'2025-11-15','Uber',22,'',2,'2026-02-14 18:41:14.634'),(88,'2025-11-16','Didi',1031.18,'',2,'2026-02-14 18:41:14.634'),(89,'2025-11-16','Uber',125,'',2,'2026-02-14 18:41:14.634'),(90,'2025-11-17','Didi',643.36,'',2,'2026-02-14 18:41:14.634'),(91,'2025-11-18','Didi',527.29,'',2,'2026-02-14 18:41:14.634'),(92,'2025-11-18','Uber',48,'',2,'2026-02-14 18:41:14.634'),(93,'2025-11-19','Didi',1045.01,'',2,'2026-02-14 18:41:14.634'),(94,'2025-11-22','Didi',870.83,'',2,'2026-02-14 18:41:14.634'),(95,'2025-11-22','Uber',186,'',2,'2026-02-14 18:41:14.634'),(96,'2025-11-23','Didi',975.22,'',2,'2026-02-14 18:41:14.634'),(97,'2025-11-24','Didi',497.59,'',2,'2026-02-14 18:41:14.634'),(98,'2025-11-24','Uber',353,'',2,'2026-02-14 18:41:14.634'),(99,'2025-11-25','Didi',449.83,'',2,'2026-02-14 18:41:14.634'),(100,'2025-11-25','Uber',52,'',2,'2026-02-14 18:41:14.634'),(101,'2025-11-26','Didi',481.12,'',2,'2026-02-14 18:41:14.634'),(102,'2025-11-27','Didi',843.28,'',2,'2026-02-14 18:41:14.634'),(103,'2025-11-29','Didi',687,'',2,'2026-02-14 18:41:14.634'),(104,'2025-12-03','Didi',1046.55,'',2,'2026-02-14 18:41:14.634'),(105,'2025-12-04','Didi',1021.88,'',2,'2026-02-14 18:41:14.634'),(106,'2025-12-06','Didi',365.33,'',2,'2026-02-14 18:41:14.634'),(107,'2025-12-07','Didi',966.5,'',2,'2026-02-14 18:41:14.634'),(108,'2025-12-08','Didi',824.82,'',2,'2026-02-14 18:41:14.634'),(109,'2025-12-09','Didi',1331.86,'',2,'2026-02-14 18:41:14.634'),(110,'2025-12-10','Didi',776.27,'',2,'2026-02-14 18:41:14.634'),(111,'2025-12-11','Didi',859.33,'',2,'2026-02-14 18:41:14.634'),(112,'2025-12-13','Didi',307,'',2,'2026-02-14 18:41:14.634'),(113,'2025-12-15','Didi',840,'تم اضافة 350 مشوار خاص',2,'2026-02-14 18:41:14.634'),(114,'2025-12-17','Didi',686,'',2,'2026-02-14 18:41:14.634'),(115,'2025-12-20','Didi',162,'',2,'2026-02-14 18:41:14.634'),(116,'2025-12-21','Didi',1080,'',2,'2026-02-14 18:41:14.634'),(117,'2025-12-22','Didi',887,'',2,'2026-02-14 18:41:14.634'),(118,'2025-12-24','Didi',745,'',2,'2026-02-14 18:41:14.634'),(119,'2025-12-25','Didi',809,'',2,'2026-02-14 18:41:14.634'),(120,'2025-12-29','Didi',619,'',2,'2026-02-14 18:41:14.634'),(121,'2025-12-30','Didi',665,'',2,'2026-02-14 18:41:14.634'),(122,'2026-01-06','Didi',761,'',2,'2026-02-14 18:41:14.634'),(123,'2026-01-08','Didi',867,'',2,'2026-02-14 18:41:14.634'),(124,'2026-01-10','Didi',1110,'',2,'2026-02-14 18:41:14.634'),(125,'2026-01-11','Didi',686,'',2,'2026-02-14 18:41:14.634'),(126,'2026-01-12','Didi',465,'',2,'2026-02-14 18:41:14.634'),(127,'2026-01-25','Didi',839,'',2,'2026-02-14 18:41:14.634'),(128,'2026-01-26','Didi',651,'',2,'2026-02-14 18:41:14.634'),(129,'2026-01-27','Didi',1086,'',2,'2026-02-14 18:41:14.634'),(130,'2026-01-28','Didi',713,'',2,'2026-02-14 18:41:14.634'),(131,'2026-01-29','Didi',367,'',2,'2026-02-14 18:41:14.634'),(133,'2025-11-19','Uber',106,'',2,'2026-02-14 19:55:59.007'),(134,'2026-02-01','Didi',693,'',2,'2026-02-14 22:05:54.779'),(135,'2026-02-02','Didi',652,'',2,'2026-02-14 22:06:09.558'),(136,'2026-02-03','Didi',289,'',2,'2026-02-14 22:06:27.339'),(137,'2026-02-04','Didi',348,'',2,'2026-02-14 22:06:42.985'),(138,'2026-02-05','Didi',158,'',2,'2026-02-14 22:07:03.640'),(139,'2026-02-08','Didi',565,'',2,'2026-02-14 22:07:31.579'),(140,'2026-02-10','Didi',474,'',2,'2026-02-14 22:07:46.006'),(141,'2026-02-11','Didi',650,'',2,'2026-02-14 22:07:57.848'),(142,'2026-02-12','Didi',470,'',2,'2026-02-14 22:08:04.549'),(143,'2026-02-01','Uber',306,'',2,'2026-02-14 22:10:12.731'),(144,'2026-02-02','Uber',220,'',2,'2026-02-14 22:10:41.476'),(145,'2026-02-03','Uber',86,'',2,'2026-02-14 22:10:57.593'),(146,'2026-02-04','Uber',564,'',2,'2026-02-14 22:11:04.499'),(147,'2026-02-05','Uber',1041,'',2,'2026-02-14 22:11:13.892'),(148,'2026-02-07','Uber',1200,'عرض ترويجى ',2,'2026-02-14 22:13:58.569'),(149,'2026-02-08','Uber',128,'',2,'2026-02-14 22:14:24.996'),(150,'2026-02-10','Uber',284,'',2,'2026-02-14 22:17:16.154'),(151,'2026-02-11','Uber',350,'',2,'2026-02-14 22:19:10.987'),(152,'2026-02-12','Uber',202,'',2,'2026-02-14 22:19:24.995'),(154,'2026-02-15','Didi',339,'',2,'2026-02-20 18:03:14.087'),(155,'2026-02-16','Didi',427,'',2,'2026-02-20 18:03:31.499'),(156,'2026-02-17','Didi',345,'',2,'2026-02-20 18:03:44.526'),(157,'2026-02-18','Didi',289,'',2,'2026-02-20 18:04:05.978'),(158,'2026-02-16','InDrive',166,'',2,'2026-02-20 18:08:31.789'),(159,'2026-02-17','InDrive',118,'',2,'2026-02-20 18:08:52.048'),(160,'2026-02-18','InDrive',189,'',2,'2026-02-20 18:09:36.039'),(161,'2026-02-15','Uber',293,'',2,'2026-02-20 18:12:40.873'),(162,'2026-02-16','Uber',134,'',2,'2026-02-20 18:13:06.127'),(163,'2026-02-22','Didi',750,'',2,'2026-02-24 22:22:50.510'),(164,'2026-02-23','Didi',229,'',2,'2026-02-24 22:23:07.865'),(165,'2026-02-24','Didi',558,'',2,'2026-02-24 22:23:26.531'),(166,'2026-02-23','InDrive',221,'',2,'2026-02-24 22:25:21.418'),(167,'2026-02-24','InDrive',79,'',2,'2026-02-24 22:25:32.618'),(168,'2026-02-21','Uber',225,'',2,'2026-02-24 22:27:22.540'),(169,'2026-02-22','Uber',107,'',2,'2026-02-24 22:27:36.507'),(170,'2026-02-23','Uber',338,'',2,'2026-02-24 22:28:32.900'),(171,'2026-02-24','Uber',140,'',2,'2026-02-24 22:28:57.215'),(172,'2026-02-25','Didi',694,'',2,'2026-02-28 19:26:23.977'),(173,'2026-02-28','Didi',356,'',2,'2026-02-28 19:26:52.451'),(174,'2026-02-25','InDrive',35,'',2,'2026-02-28 19:28:56.922'),(175,'2026-02-26','InDrive',111,'',2,'2026-02-28 19:29:13.354'),(176,'2026-02-28','InDrive',40,'',2,'2026-02-28 19:29:30.452'),(177,'2026-02-26','Uber',98,'',2,'2026-02-28 19:31:21.790'),(178,'2026-02-28','Uber',173,'',2,'2026-02-28 19:31:39.570'),(179,'2026-02-26','Didi',412,'',2,'2026-02-28 19:49:20.566'),(180,'2026-03-01','Didi',666,'',2,'2026-03-01 20:29:19.315'),(181,'2026-03-01','InDrive',61,'',2,'2026-03-01 20:29:46.019'),(182,'2026-03-01','Uber',135,'',2,'2026-03-01 20:30:06.642'),(183,'2026-03-02','Uber',299,'',2,'2026-03-02 21:39:34.840'),(184,'2026-03-02','Didi',498,'',2,'2026-03-02 21:40:36.320'),(185,'2026-03-02','InDrive',122,'',2,'2026-03-02 21:41:37.201'),(186,'2026-03-03','Didi',244,'',2,'2026-03-05 15:20:47.146'),(187,'2026-03-04','Didi',528,'',2,'2026-03-05 15:21:01.674'),(188,'2026-03-05','Didi',337,'',2,'2026-03-05 15:21:19.769'),(189,'2026-03-03','Uber',401,'',2,'2026-03-05 15:23:22.390'),(190,'2026-03-04','Uber',285,'',2,'2026-03-05 15:23:34.824'),(191,'2026-03-05','Uber',158,'',2,'2026-03-05 15:23:49.850'),(192,'2026-03-03','InDrive',79,'',2,'2026-03-05 15:25:00.468'),(193,'2026-03-04','InDrive',105,'',2,'2026-03-05 15:25:11.704');
/*!40000 ALTER TABLE `income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenanceitem`
--

DROP TABLE IF EXISTS `maintenanceitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenanceitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameAr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastChangedAt` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nextDueKm` double DEFAULT NULL,
  `currentKm` double DEFAULT NULL,
  `remainingPct` int NOT NULL DEFAULT '100',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'good',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `vehicleId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `maintenanceitem_userId_idx` (`userId`),
  KEY `maintenanceitem_vehicleId_idx` (`vehicleId`),
  CONSTRAINT `maintenanceitem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maintenanceitem_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenanceitem`
--

LOCK TABLES `maintenanceitem` WRITE;
/*!40000 ALTER TABLE `maintenanceitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `maintenanceitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `notification_userId_idx` (`userId`),
  CONSTRAINT `notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'test','test',0,1,'2026-02-28 20:10:35.214'),(2,'test','test',1,2,'2026-02-28 20:10:35.214');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificationsetting`
--

DROP TABLE IF EXISTS `notificationsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificationsetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `settingType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `timeValue` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notificationsetting_userId_settingType_key` (`userId`,`settingType`),
  KEY `notificationsetting_userId_idx` (`userId`),
  CONSTRAINT `notificationsetting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationsetting`
--

LOCK TABLES `notificationsetting` WRITE;
/*!40000 ALTER TABLE `notificationsetting` DISABLE KEYS */;
INSERT INTO `notificationsetting` VALUES (1,'morning',1,'07:30',2,'2026-03-05 16:24:09.032','2026-03-05 16:24:09.032'),(2,'progress',1,'50%',2,'2026-03-05 16:24:09.032','2026-03-05 16:24:09.032'),(3,'inactivity',1,'4',2,'2026-03-05 16:24:09.032','2026-03-05 16:24:09.032'),(4,'evening',1,'22:00',2,'2026-03-05 16:24:09.032','2026-03-05 16:24:09.032');
/*!40000 ALTER TABLE `notificationsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `updatedBy` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_key` (`key`),
  KEY `settings_key_idx` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'site.name','ادارة دخل عربيتك',NULL,'2026-02-28 20:08:40.086',1),(2,'site.description','دخل عربيتك ومصاريف',NULL,'2026-02-28 20:08:40.086',1),(3,'site.logoUrl','',NULL,'2026-02-28 20:08:40.086',1),(4,'site.faviconUrl','',NULL,'2026-02-28 20:08:40.086',1);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supportticket`
--

DROP TABLE IF EXISTS `supportticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supportticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('OPEN','IN_PROGRESS','RESOLVED','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `priority` enum('LOW','MEDIUM','HIGH','URGENT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MEDIUM',
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `resolvedAt` datetime(3) DEFAULT NULL,
  `resolvedBy` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supportticket_userId_idx` (`userId`),
  KEY `supportticket_status_idx` (`status`),
  KEY `supportticket_createdAt_idx` (`createdAt`),
  CONSTRAINT `supportticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supportticket`
--

LOCK TABLES `supportticket` WRITE;
/*!40000 ALTER TABLE `supportticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `supportticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketresponse`
--

DROP TABLE IF EXISTS `ticketresponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticketresponse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `ticketId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ticketresponse_ticketId_idx` (`ticketId`),
  KEY `ticketresponse_userId_idx` (`userId`),
  CONSTRAINT `ticketresponse_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `supportticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ticketresponse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketresponse`
--

LOCK TABLES `ticketresponse` WRITE;
/*!40000 ALTER TABLE `ticketresponse` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticketresponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','SUBSCRIBER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SUBSCRIBER',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profileImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Moataz Magdi','moa3tazmagdi@gmail.com','$2b$10$mUhOrn.qSBpgCZwMrZvqfO3RZDJx8g9x7Psp0h5oGEGQgcNwHTxP2','ADMIN','2026-02-06 21:51:42.767','2026-02-06 21:51:42.767',0,NULL,NULL),(2,'ahmed magdi','moa3tazmagdi7@gmail.com','$2b$10$vHBWI7SP5AwGbZQ5A5F7UuB7NKhfGAeEs2PkcQWbszYtujcDpFTWK','SUBSCRIBER','2026-02-06 22:49:44.585','2026-02-07 00:36:33.682',0,'01000000000',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int NOT NULL,
  `licensePlate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `odometer` double NOT NULL DEFAULT '0',
  `avgConsumption` double NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicle_userId_idx` (`userId`),
  CONSTRAINT `vehicle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'هيونداى ','اكسنت RB ',2026,NULL,0,0,1,2,'2026-03-05 15:30:04.406','2026-03-05 15:30:04.406');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worksession`
--

DROP TABLE IF EXISTS `worksession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worksession` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endTime` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `worksession_userId_idx` (`userId`),
  KEY `worksession_date_idx` (`date`),
  CONSTRAINT `worksession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worksession`
--

LOCK TABLES `worksession` WRITE;
/*!40000 ALTER TABLE `worksession` DISABLE KEYS */;
/*!40000 ALTER TABLE `worksession` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-09 20:18:45
