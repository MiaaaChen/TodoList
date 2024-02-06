document.addEventListener('click', function (e) {
    //update data
    if (e.target.classList.contains("edit-me")) {
        let originalText = e.target.parentElement.parentElement.querySelector(".item-text");
        let userInput = prompt("請修改待辦事項", originalText.innerHTML)
        let _id = e.target.getAttribute("data-id");

        if (userInput) {
            axios.post('/update-item', {
                text: userInput,
                id: _id
            }).then(function (result) {
                originalText.innerHTML = userInput
            }).catch(err => {
                console.log(err)
            })
        }
    };

    //delete data
    if (e.target.classList.contains("delete-me")) {
        let originalText = e.target.parentElement.parentElement.querySelector(".item-text");
        let _id = e.target.getAttribute("data-id");
        console.log('going to delete:' + _id)
        if (confirm("確定要刪除這筆資料嗎 ? [" + originalText.innerHTML + "]")) {
            axios.post('/delete-item', {
                id: _id
            }).then(function () {
                e.target.parentElement.parentElement.remove()
            }).catch(err => {
                console.log(err)
            });
        };
    };
});