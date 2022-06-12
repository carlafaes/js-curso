/* 
https://developer.mozilla.org/es/docs/Web/API/notification 

icono:
https://www.flaticon.es/icono-gratis/en-todo-el-mundo_814513?term=world&page=1&position=18
*/

const permissions = document.getElementById('permissions')

permissions.addEventListener('click', () => {
    if (Notification.permission !== 'granted') { //granted=permitido
        getPermissions()//obtener permisos
    } else {
        notify()//
    }
})

const getPermissions = () => {
    Notification.requestPermission()
        .then(res => console.log(res))//imprimiria 'granted'
        .catch(err => console.log(err))//imprimiria 'denied'
}

const notify = () => {
    const options = {
        body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',//cuerpo de la notificacion
        icon: 'world.png',//icono de la notificacion
        data: 'Extra data',//datos extra q no se muestran
        tag: 'notification demo'//etiqueta de la notificacion
    }
    const notification = new Notification('Hello World', options)

    notification.addEventListener('close', () => console.log('CLOSE'))//se ejecuta cuando se cierra la notificacion
    notification.addEventListener('show', () => console.log('SHOW'))//se ejecuta cuando se muestra la notificacion

    console.log(notification)
}