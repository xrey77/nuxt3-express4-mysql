-- DATABASE NAME : wincor10
-- TABLE NAME : users

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(100) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `isactivated` int DEFAULT '0',
  `isblocked` int DEFAULT '0',
  `mailtoken` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activation_token` int DEFAULT '0',
  `activation_expiry` timestamp NULL DEFAULT NULL,
  `mailtoken_expiry` timestamp NULL DEFAULT NULL,
  `picture` longtext,
  `qrcodeurl` longtext,
  `secretkey` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;