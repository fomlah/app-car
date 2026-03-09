-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: crm
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
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_log` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `log_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint unsigned DEFAULT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_id` bigint unsigned DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `batch_uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject` (`subject_type`,`subject_id`),
  KEY `causer` (`causer_type`,`causer_id`),
  KEY `activity_log_log_name_index` (`log_name`),
  KEY `activity_log_batch_uuid_index` (`batch_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
INSERT INTO `activity_log` VALUES (1,'default','created','App\\Models\\User',1,'created',NULL,NULL,'{\"attributes\": {\"name\": \"مدير النظام\", \"email\": \"admin@crm.local\", \"phone\": \"01000000000\", \"is_active\": null}}',NULL,'2026-01-30 15:05:30','2026-01-30 15:05:30'),(2,'default','created','App\\Models\\User',2,'created',NULL,NULL,'{\"attributes\": {\"name\": \"موظف مبيعات\", \"email\": \"sales@crm.local\", \"phone\": \"01000000001\", \"is_active\": null}}',NULL,'2026-01-30 15:05:30','2026-01-30 15:05:30'),(3,'default','created','App\\Models\\User',3,'created',NULL,NULL,'{\"attributes\": {\"name\": \"مدير المبيعات\", \"email\": \"manager@crm.local\", \"phone\": \"01000000002\", \"is_active\": null}}',NULL,'2026-01-30 15:05:30','2026-01-30 15:05:30'),(4,'default','created','App\\Models\\User',4,'created',NULL,NULL,'{\"attributes\": {\"name\": \"دعم فني\", \"email\": \"support@crm.local\", \"phone\": \"01000000003\", \"is_active\": null}}',NULL,'2026-01-30 15:05:31','2026-01-30 15:05:31'),(5,'default','created','App\\Models\\User',5,'created',NULL,NULL,'{\"attributes\": {\"name\": \"أحمد محمد\", \"email\": \"sales2@crm.local\", \"phone\": \"01000000004\", \"is_active\": null}}',NULL,'2026-01-30 15:05:31','2026-01-30 15:05:31'),(6,'default','created','App\\Models\\User',6,'created',NULL,NULL,'{\"attributes\": {\"name\": \"محمد علي\", \"email\": \"sales3@crm.local\", \"phone\": \"01000000005\", \"is_active\": null}}',NULL,'2026-01-30 15:05:31','2026-01-30 15:05:31'),(7,'default','created','App\\Models\\User',7,'created',NULL,NULL,'{\"attributes\": {\"name\": \"سارة أحمد\", \"email\": \"sales4@crm.local\", \"phone\": \"01000000006\", \"is_active\": null}}',NULL,'2026-01-30 15:05:31','2026-01-30 15:05:31'),(8,'default','created','App\\Models\\User',8,'created',NULL,NULL,'{\"attributes\": {\"name\": \"موظف كول سنتر\", \"email\": \"callcenter@crm.local\", \"phone\": \"01000000007\", \"is_active\": null}}',NULL,'2026-01-30 15:05:32','2026-01-30 15:05:32'),(9,'default','created','App\\Models\\Customer',1,'created',NULL,NULL,'{\"attributes\": {\"id\": 1, \"code\": \"CUS-2026-0001\", \"name\": \"شركة النيل للتكنولوجيا\", \"tags\": null, \"type\": \"company\", \"email\": \"info@niletech.com.eg\", \"notes\": \"عميل VIP - شركة رائدة في مجال التكنولوجيا\", \"phone\": \"01001234567\", \"address\": \"45 شارع التحرير، الدقي، الجيزة\", \"city_id\": null, \"name_en\": null, \"website\": \"https://www.niletech.com.eg\", \"owner_id\": 1, \"priority\": \"urgent\", \"source_id\": 5, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:04.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:04.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 1, \"is_archived\": false, \"is_verified\": true, \"postal_code\": null, \"review_date\": null, \"verified_at\": \"2026-02-08T20:57:04.000000Z\", \"verified_by\": 1, \"company_name\": \"Nile Tech Solutions\", \"company_size\": \"large\", \"business_type\": \"b2b\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"vip\", \"customer_score\": 95, \"governorate_id\": 1, \"interest_level\": \"hot\", \"last_contact_at\": null, \"phone_secondary\": \"0223456789\", \"phone_normalized\": \"01001234567\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"documented\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(10,'default','created','App\\Models\\Customer',2,'created',NULL,NULL,'{\"attributes\": {\"id\": 2, \"code\": \"CUS-2026-0002\", \"name\": \"شركة مصر للاستثمار العقاري\", \"tags\": null, \"type\": \"company\", \"email\": \"contact@misrrealestate.com\", \"notes\": \"شركة كبرى في مجال العقارات - عميل استراتيجي\", \"phone\": \"01005678901\", \"address\": \"78 شارع الهرم، الجيزة\", \"city_id\": null, \"name_en\": null, \"website\": \"https://www.misrrealestate.com\", \"owner_id\": 1, \"priority\": \"urgent\", \"source_id\": 6, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 3, \"is_archived\": false, \"is_verified\": true, \"postal_code\": null, \"review_date\": null, \"verified_at\": \"2026-02-08T20:57:05.000000Z\", \"verified_by\": 1, \"company_name\": \"Misr Real Estate Investment\", \"company_size\": \"large\", \"business_type\": \"b2b\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"vip\", \"customer_score\": 92, \"governorate_id\": 1, \"interest_level\": \"hot\", \"last_contact_at\": null, \"phone_secondary\": \"0227654321\", \"phone_normalized\": \"01005678901\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"documented\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(11,'default','created','App\\Models\\Customer',3,'created',NULL,NULL,'{\"attributes\": {\"id\": 3, \"code\": \"CUS-2026-0003\", \"name\": \"شركة السلام للتجارة\", \"tags\": null, \"type\": \"company\", \"email\": \"info@alsalamtrading.com\", \"notes\": \"شركة تجارية متوسطة الحجم\", \"phone\": \"01098765432\", \"address\": \"55 شارع فؤاد، الإسكندرية\", \"city_id\": null, \"name_en\": null, \"website\": null, \"owner_id\": 1, \"priority\": \"important\", \"source_id\": 3, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 3, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Al-Salam Trading Co.\", \"company_size\": \"medium\", \"business_type\": \"b2b\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"gold\", \"customer_score\": 78, \"governorate_id\": 3, \"interest_level\": \"warm\", \"last_contact_at\": null, \"phone_secondary\": null, \"phone_normalized\": \"01098765432\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"under_review\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(12,'default','created','App\\Models\\Customer',4,'created',NULL,NULL,'{\"attributes\": {\"id\": 4, \"code\": \"CUS-2026-0004\", \"name\": \"شركة الفجر للخدمات اللوجستية\", \"tags\": null, \"type\": \"company\", \"email\": \"logistics@alfajr.com\", \"notes\": \"عميل جديد في مجال اللوجستيات\", \"phone\": \"01067890123\", \"address\": \"200 المنطقة الصناعية، العاشر من رمضان\", \"city_id\": null, \"name_en\": null, \"website\": null, \"owner_id\": 1, \"priority\": \"normal\", \"source_id\": 5, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 3, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Al-Fajr Logistics\", \"company_size\": \"medium\", \"business_type\": \"b2b\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"silver\", \"customer_score\": 55, \"governorate_id\": 1, \"interest_level\": \"cold\", \"last_contact_at\": null, \"phone_secondary\": null, \"phone_normalized\": \"01067890123\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"not_documented\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(13,'default','created','App\\Models\\Customer',5,'created',NULL,NULL,'{\"attributes\": {\"id\": 5, \"code\": \"CUS-2026-0005\", \"name\": \"شركة النور للاستشارات\", \"tags\": null, \"type\": \"company\", \"email\": \"consult@alnour.com\", \"notes\": \"شركة استشارات تقنية\", \"phone\": \"01145678901\", \"address\": \"30 شارع جامعة الدول العربية، المهندسين\", \"city_id\": null, \"name_en\": null, \"website\": null, \"owner_id\": 1, \"priority\": \"important\", \"source_id\": 6, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 1, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Al-Nour Consulting\", \"company_size\": \"small\", \"business_type\": \"b2b\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"gold\", \"customer_score\": 72, \"governorate_id\": 2, \"interest_level\": \"warm\", \"last_contact_at\": null, \"phone_secondary\": null, \"phone_normalized\": \"01145678901\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"under_review\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(14,'default','created','App\\Models\\Customer',6,'created',NULL,NULL,'{\"attributes\": {\"id\": 6, \"code\": \"CUS-2026-0006\", \"name\": \"مصنع الحديد والصلب المصري\", \"tags\": null, \"type\": \"company\", \"email\": \"info@egyptianiron.com\", \"notes\": \"مصنع كبير للحديد والصلب\", \"phone\": \"01089012345\", \"address\": \"المنطقة الصناعية، حلوان\", \"city_id\": null, \"name_en\": null, \"website\": \"https://www.egyptianiron.com\", \"owner_id\": 1, \"priority\": \"urgent\", \"source_id\": 6, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 5, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Egyptian Iron & Steel Factory\", \"company_size\": \"large\", \"business_type\": \"b2b\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"vip\", \"customer_score\": 88, \"governorate_id\": 1, \"interest_level\": \"hot\", \"last_contact_at\": null, \"phone_secondary\": \"0622345678\", \"phone_normalized\": \"01089012345\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"under_review\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(15,'default','created','App\\Models\\Customer',7,'created',NULL,NULL,'{\"attributes\": {\"id\": 7, \"code\": \"CUS-2026-0007\", \"name\": \"مصنع الأمل للبلاستيك\", \"tags\": null, \"type\": \"company\", \"email\": \"sales@alamalplastics.com\", \"notes\": \"مصنع للمنتجات البلاستيكية\", \"phone\": \"01056789012\", \"address\": \"المنطقة الصناعية، 6 أكتوبر\", \"city_id\": null, \"name_en\": null, \"website\": null, \"owner_id\": 1, \"priority\": \"important\", \"source_id\": 5, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 5, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Al-Amal Plastics Factory\", \"company_size\": \"medium\", \"business_type\": \"b2b\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"gold\", \"customer_score\": 75, \"governorate_id\": 2, \"interest_level\": \"warm\", \"last_contact_at\": null, \"phone_secondary\": null, \"phone_normalized\": \"01056789012\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"not_documented\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(16,'default','created','App\\Models\\Customer',8,'created',NULL,NULL,'{\"attributes\": {\"id\": 8, \"code\": \"CUS-2026-0008\", \"name\": \"مصنع الغذاء الصحي\", \"tags\": null, \"type\": \"company\", \"email\": \"info@healthyfood-eg.com\", \"notes\": \"مصنع أغذية صحية - عميل جديد\", \"phone\": \"01023456789\", \"address\": \"برج العرب الصناعية، الإسكندرية\", \"city_id\": null, \"name_en\": null, \"website\": null, \"owner_id\": 1, \"priority\": \"normal\", \"source_id\": 3, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 5, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Healthy Food Factory\", \"company_size\": \"small\", \"business_type\": \"b2c\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"silver\", \"customer_score\": 60, \"governorate_id\": 3, \"interest_level\": \"cold\", \"last_contact_at\": null, \"phone_secondary\": null, \"phone_normalized\": \"01023456789\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"not_documented\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(17,'default','created','App\\Models\\Customer',9,'created',NULL,NULL,'{\"attributes\": {\"id\": 9, \"code\": \"CUS-2026-0009\", \"name\": \"مدارس المستقبل الدولية\", \"tags\": null, \"type\": \"company\", \"email\": \"admin@futureschools.edu.eg\", \"notes\": \"مجموعة مدارس دولية\", \"phone\": \"01034567890\", \"address\": \"التجمع الخامس، القاهرة الجديدة\", \"city_id\": null, \"name_en\": null, \"website\": \"https://www.futureschools.edu.eg\", \"owner_id\": 1, \"priority\": \"important\", \"source_id\": 6, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 8, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Future International Schools\", \"company_size\": \"large\", \"business_type\": \"both\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"gold\", \"customer_score\": 80, \"governorate_id\": 1, \"interest_level\": \"warm\", \"last_contact_at\": null, \"phone_secondary\": \"0228765432\", \"phone_normalized\": \"01034567890\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"under_review\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(18,'default','created','App\\Models\\Customer',10,'created',NULL,NULL,'{\"attributes\": {\"id\": 10, \"code\": \"CUS-2026-0010\", \"name\": \"مدرسة النجاح الخاصة\", \"tags\": null, \"type\": \"company\", \"email\": \"info@najahschool.com\", \"notes\": \"مدرسة خاصة\", \"phone\": \"01012345678\", \"address\": \"شارع الهرم، الجيزة\", \"city_id\": null, \"name_en\": null, \"website\": null, \"owner_id\": 1, \"priority\": \"normal\", \"source_id\": 5, \"status_id\": 1, \"country_id\": 1, \"created_at\": \"2026-02-08T20:57:05.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"archived_at\": null, \"archived_by\": null, \"branch_name\": null, \"campaign_id\": null, \"district_id\": null, \"industry_id\": 8, \"is_archived\": false, \"is_verified\": false, \"postal_code\": null, \"review_date\": null, \"verified_at\": null, \"verified_by\": null, \"company_name\": \"Al-Najah Private School\", \"company_size\": \"medium\", \"business_type\": \"both\", \"competitor_id\": null, \"contact_count\": 0, \"custom_fields\": null, \"journey_stage\": null, \"classification\": \"silver\", \"customer_score\": 65, \"governorate_id\": 2, \"interest_level\": \"cold\", \"last_contact_at\": null, \"phone_secondary\": null, \"phone_normalized\": \"01012345678\", \"archive_reason_id\": null, \"last_contact_date\": null, \"parent_company_id\": null, \"first_contact_date\": null, \"secondary_owner_id\": null, \"closing_probability\": 0, \"documentation_status\": \"not_documented\", \"not_interested_reason_id\": null, \"preferred_contact_method\": null}}',NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(19,'default','updated','App\\Models\\Customer',1,'updated','App\\Models\\User',1,'{\"old\": {\"name\": \"شركة النيل للتكنولوجيا\", \"updated_at\": \"2026-02-08T20:57:04.000000Z\", \"classification\": \"vip\", \"interest_level\": \"hot\", \"documentation_status\": \"documented\"}, \"attributes\": {\"name\": \"اختبار نهائي - 22:58:21\", \"updated_at\": \"2026-02-08T20:58:22.000000Z\", \"classification\": \"gold\", \"interest_level\": \"warm\", \"documentation_status\": \"under_review\"}}',NULL,'2026-02-08 20:58:22','2026-02-08 20:58:22'),(20,'default','updated','App\\Models\\Customer',10,'updated','App\\Models\\User',1,'{\"old\": {\"updated_at\": \"2026-02-08T20:57:05.000000Z\", \"is_verified\": false, \"verified_at\": null, \"verified_by\": null, \"documentation_status\": \"not_documented\"}, \"attributes\": {\"updated_at\": \"2026-02-08T21:42:51.000000Z\", \"is_verified\": true, \"verified_at\": \"2026-02-08T21:42:51.000000Z\", \"verified_by\": 1, \"documentation_status\": \"documented\"}}',NULL,'2026-02-08 21:42:51','2026-02-08 21:42:51'),(21,'default','updated','App\\Models\\Customer',6,'updated','App\\Models\\User',1,'{\"old\": {\"source_id\": 6, \"updated_at\": \"2026-02-08T20:57:05.000000Z\"}, \"attributes\": {\"source_id\": 5, \"updated_at\": \"2026-02-08T21:47:22.000000Z\"}}',NULL,'2026-02-08 21:47:22','2026-02-08 21:47:22'),(22,'default','updated','App\\Models\\Customer',10,'updated','App\\Models\\User',1,'{\"old\": {\"updated_at\": \"2026-02-08T21:42:51.000000Z\", \"parent_company_id\": null}, \"attributes\": {\"updated_at\": \"2026-02-08T22:22:28.000000Z\", \"parent_company_id\": 3}}',NULL,'2026-02-08 22:22:28','2026-02-08 22:22:28'),(23,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:47:26','2026-02-20 14:47:26'),(24,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:47:31','2026-02-20 14:47:31'),(25,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:47:34','2026-02-20 14:47:34'),(26,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:47:38','2026-02-20 14:47:38'),(27,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:48:00','2026-02-20 14:48:00'),(28,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:48:10','2026-02-20 14:48:10'),(29,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:48:16','2026-02-20 14:48:16'),(30,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:48:19','2026-02-20 14:48:19'),(31,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:49:13','2026-02-20 14:49:13'),(32,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:50:21','2026-02-20 14:50:21'),(33,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:50:49','2026-02-20 14:50:49'),(34,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:51:36','2026-02-20 14:51:36'),(35,'default','updated','App\\Models\\User',1,'updated',NULL,NULL,'{\"old\": [], \"attributes\": []}',NULL,'2026-02-20 14:52:30','2026-02-20 14:52:30');
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement_reads`
--

DROP TABLE IF EXISTS `announcement_reads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement_reads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `announcement_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `read_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `acknowledged_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `announcement_reads_announcement_id_user_id_unique` (`announcement_id`,`user_id`),
  KEY `announcement_reads_user_id_foreign` (`user_id`),
  CONSTRAINT `announcement_reads_announcement_id_foreign` FOREIGN KEY (`announcement_id`) REFERENCES `announcements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `announcement_reads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement_reads`
--

LOCK TABLES `announcement_reads` WRITE;
/*!40000 ALTER TABLE `announcement_reads` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcement_reads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('general','update','important','training','celebration') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `priority` enum('normal','high','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `target_type` enum('all','branches','departments','users') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `target_ids` json DEFAULT NULL,
  `attachments` json DEFAULT NULL,
  `is_pinned` tinyint(1) NOT NULL DEFAULT '0',
  `require_acknowledgment` tinyint(1) NOT NULL DEFAULT '0',
  `send_push` tinyint(1) NOT NULL DEFAULT '0',
  `send_email` tinyint(1) NOT NULL DEFAULT '0',
  `publish_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `status` enum('draft','scheduled','published','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `announcements_created_by_foreign` (`created_by`),
  KEY `announcements_status_publish_at_index` (`status`,`publish_at`),
  KEY `announcements_is_pinned_index` (`is_pinned`),
  CONSTRAINT `announcements_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approval_levels`
--

DROP TABLE IF EXISTS `approval_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval_levels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `request_id` bigint unsigned NOT NULL,
  `level` int NOT NULL,
  `approver_id` bigint unsigned NOT NULL,
  `status` enum('pending','approved','rejected','skipped') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `acted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `approval_levels_request_id_level_unique` (`request_id`,`level`),
  KEY `approval_levels_approver_id_index` (`approver_id`),
  KEY `approval_levels_status_index` (`status`),
  CONSTRAINT `approval_levels_approver_id_foreign` FOREIGN KEY (`approver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `approval_levels_request_id_foreign` FOREIGN KEY (`request_id`) REFERENCES `approval_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_levels`
--

LOCK TABLES `approval_levels` WRITE;
/*!40000 ALTER TABLE `approval_levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `approval_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approval_requests`
--

DROP TABLE IF EXISTS `approval_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval_requests` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('discount','quotation','contract','refund','close_followup','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `approvable_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approvable_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `requested_value` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_level` int NOT NULL DEFAULT '1',
  `status` enum('pending','approved','rejected','returned','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `requested_by` bigint unsigned NOT NULL,
  `requested_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `decided_by` bigint unsigned DEFAULT NULL,
  `decided_at` timestamp NULL DEFAULT NULL,
  `decision_notes` text COLLATE utf8mb4_unicode_ci,
  `due_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `approval_requests_code_unique` (`code`),
  KEY `approval_requests_decided_by_foreign` (`decided_by`),
  KEY `approval_requests_approvable_type_approvable_id_index` (`approvable_type`,`approvable_id`),
  KEY `approval_requests_status_index` (`status`),
  KEY `approval_requests_type_index` (`type`),
  KEY `approval_requests_requested_by_index` (`requested_by`),
  CONSTRAINT `approval_requests_decided_by_foreign` FOREIGN KEY (`decided_by`) REFERENCES `users` (`id`),
  CONSTRAINT `approval_requests_requested_by_foreign` FOREIGN KEY (`requested_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_requests`
--

LOCK TABLES `approval_requests` WRITE;
/*!40000 ALTER TABLE `approval_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `approval_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archive_reasons`
--

DROP TABLE IF EXISTS `archive_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_reasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `applies_to` enum('customer','lead','deal','ticket','all') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `requires_notes` tinyint(1) NOT NULL DEFAULT '0',
  `is_permanent` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `archive_reasons_code_unique` (`code`),
  KEY `archive_reasons_applies_to_is_active_index` (`applies_to`,`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive_reasons`
--

LOCK TABLES `archive_reasons` WRITE;
/*!40000 ALTER TABLE `archive_reasons` DISABLE KEYS */;
INSERT INTO `archive_reasons` VALUES (1,'عميل غير نشط','Inactive customer','inactive',NULL,'all',0,0,1,0,'2026-02-09 00:53:45','2026-02-09 00:53:45'),(2,'تكرار بيانات','Duplicate data','duplicate',NULL,'all',0,0,1,0,'2026-02-09 00:53:45','2026-02-09 00:53:45'),(3,'طلب العميل','Customer request','customer_request',NULL,'all',0,0,1,0,'2026-02-09 00:53:45','2026-02-09 00:53:45'),(4,'انتهاء العلاقة','Relationship ended','relationship_ended',NULL,'all',0,0,1,0,'2026-02-09 00:53:45','2026-02-09 00:53:45');
/*!40000 ALTER TABLE `archive_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region_id` bigint unsigned DEFAULT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `branches_code_unique` (`code`),
  KEY `branches_region_id_foreign` (`region_id`),
  CONSTRAINT `branches_region_id_foreign` FOREIGN KEY (`region_id`) REFERENCES `governorates` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'HQ','المقر الرئيسي','Headquarters','القاهرة - مدينة نصر','0220000001','hq@crm.local',1,1,'active','2026-02-08 22:43:54','2026-02-08 22:43:54'),(2,'GIZ','فرع الجيزة','Giza Branch','الجيزة - الدقي','0220000002','giza@crm.local',2,0,'active','2026-02-08 22:43:54','2026-02-08 22:43:54'),(3,'ALX','فرع الإسكندرية','Alexandria Branch','الإسكندرية - سموحة','0320000001','alex@crm.local',3,0,'active','2026-02-08 22:43:54','2026-02-08 22:43:54');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business_types`
--

DROP TABLE IF EXISTS `business_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `business_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_types`
--

LOCK TABLES `business_types` WRITE;
/*!40000 ALTER TABLE `business_types` DISABLE KEYS */;
INSERT INTO `business_types` VALUES (1,'b2b','شركة لشركة','B2B',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'b2c','شركة لعميل','B2C',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'both','كلاهما','Both',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `business_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buying_stages`
--

DROP TABLE IF EXISTS `buying_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buying_stages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#6B7280',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `buying_stages_code_unique` (`code`),
  KEY `buying_stages_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buying_stages`
--

LOCK TABLES `buying_stages` WRITE;
/*!40000 ALTER TABLE `buying_stages` DISABLE KEYS */;
INSERT INTO `buying_stages` VALUES (1,'مرحلة الوعي','Awareness','awareness',NULL,'#6B7280',0,1,'2026-02-09 00:53:52','2026-02-09 00:53:52'),(2,'مرحلة الاهتمام','Interest','interest',NULL,'#6B7280',0,1,'2026-02-09 00:53:52','2026-02-09 00:53:52'),(3,'مرحلة التقييم','Evaluation','evaluation',NULL,'#6B7280',0,1,'2026-02-09 00:53:52','2026-02-09 00:53:52'),(4,'مرحلة القرار','Decision','decision',NULL,'#6B7280',0,1,'2026-02-09 00:53:52','2026-02-09 00:53:52'),(5,'مرحلة الشراء','Purchase','purchase',NULL,'#6B7280',0,1,'2026-02-09 00:53:52','2026-02-09 00:53:52');
/*!40000 ALTER TABLE `buying_stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_categories`
--

DROP TABLE IF EXISTS `call_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#3B82F6',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `call_categories_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_categories`
--

LOCK TABLES `call_categories` WRITE;
/*!40000 ALTER TABLE `call_categories` DISABLE KEYS */;
INSERT INTO `call_categories` VALUES (1,'inquiry','استفسار','Inquiry','#3B82F6',1,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(2,'followup','متابعة','Follow-up','#8B5CF6',2,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(3,'quotation','عرض سعر','Quotation','#22C55E',3,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(4,'complaint','شكوى','Complaint','#EF4444',4,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(5,'support','دعم فني','Technical Support','#F59E0B',5,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(6,'renewal','تجديد','Renewal','#06B6D4',6,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(7,'survey','استبيان','Survey','#EC4899',7,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(8,'other','أخرى','Other','#6B7280',99,1,'2026-02-08 22:42:34','2026-02-08 22:42:34');
/*!40000 ALTER TABLE `call_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_directions`
--

DROP TABLE IF EXISTS `call_directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_directions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `call_directions_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_directions`
--

LOCK TABLES `call_directions` WRITE;
/*!40000 ALTER TABLE `call_directions` DISABLE KEYS */;
INSERT INTO `call_directions` VALUES (1,'صادرة','Outbound','outbound',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'واردة','Inbound','inbound',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `call_directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_outcomes`
--

DROP TABLE IF EXISTS `call_outcomes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_outcomes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `call_outcomes_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_outcomes`
--

LOCK TABLES `call_outcomes` WRITE;
/*!40000 ALTER TABLE `call_outcomes` DISABLE KEYS */;
INSERT INTO `call_outcomes` VALUES (1,'مهتم','Interested','interested','#10B981',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'غير مهتم','Not Interested','not_interested','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'يحتاج متابعة','Callback Required','callback','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'رقم خاطئ','Wrong Number','wrong_number','#6B7280',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(5,'تم إرسال معلومات','Info Sent','info_sent','#3B82F6',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `call_outcomes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_results`
--

DROP TABLE IF EXISTS `call_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_results` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_positive` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `call_results_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_results`
--

LOCK TABLES `call_results` WRITE;
/*!40000 ALTER TABLE `call_results` DISABLE KEYS */;
INSERT INTO `call_results` VALUES (1,'answered','تم الرد','Answered','#10B981',1,1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'interested','مهتم','Interested','#3B82F6',1,2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'callback','يعاود الاتصال','Callback','#F59E0B',1,3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(4,'not_interested','غير مهتم','Not Interested','#EF4444',0,4,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(5,'no_answer','لا يرد','No Answer','#6B7280',0,5,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(6,'busy','مشغول','Busy','#8B5CF6',0,6,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(7,'wrong_number','رقم خاطئ','Wrong Number','#DC2626',0,7,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `call_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_scripts`
--

DROP TABLE IF EXISTS `call_scripts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_scripts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `description` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `usage_count` int NOT NULL DEFAULT '0',
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `call_scripts_created_by_foreign` (`created_by`),
  KEY `call_scripts_category_index` (`category`),
  KEY `call_scripts_is_active_index` (`is_active`),
  CONSTRAINT `call_scripts_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_scripts`
--

LOCK TABLES `call_scripts` WRITE;
/*!40000 ALTER TABLE `call_scripts` DISABLE KEYS */;
/*!40000 ALTER TABLE `call_scripts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_statuses`
--

DROP TABLE IF EXISTS `call_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `call_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_statuses`
--

LOCK TABLES `call_statuses` WRITE;
/*!40000 ALTER TABLE `call_statuses` DISABLE KEYS */;
INSERT INTO `call_statuses` VALUES (1,'مكتملة','Completed','completed','#10B981',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'فائتة','Missed','missed','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'مشغول','Busy','busy','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'لا يوجد رد','No Answer','no_answer','#6B7280',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(5,'بريد صوتي','Voicemail','voicemail','#8B5CF6',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `call_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_types`
--

DROP TABLE IF EXISTS `call_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `call_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_types`
--

LOCK TABLES `call_types` WRITE;
/*!40000 ALTER TABLE `call_types` DISABLE KEYS */;
INSERT INTO `call_types` VALUES (1,'incoming','واردة','Incoming','#10B981',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'outgoing','صادرة','Outgoing','#3B82F6',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'missed','فائتة','Missed','#EF4444',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `call_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calls`
--

DROP TABLE IF EXISTS `calls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calls` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `direction` enum('inbound','outbound') COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `started_at` timestamp NOT NULL,
  `ended_at` timestamp NULL DEFAULT NULL,
  `duration_seconds` int NOT NULL DEFAULT '0',
  `status` enum('completed','missed','busy','no_answer','wrong_number','voicemail') COLLATE utf8mb4_unicode_ci NOT NULL,
  `outcome` enum('interested','not_interested','callback','follow_up','closed_won','closed_lost','info_provided') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` bigint unsigned DEFAULT NULL,
  `quality_rating` tinyint DEFAULT NULL,
  `used_script` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `recording_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recording_duration` int DEFAULT NULL,
  `followup_scheduled` tinyint(1) NOT NULL DEFAULT '0',
  `followup_id` bigint unsigned DEFAULT NULL,
  `followup_created_with_call` tinyint(1) NOT NULL DEFAULT '0',
  `agent_id` bigint unsigned NOT NULL,
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `calls_code_unique` (`code`),
  KEY `calls_followup_id_foreign` (`followup_id`),
  KEY `calls_created_by_foreign` (`created_by`),
  KEY `calls_customer_id_index` (`customer_id`),
  KEY `calls_agent_id_index` (`agent_id`),
  KEY `calls_started_at_index` (`started_at`),
  KEY `calls_status_index` (`status`),
  KEY `calls_direction_index` (`direction`),
  KEY `calls_category_id_index` (`category_id`),
  KEY `calls_agent_id_started_at_index` (`agent_id`,`started_at`),
  KEY `calls_customer_id_started_at_index` (`customer_id`,`started_at`),
  KEY `idx_calls_agent_started` (`agent_id`,`started_at`),
  KEY `idx_calls_customer_started` (`customer_id`,`started_at`),
  KEY `idx_calls_direction_status` (`direction`,`status`),
  CONSTRAINT `calls_agent_id_foreign` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `calls_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `call_categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `calls_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `calls_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `calls_followup_id_foreign` FOREIGN KEY (`followup_id`) REFERENCES `followups` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calls`
--

LOCK TABLES `calls` WRITE;
/*!40000 ALTER TABLE `calls` DISABLE KEYS */;
/*!40000 ALTER TABLE `calls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_statuses`
--

DROP TABLE IF EXISTS `campaign_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `campaign_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_statuses`
--

LOCK TABLES `campaign_statuses` WRITE;
/*!40000 ALTER TABLE `campaign_statuses` DISABLE KEYS */;
INSERT INTO `campaign_statuses` VALUES (1,'مسودة','Draft','draft','#6B7280',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'نشطة','Active','active','#10B981',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'متوقفة','Paused','paused','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'مكتملة','Completed','completed','#3B82F6',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(5,'ملغاة','Cancelled','cancelled','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `campaign_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_types`
--

DROP TABLE IF EXISTS `campaign_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `campaign_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_types`
--

LOCK TABLES `campaign_types` WRITE;
/*!40000 ALTER TABLE `campaign_types` DISABLE KEYS */;
INSERT INTO `campaign_types` VALUES (1,'facebook_ads','إعلانات فيسبوك','Facebook Ads',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'google_ads','إعلانات جوجل','Google Ads',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'exhibition','معرض','Exhibition',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'email','بريد إلكتروني','Email','#3B82F6',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(5,'sms','رسائل نصية','SMS','#10B981',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(6,'whatsapp','واتساب','WhatsApp','#25D366',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(7,'social_media','سوشيال ميديا','Social Media',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(8,'tv','تلفزيون','TV',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(9,'other','أخرى','Other',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(10,'social','سوشيال ميديا','Social Media','#E91E63',4,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(11,'call','اتصالات','Calls','#F59E0B',5,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(12,'event','حدث/معرض','Event','#8B5CF6',6,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `campaign_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaigns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `type` enum('facebook_ads','google_ads','exhibition','email','sms','whatsapp','social_media','tv','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `budget` decimal(15,2) DEFAULT NULL,
  `actual_cost` decimal(15,2) NOT NULL DEFAULT '0.00',
  `target_audience` text COLLATE utf8mb4_unicode_ci,
  `status` enum('draft','active','paused','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `leads_count` int NOT NULL DEFAULT '0',
  `customers_count` int NOT NULL DEFAULT '0',
  `revenue` decimal(15,2) NOT NULL DEFAULT '0.00',
  `owner_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `campaigns_code_unique` (`code`),
  KEY `campaigns_owner_id_foreign` (`owner_id`),
  KEY `campaigns_status_index` (`status`),
  KEY `campaigns_type_index` (`type`),
  KEY `campaigns_start_date_end_date_index` (`start_date`,`end_date`),
  CONSTRAINT `campaigns_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaigns`
--

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancel_reasons`
--

DROP TABLE IF EXISTS `cancel_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancel_reasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applies_to` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cancel_reasons_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancel_reasons`
--

LOCK TABLES `cancel_reasons` WRITE;
/*!40000 ALTER TABLE `cancel_reasons` DISABLE KEYS */;
INSERT INTO `cancel_reasons` VALUES (1,'duplicate','مكررة','Duplicate','all',1,1,'2026-02-08 22:42:33','2026-02-08 22:42:33'),(2,'customer_lost','العميل خسارة','Customer lost','followups',2,1,'2026-02-08 22:42:33','2026-02-08 22:42:33'),(3,'no_longer_needed','لم تعد مطلوبة','No longer needed','all',3,1,'2026-02-08 22:42:33','2026-02-08 22:42:33'),(4,'wrong_assignment','تكليف خاطئ','Wrong assignment','all',4,1,'2026-02-08 22:42:33','2026-02-08 22:42:33'),(5,'customer_request','بناءً على طلب العميل','Customer request','followups',5,1,'2026-02-08 22:42:33','2026-02-08 22:42:33'),(6,'completed_elsewhere','تم إنجازها بطريقة أخرى','Completed elsewhere','tasks',6,1,'2026-02-08 22:42:33','2026-02-08 22:42:33'),(7,'other','سبب آخر','Other','all',99,1,'2026-02-08 22:42:33','2026-02-08 22:42:33');
/*!40000 ALTER TABLE `cancel_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `governorate_id` bigint unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cities_code_unique` (`code`),
  KEY `cities_governorate_id_index` (`governorate_id`),
  CONSTRAINT `cities_governorate_id_foreign` FOREIGN KEY (`governorate_id`) REFERENCES `governorates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'CAI-NAS','مدينة نصر','Nasr City',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(2,'CAI-HEL','مصر الجديدة','Heliopolis',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(3,'CAI-MAD','المعادي','Maadi',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(4,'CAI-NZH','مصر الجديدة','Nasr City',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(5,'CAI-SHB','شبرا','Shubra',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(6,'CAI-ZMK','الزمالك','Zamalek',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(7,'CAI-DOK','الدقي','Dokki',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(8,'CAI-MOH','المهندسين','Mohandessin',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(9,'CAI-TGM','التجمع الخامس','Fifth Settlement',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(10,'CAI-SHR','الشروق','El Shorouk',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(11,'CAI-OBR','العبور','Obour',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(12,'CAI-NCC','العاصمة الإدارية','New Capital',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(13,'GIZ-6OC','6 أكتوبر','6th of October',2,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(14,'GIZ-SHZ','الشيخ زايد','Sheikh Zayed',2,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(15,'GIZ-HRM','الهرم','Haram',2,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(16,'GIZ-FIS','فيصل','Faisal',2,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(17,'GIZ-IMB','إمبابة','Imbaba',2,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(18,'GIZ-AGZ','العجوزة','Agouza',2,1,'2026-01-30 15:05:28','2026-01-30 15:05:28');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_sizes`
--

DROP TABLE IF EXISTS `company_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_sizes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_sizes_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_sizes`
--

LOCK TABLES `company_sizes` WRITE;
/*!40000 ALTER TABLE `company_sizes` DISABLE KEYS */;
INSERT INTO `company_sizes` VALUES (1,'صغيرة','Small','small',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'متوسطة','Medium','medium',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'كبيرة','Large','large',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `company_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competitors`
--

DROP TABLE IF EXISTS `competitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competitors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `competitors_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitors`
--

LOCK TABLES `competitors` WRITE;
/*!40000 ALTER TABLE `competitors` DISABLE KEYS */;
INSERT INTO `competitors` VALUES (1,'COMP-001','منافس 1','Competitor 1',NULL,1,'2026-02-08 22:42:35','2026-02-08 22:42:35'),(2,'COMP-002','منافس 2','Competitor 2',NULL,1,'2026-02-08 22:42:35','2026-02-08 22:42:35'),(3,'COMP-003','منافس 3','Competitor 3',NULL,1,'2026-02-08 22:42:35','2026-02-08 22:42:35'),(4,'COMP-OTHER','منافس آخر','Other Competitor',NULL,1,'2026-02-08 22:42:35','2026-02-08 22:42:35');
/*!40000 ALTER TABLE `competitors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_items`
--

DROP TABLE IF EXISTS `contract_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `contract_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT '1.00',
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(5,2) NOT NULL DEFAULT '0.00',
  `tax_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contract_items_contract_id_foreign` (`contract_id`),
  KEY `contract_items_product_id_foreign` (`product_id`),
  CONSTRAINT `contract_items_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contract_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_items`
--

LOCK TABLES `contract_items` WRITE;
/*!40000 ALTER TABLE `contract_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_signatures`
--

DROP TABLE IF EXISTS `contract_signatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_signatures` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `contract_id` bigint unsigned NOT NULL,
  `signer_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signer_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signer_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signer_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signed_at` timestamp NOT NULL,
  `verification_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contract_signatures_contract_id_signer_type_index` (`contract_id`,`signer_type`),
  CONSTRAINT `contract_signatures_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_signatures`
--

LOCK TABLES `contract_signatures` WRITE;
/*!40000 ALTER TABLE `contract_signatures` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_signatures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_templates`
--

DROP TABLE IF EXISTS `contract_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_templates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `header` text COLLATE utf8mb4_unicode_ci,
  `footer` text COLLATE utf8mb4_unicode_ci,
  `terms` text COLLATE utf8mb4_unicode_ci,
  `variables` json DEFAULT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contract_templates_code_unique` (`code`),
  KEY `contract_templates_created_by_foreign` (`created_by`),
  KEY `contract_templates_category_index` (`category`),
  KEY `contract_templates_is_active_index` (`is_active`),
  CONSTRAINT `contract_templates_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_templates`
--

LOCK TABLES `contract_templates` WRITE;
/*!40000 ALTER TABLE `contract_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_types`
--

DROP TABLE IF EXISTS `contract_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contract_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_types`
--

LOCK TABLES `contract_types` WRITE;
/*!40000 ALTER TABLE `contract_types` DISABLE KEYS */;
INSERT INTO `contract_types` VALUES (1,'sale','بيع','Sale',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'service','خدمة','Service',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'maintenance','صيانة','Maintenance',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(4,'rental','إيجار','Rental',4,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `contract_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `quotation_id` bigint unsigned DEFAULT NULL,
  `deal_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `signed_date` date DEFAULT NULL,
  `total_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tax_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `net_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `payment_plan` enum('full','advance_delivery','installments') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'full',
  `advance_amount` decimal(15,2) DEFAULT NULL,
  `installments_count` int DEFAULT NULL,
  `status` enum('draft','pending_approval','approved','active','completed','terminated','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `requires_signature` tinyint(1) NOT NULL DEFAULT '1',
  `is_signed` tinyint(1) NOT NULL DEFAULT '0',
  `signed_at` timestamp NULL DEFAULT NULL,
  `signature_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature_token_expires_at` timestamp NULL DEFAULT NULL,
  `approved_by` bigint unsigned DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `contract_file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attachments` json DEFAULT NULL,
  `terms_conditions` text COLLATE utf8mb4_unicode_ci,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `termination_reason` text COLLATE utf8mb4_unicode_ci,
  `terminated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contracts_code_unique` (`code`),
  KEY `contracts_quotation_id_foreign` (`quotation_id`),
  KEY `contracts_approved_by_foreign` (`approved_by`),
  KEY `contracts_created_by_foreign` (`created_by`),
  KEY `contracts_customer_id_index` (`customer_id`),
  KEY `contracts_status_index` (`status`),
  KEY `contracts_start_date_end_date_index` (`start_date`,`end_date`),
  CONSTRAINT `contracts_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `contracts_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `contracts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contracts_quotation_id_foreign` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `countries_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'EG','مصر','Egypt','+20','EGP',1,'2026-01-30 15:05:27','2026-01-30 15:05:27');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_reports`
--

DROP TABLE IF EXISTS `custom_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `data_source` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `columns` json NOT NULL,
  `filters` json DEFAULT NULL,
  `group_by` json DEFAULT NULL,
  `order_by` json DEFAULT NULL,
  `aggregations` json DEFAULT NULL,
  `chart_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chart_config` json DEFAULT NULL,
  `visibility` enum('private','team','company') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'private',
  `shared_with` json DEFAULT NULL,
  `schedule` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schedule_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schedule_recipients` json DEFAULT NULL,
  `export_format` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_favorite` tinyint(1) NOT NULL DEFAULT '0',
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_reports_created_by_visibility_index` (`created_by`,`visibility`),
  KEY `custom_reports_data_source_index` (`data_source`),
  CONSTRAINT `custom_reports_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_reports`
--

LOCK TABLES `custom_reports` WRITE;
/*!40000 ALTER TABLE `custom_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_classifications`
--

DROP TABLE IF EXISTS `customer_classifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_classifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_classifications_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_classifications`
--

LOCK TABLES `customer_classifications` WRITE;
/*!40000 ALTER TABLE `customer_classifications` DISABLE KEYS */;
INSERT INTO `customer_classifications` VALUES (1,'vip','VIP','VIP','#F59E0B',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'normal','عادي','Normal','#6B7280',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'potential','محتمل','Potential','#3B82F6',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `customer_classifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_contacts`
--

DROP TABLE IF EXISTS `customer_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_decision_maker` tinyint(1) NOT NULL DEFAULT '0',
  `is_influencer` tinyint(1) NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_contacts_customer_id_index` (`customer_id`),
  CONSTRAINT `customer_contacts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_contacts`
--

LOCK TABLES `customer_contacts` WRITE;
/*!40000 ALTER TABLE `customer_contacts` DISABLE KEYS */;
INSERT INTO `customer_contacts` VALUES (1,1,'أحمد محمد حسن','المدير العام','01001234567','ahmed@niletech.com.eg',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(2,1,'سارة علي إبراهيم','مديرة المبيعات','01112345678','sara@niletech.com.eg',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(3,1,'محمود سعيد','مدير التقنية','01223456789','mahmoud@niletech.com.eg',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(4,2,'عمر فاروق','رئيس مجلس الإدارة','01005678901','omar@misrrealestate.com',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(5,2,'نادية حسين','مديرة التسويق','01156789012','nadia@misrrealestate.com',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(6,3,'خالد عبدالرحمن','المدير التنفيذي','01098765432','khaled@alsalamtrading.com',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(7,3,'فاطمة محمود','محاسبة','01234567890','fatma@alsalamtrading.com',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(8,4,'يوسف إبراهيم','مدير العمليات','01067890123','youssef@alfajr.com',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(9,5,'هاني السيد','الشريك المؤسس','01145678901','hany@alnour.com',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(10,5,'منى عادل','مستشارة أعمال','01078901234','mona@alnour.com',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(14,7,'طارق أحمد','المالك','01056789012','tarek@alamalplastics.com',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(15,7,'ريم سامي','مديرة المشتريات','01167890123','reem@alamalplastics.com',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(16,8,'عمرو حسين','المدير العام','01023456789','amr@healthyfood-eg.com',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(17,9,'د. سامية عبدالوهاب','مديرة المدرسة','01034567890','samia@futureschools.edu.eg',1,0,1,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(18,9,'محمد فريد','مدير الشؤون المالية','01178901234','mohamed@futureschools.edu.eg',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(19,9,'نهى أحمد','منسقة الأنشطة','01289012345','noha@futureschools.edu.eg',0,0,0,NULL,'2026-02-08 20:57:05','2026-02-08 20:57:05'),(22,6,'مجدي عبدالله','مدير المصنع','01089012345','magdy@egyptianiron.com',1,0,0,NULL,'2026-02-08 21:47:22','2026-02-08 21:47:22'),(23,6,'أشرف كمال','مدير الإنتاج','01190123456','ashraf@egyptianiron.com',0,0,0,NULL,'2026-02-08 21:47:22','2026-02-08 21:47:22'),(24,6,'سمير حسن','مهندس جودة','01201234567','samir@egyptianiron.com',0,0,0,NULL,'2026-02-08 21:47:22','2026-02-08 21:47:22'),(25,10,'أ. كريم محمود','مدير المدرسة','01012345678','karim@najahschool.com',1,0,0,NULL,'2026-02-08 22:22:28','2026-02-08 22:22:28'),(26,10,'هبة سالم','سكرتيرة','01123456789','heba@najahschool.com',0,0,0,NULL,'2026-02-08 22:22:28','2026-02-08 22:22:28');
/*!40000 ALTER TABLE `customer_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_products`
--

DROP TABLE IF EXISTS `customer_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serial_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` year DEFAULT NULL,
  `plate_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `purchase_date` date DEFAULT NULL,
  `warranty_end` date DEFAULT NULL,
  `purchase_price` decimal(12,2) DEFAULT NULL,
  `specifications` text COLLATE utf8mb4_unicode_ci,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `images` json DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_products_code_unique` (`code`),
  KEY `customer_products_created_by_foreign` (`created_by`),
  KEY `customer_products_customer_id_status_index` (`customer_id`,`status`),
  KEY `customer_products_type_index` (`type`),
  CONSTRAINT `customer_products_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customer_products_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_products`
--

LOCK TABLES `customer_products` WRITE;
/*!40000 ALTER TABLE `customer_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_qr_codes`
--

DROP TABLE IF EXISTS `customer_qr_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_qr_codes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'profile',
  `expires_at` timestamp NULL DEFAULT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT '0',
  `used_at` timestamp NULL DEFAULT NULL,
  `scanned_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scanned_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scanned_ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_qr_codes_token_unique` (`token`),
  KEY `customer_qr_codes_created_by_foreign` (`created_by`),
  KEY `customer_qr_codes_token_expires_at_index` (`token`,`expires_at`),
  KEY `customer_qr_codes_customer_id_is_used_index` (`customer_id`,`is_used`),
  CONSTRAINT `customer_qr_codes_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customer_qr_codes_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_qr_codes`
--

LOCK TABLES `customer_qr_codes` WRITE;
/*!40000 ALTER TABLE `customer_qr_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_qr_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_sources`
--

DROP TABLE IF EXISTS `customer_sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_sources` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_sources_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_sources`
--

LOCK TABLES `customer_sources` WRITE;
/*!40000 ALTER TABLE `customer_sources` DISABLE KEYS */;
INSERT INTO `customer_sources` VALUES (1,'facebook','إعلان فيسبوك','Facebook Ad','facebook',NULL,1,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'instagram','انستجرام','Instagram','instagram',NULL,2,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'whatsapp','واتساب','WhatsApp','whatsapp',NULL,3,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'google','إعلان جوجل','Google Ad','google',NULL,4,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(5,'website','موقع الشركة','Website','globe',NULL,5,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(6,'referral','توصية عميل','Referral','users',NULL,6,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(7,'exhibition','معرض','Exhibition','building',NULL,7,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(8,'phone','اتصال هاتفي','Phone Call','phone',NULL,8,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(9,'walk_in','زيارة مباشرة','Walk-in','map-pin',NULL,9,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(10,'other','أخرى','Other','more-horizontal',NULL,10,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(11,'call','اتصال مباشر','Direct Call',NULL,NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(12,'manual','إدخال يدوي','Manual Entry',NULL,NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `customer_sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_status_history`
--

DROP TABLE IF EXISTS `customer_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_status_history` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `from_status_id` bigint unsigned DEFAULT NULL,
  `to_status_id` bigint unsigned NOT NULL,
  `changed_by` bigint unsigned NOT NULL,
  `lost_reason_id` bigint unsigned DEFAULT NULL,
  `competitor_id` bigint unsigned DEFAULT NULL,
  `competitor_price` decimal(15,2) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `review_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_status_history_from_status_id_foreign` (`from_status_id`),
  KEY `customer_status_history_lost_reason_id_foreign` (`lost_reason_id`),
  KEY `customer_status_history_competitor_id_foreign` (`competitor_id`),
  KEY `customer_status_history_customer_id_index` (`customer_id`),
  KEY `customer_status_history_to_status_id_index` (`to_status_id`),
  KEY `customer_status_history_changed_by_index` (`changed_by`),
  KEY `customer_status_history_created_at_index` (`created_at`),
  CONSTRAINT `customer_status_history_changed_by_foreign` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `customer_status_history_competitor_id_foreign` FOREIGN KEY (`competitor_id`) REFERENCES `competitors` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customer_status_history_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `customer_status_history_from_status_id_foreign` FOREIGN KEY (`from_status_id`) REFERENCES `customer_statuses` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customer_status_history_lost_reason_id_foreign` FOREIGN KEY (`lost_reason_id`) REFERENCES `lost_reasons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customer_status_history_to_status_id_foreign` FOREIGN KEY (`to_status_id`) REFERENCES `customer_statuses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_status_history`
--

LOCK TABLES `customer_status_history` WRITE;
/*!40000 ALTER TABLE `customer_status_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_statuses`
--

DROP TABLE IF EXISTS `customer_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#6B7280',
  `description` text COLLATE utf8mb4_unicode_ci,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_statuses`
--

LOCK TABLES `customer_statuses` WRITE;
/*!40000 ALTER TABLE `customer_statuses` DISABLE KEYS */;
INSERT INTO `customer_statuses` VALUES (1,'new','جديد','New','#3B82F6','عميل تم إضافته حديثاً ولم يتم التواصل معه بعد',1,1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(2,'interested','مهتم','Interested','#10B981','عميل أبدى اهتماماً بالمنتج/الخدمة ويحتاج متابعة',2,0,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(3,'hesitant','متردد','Hesitant','#F59E0B','عميل لم يحسم قراره بعد ويحتاج إقناع',3,0,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(4,'closed','مُغلق','Closed','#22C55E','عميل تم التعاقد معه بنجاح',4,0,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(5,'not_interested','غير مهتم','Not Interested','#EF4444','عميل غير مهتم بالمنتج/الخدمة حالياً',5,0,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(6,'archive','أرشيف','Archive','#6B7280','عميل غير نشط حالياً',6,0,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(8,'test','TEST','TEST','#6B7280',NULL,0,0,1,'2026-02-09 01:04:48','2026-02-09 01:04:48');
/*!40000 ALTER TABLE `customer_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_types`
--

DROP TABLE IF EXISTS `customer_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_types`
--

LOCK TABLES `customer_types` WRITE;
/*!40000 ALTER TABLE `customer_types` DISABLE KEYS */;
INSERT INTO `customer_types` VALUES (1,'individual','فرد','Individual','#3B82F6',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'company','شركة','Company','#10B981',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'organization','مؤسسة','Organization','#8B5CF6',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `customer_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('individual','company','organization') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'individual',
  `classification` enum('vip','gold','silver','bronze') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'bronze',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_secondary` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_normalized` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` bigint unsigned DEFAULT NULL,
  `governorate_id` bigint unsigned DEFAULT NULL,
  `city_id` bigint unsigned DEFAULT NULL,
  `district_id` bigint unsigned DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `industry_id` bigint unsigned DEFAULT NULL,
  `business_type` enum('b2b','b2c','both') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_size` enum('small','medium','large') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_company_id` bigint unsigned DEFAULT NULL,
  `branch_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_id` bigint unsigned DEFAULT NULL,
  `buying_stage_id` bigint unsigned DEFAULT NULL,
  `interest_level` enum('cold','warm','hot') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'warm',
  `last_contact_at` timestamp NULL DEFAULT NULL,
  `priority` enum('normal','important','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `customer_score` int NOT NULL DEFAULT '0',
  `closing_probability` tinyint NOT NULL DEFAULT '0',
  `journey_stage` enum('awareness','interest','consideration','intent','evaluation','purchase') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `not_interested_reason_id` bigint unsigned DEFAULT NULL,
  `competitor_id` bigint unsigned DEFAULT NULL,
  `owner_id` bigint unsigned NOT NULL,
  `secondary_owner_id` bigint unsigned DEFAULT NULL,
  `source_id` bigint unsigned DEFAULT NULL,
  `campaign_id` bigint unsigned DEFAULT NULL,
  `preferred_contact_method` enum('phone','whatsapp','email','visit') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_contact_date` date DEFAULT NULL,
  `last_contact_date` date DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  `contact_count` int NOT NULL DEFAULT '0',
  `verification_status` enum('verified','pending','unverified') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unverified' COMMENT 'حالة توثيق العميل: موثق، قيد المراجعة، غير موثق',
  `qr_token` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qr_token_expires_at` timestamp NULL DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `documentation_status` enum('not_documented','under_review','documented') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'not_documented',
  `verified_at` timestamp NULL DEFAULT NULL,
  `verified_by` bigint unsigned DEFAULT NULL,
  `is_archived` tinyint(1) NOT NULL DEFAULT '0',
  `archived_at` timestamp NULL DEFAULT NULL,
  `archived_by` bigint unsigned DEFAULT NULL,
  `archive_reason_id` bigint unsigned DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `custom_fields` json DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_phone_normalized_unique` (`phone_normalized`),
  UNIQUE KEY `customers_code_unique` (`code`),
  KEY `customers_country_id_foreign` (`country_id`),
  KEY `customers_city_id_foreign` (`city_id`),
  KEY `customers_district_id_foreign` (`district_id`),
  KEY `customers_industry_id_foreign` (`industry_id`),
  KEY `customers_parent_company_id_foreign` (`parent_company_id`),
  KEY `customers_secondary_owner_id_foreign` (`secondary_owner_id`),
  KEY `customers_source_id_foreign` (`source_id`),
  KEY `customers_verified_by_foreign` (`verified_by`),
  KEY `customers_archived_by_foreign` (`archived_by`),
  KEY `customers_created_by_foreign` (`created_by`),
  KEY `customers_code_index` (`code`),
  KEY `customers_name_index` (`name`),
  KEY `customers_owner_id_index` (`owner_id`),
  KEY `customers_status_id_index` (`status_id`),
  KEY `customers_classification_index` (`classification`),
  KEY `customers_created_at_index` (`created_at`),
  KEY `customers_is_archived_index` (`is_archived`),
  KEY `customers_journey_stage_index` (`journey_stage`),
  KEY `customers_review_date_index` (`review_date`),
  KEY `customers_buying_stage_id_foreign` (`buying_stage_id`),
  KEY `customers_not_interested_reason_id_foreign` (`not_interested_reason_id`),
  KEY `idx_customers_status_owner` (`status_id`,`owner_id`),
  KEY `idx_customers_owner_created` (`owner_id`,`created_at`),
  KEY `idx_customers_governorate_status` (`governorate_id`,`status_id`),
  KEY `idx_customers_interest_status` (`interest_level`,`status_id`),
  CONSTRAINT `customers_archived_by_foreign` FOREIGN KEY (`archived_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_buying_stage_id_foreign` FOREIGN KEY (`buying_stage_id`) REFERENCES `buying_stages` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `customers_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_governorate_id_foreign` FOREIGN KEY (`governorate_id`) REFERENCES `governorates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_industry_id_foreign` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_not_interested_reason_id_foreign` FOREIGN KEY (`not_interested_reason_id`) REFERENCES `not_interested_reasons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `customers_parent_company_id_foreign` FOREIGN KEY (`parent_company_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_secondary_owner_id_foreign` FOREIGN KEY (`secondary_owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_source_id_foreign` FOREIGN KEY (`source_id`) REFERENCES `customer_sources` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `customer_statuses` (`id`) ON DELETE SET NULL,
  CONSTRAINT `customers_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'CUS-2026-0001','اختبار نهائي - 22:58:21',NULL,'Nile Tech Solutions','company','gold','01001234567','0223456789','01001234567','info@niletech.com.eg','https://www.niletech.com.eg',1,1,NULL,NULL,'45 شارع التحرير، الدقي، الجيزة',NULL,1,'b2b','large',NULL,NULL,1,NULL,'warm',NULL,'urgent',95,0,NULL,NULL,NULL,1,NULL,5,NULL,NULL,NULL,NULL,NULL,0,'verified',NULL,NULL,1,'under_review','2026-02-08 20:57:04',1,0,NULL,NULL,NULL,'عميل VIP - شركة رائدة في مجال التكنولوجيا',NULL,NULL,1,'2026-02-08 20:57:04','2026-02-08 20:58:22',NULL),(2,'CUS-2026-0002','شركة مصر للاستثمار العقاري',NULL,'Misr Real Estate Investment','company','vip','01005678901','0227654321','01005678901','contact@misrrealestate.com','https://www.misrrealestate.com',1,1,NULL,NULL,'78 شارع الهرم، الجيزة',NULL,3,'b2b','large',NULL,NULL,2,NULL,'hot',NULL,'urgent',92,0,NULL,NULL,NULL,2,NULL,6,NULL,NULL,NULL,NULL,NULL,0,'verified',NULL,NULL,1,'documented','2026-02-08 20:57:05',1,0,NULL,NULL,NULL,'شركة كبرى في مجال العقارات - عميل استراتيجي',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 20:57:05',NULL),(3,'CUS-2026-0003','شركة السلام للتجارة',NULL,'Al-Salam Trading Co.','company','gold','01098765432',NULL,'01098765432','info@alsalamtrading.com',NULL,1,3,NULL,NULL,'55 شارع فؤاد، الإسكندرية',NULL,3,'b2b','medium',NULL,NULL,3,NULL,'warm',NULL,'important',78,0,NULL,NULL,NULL,5,NULL,3,NULL,NULL,NULL,NULL,NULL,0,'unverified',NULL,NULL,0,'under_review',NULL,NULL,0,NULL,NULL,NULL,'شركة تجارية متوسطة الحجم',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 20:57:05',NULL),(4,'CUS-2026-0004','شركة الفجر للخدمات اللوجستية',NULL,'Al-Fajr Logistics','company','silver','01067890123',NULL,'01067890123','logistics@alfajr.com',NULL,1,1,NULL,NULL,'200 المنطقة الصناعية، العاشر من رمضان',NULL,3,'b2b','medium',NULL,NULL,5,NULL,'cold',NULL,'normal',55,0,NULL,NULL,NULL,6,NULL,5,NULL,NULL,NULL,NULL,NULL,0,'unverified',NULL,NULL,0,'not_documented',NULL,NULL,0,NULL,NULL,NULL,'عميل جديد في مجال اللوجستيات',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 20:57:05',NULL),(5,'CUS-2026-0005','شركة النور للاستشارات',NULL,'Al-Nour Consulting','company','gold','01145678901',NULL,'01145678901','consult@alnour.com',NULL,1,2,NULL,NULL,'30 شارع جامعة الدول العربية، المهندسين',NULL,1,'b2b','small',NULL,NULL,2,NULL,'warm',NULL,'important',72,0,NULL,NULL,NULL,7,NULL,6,NULL,NULL,NULL,NULL,NULL,0,'unverified',NULL,NULL,0,'under_review',NULL,NULL,0,NULL,NULL,NULL,'شركة استشارات تقنية',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 20:57:05',NULL),(6,'CUS-2026-0006','مصنع الحديد والصلب المصري',NULL,'Egyptian Iron & Steel Factory','company','vip','01089012345','0622345678','01089012345','info@egyptianiron.com','https://www.egyptianiron.com',1,1,NULL,NULL,'المنطقة الصناعية، حلوان',NULL,5,'b2b','large',NULL,NULL,4,NULL,'hot',NULL,'urgent',88,0,NULL,NULL,NULL,2,NULL,5,NULL,NULL,NULL,NULL,NULL,0,'unverified',NULL,NULL,0,'under_review',NULL,NULL,0,NULL,NULL,NULL,'مصنع كبير للحديد والصلب',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 21:47:22',NULL),(7,'CUS-2026-0007','مصنع الأمل للبلاستيك',NULL,'Al-Amal Plastics Factory','company','gold','01056789012',NULL,'01056789012','sales@alamalplastics.com',NULL,1,2,NULL,NULL,'المنطقة الصناعية، 6 أكتوبر',NULL,5,'b2b','medium',NULL,NULL,2,NULL,'warm',NULL,'important',75,0,NULL,NULL,NULL,5,NULL,5,NULL,NULL,NULL,NULL,NULL,0,'unverified',NULL,NULL,0,'not_documented',NULL,NULL,0,NULL,NULL,NULL,'مصنع للمنتجات البلاستيكية',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 20:57:05',NULL),(8,'CUS-2026-0008','مصنع الغذاء الصحي',NULL,'Healthy Food Factory','company','silver','01023456789',NULL,'01023456789','info@healthyfood-eg.com',NULL,1,3,NULL,NULL,'برج العرب الصناعية، الإسكندرية',NULL,5,'b2c','small',NULL,NULL,3,NULL,'cold',NULL,'normal',60,0,NULL,NULL,NULL,6,NULL,3,NULL,NULL,NULL,NULL,NULL,0,'unverified',NULL,NULL,0,'not_documented',NULL,NULL,0,NULL,NULL,NULL,'مصنع أغذية صحية - عميل جديد',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 20:57:05',NULL),(9,'CUS-2026-0009','مدارس المستقبل الدولية',NULL,'Future International Schools','company','gold','01034567890','0228765432','01034567890','admin@futureschools.edu.eg','https://www.futureschools.edu.eg',1,1,NULL,NULL,'التجمع الخامس، القاهرة الجديدة',NULL,8,'both','large',NULL,NULL,1,NULL,'warm',NULL,'important',80,0,NULL,NULL,NULL,7,NULL,6,NULL,NULL,NULL,NULL,NULL,0,'unverified',NULL,NULL,0,'under_review',NULL,NULL,0,NULL,NULL,NULL,'مجموعة مدارس دولية',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 20:57:05',NULL),(10,'CUS-2026-0010','مدرسة النجاح الخاصة',NULL,'Al-Najah Private School','company','silver','01012345678',NULL,'01012345678','info@najahschool.com',NULL,1,2,NULL,NULL,'شارع الهرم، الجيزة',NULL,8,'both','medium',3,NULL,2,NULL,'cold',NULL,'normal',65,0,NULL,NULL,NULL,2,NULL,5,NULL,NULL,NULL,NULL,NULL,0,'verified',NULL,NULL,1,'documented','2026-02-08 21:42:51',1,0,NULL,NULL,NULL,'مدرسة خاصة',NULL,NULL,1,'2026-02-08 20:57:05','2026-02-08 22:22:28',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal_lost_reasons`
--

DROP TABLE IF EXISTS `deal_lost_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal_lost_reasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal_lost_reasons`
--

LOCK TABLES `deal_lost_reasons` WRITE;
/*!40000 ALTER TABLE `deal_lost_reasons` DISABLE KEYS */;
INSERT INTO `deal_lost_reasons` VALUES (1,'السعر مرتفع','Price Too High',1,1,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(2,'اختيار منافس','Chose Competitor',1,2,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(3,'لا يوجد ميزانية','No Budget',1,3,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(4,'تأجيل المشروع','Project Postponed',1,4,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(5,'عدم الحاجة حالياً','No Current Need',1,5,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(6,'عدم الرد','No Response',1,6,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(7,'تغيير القرار','Decision Changed',1,7,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(8,'منتج غير مناسب','Product Not Suitable',1,8,'2026-02-08 22:42:31','2026-02-08 22:42:31'),(9,'أخرى','Other',1,9,'2026-02-08 22:42:31','2026-02-08 22:42:31');
/*!40000 ALTER TABLE `deal_lost_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal_stages`
--

DROP TABLE IF EXISTS `deal_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal_stages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `probability` int NOT NULL DEFAULT '0',
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_won` tinyint(1) NOT NULL DEFAULT '0',
  `is_lost` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `deal_stages_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal_stages`
--

LOCK TABLES `deal_stages` WRITE;
/*!40000 ALTER TABLE `deal_stages` DISABLE KEYS */;
INSERT INTO `deal_stages` VALUES (1,'تأهيل','Qualification','qualification',10,'#3B82F6',1,0,0,1,'2026-02-08 22:42:12','2026-02-08 22:42:12'),(2,'تحليل الاحتياجات','Needs Analysis','needs_analysis',20,'#8B5CF6',2,0,0,1,'2026-02-08 22:42:12','2026-02-08 22:42:12'),(3,'عرض السعر','Proposal','proposal',40,'#F59E0B',3,0,0,1,'2026-02-08 22:42:12','2026-02-08 22:42:12'),(4,'التفاوض','Negotiation','negotiation',60,'#EF4444',4,0,0,1,'2026-02-08 22:42:12','2026-02-08 22:42:12'),(5,'مراجعة العقد','Contract Review','contract_review',80,'#10B981',5,0,0,1,'2026-02-08 22:42:12','2026-02-08 22:42:12'),(6,'تم الإغلاق - فوز','Closed Won','closed_won',100,'#22C55E',6,1,0,1,'2026-02-08 22:42:12','2026-02-08 22:42:12'),(7,'تم الإغلاق - خسارة','Closed Lost','closed_lost',0,'#6B7280',7,0,1,1,'2026-02-08 22:42:12','2026-02-08 22:42:12');
/*!40000 ALTER TABLE `deal_stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal_won_reasons`
--

DROP TABLE IF EXISTS `deal_won_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal_won_reasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal_won_reasons`
--

LOCK TABLES `deal_won_reasons` WRITE;
/*!40000 ALTER TABLE `deal_won_reasons` DISABLE KEYS */;
INSERT INTO `deal_won_reasons` VALUES (1,'أفضل سعر','Best Price',1,1,'2026-02-08 22:42:22','2026-02-08 22:42:22'),(2,'جودة المنتج','Product Quality',1,2,'2026-02-08 22:42:22','2026-02-08 22:42:22'),(3,'سرعة الاستجابة','Fast Response',1,3,'2026-02-08 22:42:22','2026-02-08 22:42:22'),(4,'السمعة الجيدة','Good Reputation',1,4,'2026-02-08 22:42:22','2026-02-08 22:42:22'),(5,'علاقة قوية مع العميل','Strong Customer Relationship',1,5,'2026-02-08 22:42:22','2026-02-08 22:42:22'),(6,'ميزات إضافية','Additional Features',1,6,'2026-02-08 22:42:22','2026-02-08 22:42:22'),(7,'دعم فني ممتاز','Excellent Support',1,7,'2026-02-08 22:42:22','2026-02-08 22:42:22'),(8,'أخرى','Other',1,8,'2026-02-08 22:42:22','2026-02-08 22:42:22');
/*!40000 ALTER TABLE `deal_won_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `lead_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `stage_id` bigint unsigned NOT NULL,
  `probability` int NOT NULL DEFAULT '0',
  `amount` decimal(15,2) NOT NULL,
  `weighted_amount` decimal(15,2) DEFAULT NULL,
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EGP',
  `expected_close_date` date DEFAULT NULL,
  `actual_close_date` date DEFAULT NULL,
  `last_activity_date` date DEFAULT NULL,
  `status` enum('open','won','lost','on_hold') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `won_reason_id` bigint unsigned DEFAULT NULL,
  `lost_reason_id` bigint unsigned DEFAULT NULL,
  `competitor_id` bigint unsigned DEFAULT NULL,
  `owner_id` bigint unsigned NOT NULL,
  `source` enum('new_business','upsell','renewal','referral') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint unsigned NOT NULL,
  `closed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `deals_code_unique` (`code`),
  KEY `deals_won_reason_id_foreign` (`won_reason_id`),
  KEY `deals_lost_reason_id_foreign` (`lost_reason_id`),
  KEY `deals_created_by_foreign` (`created_by`),
  KEY `deals_customer_id_index` (`customer_id`),
  KEY `deals_owner_id_index` (`owner_id`),
  KEY `deals_stage_id_index` (`stage_id`),
  KEY `deals_status_index` (`status`),
  KEY `deals_expected_close_date_index` (`expected_close_date`),
  KEY `deals_created_at_index` (`created_at`),
  KEY `idx_deals_owner_stage` (`owner_id`,`stage_id`),
  KEY `idx_deals_stage_close_date` (`stage_id`,`expected_close_date`),
  KEY `idx_deals_customer_stage` (`customer_id`,`stage_id`),
  CONSTRAINT `deals_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `deals_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `deals_lost_reason_id_foreign` FOREIGN KEY (`lost_reason_id`) REFERENCES `deal_lost_reasons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `deals_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `deals_stage_id_foreign` FOREIGN KEY (`stage_id`) REFERENCES `deal_stages` (`id`),
  CONSTRAINT `deals_won_reason_id_foreign` FOREIGN KEY (`won_reason_id`) REFERENCES `deal_won_reasons` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `branch_id` bigint unsigned DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departments_code_unique` (`code`),
  KEY `departments_branch_id_foreign` (`branch_id`),
  CONSTRAINT `departments_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'SALES','المبيعات','Sales','قسم المبيعات',1,1,'2026-02-08 22:44:03','2026-02-08 22:44:03'),(2,'SUPPORT','الدعم الفني','Technical Support','قسم الدعم الفني',1,1,'2026-02-08 22:44:03','2026-02-08 22:44:03'),(3,'CALLCENTER','الكول سنتر','Call Center','قسم الكول سنتر',1,1,'2026-02-08 22:44:03','2026-02-08 22:44:03'),(4,'ADMIN','الإدارة','Administration','قسم الإدارة',1,1,'2026-02-08 22:44:03','2026-02-08 22:44:03'),(5,'MARKETING','التسويق','Marketing','قسم التسويق',1,1,'2026-02-08 22:44:03','2026-02-08 22:44:03');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` bigint unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `districts_code_unique` (`code`),
  KEY `districts_city_id_index` (`city_id`),
  CONSTRAINT `districts_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_downloads`
--

DROP TABLE IF EXISTS `document_downloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_downloads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `document_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `downloaded_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `document_downloads_user_id_foreign` (`user_id`),
  KEY `document_downloads_document_id_downloaded_at_index` (`document_id`,`downloaded_at`),
  CONSTRAINT `document_downloads_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `document_downloads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_downloads`
--

LOCK TABLES `document_downloads` WRITE;
/*!40000 ALTER TABLE `document_downloads` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_downloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_types`
--

DROP TABLE IF EXISTS `document_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `has_expiry` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `document_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_types`
--

LOCK TABLES `document_types` WRITE;
/*!40000 ALTER TABLE `document_types` DISABLE KEYS */;
INSERT INTO `document_types` VALUES (1,'commercial_register','سجل تجاري','Commercial Register','building','#3B82F6',1,1,1,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(2,'tax_card','بطاقة ضريبية','Tax Card','receipt','#10B981',1,1,2,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(3,'national_id','هوية / بطاقة رقم قومي','National ID','id-card','#8B5CF6',1,1,3,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(4,'passport','جواز سفر','Passport','globe','#F59E0B',1,1,4,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(5,'signed_contract','عقد موقع','Signed Contract','file-signature','#EF4444',0,1,5,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(6,'quotation_doc','عرض سعر','Quotation Document','file-text','#06B6D4',0,1,6,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(7,'invoice_doc','فاتورة','Invoice Document','file-spreadsheet','#EC4899',0,1,7,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(8,'payment_receipt','إيصال دفع','Payment Receipt','banknote','#22C55E',0,1,8,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(9,'license','ترخيص','License','shield-check','#F97316',1,1,9,'2026-02-08 23:19:42','2026-02-08 23:19:42'),(10,'other','مستند آخر','Other Document','file','#6B7280',0,1,99,'2026-02-08 23:19:42','2026-02-08 23:19:42');
/*!40000 ALTER TABLE `document_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentation_statuses`
--

DROP TABLE IF EXISTS `documentation_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentation_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documentation_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentation_statuses`
--

LOCK TABLES `documentation_statuses` WRITE;
/*!40000 ALTER TABLE `documentation_statuses` DISABLE KEYS */;
INSERT INTO `documentation_statuses` VALUES (1,'غير موثق','Not Documented','not_documented',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'قيد المراجعة','Under Review','under_review',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'موثق','Documented','documented',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `documentation_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `documentable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `documentable_id` bigint unsigned NOT NULL,
  `document_type_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` bigint unsigned NOT NULL DEFAULT '0',
  `mime_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `reminder_days_before` int unsigned DEFAULT NULL,
  `expiry_notified` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('valid','expired','pending_review','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'valid',
  `review_notes` text COLLATE utf8mb4_unicode_ci,
  `visibility` enum('public','private','role_based') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  `allowed_roles` json DEFAULT NULL,
  `uploaded_by` bigint unsigned NOT NULL,
  `reviewed_by` bigint unsigned DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documents_code_unique` (`code`),
  KEY `documents_documentable_type_documentable_id_index` (`documentable_type`,`documentable_id`),
  KEY `documents_document_type_id_foreign` (`document_type_id`),
  KEY `documents_uploaded_by_foreign` (`uploaded_by`),
  KEY `documents_reviewed_by_foreign` (`reviewed_by`),
  KEY `documents_documentable_type_documentable_id_status_index` (`documentable_type`,`documentable_id`,`status`),
  KEY `documents_expires_at_index` (`expires_at`),
  KEY `documents_status_index` (`status`),
  CONSTRAINT `documents_document_type_id_foreign` FOREIGN KEY (`document_type_id`) REFERENCES `document_types` (`id`) ON DELETE SET NULL,
  CONSTRAINT `documents_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `documents_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_templates`
--

DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_templates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `variables` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `usage_count` int NOT NULL DEFAULT '0',
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_templates_created_by_foreign` (`created_by`),
  KEY `email_templates_category_index` (`category`),
  KEY `email_templates_is_active_index` (`is_active`),
  CONSTRAINT `email_templates_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_templates`
--

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_tracking`
--

DROP TABLE IF EXISTS `email_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_tracking` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trackable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trackable_id` bigint unsigned NOT NULL,
  `email_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipient_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `opened_at` timestamp NULL DEFAULT NULL,
  `open_count` int NOT NULL DEFAULT '0',
  `clicked_at` timestamp NULL DEFAULT NULL,
  `click_count` int NOT NULL DEFAULT '0',
  `clicked_links` json DEFAULT NULL,
  `bounced_at` timestamp NULL DEFAULT NULL,
  `bounce_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_tracking_trackable_type_trackable_id_index` (`trackable_type`,`trackable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_tracking`
--

LOCK TABLES `email_tracking` WRITE;
/*!40000 ALTER TABLE `email_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `favoritable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `favoritable_id` bigint unsigned NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `favorites_user_id_favoritable_type_favoritable_id_unique` (`user_id`,`favoritable_type`,`favoritable_id`),
  KEY `favorites_user_id_favoritable_type_index` (`user_id`,`favoritable_type`),
  CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followup_statuses`
--

DROP TABLE IF EXISTS `followup_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followup_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `followup_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followup_statuses`
--

LOCK TABLES `followup_statuses` WRITE;
/*!40000 ALTER TABLE `followup_statuses` DISABLE KEYS */;
INSERT INTO `followup_statuses` VALUES (1,'معلقة','Pending','pending','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'مكتملة','Completed','completed','#10B981',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'ملغاة','Cancelled','cancelled','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `followup_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followup_types`
--

DROP TABLE IF EXISTS `followup_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followup_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#3B82F6',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `followup_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followup_types`
--

LOCK TABLES `followup_types` WRITE;
/*!40000 ALTER TABLE `followup_types` DISABLE KEYS */;
INSERT INTO `followup_types` VALUES (1,'call','مكالمة','Call','phone','#3B82F6',1,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(2,'meeting','اجتماع','Meeting','users','#8B5CF6',2,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(3,'whatsapp','واتساب','WhatsApp','message-circle','#22C55E',3,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(4,'email','بريد إلكتروني','Email','mail','#F59E0B',4,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(5,'visit','زيارة','Visit','map-pin','#EF4444',5,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(6,'other','أخرى','Other','more-horizontal','#6B7280',99,1,'2026-02-08 22:42:32','2026-02-08 22:42:32');
/*!40000 ALTER TABLE `followup_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followups`
--

DROP TABLE IF EXISTS `followups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followups` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `followup_type_id` bigint unsigned NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `scheduled_at` timestamp NOT NULL,
  `reminder_sent_at` timestamp NULL DEFAULT NULL,
  `notified_overdue_at` timestamp NULL DEFAULT NULL,
  `reminder_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','completed','postponed','overdue','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `priority` enum('low','normal','high') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `is_recurring` tinyint(1) NOT NULL DEFAULT '0',
  `recurrence_type` enum('daily','weekly','biweekly','monthly','quarterly','yearly') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recurrence_interval` int NOT NULL DEFAULT '1',
  `recurrence_end_date` date DEFAULT NULL,
  `parent_followup_id` bigint unsigned DEFAULT NULL,
  `visit_id` bigint unsigned DEFAULT NULL,
  `source_call_id` bigint unsigned DEFAULT NULL,
  `source_type` enum('manual','call','visit','deal','automation') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'manual',
  `auto_created_visit` tinyint(1) NOT NULL DEFAULT '0',
  `recurrence_count` int NOT NULL DEFAULT '0',
  `outcome` text COLLATE utf8mb4_unicode_ci,
  `next_action` text COLLATE utf8mb4_unicode_ci,
  `postponed_count` int NOT NULL DEFAULT '0',
  `postpone_reason_id` bigint unsigned DEFAULT NULL,
  `original_scheduled_at` timestamp NULL DEFAULT NULL,
  `cancel_reason_id` bigint unsigned DEFAULT NULL,
  `cancel_notes` text COLLATE utf8mb4_unicode_ci,
  `assigned_to` bigint unsigned NOT NULL,
  `assigned_by` bigint unsigned NOT NULL,
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `followups_code_unique` (`code`),
  KEY `followups_followup_type_id_foreign` (`followup_type_id`),
  KEY `followups_postpone_reason_id_foreign` (`postpone_reason_id`),
  KEY `followups_cancel_reason_id_foreign` (`cancel_reason_id`),
  KEY `followups_assigned_by_foreign` (`assigned_by`),
  KEY `followups_created_by_foreign` (`created_by`),
  KEY `followups_customer_id_index` (`customer_id`),
  KEY `followups_assigned_to_index` (`assigned_to`),
  KEY `followups_scheduled_at_index` (`scheduled_at`),
  KEY `followups_status_index` (`status`),
  KEY `followups_priority_index` (`priority`),
  KEY `followups_status_scheduled_at_index` (`status`,`scheduled_at`),
  KEY `followups_assigned_to_status_index` (`assigned_to`,`status`),
  KEY `followups_is_recurring_index` (`is_recurring`),
  KEY `followups_parent_followup_id_index` (`parent_followup_id`),
  KEY `idx_followups_assigned_status_scheduled` (`assigned_to`,`status`,`scheduled_at`),
  KEY `idx_followups_customer_status` (`customer_id`,`status`),
  KEY `idx_followups_scheduled_status` (`scheduled_at`,`status`),
  KEY `followups_visit_id_foreign` (`visit_id`),
  KEY `followups_source_call_id_foreign` (`source_call_id`),
  CONSTRAINT `followups_assigned_by_foreign` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`),
  CONSTRAINT `followups_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  CONSTRAINT `followups_cancel_reason_id_foreign` FOREIGN KEY (`cancel_reason_id`) REFERENCES `cancel_reasons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `followups_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `followups_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `followups_followup_type_id_foreign` FOREIGN KEY (`followup_type_id`) REFERENCES `followup_types` (`id`),
  CONSTRAINT `followups_parent_followup_id_foreign` FOREIGN KEY (`parent_followup_id`) REFERENCES `followups` (`id`) ON DELETE SET NULL,
  CONSTRAINT `followups_postpone_reason_id_foreign` FOREIGN KEY (`postpone_reason_id`) REFERENCES `postpone_reasons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `followups_source_call_id_foreign` FOREIGN KEY (`source_call_id`) REFERENCES `calls` (`id`) ON DELETE SET NULL,
  CONSTRAINT `followups_visit_id_foreign` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followups`
--

LOCK TABLES `followups` WRITE;
/*!40000 ALTER TABLE `followups` DISABLE KEYS */;
/*!40000 ALTER TABLE `followups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_fields`
--

DROP TABLE IF EXISTS `form_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_fields` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `form_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('text','textarea','number','email','phone','url','select','multiselect','radio','checkbox','date','datetime','time','file','image','rating','hidden') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `placeholder` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `help_text` text COLLATE utf8mb4_unicode_ci,
  `options` json DEFAULT NULL,
  `validation_rules` json DEFAULT NULL,
  `default_value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_required` tinyint(1) NOT NULL DEFAULT '0',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `width` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'full',
  `conditional_logic` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_fields_form_id_sort_order_index` (`form_id`,`sort_order`),
  CONSTRAINT `form_fields_form_id_foreign` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_fields`
--

LOCK TABLES `form_fields` WRITE;
/*!40000 ALTER TABLE `form_fields` DISABLE KEYS */;
/*!40000 ALTER TABLE `form_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_submissions`
--

DROP TABLE IF EXISTS `form_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_submissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `form_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `submittable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `submittable_id` bigint unsigned NOT NULL,
  `data` json NOT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referrer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','reviewed','processed','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `reviewed_by` bigint unsigned DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `review_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_submissions_user_id_foreign` (`user_id`),
  KEY `form_submissions_submittable_type_submittable_id_index` (`submittable_type`,`submittable_id`),
  KEY `form_submissions_reviewed_by_foreign` (`reviewed_by`),
  KEY `form_submissions_form_id_status_index` (`form_id`,`status`),
  CONSTRAINT `form_submissions_form_id_foreign` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `form_submissions_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `form_submissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_submissions`
--

LOCK TABLES `form_submissions` WRITE;
/*!40000 ALTER TABLE `form_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `form_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `type` enum('survey','feedback','lead_capture','registration','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'custom',
  `target_entity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `requires_auth` tinyint(1) NOT NULL DEFAULT '1',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `max_submissions` int DEFAULT NULL,
  `settings` json DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forms_code_unique` (`code`),
  KEY `forms_created_by_foreign` (`created_by`),
  KEY `forms_type_is_active_index` (`type`,`is_active`),
  CONSTRAINT `forms_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `governorates`
--

DROP TABLE IF EXISTS `governorates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `governorates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` bigint unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `governorates_code_unique` (`code`),
  KEY `governorates_country_id_index` (`country_id`),
  CONSTRAINT `governorates_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `governorates`
--

LOCK TABLES `governorates` WRITE;
/*!40000 ALTER TABLE `governorates` DISABLE KEYS */;
INSERT INTO `governorates` VALUES (1,'CAI','القاهرة','Cairo',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(2,'GIZ','الجيزة','Giza',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(3,'ALX','الإسكندرية','Alexandria',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(4,'ASN','أسوان','Aswan',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(5,'AST','أسيوط','Asyut',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(6,'BHR','البحيرة','Beheira',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(7,'BNS','بني سويف','Beni Suef',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(8,'DKH','الدقهلية','Dakahlia',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(9,'DMT','دمياط','Damietta',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(10,'FYM','الفيوم','Fayoum',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(11,'GHR','الغربية','Gharbia',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(12,'ISM','الإسماعيلية','Ismailia',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(13,'KFS','كفر الشيخ','Kafr El Sheikh',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(14,'LXR','الأقصر','Luxor',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(15,'MNF','المنوفية','Monufia',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(16,'MNY','المنيا','Minya',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(17,'PTS','بورسعيد','Port Said',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(18,'QLB','القليوبية','Qalyubia',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(19,'QNA','قنا','Qena',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(20,'SHG','سوهاج','Sohag',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(21,'SHR','الشرقية','Sharqia',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(22,'SUZ','السويس','Suez',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(23,'BSN','البحر الأحمر','Red Sea',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(24,'MTR','مطروح','Matrouh',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(25,'SNA','شمال سيناء','North Sinai',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(26,'SSA','جنوب سيناء','South Sinai',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(27,'WDG','الوادي الجديد','New Valley',1,1,'2026-01-30 15:05:28','2026-01-30 15:05:28');
/*!40000 ALTER TABLE `governorates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holidays` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `type` enum('national','religious','company','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'national',
  `is_recurring` tinyint(1) NOT NULL DEFAULT '0',
  `branch_id` bigint unsigned DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `holidays_branch_id_foreign` (`branch_id`),
  KEY `holidays_date_index` (`date`),
  KEY `holidays_date_end_date_index` (`date`,`end_date`),
  KEY `holidays_type_index` (`type`),
  CONSTRAINT `holidays_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES (1,'رأس السنة الميلادية','New Year','2026-01-01',NULL,'national',1,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20'),(2,'عيد الشرطة','Police Day','2026-01-25',NULL,'national',1,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20'),(3,'ثورة 25 يناير','Revolution Day','2026-01-25',NULL,'national',1,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20'),(4,'شم النسيم','Sham El-Nessim','2026-04-20',NULL,'national',0,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20'),(5,'عيد العمال','Labor Day','2026-05-01',NULL,'national',1,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20'),(6,'ثورة 30 يونيو','30 June Revolution','2026-06-30',NULL,'national',1,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20'),(7,'ثورة 23 يوليو','23 July Revolution','2026-07-23',NULL,'national',1,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20'),(8,'عيد القوات المسلحة','Armed Forces Day','2026-10-06',NULL,'national',1,NULL,1,'2026-02-08 22:43:20','2026-02-08 22:43:20');
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industries`
--

DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `industries_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` VALUES (1,'technology','تكنولوجيا','Technology',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'real_estate','عقارات','Real Estate',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'retail','تجارة التجزئة','Retail',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(4,'wholesale','تجارة الجملة','Wholesale',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(5,'manufacturing','صناعة','Manufacturing',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(6,'construction','مقاولات','Construction',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(7,'healthcare','صحة','Healthcare',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(8,'education','تعليم','Education',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(9,'hospitality','ضيافة وفنادق','Hospitality',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(10,'food','أغذية ومشروبات','Food & Beverage',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(11,'transportation','نقل','Transportation',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(12,'finance','خدمات مالية','Finance',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(13,'consulting','استشارات','Consulting',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(14,'marketing','تسويق وإعلان','Marketing',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(15,'legal','خدمات قانونية','Legal',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(16,'fashion','ملابس وأزياء','Fashion',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(17,'automotive','سيارات','Automotive',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(18,'agriculture','زراعة','Agriculture',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(19,'energy','طاقة','Energy',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(20,'telecom','اتصالات','Telecommunications',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(21,'entertainment','ترفيه','Entertainment',NULL,1,'2026-01-30 15:05:28','2026-01-30 15:05:28'),(22,'other','أخرى','Other',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(23,'trading','تجارة','Trading',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(24,'tourism','سياحة','Tourism',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(25,'financial','خدمات مالية','Financial Services',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(26,'media','إعلام','Media',NULL,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(27,'test','TEST','TEST',NULL,1,'2026-02-09 01:00:43','2026-02-09 01:00:43');
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `integration_logs`
--

DROP TABLE IF EXISTS `integration_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `integration_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `integration_id` bigint unsigned NOT NULL,
  `direction` enum('inbound','outbound') COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` json DEFAULT NULL,
  `response` json DEFAULT NULL,
  `status` enum('success','failed','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `response_time_ms` int unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `integration_logs_integration_id_created_at_index` (`integration_id`,`created_at`),
  KEY `integration_logs_event_type_status_index` (`event_type`,`status`),
  CONSTRAINT `integration_logs_integration_id_foreign` FOREIGN KEY (`integration_id`) REFERENCES `integrations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `integration_logs`
--

LOCK TABLES `integration_logs` WRITE;
/*!40000 ALTER TABLE `integration_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `integration_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `integrations`
--

DROP TABLE IF EXISTS `integrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `integrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `webhook_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `config` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `last_connected_at` timestamp NULL DEFAULT NULL,
  `last_error_at` timestamp NULL DEFAULT NULL,
  `last_error_message` text COLLATE utf8mb4_unicode_ci,
  `status` enum('connected','disconnected','error','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disconnected',
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `integrations_code_unique` (`code`),
  KEY `integrations_created_by_foreign` (`created_by`),
  CONSTRAINT `integrations_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `integrations`
--

LOCK TABLES `integrations` WRITE;
/*!40000 ALTER TABLE `integrations` DISABLE KEYS */;
INSERT INTO `integrations` VALUES (1,'n8n_main','أتمتة n8n الرئيسية','Main n8n Automation','n8n','ربط سير العمل التلقائي مع n8n','workflow','#FF6D5A',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'disconnected',1,'2026-02-08 23:26:43','2026-02-08 23:26:43'),(2,'whatsapp_business','واتساب بيزنس','WhatsApp Business','whatsapp','استقبال وإرسال رسائل واتساب','message-circle','#25D366',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'disconnected',1,'2026-02-08 23:26:43','2026-02-08 23:26:43'),(3,'facebook_leads','فيسبوك Lead Ads','Facebook Lead Ads','facebook','استقبال Leads من إعلانات فيسبوك','facebook','#1877F2',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'disconnected',1,'2026-02-08 23:26:43','2026-02-08 23:26:43'),(4,'sms_gateway','بوابة الرسائل النصية','SMS Gateway','sms','إرسال رسائل نصية للعملاء','smartphone','#F59E0B',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'disconnected',1,'2026-02-08 23:26:43','2026-02-08 23:26:43'),(5,'email_smtp','البريد الإلكتروني SMTP','Email SMTP','email','إرسال بريد إلكتروني عبر SMTP','mail','#6366F1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'disconnected',1,'2026-02-08 23:26:43','2026-02-08 23:26:43');
/*!40000 ALTER TABLE `integrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interest_level_history`
--

DROP TABLE IF EXISTS `interest_level_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interest_level_history` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `previous_level` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `new_level` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'auto_cooling',
  `changed_by` bigint unsigned DEFAULT NULL,
  `is_auto` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `interest_level_history_changed_by_foreign` (`changed_by`),
  KEY `interest_level_history_customer_id_created_at_index` (`customer_id`,`created_at`),
  CONSTRAINT `interest_level_history_changed_by_foreign` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `interest_level_history_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interest_level_history`
--

LOCK TABLES `interest_level_history` WRITE;
/*!40000 ALTER TABLE `interest_level_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `interest_level_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interest_levels`
--

DROP TABLE IF EXISTS `interest_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interest_levels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int NOT NULL DEFAULT '0',
  `cooling_days` int NOT NULL DEFAULT '30',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `interest_levels_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interest_levels`
--

LOCK TABLES `interest_levels` WRITE;
/*!40000 ALTER TABLE `interest_levels` DISABLE KEYS */;
INSERT INTO `interest_levels` VALUES (1,'low','منخفض','Low','#EF4444',1,30,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'medium','متوسط','Medium','#F59E0B',2,14,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'high','عالي','High','#10B981',3,7,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `interest_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internal_comments`
--

DROP TABLE IF EXISTS `internal_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internal_comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `commentable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `commentable_id` bigint unsigned NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `internal_comments_user_id_foreign` (`user_id`),
  KEY `internal_comments_commentable_type_commentable_id_index` (`commentable_type`,`commentable_id`),
  CONSTRAINT `internal_comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internal_comments`
--

LOCK TABLES `internal_comments` WRITE;
/*!40000 ALTER TABLE `internal_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `internal_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT '1.00',
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(5,2) NOT NULL DEFAULT '0.00',
  `tax_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_items_invoice_id_foreign` (`invoice_id`),
  KEY `invoice_items_product_id_foreign` (`product_id`),
  CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoice_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_payment_plan_items`
--

DROP TABLE IF EXISTS `invoice_payment_plan_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_payment_plan_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` bigint unsigned NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `milestone` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `due_date` date NOT NULL,
  `status` enum('pending','paid','overdue','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `payment_id` bigint unsigned DEFAULT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_payment_plan_items_payment_id_foreign` (`payment_id`),
  KEY `invoice_payment_plan_items_plan_id_status_index` (`plan_id`,`status`),
  KEY `invoice_payment_plan_items_due_date_index` (`due_date`),
  CONSTRAINT `invoice_payment_plan_items_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `invoice_payment_plan_items_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `invoice_payment_plans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_payment_plan_items`
--

LOCK TABLES `invoice_payment_plan_items` WRITE;
/*!40000 ALTER TABLE `invoice_payment_plan_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_payment_plan_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_payment_plans`
--

DROP TABLE IF EXISTS `invoice_payment_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_payment_plans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `plan_type` enum('single','advance_delivery','milestone') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'single',
  `reminder_days` int unsigned NOT NULL DEFAULT '3',
  `late_notification` tinyint(1) NOT NULL DEFAULT '1',
  `status` enum('active','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_payment_plans_created_by_foreign` (`created_by`),
  KEY `invoice_payment_plans_invoice_id_status_index` (`invoice_id`,`status`),
  CONSTRAINT `invoice_payment_plans_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `invoice_payment_plans_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_payment_plans`
--

LOCK TABLES `invoice_payment_plans` WRITE;
/*!40000 ALTER TABLE `invoice_payment_plans` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_payment_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `contract_id` bigint unsigned DEFAULT NULL,
  `quotation_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `subtotal` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tax_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `paid_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `status` enum('draft','sent','paid','partial','overdue','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `terms` text COLLATE utf8mb4_unicode_ci,
  `sent_at` timestamp NULL DEFAULT NULL,
  `sent_to_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `last_overdue_notification_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoices_code_unique` (`code`),
  KEY `invoices_contract_id_foreign` (`contract_id`),
  KEY `invoices_created_by_foreign` (`created_by`),
  KEY `invoices_customer_id_index` (`customer_id`),
  KEY `invoices_status_index` (`status`),
  KEY `invoices_due_date_index` (`due_date`),
  CONSTRAINT `invoices_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `invoices_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'default','{\"uuid\":\"cd77c1e3-3062-4421-bc55-b73e055dc62d\",\"displayName\":\"App\\\\Jobs\\\\ProcessRemindersJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\ProcessRemindersJob\",\"command\":\"O:28:\\\"App\\\\Jobs\\\\ProcessRemindersJob\\\":0:{}\"}}',0,NULL,1770763817,1770763817);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kb_articles`
--

DROP TABLE IF EXISTS `kb_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kb_articles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `tags` json DEFAULT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `is_pinned` tinyint(1) NOT NULL DEFAULT '0',
  `views_count` int NOT NULL DEFAULT '0',
  `helpful_count` int NOT NULL DEFAULT '0',
  `not_helpful_count` int NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kb_articles_slug_unique` (`slug`),
  KEY `kb_articles_category_id_foreign` (`category_id`),
  KEY `kb_articles_author_id_foreign` (`author_id`),
  FULLTEXT KEY `kb_articles_title_content_fulltext` (`title`,`content`),
  CONSTRAINT `kb_articles_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `kb_articles_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `kb_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kb_articles`
--

LOCK TABLES `kb_articles` WRITE;
/*!40000 ALTER TABLE `kb_articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `kb_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kb_categories`
--

DROP TABLE IF EXISTS `kb_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kb_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kb_categories_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kb_categories`
--

LOCK TABLES `kb_categories` WRITE;
/*!40000 ALTER TABLE `kb_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `kb_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lead_assignments`
--

DROP TABLE IF EXISTS `lead_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lead_assignments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lead_id` bigint unsigned NOT NULL,
  `assigned_to` bigint unsigned NOT NULL,
  `assigned_from` bigint unsigned DEFAULT NULL,
  `assigned_by` bigint unsigned NOT NULL,
  `assignment_type` enum('auto','manual','region_based','load_based','reassignment','escalation') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'manual',
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `status` enum('active','completed','cancelled','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `assigned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NULL DEFAULT NULL,
  `first_contact_at` timestamp NULL DEFAULT NULL,
  `is_contacted` tinyint(1) NOT NULL DEFAULT '0',
  `contact_attempts` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lead_assignments_assigned_from_foreign` (`assigned_from`),
  KEY `lead_assignments_lead_id_index` (`lead_id`),
  KEY `lead_assignments_assigned_to_index` (`assigned_to`),
  KEY `lead_assignments_assigned_by_index` (`assigned_by`),
  KEY `lead_assignments_assignment_type_index` (`assignment_type`),
  KEY `lead_assignments_status_index` (`status`),
  KEY `lead_assignments_assigned_at_index` (`assigned_at`),
  KEY `lead_assignments_assigned_to_status_index` (`assigned_to`,`status`),
  KEY `lead_assignments_lead_id_status_index` (`lead_id`,`status`),
  CONSTRAINT `lead_assignments_assigned_by_foreign` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lead_assignments_assigned_from_foreign` FOREIGN KEY (`assigned_from`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `lead_assignments_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lead_assignments_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lead_assignments`
--

LOCK TABLES `lead_assignments` WRITE;
/*!40000 ALTER TABLE `lead_assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `lead_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lead_duplicates`
--

DROP TABLE IF EXISTS `lead_duplicates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lead_duplicates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `original_lead_id` bigint unsigned NOT NULL,
  `duplicate_lead_id` bigint unsigned NOT NULL,
  `match_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `match_score` decimal(5,2) NOT NULL DEFAULT '100.00',
  `status` enum('pending','merged','rejected','kept_separate') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `reviewed_by` bigint unsigned DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `review_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lead_duplicates_original_lead_id_duplicate_lead_id_unique` (`original_lead_id`,`duplicate_lead_id`),
  KEY `lead_duplicates_duplicate_lead_id_foreign` (`duplicate_lead_id`),
  KEY `lead_duplicates_reviewed_by_foreign` (`reviewed_by`),
  KEY `lead_duplicates_status_match_type_index` (`status`,`match_type`),
  CONSTRAINT `lead_duplicates_duplicate_lead_id_foreign` FOREIGN KEY (`duplicate_lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lead_duplicates_original_lead_id_foreign` FOREIGN KEY (`original_lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lead_duplicates_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lead_duplicates`
--

LOCK TABLES `lead_duplicates` WRITE;
/*!40000 ALTER TABLE `lead_duplicates` DISABLE KEYS */;
/*!40000 ALTER TABLE `lead_duplicates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lead_qualities`
--

DROP TABLE IF EXISTS `lead_qualities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lead_qualities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lead_qualities_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lead_qualities`
--

LOCK TABLES `lead_qualities` WRITE;
/*!40000 ALTER TABLE `lead_qualities` DISABLE KEYS */;
INSERT INTO `lead_qualities` VALUES (1,'بارد','Cold','cold','#3B82F6',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'دافئ','Warm','warm','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'ساخن','Hot','hot','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `lead_qualities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_normalized` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` bigint unsigned DEFAULT NULL,
  `governorate_id` bigint unsigned DEFAULT NULL,
  `city_id` bigint unsigned DEFAULT NULL,
  `status` enum('new','in_review','contacted','qualified','disqualified','converted','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `quality` enum('hot','warm','cold') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cold',
  `score` int NOT NULL DEFAULT '0',
  `source` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'manual',
  `source_channel` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `campaign_id` bigint unsigned DEFAULT NULL,
  `external_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_type` enum('individual','company','organization') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `industry_id` bigint unsigned DEFAULT NULL,
  `expected_budget` decimal(15,2) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `products_interested` text COLLATE utf8mb4_unicode_ci,
  `assigned_to` bigint unsigned DEFAULT NULL,
  `assigned_at` timestamp NULL DEFAULT NULL,
  `first_contact_at` timestamp NULL DEFAULT NULL,
  `last_contact_at` timestamp NULL DEFAULT NULL,
  `contact_attempts` int NOT NULL DEFAULT '0',
  `converted_to_customer_id` bigint unsigned DEFAULT NULL,
  `converted_at` timestamp NULL DEFAULT NULL,
  `converted_by` bigint unsigned DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `leads_code_unique` (`code`),
  KEY `leads_created_by_foreign` (`created_by`),
  KEY `leads_phone_index` (`phone`),
  KEY `leads_status_index` (`status`),
  KEY `leads_quality_index` (`quality`),
  KEY `leads_source_index` (`source`),
  KEY `leads_assigned_to_index` (`assigned_to`),
  KEY `leads_created_at_index` (`created_at`),
  KEY `idx_leads_assigned_status` (`assigned_to`,`status`),
  KEY `idx_leads_governorate_assigned` (`governorate_id`,`assigned_to`),
  CONSTRAINT `leads_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `leads_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lost_reasons`
--

DROP TABLE IF EXISTS `lost_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lost_reasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requires_details` tinyint(1) NOT NULL DEFAULT '0',
  `requires_competitor` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lost_reasons_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lost_reasons`
--

LOCK TABLES `lost_reasons` WRITE;
/*!40000 ALTER TABLE `lost_reasons` DISABLE KEYS */;
INSERT INTO `lost_reasons` VALUES (1,'PRICE_HIGH','السعر مرتفع','Price too high',1,1,1,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(2,'COMPETITOR','اشترى من منافس','Bought from competitor',0,1,2,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(3,'NOT_INTERESTED','لم يعد مهتماً','No longer interested',1,0,3,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(4,'BUDGET','خارج الميزانية','Out of budget',0,0,4,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(5,'LATE_RESPONSE','تأخر الرد','Late response',0,0,5,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(6,'QUALITY','جودة المنتج غير مناسبة','Product quality not suitable',1,0,6,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(7,'TIMELINE','الجدول الزمني غير مناسب','Timeline not suitable',1,0,7,1,'2026-02-08 22:42:34','2026-02-08 22:42:34'),(8,'OTHER','سبب آخر','Other reason',1,0,99,1,'2026-02-08 22:42:34','2026-02-08 22:42:34');
/*!40000 ALTER TABLE `lost_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_templates`
--

DROP TABLE IF EXISTS `message_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_templates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `channel` enum('sms','whatsapp','email') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sms',
  `category` enum('marketing','followup','notification','reminder','welcome','thank_you','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_ar` text COLLATE utf8mb4_unicode_ci,
  `variables` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `usage_count` int NOT NULL DEFAULT '0',
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `message_templates_created_by_foreign` (`created_by`),
  KEY `message_templates_channel_category_is_active_index` (`channel`,`category`,`is_active`),
  CONSTRAINT `message_templates_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_templates`
--

LOCK TABLES `message_templates` WRITE;
/*!40000 ALTER TABLE `message_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2024_01_01_000001_create_countries_table',1),(2,'2024_01_01_000002_create_governorates_table',1),(3,'2024_01_01_000003_create_cities_table',1),(4,'2024_01_01_000004_create_districts_table',1),(5,'2024_01_01_000005_create_industries_table',1),(6,'2024_01_01_000006_create_customer_statuses_table',1),(7,'2024_01_01_000007_create_customer_sources_table',1),(8,'2024_01_01_000010_create_branches_table',1),(9,'2024_01_01_000011_create_departments_table',1),(10,'2024_01_01_000012_create_roles_table',1),(11,'2024_01_01_000013_create_users_table',1),(12,'2024_01_01_000020_create_customers_table',1),(13,'2024_01_01_000021_create_customer_contacts_table',1),(14,'2024_01_01_000030_create_activity_log_table',1),(15,'2024_01_02_000001_create_lost_reasons_table',1),(16,'2024_01_02_000002_create_competitors_table',1),(17,'2024_01_02_000003_create_customer_status_history_table',1),(18,'2024_01_02_000004_add_interest_fields_to_customers_table',1),(19,'2024_01_03_000001_create_followup_types_table',1),(20,'2024_01_03_000002_create_postpone_reasons_table',1),(21,'2024_01_03_000003_create_cancel_reasons_table',1),(22,'2024_01_03_000004_create_followups_table',1),(23,'2024_01_03_000005_create_tasks_table',1),(24,'2024_01_04_000001_create_call_categories_table',1),(25,'2024_01_04_000002_create_calls_table',1),(26,'2024_01_04_000003_add_extra_fields_to_customers_table',1),(27,'2024_01_05_000001_create_deal_stages_table',1),(28,'2024_01_05_000002_create_deal_won_reasons_table',1),(29,'2024_01_05_000003_create_deal_lost_reasons_table',1),(30,'2024_01_05_000004_create_deals_table',1),(31,'2024_01_06_000001_create_quotations_table',1),(32,'2024_01_06_000002_create_quotation_items_table',1),(33,'2024_01_06_000003_create_leads_table',1),(34,'2024_01_07_000001_create_product_categories_table',1),(35,'2024_01_07_000002_create_units_table',1),(36,'2024_01_07_000003_create_products_table',1),(37,'2024_01_08_000001_create_ticket_categories_table',1),(38,'2024_01_08_000002_create_tickets_table',1),(39,'2024_01_08_000003_create_ticket_replies_table',1),(40,'2024_01_09_000001_create_contracts_table',1),(41,'2024_01_09_000001_create_message_templates_table',1),(42,'2024_01_09_000002_create_contract_items_table',1),(43,'2024_01_10_000001_create_invoices_table',1),(44,'2024_01_10_000002_create_invoice_items_table',1),(45,'2024_01_10_000003_create_payments_table',1),(46,'2024_01_11_000001_create_notifications_table',1),(47,'2024_01_11_000002_create_campaigns_table',1),(48,'2024_01_11_000003_create_visits_table',1),(49,'2024_01_12_000001_create_targets_table',1),(50,'2024_01_13_000001_create_permissions_table',1),(51,'2024_01_13_000002_create_role_permissions_table',1),(52,'2024_01_13_000003_create_regions_table',1),(53,'2024_01_13_000004_create_settings_table',1),(54,'2024_01_13_000005_create_user_permissions_table',1),(55,'2024_01_14_000001_create_approval_requests_table',1),(56,'2024_01_14_000002_create_approval_levels_table',1),(57,'2024_01_15_000001_add_module_action_to_permissions_table',1),(58,'2024_01_16_000001_create_quotation_templates_table',1),(59,'2024_01_17_000001_create_call_scripts_table',1),(60,'2024_01_18_000001_create_email_templates_table',1),(61,'2026_01_03_004411_create_cache_table',1),(62,'2026_01_04_231736_create_personal_access_tokens_table',1),(63,'2026_01_07_000001_create_interest_level_history_table',1),(64,'2026_01_07_000002_create_customer_products_table',1),(65,'2026_01_07_000003_create_contract_signatures_table',1),(66,'2026_01_07_000010_create_lookup_tables',1),(67,'2026_01_07_000011_add_preferences_to_users_table',1),(68,'2026_01_07_000012_create_lookup_tables',1),(69,'2026_01_09_000001_create_notification_settings_table',1),(70,'2026_01_09_000002_create_notification_templates_table',1),(71,'2026_01_09_000003_create_notification_logs_table',1),(72,'2026_01_09_000004_create_working_hours_table',1),(73,'2026_01_09_000005_create_holidays_table',1),(74,'2026_01_09_000006_create_sla_configs_table',1),(75,'2026_01_09_000007_create_reminders_table',1),(76,'2026_01_09_000008_add_notification_fields_to_followups_table',1),(77,'2026_01_09_000009_add_fields_to_notifications_table',1),(78,'2026_01_09_000010_add_last_overdue_notification_to_invoices_table',1),(79,'2026_02_09_000001_create_product_pricing_table',2),(80,'2026_01_09_173000_create_interest_level_history_table',79),(81,'2026_01_09_180000_add_recurrence_to_followups',80),(82,'2026_01_09_183000_create_contract_templates_table',80),(83,'2026_01_09_184000_create_user_points_table',80),(84,'2026_01_09_185000_create_internal_comments_table',80),(85,'2026_01_10_000001_create_lead_assignments_table',80),(86,'2026_01_10_000001_create_user_delegations_table',80),(87,'2026_01_10_000002_add_dnd_fields_to_notification_settings',80),(88,'2026_01_10_000003_add_actions_to_notifications_table',80),(89,'2026_01_10_000004_add_analytics_fields_to_notifications',80),(90,'2026_01_10_230401_create_customer_qr_codes_table',80),(91,'2026_01_10_230402_create_lead_duplicates_table',80),(92,'2026_01_10_230403_create_buying_stages_table',80),(93,'2026_01_10_230404_create_not_interested_reasons_table',80),(94,'2026_01_10_230405_create_workflows_tables',80),(95,'2026_01_10_230406_add_composite_indexes',81),(96,'2026_01_10_231701_create_archive_reasons_table',81),(97,'2026_01_10_231702_create_forms_tables',81),(98,'2026_01_10_231703_create_email_tracking_table',82),(99,'2026_01_10_232802_add_timezone_to_users',82),(100,'2026_01_10_232801_add_discount_limit_to_roles',83),(101,'2026_01_11_000001_add_followup_visit_call_relations',83),(102,'2026_01_11_000003_add_verification_status_to_customers',84),(103,'2026_01_11_000001_add_qr_token_to_customers_table',85),(104,'2026_01_11_000002_create_visit_postpone_rules_table',85),(105,'2026_02_09_000002_create_invoice_payment_plans_tables',86),(106,'2026_02_09_000003_create_documents_table',87),(107,'2026_02_09_000004_create_announcements_tables',88),(108,'2026_02_09_000005_create_integrations_table',89),(109,'2026_02_09_000006_create_custom_reports_table',90),(110,'2026_02_11_003250_create_jobs_table',91),(111,'2026_02_11_003258_create_failed_jobs_table',91),(112,'2026_02_11_003304_create_job_batches_table',91),(113,'2026_02_11_030000_create_surveys_tables',92),(114,'2026_02_11_031500_create_favorites_table',93),(115,'2026_02_11_032000_create_knowledge_base_tables',94),(116,'2026_02_13_020523_create_model_has_permissions_table',95),(117,'2026_02_13_022704_add_slug_and_is_active_to_roles_table',96);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(3,'App\\Models\\User',2),(2,'App\\Models\\User',3),(1,'App\\Models\\User',4),(3,'App\\Models\\User',5),(3,'App\\Models\\User',6),(3,'App\\Models\\User',7),(1,'App\\Models\\User',8);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `not_interested_reasons`
--

DROP TABLE IF EXISTS `not_interested_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `not_interested_reasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `applies_to` enum('customer','lead','both') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'both',
  `requires_competitor` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `not_interested_reasons_code_unique` (`code`),
  KEY `not_interested_reasons_applies_to_is_active_index` (`applies_to`,`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `not_interested_reasons`
--

LOCK TABLES `not_interested_reasons` WRITE;
/*!40000 ALTER TABLE `not_interested_reasons` DISABLE KEYS */;
INSERT INTO `not_interested_reasons` VALUES (1,'السعر مرتفع','Price too high','price_high',NULL,'both',0,1,0,'2026-02-09 00:53:37','2026-02-09 00:53:37'),(2,'لا يحتاج المنتج','No need for product','no_need',NULL,'both',0,1,0,'2026-02-09 00:53:37','2026-02-09 00:53:37'),(3,'يتعامل مع منافس','Working with competitor','competitor',NULL,'both',0,1,0,'2026-02-09 00:53:37','2026-02-09 00:53:37'),(4,'التوقيت غير مناسب','Bad timing','bad_timing',NULL,'both',0,1,0,'2026-02-09 00:53:37','2026-02-09 00:53:37'),(5,'لا يوجد ميزانية','No budget','no_budget',NULL,'both',0,1,0,'2026-02-09 00:53:37','2026-02-09 00:53:37');
/*!40000 ALTER TABLE `not_interested_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_logs`
--

DROP TABLE IF EXISTS `notification_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `notification_id` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `notification_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','sent','failed','delivered','read') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `response` text COLLATE utf8mb4_unicode_ci,
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `attempts` tinyint unsigned NOT NULL DEFAULT '0',
  `sent_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `next_retry_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notification_logs_notification_id_foreign` (`notification_id`),
  KEY `notification_logs_status_index` (`status`),
  KEY `notification_logs_channel_index` (`channel`),
  KEY `notification_logs_notification_type_index` (`notification_type`),
  KEY `notification_logs_user_id_created_at_index` (`user_id`,`created_at`),
  CONSTRAINT `notification_logs_notification_id_foreign` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notification_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_logs`
--

LOCK TABLES `notification_logs` WRITE;
/*!40000 ALTER TABLE `notification_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_settings`
--

DROP TABLE IF EXISTS `notification_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `notification_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel_database` tinyint(1) NOT NULL DEFAULT '1',
  `channel_email` tinyint(1) NOT NULL DEFAULT '1',
  `channel_push` tinyint(1) NOT NULL DEFAULT '0',
  `channel_sms` tinyint(1) NOT NULL DEFAULT '0',
  `channel_whatsapp` tinyint(1) NOT NULL DEFAULT '0',
  `dnd_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `dnd_start` time DEFAULT NULL,
  `dnd_end` time DEFAULT NULL,
  `dnd_allow_urgent` tinyint(1) NOT NULL DEFAULT '1',
  `dnd_days` json DEFAULT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `timing_config` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_notification_type` (`user_id`,`notification_type`),
  KEY `notification_settings_notification_type_index` (`notification_type`),
  CONSTRAINT `notification_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_settings`
--

LOCK TABLES `notification_settings` WRITE;
/*!40000 ALTER TABLE `notification_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_templates`
--

DROP TABLE IF EXISTS `notification_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_templates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `title_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body_ar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `body_en` text COLLATE utf8mb4_unicode_ci,
  `variables` json DEFAULT NULL,
  `default_channels` json DEFAULT NULL,
  `default_priority` enum('low','normal','high','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_system` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notification_templates_type_unique` (`type`),
  KEY `notification_templates_category_index` (`category`),
  KEY `notification_templates_is_active_index` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_templates`
--

LOCK TABLES `notification_templates` WRITE;
/*!40000 ALTER TABLE `notification_templates` DISABLE KEYS */;
INSERT INTO `notification_templates` VALUES (1,'customer.created','customers','عميل جديد - {{customer_name}}','New Customer - {{customer_name}}','تم إضافة عميل جديد \"{{customer_name}}\" في منطقة {{region}}. المصدر: {{source}}','New customer \"{{customer_name}}\" added in {{region}} region. Source: {{source}}','[\"customer_name\", \"region\", \"source\", \"customer_id\"]','[\"database\", \"mail\"]','normal',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(2,'customer.assigned','customers','تم إسناد عميل لك - {{customer_name}}','Customer Assigned - {{customer_name}}','تم إسناد العميل \"{{customer_name}}\" لك من قبل {{assigned_by}}','Customer \"{{customer_name}}\" has been assigned to you by {{assigned_by}}','[\"customer_name\", \"assigned_by\", \"customer_id\"]','[\"database\", \"mail\", \"broadcast\"]','normal',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(3,'followup.assigned','followups','متابعة جديدة - {{customer_name}}','New Follow-up - {{customer_name}}','تم إسناد متابعة جديدة لك مع العميل \"{{customer_name}}\". الموعد: {{scheduled_date}} الساعة {{scheduled_time}}','New follow-up assigned to you with \"{{customer_name}}\". Scheduled: {{scheduled_date}} at {{scheduled_time}}','[\"customer_name\", \"scheduled_date\", \"scheduled_time\", \"followup_type\", \"followup_id\"]','[\"database\", \"broadcast\"]','normal',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(4,'followup.reminder','followups','تذكير: متابعة قادمة خلال {{time_remaining}}','Reminder: Follow-up in {{time_remaining}}','لديك متابعة مع العميل \"{{customer_name}}\" خلال {{time_remaining}}','You have a follow-up with \"{{customer_name}}\" in {{time_remaining}}','[\"customer_name\", \"time_remaining\", \"followup_id\"]','[\"database\", \"broadcast\"]','high',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(5,'followup.overdue','followups','⚠️ متابعة متأخرة - {{customer_name}}','⚠️ Overdue Follow-up - {{customer_name}}','لديك متابعة متأخرة مع العميل \"{{customer_name}}\" منذ {{overdue_time}}','You have an overdue follow-up with \"{{customer_name}}\" since {{overdue_time}}','[\"customer_name\", \"overdue_time\", \"followup_id\"]','[\"database\", \"mail\", \"broadcast\"]','urgent',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(6,'followup.daily_summary','followups','📋 ملخص متابعاتك اليوم','📋 Your Daily Follow-ups Summary','المتابعات المطلوبة اليوم: {{today_count}}. المتابعات المتأخرة: {{overdue_count}}','Follow-ups today: {{today_count}}. Overdue: {{overdue_count}}','[\"today_count\", \"overdue_count\", \"first_followup_time\", \"first_customer_name\"]','[\"mail\"]','normal',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(7,'quotation.expiring','quotations','⚠️ عرض سعر قارب على الانتهاء','⚠️ Quotation Expiring Soon','عرض السعر رقم {{quotation_number}} للعميل \"{{customer_name}}\" سينتهي خلال {{days_remaining}} أيام','Quotation {{quotation_number}} for \"{{customer_name}}\" expires in {{days_remaining}} days','[\"quotation_number\", \"customer_name\", \"days_remaining\", \"expiry_date\", \"total_amount\", \"quotation_id\"]','[\"database\", \"mail\"]','high',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(8,'deal.won','sales','🎉 مبروك! صفقة جديدة','🎉 Congratulations! Deal Won','تم إغلاق صفقة جديدة مع العميل \"{{customer_name}}\" بقيمة {{deal_value}}','Deal closed with \"{{customer_name}}\" for {{deal_value}}','[\"customer_name\", \"deal_value\", \"sales_rep_name\", \"deal_id\"]','[\"database\", \"mail\", \"broadcast\"]','normal',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(9,'ticket.sla_breach','tickets','🔴 تجاوز SLA - تذكرة {{ticket_number}}','🔴 SLA Breach - Ticket {{ticket_number}}','التذكرة {{ticket_number}} للعميل \"{{customer_name}}\" تجاوزت وقت الاستجابة المتوقع','Ticket {{ticket_number}} for \"{{customer_name}}\" has breached SLA','[\"ticket_number\", \"customer_name\", \"expected_time\", \"actual_time\", \"ticket_id\"]','[\"database\", \"mail\", \"broadcast\"]','urgent',1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21');
/*!40000 ALTER TABLE `notification_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `notifiable_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notifiable_id` bigint unsigned DEFAULT NULL,
  `data` json DEFAULT NULL,
  `actions` json DEFAULT NULL,
  `priority` enum('low','normal','high') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `snoozed_until` timestamp NULL DEFAULT NULL,
  `channels` json DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `opened_at` timestamp NULL DEFAULT NULL,
  `clicked_at` timestamp NULL DEFAULT NULL,
  `action_taken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_taken_at` timestamp NULL DEFAULT NULL,
  `delivery_channel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `email_sent_at` timestamp NULL DEFAULT NULL,
  `push_sent_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_index` (`user_id`),
  KEY `notifications_type_index` (`type`),
  KEY `notifications_read_at_index` (`read_at`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`),
  KEY `notifications_notifiable_index` (`notifiable_type`,`notifiable_id`),
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_methods_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'cash','نقدي','Cash',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'bank_transfer','تحويل بنكي','Bank Transfer',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'check','شيك','Check',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_plans`
--

DROP TABLE IF EXISTS `payment_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_plans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_plans_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_plans`
--

LOCK TABLES `payment_plans` WRITE;
/*!40000 ALTER TABLE `payment_plans` DISABLE KEYS */;
INSERT INTO `payment_plans` VALUES (1,'دفعة واحدة','Full Payment','full',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'مقدم + استلام','Advance + Delivery','advance_delivery',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'أقساط','Installments','installments',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `payment_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `invoice_id` bigint unsigned DEFAULT NULL,
  `contract_id` bigint unsigned DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `method` enum('cash','bank_transfer','cheque') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `payment_date` date NOT NULL,
  `reference_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cheque_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cheque_date` date DEFAULT NULL,
  `status` enum('pending','confirmed','rejected','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'confirmed',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `attachments` json DEFAULT NULL,
  `received_by` bigint unsigned DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_code_unique` (`code`),
  KEY `payments_contract_id_foreign` (`contract_id`),
  KEY `payments_received_by_foreign` (`received_by`),
  KEY `payments_created_by_foreign` (`created_by`),
  KEY `payments_customer_id_index` (`customer_id`),
  KEY `payments_invoice_id_index` (`invoice_id`),
  KEY `payments_status_index` (`status`),
  KEY `payments_payment_date_index` (`payment_date`),
  CONSTRAINT `payments_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_received_by_foreign` FOREIGN KEY (`received_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'web',
  `group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'customers.view','عرض العملاء','customers','view',NULL,'web','customers','2026-01-30 15:05:28','2026-02-08 22:43:10'),(2,'customers.create','إنشاء العملاء','customers','create',NULL,'web','customers','2026-01-30 15:05:28','2026-02-08 22:43:10'),(3,'customers.edit','تعديل عميل',NULL,NULL,NULL,'web','customers','2026-01-30 15:05:28','2026-01-30 15:05:28'),(4,'customers.delete','حذف العملاء','customers','delete',NULL,'web','customers','2026-01-30 15:05:28','2026-02-08 22:43:10'),(5,'customers.archive','أرشفة عميل',NULL,NULL,NULL,'web','customers','2026-01-30 15:05:28','2026-01-30 15:05:28'),(6,'customers.export','تصدير العملاء','customers','export',NULL,'web','customers','2026-01-30 15:05:28','2026-02-08 22:43:10'),(7,'customers.import','استيراد العملاء','customers','import',NULL,'web','customers','2026-01-30 15:05:28','2026-02-08 22:43:10'),(8,'contacts.view','عرض جهات الاتصال',NULL,NULL,NULL,'web','contacts','2026-01-30 15:05:28','2026-01-30 15:05:28'),(9,'contacts.create','إضافة جهة اتصال',NULL,NULL,NULL,'web','contacts','2026-01-30 15:05:28','2026-01-30 15:05:28'),(10,'contacts.edit','تعديل جهة اتصال',NULL,NULL,NULL,'web','contacts','2026-01-30 15:05:28','2026-01-30 15:05:28'),(11,'contacts.delete','حذف جهة اتصال',NULL,NULL,NULL,'web','contacts','2026-01-30 15:05:28','2026-01-30 15:05:28'),(12,'reports.view','عرض التقارير','reports','view',NULL,'web','reports','2026-01-30 15:05:28','2026-02-08 22:43:10'),(13,'reports.export','تصدير التقارير','reports','export',NULL,'web','reports','2026-01-30 15:05:28','2026-02-08 22:43:10'),(14,'settings.view','عرض الإعدادات','settings','view',NULL,'web','settings','2026-01-30 15:05:28','2026-02-08 22:43:10'),(15,'settings.edit','تعديل الإعدادات',NULL,NULL,NULL,'web','settings','2026-01-30 15:05:28','2026-01-30 15:05:28'),(16,'users.view','عرض المستخدمين','users','view',NULL,'web','users','2026-01-30 15:05:28','2026-02-08 22:43:10'),(17,'users.create','إنشاء المستخدمين','users','create',NULL,'web','users','2026-01-30 15:05:28','2026-02-08 22:43:10'),(18,'users.edit','تعديل مستخدم',NULL,NULL,NULL,'web','users','2026-01-30 15:05:28','2026-01-30 15:05:28'),(19,'users.delete','حذف المستخدمين','users','delete',NULL,'web','users','2026-01-30 15:05:28','2026-02-08 22:43:10'),(20,'roles.view','عرض الأدوار','roles','view',NULL,'web','roles','2026-01-30 15:05:28','2026-02-08 22:43:10'),(21,'roles.create','إنشاء الأدوار','roles','create',NULL,'web','roles','2026-01-30 15:05:28','2026-02-08 22:43:10'),(22,'roles.edit','تعديل دور',NULL,NULL,NULL,'web','roles','2026-01-30 15:05:28','2026-01-30 15:05:28'),(23,'roles.delete','حذف الأدوار','roles','delete',NULL,'web','roles','2026-01-30 15:05:28','2026-02-08 22:43:10'),(24,'customers.view_own','عرض الخاص العملاء','customers','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(25,'customers.view_team','عرض الفريق العملاء','customers','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(26,'customers.view_all','عرض الكل العملاء','customers','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(27,'customers.update','تعديل العملاء','customers','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(28,'customers.update_own','تعديل الخاص العملاء','customers','update_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(29,'leads.view','عرض العملاء المحتملين','leads','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(30,'leads.view_own','عرض الخاص العملاء المحتملين','leads','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(31,'leads.view_team','عرض الفريق العملاء المحتملين','leads','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(32,'leads.view_all','عرض الكل العملاء المحتملين','leads','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(33,'leads.create','إنشاء العملاء المحتملين','leads','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(34,'leads.update','تعديل العملاء المحتملين','leads','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(35,'leads.delete','حذف العملاء المحتملين','leads','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(36,'leads.assign','إسناد العملاء المحتملين','leads','assign',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(37,'leads.export','تصدير العملاء المحتملين','leads','export',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(38,'leads.import','استيراد العملاء المحتملين','leads','import',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(39,'followups.view','عرض المتابعات','followups','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(40,'followups.view_own','عرض الخاص المتابعات','followups','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(41,'followups.view_team','عرض الفريق المتابعات','followups','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(42,'followups.view_all','عرض الكل المتابعات','followups','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(43,'followups.create','إنشاء المتابعات','followups','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(44,'followups.update','تعديل المتابعات','followups','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(45,'followups.delete','حذف المتابعات','followups','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(46,'followups.assign','إسناد المتابعات','followups','assign',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(47,'calls.view','عرض المكالمات','calls','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(48,'calls.view_own','عرض الخاص المكالمات','calls','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(49,'calls.view_team','عرض الفريق المكالمات','calls','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(50,'calls.view_all','عرض الكل المكالمات','calls','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(51,'calls.create','إنشاء المكالمات','calls','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(52,'calls.update','تعديل المكالمات','calls','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(53,'calls.delete','حذف المكالمات','calls','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(54,'calls.export','تصدير المكالمات','calls','export',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(55,'deals.view','عرض الفرص البيعية','deals','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(56,'deals.view_own','عرض الخاص الفرص البيعية','deals','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(57,'deals.view_team','عرض الفريق الفرص البيعية','deals','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(58,'deals.view_all','عرض الكل الفرص البيعية','deals','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(59,'deals.create','إنشاء الفرص البيعية','deals','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(60,'deals.update','تعديل الفرص البيعية','deals','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(61,'deals.delete','حذف الفرص البيعية','deals','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(62,'deals.export','تصدير الفرص البيعية','deals','export',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(63,'quotations.view','عرض عروض الأسعار','quotations','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(64,'quotations.view_own','عرض الخاص عروض الأسعار','quotations','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(65,'quotations.view_team','عرض الفريق عروض الأسعار','quotations','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(66,'quotations.view_all','عرض الكل عروض الأسعار','quotations','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(67,'quotations.create','إنشاء عروض الأسعار','quotations','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(68,'quotations.update','تعديل عروض الأسعار','quotations','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(69,'quotations.delete','حذف عروض الأسعار','quotations','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(70,'quotations.approve','موافقة عروض الأسعار','quotations','approve',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(71,'quotations.export','تصدير عروض الأسعار','quotations','export',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(72,'contracts.view','عرض العقود','contracts','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(73,'contracts.view_own','عرض الخاص العقود','contracts','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(74,'contracts.view_team','عرض الفريق العقود','contracts','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(75,'contracts.view_all','عرض الكل العقود','contracts','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(76,'contracts.create','إنشاء العقود','contracts','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(77,'contracts.update','تعديل العقود','contracts','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(78,'contracts.delete','حذف العقود','contracts','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(79,'contracts.approve','موافقة العقود','contracts','approve',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(80,'invoices.view','عرض الفواتير','invoices','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(81,'invoices.view_own','عرض الخاص الفواتير','invoices','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(82,'invoices.view_team','عرض الفريق الفواتير','invoices','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(83,'invoices.view_all','عرض الكل الفواتير','invoices','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(84,'invoices.create','إنشاء الفواتير','invoices','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(85,'invoices.update','تعديل الفواتير','invoices','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(86,'invoices.delete','حذف الفواتير','invoices','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(87,'invoices.export','تصدير الفواتير','invoices','export',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(88,'payments.view','عرض المدفوعات','payments','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(89,'payments.view_own','عرض الخاص المدفوعات','payments','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(90,'payments.view_team','عرض الفريق المدفوعات','payments','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(91,'payments.view_all','عرض الكل المدفوعات','payments','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(92,'payments.create','إنشاء المدفوعات','payments','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(93,'payments.update','تعديل المدفوعات','payments','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(94,'payments.delete','حذف المدفوعات','payments','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(95,'payments.approve','موافقة المدفوعات','payments','approve',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(96,'products.view','عرض المنتجات','products','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(97,'products.create','إنشاء المنتجات','products','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(98,'products.update','تعديل المنتجات','products','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(99,'products.delete','حذف المنتجات','products','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(100,'tickets.view','عرض التذاكر','tickets','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(101,'tickets.view_own','عرض الخاص التذاكر','tickets','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(102,'tickets.view_team','عرض الفريق التذاكر','tickets','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(103,'tickets.view_all','عرض الكل التذاكر','tickets','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(104,'tickets.create','إنشاء التذاكر','tickets','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(105,'tickets.update','تعديل التذاكر','tickets','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(106,'tickets.delete','حذف التذاكر','tickets','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(107,'tickets.assign','إسناد التذاكر','tickets','assign',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(108,'campaigns.view','عرض الحملات','campaigns','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(109,'campaigns.create','إنشاء الحملات','campaigns','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(110,'campaigns.update','تعديل الحملات','campaigns','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(111,'campaigns.delete','حذف الحملات','campaigns','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(112,'visits.view','عرض الزيارات','visits','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(113,'visits.view_own','عرض الخاص الزيارات','visits','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(114,'visits.view_team','عرض الفريق الزيارات','visits','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(115,'visits.view_all','عرض الكل الزيارات','visits','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(116,'visits.create','إنشاء الزيارات','visits','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(117,'visits.update','تعديل الزيارات','visits','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(118,'visits.delete','حذف الزيارات','visits','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(119,'targets.view','عرض الأهداف','targets','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(120,'targets.view_own','عرض الخاص الأهداف','targets','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(121,'targets.view_team','عرض الفريق الأهداف','targets','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(122,'targets.view_all','عرض الكل الأهداف','targets','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(123,'targets.create','إنشاء الأهداف','targets','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(124,'targets.update','تعديل الأهداف','targets','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(125,'targets.delete','حذف الأهداف','targets','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(126,'reports.view_own','عرض الخاص التقارير','reports','view_own',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(127,'reports.view_team','عرض الفريق التقارير','reports','view_team',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(128,'reports.view_all','عرض الكل التقارير','reports','view_all',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(129,'users.update','تعديل المستخدمين','users','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(130,'roles.update','تعديل الأدوار','roles','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(131,'branches.view','عرض الفروع','branches','view',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(132,'branches.create','إنشاء الفروع','branches','create',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(133,'branches.update','تعديل الفروع','branches','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(134,'branches.delete','حذف الفروع','branches','delete',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(135,'settings.update','تعديل الإعدادات','settings','update',NULL,'web',NULL,'2026-02-08 22:43:10','2026-02-08 22:43:10'),(136,'documents.view','عرض المستندات','documents','view',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(137,'documents.view_own','عرض الخاص المستندات','documents','view_own',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(138,'documents.create','إنشاء المستندات','documents','create',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(139,'documents.update','تعديل المستندات','documents','update',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(140,'documents.delete','حذف المستندات','documents','delete',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(141,'documents.download','تحميل المستندات','documents','download',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(142,'announcements.view','عرض الإعلانات','announcements','view',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(143,'announcements.create','إنشاء الإعلانات','announcements','create',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(144,'announcements.update','تعديل الإعلانات','announcements','update',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(145,'announcements.delete','حذف الإعلانات','announcements','delete',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(146,'payment_plans.view','عرض خطط الدفع','payment_plans','view',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(147,'payment_plans.view_own','عرض الخاص خطط الدفع','payment_plans','view_own',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(148,'payment_plans.view_all','عرض الكل خطط الدفع','payment_plans','view_all',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(149,'payment_plans.create','إنشاء خطط الدفع','payment_plans','create',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(150,'payment_plans.update','تعديل خطط الدفع','payment_plans','update',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(151,'integrations.view','عرض التكاملات','integrations','view',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(152,'integrations.create','إنشاء التكاملات','integrations','create',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(153,'integrations.update','تعديل التكاملات','integrations','update',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(154,'integrations.delete','حذف التكاملات','integrations','delete',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(155,'custom_reports.view','عرض التقارير المخصصة','custom_reports','view',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(156,'custom_reports.view_own','عرض الخاص التقارير المخصصة','custom_reports','view_own',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(157,'custom_reports.create','إنشاء التقارير المخصصة','custom_reports','create',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(158,'custom_reports.update','تعديل التقارير المخصصة','custom_reports','update',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(159,'custom_reports.delete','حذف التقارير المخصصة','custom_reports','delete',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19'),(160,'organization.view','عرض الهيكل التنظيمي','organization','view',NULL,'web',NULL,'2026-02-08 23:35:19','2026-02-08 23:35:19');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (2,'App\\Models\\User',1,'auth-token','0beb829671a1afbf18b4c8c5b448781c45e82579c5fe00262882e352e639bb80','[\"*\"]','2026-01-30 15:51:33',NULL,'2026-01-30 15:51:23','2026-01-30 15:51:33'),(4,'App\\Models\\User',1,'auth-token','7070b9e158e1fbecc639ffdc268910def1311c34bb7d26c2dccddba86d084282','[\"*\"]','2026-01-30 16:06:30',NULL,'2026-01-30 16:05:29','2026-01-30 16:06:30'),(10,'App\\Models\\User',1,'auth-token','c6bf812ad7116f053d6bcb4237520642df26befa47c58e3a34973be17fceba78','[\"*\"]',NULL,NULL,'2026-02-08 21:17:03','2026-02-08 21:17:03'),(11,'App\\Models\\User',1,'auth-token','e3c1b49ee0c4ee61aafb8208a0f662a58af51f4196cccf3d60e481c6b0e0e9ee','[\"*\"]',NULL,NULL,'2026-02-08 21:18:33','2026-02-08 21:18:33'),(15,'App\\Models\\User',1,'auth-token','5576a0803907dbe2aea7d8a07f6a4269de5154371a301bd9a36f55248c39cd3c','[\"*\"]',NULL,NULL,'2026-02-08 21:36:09','2026-02-08 21:36:09'),(17,'App\\Models\\User',1,'auth-token','947aec602f68113e674aca50e20ae57510064f6084d07f95f7f18e7ed2294bb5','[\"*\"]','2026-02-08 23:52:53',NULL,'2026-02-08 21:39:49','2026-02-08 23:52:53'),(18,'App\\Models\\User',1,'auth-token','24b63e4dbe0a45002915a09e75954e22138fa4dd139138cd7191fc979cbaad52','[\"*\"]',NULL,NULL,'2026-02-08 21:52:26','2026-02-08 21:52:26'),(19,'App\\Models\\User',1,'auth-token','057419985129bda01368c35db8f02a057c73c312e94a05f13474bfa70caf8bb1','[\"*\"]','2026-02-08 23:53:34',NULL,'2026-02-08 23:53:18','2026-02-08 23:53:34'),(20,'App\\Models\\User',1,'auth-token','d2ed0a64459e51e3996e7033f8ea0e99c7ddd4d06eda92f1d8f3c26799a577f3','[\"*\"]','2026-02-09 00:21:18',NULL,'2026-02-08 23:54:40','2026-02-09 00:21:18'),(21,'App\\Models\\User',1,'auth-token','27561086d7edc66eaa494672ef2c28de28bab6dc11480b1285fe6bb844116a0b','[\"*\"]',NULL,NULL,'2026-02-09 00:21:52','2026-02-09 00:21:52'),(22,'App\\Models\\User',1,'auth-token','26160a09e2b1528c4b4c079054bd6e4798d9e3efcf9d986df1775d8aff03f86d','[\"*\"]','2026-02-09 00:22:09',NULL,'2026-02-09 00:22:07','2026-02-09 00:22:09'),(23,'App\\Models\\User',1,'auth-token','ca5041710e7da6ff83df996fc0713972a9b0498100ba91c289555f7b85843e0a','[\"*\"]','2026-02-09 02:01:34',NULL,'2026-02-09 00:23:27','2026-02-09 02:01:34'),(24,'App\\Models\\User',1,'auth-token','1ca90d0c0a713f0035f126cb9294c0b01119b8831bf0291e2eae16ed8a459704','[\"*\"]','2026-02-09 00:23:53',NULL,'2026-02-09 00:23:52','2026-02-09 00:23:53'),(25,'App\\Models\\User',1,'auth-token','e60efbd4f16b2346808fea80cc5045bcc7a9bd9921ffa46f64e4a80477119e05','[\"*\"]','2026-02-09 00:24:10',NULL,'2026-02-09 00:24:07','2026-02-09 00:24:10'),(26,'App\\Models\\User',1,'auth-token','d5130a7dd49078ed383171b8e5d38e1c83431426babcf0d2ad43bac4c6b12727','[\"*\"]','2026-02-09 00:24:20',NULL,'2026-02-09 00:24:20','2026-02-09 00:24:20'),(27,'App\\Models\\User',1,'auth-token','f8b25275a1c9384dbfe71fe4fcabdc215f04e213085c71e420ff498a378462b6','[\"*\"]','2026-02-09 00:29:48',NULL,'2026-02-09 00:29:47','2026-02-09 00:29:48'),(28,'App\\Models\\User',1,'auth-token','fdd5fb251e3da7be6da5ecf3443cdf628017964f1cb372b20b7b401d5ab40817','[\"*\"]','2026-02-09 00:31:56',NULL,'2026-02-09 00:31:55','2026-02-09 00:31:56'),(29,'App\\Models\\User',1,'auth-token','2ed04ffc3bed97a7f0268c51a77789e852945c4a62340fa431f5fd793ab30f01','[\"*\"]','2026-02-09 00:32:08',NULL,'2026-02-09 00:32:07','2026-02-09 00:32:08'),(30,'App\\Models\\User',1,'auth-token','b9cd41f400c8ff66e42a975e8a41380dcdcc4032ae688f0a8ffc8549416f99cb','[\"*\"]','2026-02-09 00:56:15',NULL,'2026-02-09 00:56:15','2026-02-09 00:56:15'),(31,'App\\Models\\User',1,'auth-token','32eab40bf43ab96fb6a0583b4a8a96b46f0d9ae1271d2b9dceaab40d9002c05a','[\"*\"]','2026-02-09 01:01:55',NULL,'2026-02-09 01:01:53','2026-02-09 01:01:55'),(32,'App\\Models\\User',1,'auth-token','652027b9e8d2fd4e5b560e1f246665329832aa207820db882400177670ec5a89','[\"*\"]','2026-02-09 01:02:42',NULL,'2026-02-09 01:02:42','2026-02-09 01:02:42'),(33,'App\\Models\\User',1,'auth-token','3906a7e04d0ac7b74d6deb33c8ce9beca1aaa7e98948f65a9b0aee51ad0b2471','[\"*\"]','2026-02-09 01:03:00',NULL,'2026-02-09 01:02:57','2026-02-09 01:03:00'),(34,'App\\Models\\User',1,'auth-token','64df3b3bb650f32788ba7badf010e8c250854295adc15771ddbb49c5a9f245ff','[\"*\"]','2026-02-09 01:03:54',NULL,'2026-02-09 01:03:40','2026-02-09 01:03:54'),(35,'App\\Models\\User',1,'auth-token','3e930c5f0215359d758ce674a21b9aedecadc11d330f2ee40479a25024d4eb0a','[\"*\"]','2026-02-09 01:04:08',NULL,'2026-02-09 01:04:08','2026-02-09 01:04:08'),(36,'App\\Models\\User',1,'auth-token','e8e1528d464cd29dea93c3778d88378ac2b4fa190ff21ba03a15c2e7d163b4b7','[\"*\"]','2026-02-09 01:04:19',NULL,'2026-02-09 01:04:18','2026-02-09 01:04:19'),(37,'App\\Models\\User',1,'auth-token','6a66296d74c48d1399db0eee28117339a1cfa518adc5cb1c82de7ca5aff67f7b','[\"*\"]','2026-02-09 01:05:03',NULL,'2026-02-09 01:04:48','2026-02-09 01:05:03'),(38,'App\\Models\\User',1,'auth-token','ffa0ce6bb55d495a6f66e6b08e016332282d81f78e343ad7e44b9f79d78f6b2d','[\"*\"]','2026-02-09 01:09:03',NULL,'2026-02-09 01:09:01','2026-02-09 01:09:03'),(39,'App\\Models\\User',1,'auth-token','7988ea09a5d9b94a6654420c94c56ffd325a25c66cc99d8e48c5e4126706111b','[\"*\"]','2026-02-09 01:09:19',NULL,'2026-02-09 01:09:19','2026-02-09 01:09:19'),(40,'App\\Models\\User',1,'auth-token','8fc045db3ec6cdfd21d951d6a4e1a54e69ebbe8792edcfb671480be2ff900be9','[\"*\"]','2026-02-09 01:11:57',NULL,'2026-02-09 01:11:56','2026-02-09 01:11:57'),(41,'App\\Models\\User',1,'auth-token','25846ec00a3264f371952a790f3a6bc2742dc907a7b589cdc3570c6b50052de9','[\"*\"]','2026-02-09 01:12:08',NULL,'2026-02-09 01:12:07','2026-02-09 01:12:08'),(42,'App\\Models\\User',1,'auth-token','3f9d3ae42c217a8515df52889eddd5db0d225fb73d772c2cbfd2feb8a49ed1cb','[\"*\"]','2026-02-09 01:13:25',NULL,'2026-02-09 01:13:22','2026-02-09 01:13:25'),(43,'App\\Models\\User',1,'auth-token','63c16ffa1aaa352b4f5e764eeb6679444cb683d24e7af63a9e399ccf3f56cbfe','[\"*\"]','2026-02-09 01:36:47',NULL,'2026-02-09 01:36:47','2026-02-09 01:36:47'),(45,'App\\Models\\User',1,'auth-token','443023d31847aad8d5cab4e6fef5865fe6f33cba0ec4dbfbe08b7fa6c6736cf5','[\"*\"]','2026-02-11 01:24:56',NULL,'2026-02-11 00:20:15','2026-02-11 01:24:56'),(46,'App\\Models\\User',1,'auth-token','d098043089cc33c78e7bb2e9445a7cc5815b44e02448319945a265da9786f6f0','[\"*\"]','2026-02-12 23:56:25',NULL,'2026-02-12 23:39:36','2026-02-12 23:56:25'),(47,'App\\Models\\User',1,'auth-token','825dc2f283cd8477d2d8ceaf665033b528e82ef6efea9559b7419800bf3af31c','[\"*\"]','2026-02-20 13:00:10',NULL,'2026-02-12 23:59:21','2026-02-20 13:00:10'),(48,'App\\Models\\User',1,'debug-test','aceab1b8cb3e82c14d4e2bead7a6a52e60a57e46baf878e5127dc12638763283','[\"*\"]','2026-02-13 00:01:01',NULL,'2026-02-13 00:01:01','2026-02-13 00:01:01'),(49,'App\\Models\\User',1,'final-test','ed33675da3379829e54c35aaf5f64201d9775fe34b92770e9042cfce3e6dd551','[\"*\"]',NULL,NULL,'2026-02-13 00:06:40','2026-02-13 00:06:40'),(50,'App\\Models\\User',1,'final-test','06e03afbcfc4ad0019452b1717e5b88c34191ade0ed8a57f1a4fad991108af25','[\"*\"]',NULL,NULL,'2026-02-13 00:07:52','2026-02-13 00:07:52'),(51,'App\\Models\\User',1,'auth-token','773ace32fbf53f8b4846445971a5a4ab7d43e94980a12ae282be91196038a244','[\"*\"]','2026-02-13 00:47:21',NULL,'2026-02-13 00:08:27','2026-02-13 00:47:21'),(52,'App\\Models\\User',1,'scan-test','0a952f7c6d16fd0d56c45162f1b011858747db58bfaf73e2e832fc1a9b6e2295','[\"*\"]',NULL,NULL,'2026-02-13 00:12:08','2026-02-13 00:12:08'),(53,'App\\Models\\User',1,'auth-token','b8afa466f307d9c71966f29febdaf464a79715c9aba0d298586866933198c546','[\"*\"]','2026-02-16 21:41:07',NULL,'2026-02-16 21:30:10','2026-02-16 21:41:07'),(54,'App\\Models\\User',1,'auth-token','92c049bd1f7d23ac857e33e3471921865eaba9eeba5a3c104b8f49b060882efa','[\"*\"]',NULL,NULL,'2026-02-20 14:47:26','2026-02-20 14:47:26'),(55,'App\\Models\\User',1,'auth-token','7fd6ac2476743daea6a5c189642415b890e9b4294bf7a0ee7888a48b3ec2d10f','[\"*\"]',NULL,NULL,'2026-02-20 14:47:31','2026-02-20 14:47:31'),(56,'App\\Models\\User',1,'auth-token','00d66659a67d448cc3b50b9a1949dbe1d6782d74d558237d27696701b76d8d0a','[\"*\"]',NULL,NULL,'2026-02-20 14:47:34','2026-02-20 14:47:34'),(57,'App\\Models\\User',1,'auth-token','a34d1e245980ca778558268b8b0361fcc0011ce979c9d01b9bd0466f9fc93fc6','[\"*\"]',NULL,NULL,'2026-02-20 14:47:38','2026-02-20 14:47:38'),(58,'App\\Models\\User',1,'auth-token','802875532fa66d910b46d25ba9f68c636ef294a32b45eaefdf01141fcf0c3ca1','[\"*\"]',NULL,NULL,'2026-02-20 14:48:00','2026-02-20 14:48:00'),(59,'App\\Models\\User',1,'auth-token','648310283bb4ac2df05afc4a409900e2b89cbafcceb6fc9dfeb6e0df4352dcdb','[\"*\"]',NULL,NULL,'2026-02-20 14:48:10','2026-02-20 14:48:10'),(60,'App\\Models\\User',1,'auth-token','e695ba8ebc2128840807e86b4dd5fbbe6129414babeac70a50adeddddb05b621','[\"*\"]',NULL,NULL,'2026-02-20 14:48:16','2026-02-20 14:48:16'),(61,'App\\Models\\User',1,'auth-token','e727f6c3f14c56d78459504ddd64a4d7bceef9795d95d6f1c37316ecea243bc3','[\"*\"]',NULL,NULL,'2026-02-20 14:48:19','2026-02-20 14:48:19'),(62,'App\\Models\\User',1,'auth-token','09fefe1bc6bbe625f3451d13f912f6506b67ca3550cebacdf8e76c78d9fff56a','[\"*\"]',NULL,NULL,'2026-02-20 14:49:13','2026-02-20 14:49:13'),(66,'App\\Models\\User',1,'auth-token','0432e60fba3c994a762422da018f73953e03509fe5532a9e8b75269d8354d8e0','[\"*\"]','2026-02-20 17:11:43',NULL,'2026-02-20 14:52:30','2026-02-20 17:11:43');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postpone_reasons`
--

DROP TABLE IF EXISTS `postpone_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postpone_reasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `postpone_reasons_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postpone_reasons`
--

LOCK TABLES `postpone_reasons` WRITE;
/*!40000 ALTER TABLE `postpone_reasons` DISABLE KEYS */;
INSERT INTO `postpone_reasons` VALUES (1,'customer_busy','العميل مشغول','Customer busy',1,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(2,'customer_request','بناءً على طلب العميل','Customer request',2,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(3,'no_answer','لا يوجد رد','No answer',3,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(4,'wrong_time','وقت غير مناسب','Wrong time',4,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(5,'need_info','يحتاج معلومات إضافية','Need more info',5,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(6,'internal_reason','سبب داخلي','Internal reason',6,1,'2026-02-08 22:42:32','2026-02-08 22:42:32'),(7,'other','سبب آخر','Other',99,1,'2026-02-08 22:42:32','2026-02-08 22:42:32');
/*!40000 ALTER TABLE `postpone_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priorities`
--

DROP TABLE IF EXISTS `priorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `priorities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `priorities_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priorities`
--

LOCK TABLES `priorities` WRITE;
/*!40000 ALTER TABLE `priorities` DISABLE KEYS */;
INSERT INTO `priorities` VALUES (1,'عادي','Normal','normal','#808080',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'مهم','Important','important','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'عاجل','Urgent','urgent','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `priorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `parent_id` bigint unsigned DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_categories_code_unique` (`code`),
  KEY `product_categories_parent_id_index` (`parent_id`),
  KEY `product_categories_is_active_index` (`is_active`),
  CONSTRAINT `product_categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `product_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (1,'SOFTWARE','برمجيات','Software','منتجات برمجية',NULL,'monitor','#3B82F6',1,1,'2026-02-08 22:44:06','2026-02-08 22:44:06',NULL),(2,'HARDWARE','أجهزة','Hardware','أجهزة ومعدات',NULL,'cpu','#10B981',2,1,'2026-02-08 22:44:06','2026-02-08 22:44:06',NULL),(3,'SERVICES','خدمات','Services','خدمات استشارية وفنية',NULL,'briefcase','#8B5CF6',3,1,'2026-02-08 22:44:06','2026-02-08 22:44:06',NULL),(4,'TRAINING','تدريب','Training','دورات تدريبية',NULL,'graduation-cap','#F59E0B',4,1,'2026-02-08 22:44:06','2026-02-08 22:44:06',NULL),(5,'SUPPORT_PKG','باقات الدعم','Support Packages','باقات الدعم الفني',NULL,'headphones','#EF4444',5,1,'2026-02-08 22:44:06','2026-02-08 22:44:06',NULL);
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_pricing`
--

DROP TABLE IF EXISTS `product_pricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_pricing` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `pricing_type` enum('quantity','customer','region','period') COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned DEFAULT NULL,
  `customer_classification` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region_id` bigint unsigned DEFAULT NULL,
  `min_quantity` int unsigned DEFAULT NULL,
  `max_quantity` int unsigned DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  `discount_percent` decimal(5,2) DEFAULT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_to` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_pricing_product_id_pricing_type_index` (`product_id`,`pricing_type`),
  KEY `product_pricing_customer_id_index` (`customer_id`),
  KEY `product_pricing_region_id_index` (`region_id`),
  KEY `product_pricing_valid_from_valid_to_index` (`valid_from`,`valid_to`),
  CONSTRAINT `product_pricing_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `product_pricing_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_pricing_region_id_foreign` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_pricing`
--

LOCK TABLES `product_pricing` WRITE;
/*!40000 ALTER TABLE `product_pricing` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_pricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_statuses`
--

DROP TABLE IF EXISTS `product_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_statuses`
--

LOCK TABLES `product_statuses` WRITE;
/*!40000 ALTER TABLE `product_statuses` DISABLE KEYS */;
INSERT INTO `product_statuses` VALUES (1,'نشط','Active','active','#10B981',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'غير نشط','Inactive','inactive','#6B7280',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `product_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_types`
--

DROP TABLE IF EXISTS `product_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_types`
--

LOCK TABLES `product_types` WRITE;
/*!40000 ALTER TABLE `product_types` DISABLE KEYS */;
INSERT INTO `product_types` VALUES (1,'منتج','Product','product',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'خدمة','Service','service',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `product_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `description_en` text COLLATE utf8mb4_unicode_ci,
  `category_id` bigint unsigned DEFAULT NULL,
  `type` enum('product','service','bundle') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'product',
  `base_price` decimal(15,2) NOT NULL,
  `cost_price` decimal(15,2) DEFAULT NULL,
  `min_price` decimal(15,2) DEFAULT NULL,
  `tax_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `is_tax_inclusive` tinyint(1) NOT NULL DEFAULT '0',
  `unit_id` bigint unsigned DEFAULT NULL,
  `features` json DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `status` enum('active','inactive','discontinued') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `is_bundle` tinyint(1) NOT NULL DEFAULT '0',
  `bundle_items` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_code_unique` (`code`),
  KEY `products_unit_id_foreign` (`unit_id`),
  KEY `products_code_index` (`code`),
  KEY `products_category_id_index` (`category_id`),
  KEY `products_status_index` (`status`),
  KEY `products_type_index` (`type`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_items`
--

DROP TABLE IF EXISTS `quotation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `quotation_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `features` text COLLATE utf8mb4_unicode_ci,
  `quantity` decimal(10,2) NOT NULL DEFAULT '1.00',
  `unit_price` decimal(15,2) NOT NULL,
  `discount_percent` decimal(5,2) NOT NULL DEFAULT '0.00',
  `discount_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tax_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `tax_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `total` decimal(15,2) NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_items_quotation_id_index` (`quotation_id`),
  CONSTRAINT `quotation_items_quotation_id_foreign` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_items`
--

LOCK TABLES `quotation_items` WRITE;
/*!40000 ALTER TABLE `quotation_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_templates`
--

DROP TABLE IF EXISTS `quotation_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_templates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `header_content` text COLLATE utf8mb4_unicode_ci,
  `footer_content` text COLLATE utf8mb4_unicode_ci,
  `terms_content` text COLLATE utf8mb4_unicode_ci,
  `logo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#3B82F6',
  `secondary_color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#1E40AF',
  `show_logo` tinyint(1) NOT NULL DEFAULT '1',
  `show_company_info` tinyint(1) NOT NULL DEFAULT '1',
  `show_customer_info` tinyint(1) NOT NULL DEFAULT '1',
  `show_terms` tinyint(1) NOT NULL DEFAULT '1',
  `show_notes` tinyint(1) NOT NULL DEFAULT '1',
  `show_validity` tinyint(1) NOT NULL DEFAULT '1',
  `show_bank_details` tinyint(1) NOT NULL DEFAULT '0',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_templates_created_by_foreign` (`created_by`),
  CONSTRAINT `quotation_templates_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_templates`
--

LOCK TABLES `quotation_templates` WRITE;
/*!40000 ALTER TABLE `quotation_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotation_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotations`
--

DROP TABLE IF EXISTS `quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `deal_id` bigint unsigned DEFAULT NULL,
  `contact_id` bigint unsigned DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `introduction` text COLLATE utf8mb4_unicode_ci,
  `terms` text COLLATE utf8mb4_unicode_ci,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `subtotal` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount_type` enum('percentage','fixed') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_value` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tax_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `tax_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EGP',
  `issue_date` date NOT NULL,
  `valid_until` date NOT NULL,
  `status` enum('draft','pending_approval','approved','sent','viewed','accepted','rejected','expired','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `version` int NOT NULL DEFAULT '1',
  `parent_id` bigint unsigned DEFAULT NULL,
  `requires_approval` tinyint(1) NOT NULL DEFAULT '0',
  `approved_by` bigint unsigned DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `rejection_reason` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint unsigned NOT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  `viewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quotations_code_unique` (`code`),
  KEY `quotations_deal_id_foreign` (`deal_id`),
  KEY `quotations_parent_id_foreign` (`parent_id`),
  KEY `quotations_approved_by_foreign` (`approved_by`),
  KEY `quotations_customer_id_index` (`customer_id`),
  KEY `quotations_code_index` (`code`),
  KEY `quotations_status_index` (`status`),
  KEY `quotations_valid_until_index` (`valid_until`),
  KEY `quotations_created_at_index` (`created_at`),
  KEY `idx_quotations_created_status` (`created_by`,`status`),
  KEY `idx_quotations_customer_status` (`customer_id`,`status`),
  KEY `idx_quotations_valid_status` (`valid_until`,`status`),
  CONSTRAINT `quotations_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `quotations_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `quotations_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `quotations_deal_id_foreign` FOREIGN KEY (`deal_id`) REFERENCES `deals` (`id`) ON DELETE SET NULL,
  CONSTRAINT `quotations_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `quotations` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotations`
--

LOCK TABLES `quotations` WRITE;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_id` bigint unsigned DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `regions_code_unique` (`code`),
  KEY `regions_manager_id_foreign` (`manager_id`),
  CONSTRAINT `regions_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'CAIRO','منطقة القاهرة الكبرى','Greater Cairo',3,1,'2026-02-08 22:44:03','2026-02-08 22:44:03',NULL),(2,'DELTA','منطقة الدلتا','Delta Region',NULL,1,'2026-02-08 22:44:03','2026-02-08 22:44:03',NULL),(3,'UPPER','منطقة الصعيد','Upper Egypt',NULL,1,'2026-02-08 22:44:03','2026-02-08 22:44:03',NULL),(4,'ALEX','منطقة الإسكندرية','Alexandria Region',NULL,1,'2026-02-08 22:44:03','2026-02-08 22:44:03',NULL),(5,'CANAL','منطقة القناة','Canal Region',NULL,1,'2026-02-08 22:44:03','2026-02-08 22:44:03',NULL);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `remindable_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remindable_id` bigint unsigned DEFAULT NULL,
  `remind_at` timestamp NOT NULL,
  `repeat_type` enum('none','daily','weekly','monthly') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'none',
  `repeat_interval` int unsigned NOT NULL DEFAULT '1',
  `repeat_end_date` date DEFAULT NULL,
  `channels` json DEFAULT NULL,
  `snoozed_until` timestamp NULL DEFAULT NULL,
  `snooze_count` tinyint unsigned NOT NULL DEFAULT '0',
  `status` enum('pending','sent','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reminders_user_id_remind_at_index` (`user_id`,`remind_at`),
  KEY `reminders_remindable_type_remindable_id_index` (`remindable_type`,`remindable_id`),
  KEY `reminders_status_index` (`status`),
  CONSTRAINT `reminders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
/*!40000 ALTER TABLE `reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(1,2),(2,2),(3,2),(5,2),(6,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(16,2),(1,3),(2,3),(3,3),(8,3),(9,3),(10,3),(1,4),(8,4),(12,4);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_permissions_role_id_permission_id_unique` (`role_id`,`permission_id`),
  KEY `role_permissions_permission_id_foreign` (`permission_id`),
  CONSTRAINT `role_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'web',
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_system` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `max_discount_percent` decimal(5,2) NOT NULL DEFAULT '0.00',
  `max_approval_amount` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`),
  UNIQUE KEY `roles_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','مدير النظام','admin','web',NULL,1,1,'2026-01-30 15:05:29','2026-01-30 15:05:29',0.00,NULL),(2,'manager','مدير','manager','web',NULL,1,1,'2026-01-30 15:05:29','2026-01-30 15:05:29',0.00,NULL),(3,'sales','موظف مبيعات','sales','web',NULL,1,1,'2026-01-30 15:05:29','2026-01-30 15:05:29',0.00,NULL),(4,'viewer','مشاهد','viewer','web',NULL,1,1,'2026-01-30 15:05:29','2026-01-30 15:05:29',0.00,NULL),(5,'Super Admin','مدير النظام',NULL,'web','System administrator',1,1,'2026-02-20 13:01:46','2026-02-20 13:01:46',0.00,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('i6n7vax0ppGXGA1ZXuCcY8Ixa3izp3LD4pOVa2I6',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','YToyOntzOjY6Il90b2tlbiI7czo0MDoiSG5BdE5ZazlPTVVnUlFjbHQzMUR2cVJyaVdOTUtEM1VVYkMyZjBEZSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1771592420),('NliDCSM0Eufmf1rF77uFYwrYb3N4Iim5YpO1UETw',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNTNzMzRBR3RsVFNaa1FUY2VjTlU4V3JrMExBT0NYUGM3TnpvSllweCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1771591563),('o3SqC8mpOprtYI0LVbzoYTcTWOb9re1PdNHLHxUl',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTTdLbGxlSVpidzE4YkNSNmxycXdGaXJucm9BTUh1V2hqWWtpdWJ5WiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvYXV0aC9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1771592144),('vnrjKFcp0ZRMHdJK5iI4OsuIKFp9BzIdFe42gZit',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoicjV5Zll4aEljMUJkVmZwUVZUNUZISzJmd0pzcWZHRGhWSjJucGczSCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvbm90aWZpY2F0aW9ucy91bnJlYWQtY291bnQiO319',1771278067),('wSN9CHhANypqFf5QvtCO97WK8Dxhu9GRo7aALXjq',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUjhNcGxKdTN4dHZjOUpVRFd4bkdweUFvYUJlbWh0cVZxR3d3QldUeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1771598624),('YSrTjYvNmImzZMOam1nwg5VdrME5ht2aeJwXFQ2o',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWUlaQVRVNzZJbUgzRGxiUkZ0bUVOQ25MT3FtWlppMHF2TUc2Ynh5UCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvYXV0aC9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1771597053);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'string',
  `group` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`),
  KEY `settings_group_index` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'cooling_hot_to_warm_days','15','integer','cooling','Hot to Warm Days','أيام التحول من ساخن لدافئ','عدد الأيام بدون تواصل لتحويل العميل من ساخن إلى دافئ',0,'2026-01-30 15:05:21','2026-02-08 22:43:22'),(2,'cooling_warm_to_cold_days','15','integer','cooling','Warm to Cold Days','أيام التحول من دافئ لبارد','عدد الأيام الإضافية بدون تواصل لتحويل العميل من دافئ إلى بارد',0,'2026-01-30 15:05:21','2026-02-08 22:43:22'),(3,'cooling_enabled','true','boolean','cooling','تفعيل التبريد التلقائي',NULL,'تفعيل/تعطيل نظام التبريد التلقائي للعملاء',0,'2026-01-30 15:05:21','2026-01-30 15:05:21'),(4,'customer_alert_60_days','60','integer','alerts','First Alert Days','أيام التنبيه الأول',NULL,0,'2026-02-08 22:43:22','2026-02-08 22:43:22'),(5,'customer_alert_90_days','90','integer','alerts','Second Alert Days','أيام التنبيه الثاني',NULL,0,'2026-02-08 22:43:22','2026-02-08 22:43:22'),(6,'customer_alert_120_days','120','integer','alerts','Escalation Days','أيام التصعيد',NULL,0,'2026-02-08 22:43:22','2026-02-08 22:43:22'),(7,'quotation_validity_days','30','integer','quotations','Quotation Validity Days','صلاحية العرض بالأيام',NULL,0,'2026-02-08 22:43:22','2026-02-08 22:43:22'),(8,'max_followups_per_month','50','integer','followups','Max Followups Per Month','الحد الأقصى للمتابعات شهرياً',NULL,0,'2026-02-08 22:43:22','2026-02-08 22:43:22'),(9,'company_name','CRM System','string','company','Company Name','اسم الشركة',NULL,1,'2026-02-08 22:43:22','2026-02-08 22:43:22'),(10,'company_email','','string','company','Company Email','البريد الإلكتروني',NULL,0,'2026-02-08 22:43:22','2026-02-08 22:43:22'),(11,'company_phone','','string','company','Company Phone','رقم الهاتف',NULL,0,'2026-02-08 22:43:22','2026-02-08 22:43:22');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sla_configs`
--

DROP TABLE IF EXISTS `sla_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sla_configs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('low','normal','high','critical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `first_response_minutes` int unsigned NOT NULL DEFAULT '60',
  `resolution_minutes` int unsigned NOT NULL DEFAULT '480',
  `escalation_minutes` int unsigned DEFAULT NULL,
  `escalate_to_user_id` bigint unsigned DEFAULT NULL,
  `escalate_to_role_id` bigint unsigned DEFAULT NULL,
  `exclude_non_working_hours` tinyint(1) NOT NULL DEFAULT '1',
  `exclude_holidays` tinyint(1) NOT NULL DEFAULT '1',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sla_configs_entity_type_priority_unique` (`entity_type`,`priority`),
  KEY `sla_configs_escalate_to_user_id_foreign` (`escalate_to_user_id`),
  KEY `sla_configs_escalate_to_role_id_foreign` (`escalate_to_role_id`),
  KEY `sla_configs_entity_type_index` (`entity_type`),
  CONSTRAINT `sla_configs_escalate_to_role_id_foreign` FOREIGN KEY (`escalate_to_role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL,
  CONSTRAINT `sla_configs_escalate_to_user_id_foreign` FOREIGN KEY (`escalate_to_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sla_configs`
--

LOCK TABLES `sla_configs` WRITE;
/*!40000 ALTER TABLE `sla_configs` DISABLE KEYS */;
INSERT INTO `sla_configs` VALUES (1,'ticket','critical',30,240,60,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(2,'ticket','high',60,480,120,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(3,'ticket','normal',120,1440,240,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(4,'ticket','low',480,2880,960,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(5,'lead','high',15,60,30,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(6,'lead','normal',60,240,120,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(7,'followup','high',60,240,120,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21'),(8,'followup','normal',240,1440,480,NULL,NULL,1,1,1,'2026-02-08 22:43:21','2026-02-08 22:43:21');
/*!40000 ALTER TABLE `sla_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_answers`
--

DROP TABLE IF EXISTS `survey_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `survey_response_id` bigint unsigned NOT NULL,
  `survey_question_id` bigint unsigned NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci,
  `rating` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_answers_survey_response_id_foreign` (`survey_response_id`),
  KEY `survey_answers_survey_question_id_foreign` (`survey_question_id`),
  CONSTRAINT `survey_answers_survey_question_id_foreign` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_answers_survey_response_id_foreign` FOREIGN KEY (`survey_response_id`) REFERENCES `survey_responses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_answers`
--

LOCK TABLES `survey_answers` WRITE;
/*!40000 ALTER TABLE `survey_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_questions`
--

DROP TABLE IF EXISTS `survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `survey_id` bigint unsigned NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('rating','text','choice','nps','yes_no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'rating',
  `options` json DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_required` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_questions_survey_id_foreign` (`survey_id`),
  CONSTRAINT `survey_questions_survey_id_foreign` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_questions`
--

LOCK TABLES `survey_questions` WRITE;
/*!40000 ALTER TABLE `survey_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_responses`
--

DROP TABLE IF EXISTS `survey_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_responses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `survey_id` bigint unsigned NOT NULL,
  `customer_id` bigint unsigned DEFAULT NULL,
  `deal_id` bigint unsigned DEFAULT NULL,
  `ticket_id` bigint unsigned DEFAULT NULL,
  `recorded_by` bigint unsigned NOT NULL,
  `status` enum('pending','completed','skipped') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `overall_rating` int DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_responses_survey_id_foreign` (`survey_id`),
  KEY `survey_responses_customer_id_foreign` (`customer_id`),
  KEY `survey_responses_deal_id_foreign` (`deal_id`),
  KEY `survey_responses_ticket_id_foreign` (`ticket_id`),
  KEY `survey_responses_recorded_by_foreign` (`recorded_by`),
  CONSTRAINT `survey_responses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `survey_responses_deal_id_foreign` FOREIGN KEY (`deal_id`) REFERENCES `deals` (`id`) ON DELETE SET NULL,
  CONSTRAINT `survey_responses_recorded_by_foreign` FOREIGN KEY (`recorded_by`) REFERENCES `users` (`id`),
  CONSTRAINT `survey_responses_survey_id_foreign` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_responses_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_responses`
--

LOCK TABLES `survey_responses` WRITE;
/*!40000 ALTER TABLE `survey_responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `type` enum('satisfaction','feedback','nps','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'satisfaction',
  `trigger_event` enum('deal_won','deal_lost','ticket_resolved','manual') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'manual',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `auto_send` tinyint(1) NOT NULL DEFAULT '0',
  `send_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `delay_hours` int NOT NULL DEFAULT '0',
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `surveys_created_by_foreign` (`created_by`),
  CONSTRAINT `surveys_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `target_periods`
--

DROP TABLE IF EXISTS `target_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `target_periods` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `target_periods_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `target_periods`
--

LOCK TABLES `target_periods` WRITE;
/*!40000 ALTER TABLE `target_periods` DISABLE KEYS */;
INSERT INTO `target_periods` VALUES (1,'يومي','Daily','daily',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'أسبوعي','Weekly','weekly',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'شهري','Monthly','monthly',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'ربع سنوي','Quarterly','quarterly',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(5,'سنوي','Yearly','yearly',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `target_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `target_types`
--

DROP TABLE IF EXISTS `target_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `target_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `target_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `target_types`
--

LOCK TABLES `target_types` WRITE;
/*!40000 ALTER TABLE `target_types` DISABLE KEYS */;
INSERT INTO `target_types` VALUES (1,'مبيعات','Sales','sales',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'مكالمات','Calls','calls',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'زيارات','Visits','visits',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'عملاء محتملين','Leads','leads',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(5,'صفقات','Deals','deals',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `target_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `targets`
--

DROP TABLE IF EXISTS `targets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `targets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `team_id` bigint unsigned DEFAULT NULL,
  `branch_id` bigint unsigned DEFAULT NULL,
  `target_type` enum('sales','leads','calls','visits','deals','revenue') COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_type` enum('daily','weekly','monthly','quarterly','yearly') COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_start` date NOT NULL,
  `period_end` date NOT NULL,
  `target_value` decimal(15,2) NOT NULL,
  `achieved_value` decimal(15,2) NOT NULL DEFAULT '0.00',
  `achievement_percentage` decimal(5,2) NOT NULL DEFAULT '0.00',
  `status` enum('pending','in_progress','achieved','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `targets_created_by_foreign` (`created_by`),
  KEY `targets_user_id_index` (`user_id`),
  KEY `targets_target_type_index` (`target_type`),
  KEY `targets_status_index` (`status`),
  KEY `targets_period_start_period_end_index` (`period_start`,`period_end`),
  CONSTRAINT `targets_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `targets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `targets`
--

LOCK TABLES `targets` WRITE;
/*!40000 ALTER TABLE `targets` DISABLE KEYS */;
/*!40000 ALTER TABLE `targets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_priorities`
--

DROP TABLE IF EXISTS `task_priorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_priorities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_priorities_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_priorities`
--

LOCK TABLES `task_priorities` WRITE;
/*!40000 ALTER TABLE `task_priorities` DISABLE KEYS */;
INSERT INTO `task_priorities` VALUES (1,'low','منخفض','Low','#10B981',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'medium','متوسط','Medium','#3B82F6',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'high','عالي','High','#F59E0B',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(4,'urgent','عاجل','Urgent','#EF4444',4,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `task_priorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_statuses`
--

DROP TABLE IF EXISTS `task_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_statuses`
--

LOCK TABLES `task_statuses` WRITE;
/*!40000 ALTER TABLE `task_statuses` DISABLE KEYS */;
INSERT INTO `task_statuses` VALUES (1,'معلقة','Pending','pending','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'قيد التنفيذ','In Progress','in_progress','#3B82F6',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'مكتملة','Completed','completed','#10B981',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'ملغاة','Cancelled','cancelled','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `task_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_types`
--

DROP TABLE IF EXISTS `task_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_types`
--

LOCK TABLES `task_types` WRITE;
/*!40000 ALTER TABLE `task_types` DISABLE KEYS */;
INSERT INTO `task_types` VALUES (1,'call','اتصال','Call','#3B82F6',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'meeting','اجتماع','Meeting','#10B981',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'email','بريد إلكتروني','Email','#8B5CF6',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(4,'visit','زيارة','Visit','#F59E0B',4,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(5,'followup','متابعة','Follow-up','#EC4899',5,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(6,'other','أخرى','Other','#6B7280',6,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `task_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned DEFAULT NULL,
  `followup_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `due_date` date NOT NULL,
  `due_time` time DEFAULT NULL,
  `reminder_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','in_progress','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `priority` enum('low','normal','high','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `cancel_reason_id` bigint unsigned DEFAULT NULL,
  `assigned_to` bigint unsigned NOT NULL,
  `assigned_by` bigint unsigned NOT NULL,
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tasks_code_unique` (`code`),
  KEY `tasks_customer_id_foreign` (`customer_id`),
  KEY `tasks_followup_id_foreign` (`followup_id`),
  KEY `tasks_cancel_reason_id_foreign` (`cancel_reason_id`),
  KEY `tasks_assigned_by_foreign` (`assigned_by`),
  KEY `tasks_created_by_foreign` (`created_by`),
  KEY `tasks_assigned_to_index` (`assigned_to`),
  KEY `tasks_due_date_index` (`due_date`),
  KEY `tasks_status_index` (`status`),
  KEY `tasks_priority_index` (`priority`),
  KEY `tasks_assigned_to_status_index` (`assigned_to`,`status`),
  CONSTRAINT `tasks_assigned_by_foreign` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_cancel_reason_id_foreign` FOREIGN KEY (`cancel_reason_id`) REFERENCES `cancel_reasons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tasks_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tasks_followup_id_foreign` FOREIGN KEY (`followup_id`) REFERENCES `followups` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_categories`
--

DROP TABLE IF EXISTS `ticket_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sla_hours` int NOT NULL DEFAULT '24',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_categories_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_categories`
--

LOCK TABLES `ticket_categories` WRITE;
/*!40000 ALTER TABLE `ticket_categories` DISABLE KEYS */;
INSERT INTO `ticket_categories` VALUES (1,'COMPLAINT','شكوى','Complaint',NULL,'#EF4444',4,1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(2,'INQUIRY','استفسار','Inquiry',NULL,'#3B82F6',24,1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(3,'TECHNICAL','دعم فني','Technical Support',NULL,'#8B5CF6',8,1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(4,'FEATURE','طلب ميزة','Feature Request',NULL,'#10B981',72,1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(5,'OTHER','أخرى','Other',NULL,'#6B7280',48,1,'2026-01-30 15:05:15','2026-01-30 15:05:15');
/*!40000 ALTER TABLE `ticket_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_priorities`
--

DROP TABLE IF EXISTS `ticket_priorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_priorities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sla_hours` int NOT NULL DEFAULT '24',
  `level` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_priorities_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_priorities`
--

LOCK TABLES `ticket_priorities` WRITE;
/*!40000 ALTER TABLE `ticket_priorities` DISABLE KEYS */;
INSERT INTO `ticket_priorities` VALUES (1,'low','منخفض','Low','#10B981',48,1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(2,'medium','متوسط','Medium','#3B82F6',24,2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(3,'high','عالي','High','#F59E0B',8,3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(4,'urgent','عاجل','Urgent','#EF4444',4,4,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `ticket_priorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_replies`
--

DROP TABLE IF EXISTS `ticket_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_replies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint unsigned NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_internal` tinyint(1) NOT NULL DEFAULT '0',
  `is_from_customer` tinyint(1) NOT NULL DEFAULT '0',
  `attachments` json DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_replies_ticket_id_foreign` (`ticket_id`),
  KEY `ticket_replies_created_by_foreign` (`created_by`),
  CONSTRAINT `ticket_replies_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ticket_replies_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_replies`
--

LOCK TABLES `ticket_replies` WRITE;
/*!40000 ALTER TABLE `ticket_replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_types`
--

DROP TABLE IF EXISTS `ticket_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_types_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_types`
--

LOCK TABLES `ticket_types` WRITE;
/*!40000 ALTER TABLE `ticket_types` DISABLE KEYS */;
INSERT INTO `ticket_types` VALUES (1,'شكوى','Complaint','complaint',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'استفسار','Inquiry','inquiry',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'اقتراح','Suggestion','suggestion',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'دعم فني','Technical Support','technical',NULL,NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `ticket_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `contact_id` bigint unsigned DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('complaint','inquiry','technical','feature_request','suggestion') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inquiry',
  `category_id` bigint unsigned DEFAULT NULL,
  `priority` enum('low','normal','high','critical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `status` enum('new','open','in_progress','waiting_customer','resolved','closed','escalated') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `sla_due_at` timestamp NULL DEFAULT NULL,
  `first_response_at` timestamp NULL DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `sla_breached` tinyint(1) NOT NULL DEFAULT '0',
  `escalated_at` timestamp NULL DEFAULT NULL,
  `escalated_to` bigint unsigned DEFAULT NULL,
  `escalation_reason` text COLLATE utf8mb4_unicode_ci,
  `assigned_to` bigint unsigned DEFAULT NULL,
  `department_id` bigint unsigned DEFAULT NULL,
  `satisfaction_rating` tinyint DEFAULT NULL,
  `satisfaction_comment` text COLLATE utf8mb4_unicode_ci,
  `related_call_id` bigint unsigned DEFAULT NULL,
  `related_quotation_id` bigint unsigned DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `closed_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tickets_code_unique` (`code`),
  KEY `tickets_contact_id_foreign` (`contact_id`),
  KEY `tickets_category_id_foreign` (`category_id`),
  KEY `tickets_escalated_to_foreign` (`escalated_to`),
  KEY `tickets_department_id_foreign` (`department_id`),
  KEY `tickets_created_by_foreign` (`created_by`),
  KEY `tickets_customer_id_index` (`customer_id`),
  KEY `tickets_assigned_to_index` (`assigned_to`),
  KEY `tickets_status_index` (`status`),
  KEY `tickets_priority_index` (`priority`),
  KEY `tickets_sla_due_at_index` (`sla_due_at`),
  KEY `idx_tickets_assigned_status_priority` (`assigned_to`,`status`,`priority`),
  KEY `idx_tickets_customer_status` (`customer_id`,`status`),
  CONSTRAINT `tickets_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `ticket_categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `customer_contacts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tickets_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_escalated_to_foreign` FOREIGN KEY (`escalated_to`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `units_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,'PC','قطعة','Piece','pc',1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(2,'HR','ساعة','Hour','hr',1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(3,'DAY','يوم','Day','day',1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(4,'MTH','شهر','Month','mth',1,'2026-01-30 15:05:15','2026-01-30 15:05:15'),(5,'SRV','خدمة','Service','srv',1,'2026-01-30 15:05:15','2026-01-30 15:05:15');
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_delegations`
--

DROP TABLE IF EXISTS `user_delegations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_delegations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from_user_id` bigint unsigned NOT NULL,
  `to_user_id` bigint unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `type` enum('all','followups','tasks','tickets','deals') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','active','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_delegations_created_by_foreign` (`created_by`),
  KEY `user_delegations_from_user_id_index` (`from_user_id`),
  KEY `user_delegations_to_user_id_index` (`to_user_id`),
  KEY `user_delegations_start_date_end_date_index` (`start_date`,`end_date`),
  KEY `user_delegations_status_index` (`status`),
  CONSTRAINT `user_delegations_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_delegations_from_user_id_foreign` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_delegations_to_user_id_foreign` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_delegations`
--

LOCK TABLES `user_delegations` WRITE;
/*!40000 ALTER TABLE `user_delegations` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_delegations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  `type` enum('grant','revoke') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'grant',
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_permissions_user_id_permission_id_unique` (`user_id`,`permission_id`),
  KEY `user_permissions_permission_id_foreign` (`permission_id`),
  CONSTRAINT `user_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_permissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_points`
--

DROP TABLE IF EXISTS `user_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_points` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `points` int NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_id` bigint unsigned DEFAULT NULL,
  `awarded_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_points_awarded_by_foreign` (`awarded_by`),
  KEY `user_points_user_id_created_at_index` (`user_id`,`created_at`),
  KEY `user_points_type_index` (`type`),
  CONSTRAINT `user_points_awarded_by_foreign` FOREIGN KEY (`awarded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_points_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_points`
--

LOCK TABLES `user_points` WRITE;
/*!40000 ALTER TABLE `user_points` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature_image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` bigint unsigned DEFAULT NULL,
  `branch_id` bigint unsigned DEFAULT NULL,
  `region_id` bigint unsigned DEFAULT NULL,
  `role_id` bigint unsigned NOT NULL,
  `manager_id` bigint unsigned DEFAULT NULL,
  `status` enum('active','suspended','on_leave','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `two_factor_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `two_factor_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferences` json DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ar',
  `theme` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'light',
  `date_format` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'dd/MM/yyyy',
  `timezone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Africa/Cairo',
  `email_notifications` tinyint(1) NOT NULL DEFAULT '1',
  `push_notifications` tinyint(1) NOT NULL DEFAULT '1',
  `followup_reminders` tinyint(1) NOT NULL DEFAULT '1',
  `lead_assignments` tinyint(1) NOT NULL DEFAULT '1',
  `deal_updates` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_code_unique` (`code`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_department_id_foreign` (`department_id`),
  KEY `users_region_id_foreign` (`region_id`),
  KEY `users_role_id_foreign` (`role_id`),
  KEY `users_manager_id_foreign` (`manager_id`),
  KEY `users_email_index` (`email`),
  KEY `users_branch_id_index` (`branch_id`),
  KEY `users_status_index` (`status`),
  KEY `users_phone_index` (`phone`),
  CONSTRAINT `users_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_region_id_foreign` FOREIGN KEY (`region_id`) REFERENCES `governorates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'USR-0001','مدير النظام','admin@crm.local','01000000000','$2y$12$LMvXE95CLAyLGPAiwMQfcOOClX.QZoAs18OkVxbd4iZtbP6QT7TR6',NULL,NULL,NULL,4,1,NULL,1,NULL,'active',0,NULL,'2026-01-30 15:05:30','2026-02-20 14:52:30','127.0.0.1',NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:30','2026-02-20 14:52:30',NULL),(2,'USR-0002','موظف مبيعات','sales@crm.local','01000000001','$2y$12$c2G2QF4vrJdIowGdFuUflud8eXBMiPWmTp3GS70FwfUVK1e/MmIci',NULL,NULL,NULL,1,1,NULL,3,3,'active',0,NULL,'2026-01-30 15:05:30',NULL,NULL,NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:30','2026-01-30 15:05:30',NULL),(3,'USR-0003','مدير المبيعات','manager@crm.local','01000000002','$2y$12$IUl4RJnBI1LOvXmA57SOfOs8.6AqpnoSxPmERBFBqB3KAZsSDVERC',NULL,NULL,NULL,1,1,NULL,2,NULL,'active',0,NULL,'2026-01-30 15:05:30',NULL,NULL,NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:30','2026-01-30 15:05:30',NULL),(4,'USR-0004','دعم فني','support@crm.local','01000000003','$2y$12$/r7dcDjVDxShgiZMiA1sY.Cq2sxhIEl7e2AqrHOM7ds7dzuCGsAwa',NULL,NULL,NULL,2,1,NULL,1,NULL,'active',0,NULL,'2026-01-30 15:05:31',NULL,NULL,NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:31','2026-01-30 15:05:31',NULL),(5,'USR-0005','أحمد محمد','sales2@crm.local','01000000004','$2y$12$SG7ShjOhj1NI2sDaKM0WG.M/5LlfLndOj6T7a01.vggO6vi3/gMWa',NULL,NULL,NULL,1,2,NULL,3,3,'active',0,NULL,'2026-01-30 15:05:31',NULL,NULL,NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:31','2026-01-30 15:05:31',NULL),(6,'USR-0006','محمد علي','sales3@crm.local','01000000005','$2y$12$.bycG1kyg2lZhgNdtpJld.d7R/EjQkLox8lC1HvJxQx.encWzK2Yy',NULL,NULL,NULL,1,3,NULL,3,3,'active',0,NULL,'2026-01-30 15:05:31',NULL,NULL,NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:31','2026-01-30 15:05:31',NULL),(7,'USR-0007','سارة أحمد','sales4@crm.local','01000000006','$2y$12$2pk.6DuMKuC924oKqqdLLelvL4.a2psNii11hsVbJGlMnkdZHx5y6',NULL,NULL,NULL,1,1,NULL,3,3,'active',0,NULL,'2026-01-30 15:05:31',NULL,NULL,NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:31','2026-01-30 15:05:31',NULL),(8,'USR-0008','موظف كول سنتر','callcenter@crm.local','01000000007','$2y$12$zVsyU/6aXv9Ruym4YA0rteQ8zwl./cNuJpP2fvKu9QAcpQdY.2KSG',NULL,NULL,NULL,3,1,NULL,1,NULL,'active',0,NULL,'2026-01-30 15:05:32',NULL,NULL,NULL,NULL,'ar','light','dd/MM/yyyy','Africa/Cairo',1,1,1,1,1,'2026-01-30 15:05:32','2026-01-30 15:05:32',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit_postpone_rules`
--

DROP TABLE IF EXISTS `visit_postpone_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_postpone_rules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `max_postpone_count` tinyint unsigned NOT NULL DEFAULT '3',
  `max_postpone_days` smallint unsigned NOT NULL DEFAULT '7',
  `min_notice_hours` smallint unsigned NOT NULL DEFAULT '2',
  `require_reason` tinyint(1) NOT NULL DEFAULT '1',
  `require_approval` tinyint(1) NOT NULL DEFAULT '0',
  `approval_after_count` tinyint unsigned DEFAULT NULL,
  `sales_rep_can_postpone` tinyint(1) NOT NULL DEFAULT '1',
  `team_leader_can_postpone` tinyint(1) NOT NULL DEFAULT '1',
  `manager_can_postpone` tinyint(1) NOT NULL DEFAULT '1',
  `notify_customer` tinyint(1) NOT NULL DEFAULT '0',
  `notify_manager` tinyint(1) NOT NULL DEFAULT '1',
  `notify_team_leader` tinyint(1) NOT NULL DEFAULT '1',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_postpone_rules`
--

LOCK TABLES `visit_postpone_rules` WRITE;
/*!40000 ALTER TABLE `visit_postpone_rules` DISABLE KEYS */;
INSERT INTO `visit_postpone_rules` VALUES (1,'القاعدة الافتراضية','Default Rule','قواعد التأجيل الافتراضية للزيارات',3,7,2,1,0,2,1,1,1,0,1,1,1,1,'2026-02-08 23:14:51','2026-02-08 23:14:51');
/*!40000 ALTER TABLE `visit_postpone_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit_purposes`
--

DROP TABLE IF EXISTS `visit_purposes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_purposes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visit_purposes_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_purposes`
--

LOCK TABLES `visit_purposes` WRITE;
/*!40000 ALTER TABLE `visit_purposes` DISABLE KEYS */;
INSERT INTO `visit_purposes` VALUES (1,'followup','متابعة','Follow-up',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'demo','عرض منتج','Product Demo',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'contract','توقيع عقد','Contract Signing',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'documents','استلام مستندات','Document Collection',NULL,0,1,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(5,'delivery','تسليم','Delivery','#F59E0B',3,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(6,'other','أخرى','Other','#6B7280',7,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(7,'sales','مبيعات','Sales','#3B82F6',1,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(8,'support','دعم فني','Support','#10B981',2,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(9,'installation','تركيب','Installation','#8B5CF6',4,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(10,'maintenance','صيانة','Maintenance','#EC4899',5,1,'2026-02-08 22:42:02','2026-02-08 22:42:02'),(11,'collection','تحصيل','Collection','#14B8A6',6,1,'2026-02-08 22:42:02','2026-02-08 22:42:02');
/*!40000 ALTER TABLE `visit_purposes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit_statuses`
--

DROP TABLE IF EXISTS `visit_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visit_statuses_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_statuses`
--

LOCK TABLES `visit_statuses` WRITE;
/*!40000 ALTER TABLE `visit_statuses` DISABLE KEYS */;
INSERT INTO `visit_statuses` VALUES (1,'مجدولة','Scheduled','scheduled','#3B82F6',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(2,'مكتملة','Completed','completed','#10B981',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(3,'ملغاة','Cancelled','cancelled','#EF4444',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53'),(4,'مؤجلة','Postponed','postponed','#F59E0B',NULL,1,0,'2026-02-08 22:41:53','2026-02-08 22:41:53');
/*!40000 ALTER TABLE `visit_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `deal_id` bigint unsigned DEFAULT NULL,
  `assigned_to` bigint unsigned NOT NULL,
  `visit_date` date NOT NULL,
  `scheduled_time` time DEFAULT NULL,
  `purpose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `status` enum('scheduled','in_progress','completed','cancelled','rescheduled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'scheduled',
  `check_in_at` timestamp NULL DEFAULT NULL,
  `check_in_lat` decimal(10,7) DEFAULT NULL,
  `check_in_lng` decimal(10,7) DEFAULT NULL,
  `check_in_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `check_out_at` timestamp NULL DEFAULT NULL,
  `check_out_lat` decimal(10,7) DEFAULT NULL,
  `check_out_lng` decimal(10,7) DEFAULT NULL,
  `outcome` text COLLATE utf8mb4_unicode_ci,
  `feedback` text COLLATE utf8mb4_unicode_ci,
  `photos` json DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `source_followup_id` bigint unsigned DEFAULT NULL,
  `result_followup_id` bigint unsigned DEFAULT NULL,
  `postpone_count` tinyint unsigned NOT NULL DEFAULT '0',
  `postpone_reason_id` bigint unsigned DEFAULT NULL,
  `postpone_notes` text COLLATE utf8mb4_unicode_ci,
  `original_visit_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visits_code_unique` (`code`),
  KEY `visits_created_by_foreign` (`created_by`),
  KEY `visits_customer_id_index` (`customer_id`),
  KEY `visits_assigned_to_index` (`assigned_to`),
  KEY `visits_visit_date_index` (`visit_date`),
  KEY `visits_status_index` (`status`),
  KEY `idx_visits_assigned_date_status` (`assigned_to`,`visit_date`,`status`),
  KEY `idx_visits_customer_date` (`customer_id`,`visit_date`),
  KEY `visits_source_followup_id_foreign` (`source_followup_id`),
  KEY `visits_result_followup_id_foreign` (`result_followup_id`),
  KEY `visits_postpone_reason_id_foreign` (`postpone_reason_id`),
  CONSTRAINT `visits_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  CONSTRAINT `visits_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `visits_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `visits_postpone_reason_id_foreign` FOREIGN KEY (`postpone_reason_id`) REFERENCES `postpone_reasons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `visits_result_followup_id_foreign` FOREIGN KEY (`result_followup_id`) REFERENCES `followups` (`id`) ON DELETE SET NULL,
  CONSTRAINT `visits_source_followup_id_foreign` FOREIGN KEY (`source_followup_id`) REFERENCES `followups` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_logs`
--

DROP TABLE IF EXISTS `workflow_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `workflow_id` bigint unsigned NOT NULL,
  `execution_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `triggerable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `triggerable_id` bigint unsigned NOT NULL,
  `status` enum('pending','running','completed','failed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `started_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `current_step` int NOT NULL DEFAULT '0',
  `step_results` json DEFAULT NULL,
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `triggered_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_logs_triggerable_type_triggerable_id_index` (`triggerable_type`,`triggerable_id`),
  KEY `workflow_logs_triggered_by_foreign` (`triggered_by`),
  KEY `workflow_logs_workflow_id_status_index` (`workflow_id`,`status`),
  CONSTRAINT `workflow_logs_triggered_by_foreign` FOREIGN KEY (`triggered_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `workflow_logs_workflow_id_foreign` FOREIGN KEY (`workflow_id`) REFERENCES `workflows` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_logs`
--

LOCK TABLES `workflow_logs` WRITE;
/*!40000 ALTER TABLE `workflow_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_steps`
--

DROP TABLE IF EXISTS `workflow_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow_steps` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `workflow_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `config` json DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `next_step_id` bigint unsigned DEFAULT NULL,
  `on_failure_step_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_steps_next_step_id_foreign` (`next_step_id`),
  KEY `workflow_steps_on_failure_step_id_foreign` (`on_failure_step_id`),
  KEY `workflow_steps_workflow_id_sort_order_index` (`workflow_id`,`sort_order`),
  CONSTRAINT `workflow_steps_next_step_id_foreign` FOREIGN KEY (`next_step_id`) REFERENCES `workflow_steps` (`id`) ON DELETE SET NULL,
  CONSTRAINT `workflow_steps_on_failure_step_id_foreign` FOREIGN KEY (`on_failure_step_id`) REFERENCES `workflow_steps` (`id`) ON DELETE SET NULL,
  CONSTRAINT `workflow_steps_workflow_id_foreign` FOREIGN KEY (`workflow_id`) REFERENCES `workflows` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_steps`
--

LOCK TABLES `workflow_steps` WRITE;
/*!40000 ALTER TABLE `workflow_steps` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflows`
--

DROP TABLE IF EXISTS `workflows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflows` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `trigger_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trigger_event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trigger_conditions` json DEFAULT NULL,
  `n8n_workflow_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `n8n_webhook_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `workflows_code_unique` (`code`),
  KEY `workflows_created_by_foreign` (`created_by`),
  KEY `workflows_trigger_type_is_active_index` (`trigger_type`,`is_active`),
  KEY `workflows_trigger_event_index` (`trigger_event`),
  CONSTRAINT `workflows_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflows`
--

LOCK TABLES `workflows` WRITE;
/*!40000 ALTER TABLE `workflows` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `working_hours`
--

DROP TABLE IF EXISTS `working_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `working_hours` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` bigint unsigned DEFAULT NULL,
  `department_id` bigint unsigned DEFAULT NULL,
  `day_of_week` tinyint unsigned NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `break_start` time DEFAULT NULL,
  `break_end` time DEFAULT NULL,
  `is_working_day` tinyint(1) NOT NULL DEFAULT '1',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `working_hours_branch_id_day_of_week_index` (`branch_id`,`day_of_week`),
  KEY `working_hours_department_id_day_of_week_index` (`department_id`,`day_of_week`),
  CONSTRAINT `working_hours_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE,
  CONSTRAINT `working_hours_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_hours`
--

LOCK TABLES `working_hours` WRITE;
/*!40000 ALTER TABLE `working_hours` DISABLE KEYS */;
INSERT INTO `working_hours` VALUES (1,NULL,NULL,0,'09:00:00','17:00:00','13:00:00','14:00:00',1,1,'2026-02-08 22:43:19','2026-02-08 22:43:19'),(2,NULL,NULL,1,'09:00:00','17:00:00','13:00:00','14:00:00',1,1,'2026-02-08 22:43:19','2026-02-08 22:43:19'),(3,NULL,NULL,2,'09:00:00','17:00:00','13:00:00','14:00:00',1,1,'2026-02-08 22:43:19','2026-02-08 22:43:19'),(4,NULL,NULL,3,'09:00:00','17:00:00','13:00:00','14:00:00',1,1,'2026-02-08 22:43:19','2026-02-08 22:43:19'),(5,NULL,NULL,4,'09:00:00','17:00:00','13:00:00','14:00:00',1,1,'2026-02-08 22:43:19','2026-02-08 22:43:19'),(6,NULL,NULL,5,'09:00:00','17:00:00','13:00:00','14:00:00',0,1,'2026-02-08 22:43:19','2026-02-08 22:43:19'),(7,NULL,NULL,6,'09:00:00','17:00:00','13:00:00','14:00:00',0,1,'2026-02-08 22:43:19','2026-02-08 22:43:19');
/*!40000 ALTER TABLE `working_hours` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-09 19:32:36
