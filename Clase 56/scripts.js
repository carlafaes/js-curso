//Especificación oficial: https://developer.mozilla.org/es/docs/IndexedDB-840092-dup

// IndexedDB es una manera de almacenar datos dentro del navegador del usuario. Debido a que permite la creación de aplicaciones con habilidades de consulta enriquecidas, con independencia de la disponibilidad de la red, sus aplicaciones pueden trabajar tanto en línea como fuera de línea.



const indexedDB = window.indexedDB
const form = document.getElementById('form')

if (indexedDB && form) {
    let db
    const request = indexedDB.open('tasksList', 1)

    request.onsuccess = () => {
        db = request.result
        console.log('OPEN', db)
    }

    request.onupgradeneeded = (e) => {
        db = e.target.result
        console.log('Create', db)
        const objectStore = db.createObjectStore('tasks', {
            autoIncrement: true
            // keyPath:'clave_unica' //la key seria la que asignamos con keyPath
        })//autoincrement es la key que recibira, que ira aumentando uno en uno cada vez que haya un nuevo dato
    }

    request.onerror = (error) => {
        console.log('Error', error)
    }

    const addData = (data) => {
        const transaction = db.transaction(['tasks'], 'readwrite')//puede ser readonly o readwrite
        const objectStore = transaction.objectStore('tasks')
        const request = objectStore.add(data)
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = {
            taskTitle: e.target.task.value,
            taskPriority: e.target.priority.value
        }
        addData(data)
    })
}