-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: butterfly_pixbit_v2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product_idx` (`id_product`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Accion'),(2,'Disparos'),(3,'Estrategia'),(4,'Simulacion'),(5,'Deporte'),(6,'Carrera'),(7,'Aventura'),(8,'Rol');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticiabanner`
--

DROP TABLE IF EXISTS `noticiabanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `noticiabanner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `image` varchar(200) NOT NULL,
  `ref` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticiabanner`
--

LOCK TABLES `noticiabanner` WRITE;
/*!40000 ALTER TABLE `noticiabanner` DISABLE KEYS */;
INSERT INTO `noticiabanner` VALUES (1,'Ahora en dispositivos moviles','dsadsad','image1602578119153.webp',1),(3,'YA SALIO NUEVA EXPANCION \"NEXT\"','llegamos hasta \'No Man\'s Sky: NEXT\', o lo que es lo mismo, la actualización 1.5 (sí, el estudio se saltó la 1.4), donde destaca la implementación de un modo multijugador online real, donde cuatro personas (conocidas o no) se podrán juntar por el espacio para hacer todo tipo de diabluras... o simplem','image1602574669183.jpg',3),(4,'EN DESARROLLO SEGUNDA PARTE!','Si, nuestro amigos de sekai projects ya se encuentran en desarrollo de la secuela de este gran juego','image1602579599909.jpg',4);
/*!40000 ALTER TABLE `noticiabanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `genre` int(11) NOT NULL,
  `requisito` varchar(500) NOT NULL,
  `descripcion` varchar(800) NOT NULL,
  `propiedad` tinyint(4) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `id_genre` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_genre_idx` (`id_genre`),
  CONSTRAINT `id_genre` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Human Fall Man',0,'asdsa','divertido',1,132,'image1602449123381.jpg',4),(3,'No mans sky',0,'asdasdjasjdashuio','lorem parsem',0,600,'image1602218478915.jpg',4),(4,'Neko Para vol 1',0,'SO: Microsoft Windows Vista\r\nProcesador: 1.8 GHz Pentium 4\r\nMemoria: 1 GB de RAM\r\nGráficos: 1280 x 720\r\nDirectX: Versión 9.0c\r\nAlmacenamiento: 3 GB de espacio disponible','Patisserie \"La Soleil\", run by Kashou Minaduki, is flourishing thanks to the help of two catgirls: Maple, full of pride and a little on the haughty side, and Cinnamon, an impulsive daydreamer.\r\n\r\nThese two are especially close among the rest of the sisters. One day, Maple encounters something that shakes her belief in attaining her dream. Cinnamon, unwilling to see Maple suffer, wishes to help her in any way possible... but she can\'t figure out how. This story is a heartwarming cat comedy about their ambitions and the bonds between family members... with a little ecchi on the side, too.',0,130,'image1602578744098.jpg',4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `nameU` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'asdjhsadgh','easdsad','adhuwia@gmail.com','$2b$10$dv9fn/gi4XLXOvzrwZj7iOpqEqxIspwA9mV8gFJLqF4OozjhH05Qi','default-image.png',0),(3,'Brallam','Brallam','hola@gmail.com','$2b$10$IZC8X3gNnLwAGrpWgzUZo.rWa91zNAjbtmwiv7vld7QrVwDMaVuhC','image1602450043027.jpg',1);
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

-- Dump completed on 2020-10-13  6:13:23
