const socket = io("http://localhost:9999");

socket.on('order', (socket) => {
    console.log(socket)
    var myModal = new bootstrap.Modal(document.getElementById('orderModal'), {
        keyboard: false
    })
    myModal.hide()
    let title = document.getElementById('titleModalOrder')
    let description = document.getElementById('desModalOrder')
    title.innerText = 'Có người đặt bàn'
    description.innerText = `${socket.user.name} đặt bàn ${socket.table.personNumber} chỗ vào lúc ${formatTime(new Date(socket.table.date))} `

    myModal.show()
})

function formatTime(time) {
    return `${time.getHours()}:${time.getMinutes()}, Ngày ${time.getDate()} tháng ${time.getMonth()+1} năm ${time.getFullYear()}`
}