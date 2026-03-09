SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Company
-- ----------------------------
DROP TABLE IF EXISTS `Company`;
CREATE TABLE `Company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameAr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` text COLLATE utf8mb4_unicode_ci NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `commission` double NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Company_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Default Records of Company
-- ----------------------------
BEGIN;
INSERT INTO `Company` (`name`, `nameAr`, `logo`, `color`, `commission`, `createdAt`, `updatedAt`) VALUES
('Uber', 'أوبر', NULL, '#000000', 0, NOW(3), NOW(3)),
('Didi', 'ديدي', NULL, '#ff7d00', 0, NOW(3), NOW(3)),
('InDrive', 'إن درايف', NULL, '#B2F75B', 0, NOW(3), NOW(3));
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
