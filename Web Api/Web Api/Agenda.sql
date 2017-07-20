USE Agendain6av;

CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT,
	nombreCategoria VARCHAR(30) NOT NULL,
	PRIMARY KEY(idCategoria)
);

CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
	direccion VARCHAR(30) NOT NULL,
	telefono VARCHAR(30) NOT NULL,
	correo VARCHAR(30) NOT NULL,
	idCategoria INT NOT NULL,
	PRIMARY KEY (idContacto),
	FOREIGN KEY(idCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
	nick VARCHAR(30) NOT NULL,
	contrasena VARCHAR(30) NOT NULL,
	PRIMARY KEY(idUsuario)
);

CREATE TABLE DetalleUsuario(
	idDetalleUsuario INT NOT NULL AUTO_INCREMENT,
	idUsuario INT NOT NULL,
	idContacto INT NOT NULL,
	PRIMARY KEY(idDetalleUsuario),
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
	FOREIGN KEY (idContacto) REFERENCES Contacto(idContacto)
);

CREATE TABLE Tarea(
	idTarea INT NOT NULL AUTO_INCREMENT,
	descripcion VARCHAR(250) NOT NULL,
	fecha VARCHAR(30) NOT NULL,
	PRIMARY KEY(idTarea)
);

CREATE TABLE DetalleTarea(
	idDetalleTarea INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idTarea INT NOT NULL,
    PRIMARY KEY(idDetalleTarea),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN key (idTarea) REFERENCES Tarea(idTarea)
);

SELECT * FROM Usuario;
SELECT * FROM Contacto;
SELECT * FROM Categoria;
SELECT * FROM Tarea;
SELECT * FROM DetalleUsuario;
SELECT * FROM DetalleTarea;

CREATE VIEW
 contacto_usuario
	AS
    SELECT c.idContacto, c.nombre, c.apellido, c.direccion, c.telefono, c.correo, category.nombreCategoria, u.idUsuario
    FROM Contacto AS c
    INNER JOIN Categoria AS category ON c.idCategoria = category.idCategoria
    INNER JOIN DetalleUsuario AS det ON det.idContacto = c.idContacto
    INNER JOIN Usuario As u ON det.idUsuario = u.idUsuario;


INSERT INTO DetalleUsuario(idUsuario, idContacto) VALUES (1,1);
INSERT INTO DetalleUsuario(idUsuario, idContacto) VALUES (1,2);
