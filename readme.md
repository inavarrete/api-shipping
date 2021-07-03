###### 1. Download & Install MYSQL5.6.X from this URL:
    https://downloads.mysql.com/archives/get/p/25/file/mysql-installer-community-5.6.46.0.msi
###### 2. Connect to MYSQL from command line
    mysql -u{user} -p{Password}
###### 3. Execute the following
``` sql
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

    CREATE USER 'shipmentuser'@'localhost' IDENTIFIED WITH mysql_native_password;
    SET PASSWORD FOR 'shipmentuser'@'localhost' = PASSWORD('Th1sIsSh1pm3n7*');
    GRANT CREATE,SELECT, INSERT, UPDATE ON shipments.shippings TO 'shipmentuser'@'localhost';
```
    
###### 4. Steps 2 & 3 Combined; execute from command line:
    git clone https://github.com/inavarrete/Shippings.git
    cd Shippings
    mysql -u{user} -p{Password} < initdb.sql
    npm i
    npm start

### API Function

###### 1. Insert New Shipment

Create New Shipment [createshipping](http://localhost:3000/createshipping "Less than 20km please").

cURL

``` bash
curl -X POST \
  http://localhost:3000/createshipping \
  -d 'customer=Isaac%20Navarrete%20&descrip=Estoy%20enviando%20un%20PS5&Status=Pendiente&origin_lat=-33.44807679764549&origin_long=-70.67172365714839&end_lat=-33.022509458004826&end_long=-71.55222864424339'
```

JSON

``` javascript
{ customer: 'Isaac Navarrete ',
  descrip: 'Estoy enviando un PS5',
  Status: 'Pendiente',
  origin_lat: '-33.44807679764549',
  origin_long: '-70.67172365714839',
  end_lat: '-33.022509458004826',
  end_long: '-71.55222864424339' }
```

###### 2. Update Shipment

Update Shipment [/updateshipping](http://localhost:3000/updateshipping "Update this ID please").

cURL

```bash
curl -X POST \
  http://localhost:3000/updateshipping \
  -d 'id=2&current_lat=-70.6206&current_long=47.6044&status=En%20Proceso'
```

JSON

```javascript
    { id: '2',
      current_lat: '-70.6206',
      current_long: '47.6044',
      status: 'En Proceso' }
```
###### 3. Get Shipment Status

Get Shipment Status [/getShipmentStatus](http://localhost:3000/getShipmentStatus "Where's my package!").

cURL

```bash 
curl -X POST \
  http://localhost:3000/getShipmentStatus \
  -d id=2
```

JSON

```javascript
 { id: '2' } 
```

Response
```javascript
{
    "customer": "Fernando Alvarez",
    "desc": "Se está enviando una Macbook Pro",
    "status": "En Proceso",
    "eta": "3.68 Min",
    "travelMethod": "By Car"
}
```
