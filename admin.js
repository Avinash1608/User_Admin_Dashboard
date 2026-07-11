let container = document.getElementById("container");


async function fetchData() {
    let response = await fetch("http://localhost:3001/food")
    try {
        if (!response.ok) {
            throw new Error("Error in fetching data");
        }
        else {
            let result = await response.json();
            showData(result);
        }
    } catch (error) {
        console.log(error)
    }
}



function showData(data) {
    data.forEach(element => {
        let div = document.createElement("div");

        div.className="card"

        div.innerHTML = `
            <p> Id : ${element.id}</p>
            <p> Name : ${element.name}</p>
            <img src='${element.image}'> 

            <button id='delete${element.id}'>Delete</button>
            <button id='edit${element.id}'>edit</button>
        `

        container.appendChild(div);

        let deleteButton = document.getElementById(`delete${element.id}`);
        let editButton = document.getElementById(`edit${element.id}`);



        deleteButton.onclick = () => {
            deleteData(`${element.id}`);
        }

        editButton.onclick = () => {
            editData(`${element.id}`);
        }




    });
}


async function deleteData(id) {
    let response = await fetch(`http://localhost:3001/food/${id}`, {
        "method": "DELETE"
    })

    try {
        if (!response.ok) {
            throw new Error("error in deleteing the data")
        }
        else {
            alert("data deleted successfully")
        }
    } catch (error) {
        console.log(error)
    }
}




async function editData(id) {
    let foodId = document.getElementById("id")
    let foodName = document.getElementById("name")
    let image = document.getElementById("image")

    let response = await fetch(`http://localhost:3001/food/${id}`)
    try {
        if (!response.ok) {
            throw new Error("Error in fetching the data into fields");

        }
        else {
            let result = await response.json()
            foodId.value = result.id
            foodName.value = result.name
            image.value = result.image
        }
    } catch (error) {
        console.log(error)
    }


}


async function saveData() {
    let foodId = document.getElementById("id")
    console.log(foodId.value)
    let foodName = document.getElementById("name")
    let image = document.getElementById("image")

    let obj = {
        "name": foodName.value,
        "image": image.value
    }

    let url=foodId.value?`http://localhost:3001/food/${foodId.value}`:"http://localhost:3001/food";
    let method=foodId.value?"PUT":"POST";

    let response = await fetch(url, {
        "method": method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    try {
        if (!response.ok) {
            throw new Error("Error in saving data")
        }
        alert("data saved")
    } catch (error) {
        console.log(error)
    }


}

addEventListener("DOMContentLoaded", fetchData)