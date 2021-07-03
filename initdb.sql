CREATE DATABASE shipments;
USE shipments;
CREATE TABLE shippings (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Id del envío',
    `customer` VARCHAR(100) COMMENT 'Nombre del cliente',
    `descrip` TEXT COMMENT 'Descripción del envío',
    `status` VARCHAR(10) COMMENT 'Estatus del envío, valores aceptados son: Pendiente, En proceso, Entregado',
    `origin_lat` DECIMAL(11,8) COMMENT 'Latitud de origen' ,
    `origin_long` DECIMAL(11,8) COMMENT 'Longitud de origen', 
    `current_lat` DECIMAL(11,8) COMMENT 'Latitud de la ubicación actual',
    `current_long` DECIMAL(11,8) COMMENT 'Logitud de la ubicación actual',
    `end_lat` DECIMAL(11,8) COMMENT 'Latitud de entrega',
    `end_long` DECIMAL(11,8) COMMENT 'Longitud de entrega',
    PRIMARY KEY (id)
);
INSERT INTO shippings (`customer`,`descrip`, `status`, `origin_lat`, `origin_long`, `current_lat`, `current_long`, `end_lat`, `end_long`) VALUES ('Isaac Navarrete','El envio es un PS5','Pendiente','-33.42890209320775', '-70.62067923464814','-33.42890209320775', '-70.62067923464814','-33.437098224706894', '-70.63316135134902');
INSERT INTO shippings (`customer`,`descrip`, `status`, `origin_lat`, `origin_long`, `current_lat`, `current_long`, `end_lat`, `end_long`) VALUES ('Fernando Alvarez','Se esta enviando una Macbook Pro','En Proceso','-33.42890209320775', '-70.62067923464814','-33.442573645013574', '-70.65425744295209','-33.43652371016712', '-70.6342590760124');
INSERT INTO shippings (`customer`,`descrip`, `status`, `origin_lat`, `origin_long`, `current_lat`, `current_long`, `end_lat`, `end_long`) VALUES ('Fernando Alvarez','iPhone XR','Entregado','-33.42890209320775', '-70.62067923464814','-33.45228240751817', '-70.56908053058059','-33.45228240751817', '-70.56908053058059');

-- CREATE USER AND GRANT PERMISSIONS --
CREATE USER 'shipmentuser'@'localhost' IDENTIFIED WITH mysql_native_password;
SET PASSWORD FOR 'shipmentuser'@'localhost' = PASSWORD('Th1sIsSh1pm3n7*');
GRANT CREATE,SELECT, INSERT, UPDATE ON shipments.shippings TO 'shipmentuser'@'localhost';

CREATE USER 'shipmentuser'@'127.0.0.1' IDENTIFIED WITH mysql_native_password;
SET PASSWORD FOR 'shipmentuser'@'127.0.0.1' = PASSWORD('Th1sIsSh1pm3n7*');
GRANT CREATE,SELECT, INSERT, UPDATE ON shipments.shippings TO 'shipmentuser'@'127.0.0.1';

