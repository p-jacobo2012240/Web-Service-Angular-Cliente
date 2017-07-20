CREATE TABLE `historialusuario`(
    idHistorial INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fecha DATETIME,
    descripcion TEXT,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES `usuario`(idUsuario)
)

DELIMITER $$

CREATE DEFINER=`root`@`localhost` TRIGGER `tr_agregarUsuario` AFTER INSERT ON `usuario` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se registro el usuario ', NEW.nick), NEW.idUsuario);
END $$

CREATE TRIGGER tr_editarContacto
BEFORE UPDATE
ON `contacto` FOR EACH ROW 
BEGIN 
	 DECLARE _idUsuario INT;
	 SET _idUsuario = (SELECT idUsuario FROM detalleusuario WHERE idContacto = NEW.idContacto LIMIT 1);
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito el contacto ', NEW.nombre), _idUsuario);
END $$

CREATE TRIGGER tr_eliminarContacto
BEFORE DELETE
ON `detalleusuario` FOR EACH ROW 
BEGIN 
    DECLARE _nombreUser VARCHAR(40);
    SET _nombreUser = (SELECT nombre FROM contacto WHERE idContacto = NEW.idContacto LIMIT 1);
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino el contacto ', OLD.nombre), OLD.idUsuario);
END $$


CREATE TRIGGER tr_agregarCategoria
BEFORE INSERT
ON `categoria` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se agrego la categoria ', NEW.nombre), NEW.idUsuario);
END $$
CREATE TRIGGER tr_editarCategoria
BEFORE UPDATE
ON `categoria` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito la categoria ', NEW.nombre), NEW.idUsuario);
END $$
CREATE TRIGGER tr_eliminarCategoria
BEFORE DELETE
ON `categoria` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino la categoria ', OLD.nombre), OLD.idUsuario);
END $$


CREATE TRIGGER tr_agregarTarea
BEFORE INSERT
ON `tarea` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se agrego la tarea ', NEW.nombre), NEW.idUsuario);
END $$
CREATE TRIGGER tr_editarTarea
BEFORE UPDATE
ON `tarea` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito la tarea ', NEW.nombre), NEW.idUsuario);
END $$
CREATE TRIGGER tr_eliminarTarea
BEFORE DELETE
ON `tarea` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino la tarea ', OLD.nombre), OLD.idUsuario);
END $$


CREATE TRIGGER tr_agregarCita
BEFORE INSERT
ON `cita` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se agrego la cita ', NEW.descripcion), NEW.idUsuario);
END $$
CREATE TRIGGER tr_editarCita
BEFORE UPDATE
ON `cita` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito la cita ', NEW.descripcion), NEW.idUsuario);
END $$
CREATE TRIGGER tr_eliminarCita
BEFORE DELETE
ON `cita` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino la cita ', OLD.descripcion), OLD.idUsuario);
END $$


CREATE TRIGGER tr_agregarUsuario
BEFORE INSERT
ON `usuario` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se registro el usuario ', NEW.nick), NEW.idUsuario);
END $$
CREATE TRIGGER tr_editarUsuario
BEFORE UPDATE
ON `usuario` FOR EACH ROW 
BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito el usuario ', NEW.nick), NEW.idUsuario);
END $$