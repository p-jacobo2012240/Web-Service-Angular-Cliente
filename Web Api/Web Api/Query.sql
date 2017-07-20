CREATE DATABASE agenda;
USE agenda;
CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nick VARCHAR(30),
	contrasena VARCHAR(30)
);
CREATE TABLE categoria(
	idCategoria INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(20) NOT NULL,
	idUsuario INT NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);
CREATE TABLE contacto(
	idContacto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(20) NOT NULL,
	telefono VARCHAR(11) NOT NULL, 
	correo VARCHAR(25) NOT NULL,
	idCategoria INT NOT NULL,
	urlIMG VARCHAR(200),
	FOREIGN KEY(idCategoria) REFERENCES categoria(idCategoria)
);
CREATE TABLE detalleusuario(
	idDetalleUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	idUsuario INT NOT NULL,
	idContacto INT NOT NULL,
	FOREIGN KEY(idUsuario) REFERENCES usuario(idUsuario),
	FOREIGN KEY(idContacto) REFERENCES contacto(idContacto)
);
CREATE TABLE historiaContacto(
	idHistorialC INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	idContacto INT NOT NULL,
	fechaHora DATETIME NOT NULL,
	descripcion TEXT NOT NULL
);

CREATE TABLE historiaUsuario(
	idHistoriUS INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	idUsuario INT NOT NULL,
	fechaHora DATETIME NOT NULL,
	descripcion TEXT NOT NULL
);
CREATE TABLE cita(
	idCita INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	lugar VARCHAR(100) NOT NULL,
	descripcion TEXT NOT NULL,
	idContacto INT NOT NULL,
    idUsuario INT NOT NULL,
	fecha DATETIME NOT NULL,
	FOREIGN KEY (idContacto) REFERENCES contacto(idContacto),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);
CREATE TABLE prioridad(
	idPrioridad INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(20)
);

CREATE TABLE tarea(
	idTarea INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	descripcion TEXT NOT NULL,
	idCategoria INT NOT NULL,
	idPrioridad INT NOT NULL,
	idUsuario INT NOT NULL,
	fecha DATETIME NOT NULL,
	FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria),
	FOREIGN KEY (idPrioridad) REFERENCES prioridad(idPrioridad),
	FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

DELIMITER $$
CREATE PROCEDURE ADDContact(
	us_idUsuario INT,
	us_nombre VARCHAR(25),
	us_apellido VARCHAR(25),
	us_urlIMG VARCHAR(200),
	us_telefono VARCHAR(12),
	us_correo VARCHAR(25),
	us_idCategoria INT
)
BEGIN
	DECLARE idCON INT;
	
	INSERT INTO contacto(nombre,apellido,telefono,correo,idCategoria, urlIMG) 
	VALUES(us_nombre,us_apellido,us_telefono,us_correo,us_idCategoria, us_urlIMG);
	
	SET idCON = (SELECT idContacto FROM contacto WHERE nombre=us_nombre && apellido=us_apellido && telefono=us_telefono && correo=us_correo && idCategoria=us_idCategoria LIMIT 1);
	
	INSERT INTO detalleusuario(idUsuario, idContacto)
	VALUES(us_idUsuario, idCON);

	SELECT * FROM contacto WHERE nombre=us_nombre && apellido=us_apellido && telefono=us_telefono && correo=us_correo && idCategoria=us_idCategoria LIMIT 1;
		
END $$

CREATE PROCEDURE REMOVEContact(
	us_idContacto INT,
	us_idUsuario INT
)
BEGIN
	DELETE FROM detalleusuario WHERE idContacto = us_idContacto && idUsuario = us_idUsuario;
	DELETE FROM contacto WHERE idContacto = us_idContacto;
END $$



CREATE TRIGGER AddOnContact
AFTER INSERT ON contacto
FOR EACH ROW
BEGIN 
	DECLARE idCont INT;
	SET idCont = (SELECT idUsuario FROM usuario ORDER BY idUsuario DESC LIMIT 1);
	INSERT INTO historiaContacto(idContacto, fechaHora, descripcion)
	VALUES (idCont, NOW(), "SE INGRESO UN CONTACTO");
END $$

CREATE TRIGGER EditOnContact
AFTER UPDATE ON contacto
FOR EACH ROW
BEGIN 
	INSERT INTO historiaContacto(idContacto, fechaHora, descripcion)
	VALUES (NEW.idContacto, NOW(), "SE MODIFICO UN CONTACTO");
END $$

CREATE TRIGGER RemoveOnContacto
BEFORE UPDATE ON contacto
FOR EACH ROW
BEGIN 
	INSERT INTO historiaContacto(idContacto, fechaHora, descripcion)
	VALUES (OLD.idContacto, NOW(), "SE ELIMINO UN CONTACTO");
END $$


CREATE TRIGGER EditOnUser 
BEFORE UPDATE ON usuario
FOR EACH ROW
BEGIN 
	INSERT INTO historiausuario(idUsuario, fechaHora, descripcion) 
	VALUES (OLD.idUsuario, NOW(), "SE MODIFICO EL USUARIO");
END $$


INSERT INTO usuario(nick,contrasena) VALUES ('tonioros','123');
INSERT INTO `prioridad` (`idPrioridad`, `nombre`) VALUES (NULL, 'Alta'), (NULL, 'Medio'), (NULL, 'Bajo');