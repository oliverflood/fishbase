-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 03, 2023 at 10:01 PM
-- Server version: 10.6.14-MariaDB-log
-- PHP Version: 8.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_floodo`
--

-- --------------------------------------------------------

--
-- Table structure for table `Catches`
--

CREATE TABLE `Catches` (
  `catch_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `fish_id` int(11) DEFAULT NULL,
  `money_earned` decimal(10,2) NOT NULL,
  `catch_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Catches`
--

INSERT INTO `Catches` (`catch_id`, `player_id`, `fish_id`, `money_earned`, `catch_date`) VALUES
(1, 1, 1, 5.99, '2022-02-03 14:20:00'),
(2, 1, 2, 10.99, '2022-02-10 11:45:00'),
(3, 2, 1, 5.99, '2022-03-20 09:30:00'),
(4, 3, 3, 2.99, '2022-07-01 16:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `Fishes`
--

CREATE TABLE `Fishes` (
  `fish_id` int(11) NOT NULL,
  `rarity_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `favorite_movie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Fishes`
--

INSERT INTO `Fishes` (`fish_id`, `rarity_id`, `name`, `color`, `description`, `favorite_movie`) VALUES
(1, 1, 'Salmon', 'Pink', 'A medium-sized fish', 'Finding Nemo'),
(2, 1, 'Tuna', 'Blue', 'A large saltwater fish', 'Jaws'),
(3, 3, 'Goldfish', 'Orange', 'A small freshwater fish', 'Finding Nemo');

-- --------------------------------------------------------

--
-- Table structure for table `PlayerRods`
--

CREATE TABLE `PlayerRods` (
  `player_rod_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `rod_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `PlayerRods`
--

INSERT INTO `PlayerRods` (`player_rod_id`, `player_id`, `rod_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Players`
--

CREATE TABLE `Players` (
  `player_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `total_catches` int(11) NOT NULL,
  `join_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Players`
--

INSERT INTO `Players` (`player_id`, `username`, `total_catches`, `join_date`) VALUES
(1, 'player1', 25, '2022-01-15'),
(2, 'player2', 42, '2022-03-10'),
(3, 'player3', 10, '2022-06-05');

-- --------------------------------------------------------

--
-- Table structure for table `Rarities`
--

CREATE TABLE `Rarities` (
  `rarity_id` int(11) NOT NULL,
  `rarity_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Rarities`
--

INSERT INTO `Rarities` (`rarity_id`, `rarity_name`, `description`) VALUES
(1, 'Common', 'Common rarity fish'),
(2, 'Uncommon', 'Uncommon rarity fish'),
(3, 'Rare', 'Rare rarity fish');

-- --------------------------------------------------------

--
-- Table structure for table `Rods`
--

CREATE TABLE `Rods` (
  `rod_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tooltip` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `catch_rate` decimal(5,2) NOT NULL,
  `line_length` decimal(5,2) NOT NULL,
  `reel_speed` decimal(5,2) NOT NULL,
  `money_multiplier` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Rods`
--

INSERT INTO `Rods` (`rod_id`, `name`, `tooltip`, `price`, `catch_rate`, `line_length`, `reel_speed`, `money_multiplier`) VALUES
(1, 'Basic Rod', 'A beginner rod', 10.99, 0.50, 10.00, 1.00, 1.00),
(2, 'Advanced Rod', 'An upgraded rod', 19.99, 0.75, 15.00, 1.50, 1.20),
(3, 'Pro Rod', 'A professional rod', 29.99, 0.90, 20.00, 2.00, 1.50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Catches`
--
ALTER TABLE `Catches`
  ADD PRIMARY KEY (`catch_id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `fish_id` (`fish_id`);

--
-- Indexes for table `Fishes`
--
ALTER TABLE `Fishes`
  ADD PRIMARY KEY (`fish_id`),
  ADD KEY `rarity_id` (`rarity_id`);

--
-- Indexes for table `PlayerRods`
--
ALTER TABLE `PlayerRods`
  ADD PRIMARY KEY (`player_rod_id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `rod_id` (`rod_id`);

--
-- Indexes for table `Players`
--
ALTER TABLE `Players`
  ADD PRIMARY KEY (`player_id`);

--
-- Indexes for table `Rarities`
--
ALTER TABLE `Rarities`
  ADD PRIMARY KEY (`rarity_id`);

--
-- Indexes for table `Rods`
--
ALTER TABLE `Rods`
  ADD PRIMARY KEY (`rod_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Catches`
--
ALTER TABLE `Catches`
  MODIFY `catch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Fishes`
--
ALTER TABLE `Fishes`
  MODIFY `fish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `PlayerRods`
--
ALTER TABLE `PlayerRods`
  MODIFY `player_rod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Players`
--
ALTER TABLE `Players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Rarities`
--
ALTER TABLE `Rarities`
  MODIFY `rarity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Rods`
--
ALTER TABLE `Rods`
  MODIFY `rod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Catches`
--
ALTER TABLE `Catches`
  ADD CONSTRAINT `Catches_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `Players` (`player_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Catches_ibfk_2` FOREIGN KEY (`fish_id`) REFERENCES `Fishes` (`fish_id`) ON DELETE CASCADE;

--
-- Constraints for table `Fishes`
--
ALTER TABLE `Fishes`
  ADD CONSTRAINT `Fishes_ibfk_1` FOREIGN KEY (`rarity_id`) REFERENCES `Rarities` (`rarity_id`) ON DELETE CASCADE;

--
-- Constraints for table `PlayerRods`
--
ALTER TABLE `PlayerRods`
  ADD CONSTRAINT `PlayerRods_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `Players` (`player_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `PlayerRods_ibfk_2` FOREIGN KEY (`rod_id`) REFERENCES `Rods` (`rod_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
