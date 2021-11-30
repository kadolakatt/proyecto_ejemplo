# Proyecto de Ejemplo Ciclo 4a MisionTIC 2022

######Requerimientos
Se requiere un sistema multiusuario con dos perfiles: director del proyecto y desarrollador. El director de proyecto crea los proyectos y las tareas que pertenecen asociadas él. Dentro del sistema el proyecto admite nombre (texto), fecha de inicio (texto), completado (boolean) y cliente (texto) al que pertenece, los proyectos solo pueden ser registrados, anulados o marcados como completados por los usuarios con rol director de proyecto. Las tareas que se registran en el sistema admiten la siguiente información: nombre y/o descripción, usuario desarrollador responsable, y fecha de vencimiento de la tarea.
El sistema debe contar con un proceso de inicio de sesión en donde se autentiquen usuarios y de acuerdo con rol del usuario se habiliten o deshabiliten las opciones permitidas.

Cuando el desarrollador ingrese al sistema, luego de autenticarse en el sistema, este tipo de usuarios solo tendrán acceso a las tareas asociadas a ese nombre de usuario. Desde allí podrá marcar como completadas, reabrir tareas. El desarrollador no puede crear tareas nuevas.

Por su parte usuario con rol de administrador de proyecto, deberá poder visualizar las tareas por proyecto y eliminar, actualizar o completar las tareas del proyecto que seleccione.

Se espera el uso arquitectura cliente – servidor desacoplado, por lo que el frontend deberá ser independiente del backend. 
El director de proyecto será la única cuenta que debe estar pre-configurada en nuestra base de datos, el será el encargado de registrar las cuentas de usuario para los desarrolladores.
