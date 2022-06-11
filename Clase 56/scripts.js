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
        readData();
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
        readData()
    }

    const readData= ()=>{
        const transaction= db.transaction(['tasks'], 'readonly')
        const objectStore= transaction.objectStore('tasks')
        const request= objectStore.openCursor()// metodo que permite leer los registros y devolvernos su contenido
        const fragment= document.createDocumentFragment()

        request.onsuccess= (e)=>{
            const cursor= e.target.result;
            if(cursor){//consulta si existe,para leer los registros solo si existen
                const taskTitle = document.createElement('P')
                taskTitle.textContent= cursor.value.taskTitle
                fragment.appendChild(taskTitle)
                const taskPriority= document.createElement('P')
                taskPriority.textContent = cursor.value.taskPriority
                fragment.appendChild(taskPriority)
                cursor.continue()//se agrega continue,para que no detenga la ejecucion luego del primer registro, sino que lea todos
            }
            else{
                tasks.textContent= ''
                tasks.appendChild(fragment)
            }
        }
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