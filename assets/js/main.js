const add_task_button = document.querySelector('#add_task')
const input_task = document.querySelector('#task_input_user')
const area_start = document.querySelector('.area_start')
const area_stop = document.querySelector('.area_stop')
const areas = [area_start, area_stop]
const search_user_tasks_input = document.querySelector('#search_user_tasks')
let counter = 1
function add_func(){
    if (input_task.value.trim().length == 0 || input_task.value.trim() == "") {
        alert("olmaz")
    } else {
        counter++
        const li_task = document.createElement('li')
        li_task.setAttribute('class', 'draggable')
        li_task.innerText = input_task.value;
        area_start.append(li_task)
        input_task.value=""
        li_task.setAttribute('draggable', true)
        li_task.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragging')
        })
        li_task.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging')
        })

        areas.forEach((area) => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault()
                const afterElement = getAfterElement(area, e.clientY)
                // console.log(afterElement)
                const drgging = document.querySelector('.dragging')

                if(afterElement==null||afterElement==undefined){
                    area.appendChild(drgging)
                }else{
                    area.insertBefore(drgging,afterElement)
                }
                
            })
        })



    }
}
add_task_button.addEventListener('click',()=>{
    add_func()
})

search_user_tasks_input.addEventListener('input', (event) => {

    if (area_start.querySelectorAll('li').length != 0) {
        let datas = [...area_start.querySelectorAll('li')]
        
        let res;
        res = datas.filter(data => {
            if (!data.innerText.toLowerCase().includes(event.target.value.toLowerCase())) {
                data.classList.add('removed_item')
            } else {
                data.classList.remove('removed_item')
                return data.innerText.toLowerCase().includes(event.target.value.toLowerCase())
            }

        })
    }

})

function getAfterElement(container, y) {
    const draggableElements = [...container
        .querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closet, child) => {
        const box = child.getBoundingClientRect()
        const offset=y-box.top-box.height/2
        console.log(offset)
        if(offset<0 && offset>closet.offset){
            return{offset:offset,element:child}
        }else{
            return{offset:closet}
        }
    }, { offset: Number.POSITIVE_INFINITY }).element
}
document.body.addEventListener('keyup',(event)=>{
    if(event.keyCode==13){
        add_func()
    }
})