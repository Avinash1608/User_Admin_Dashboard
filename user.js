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

           
        `

        container.appendChild(div);

        // let deleteButton = document.getElementById(`delete${element.id}`);
        // let editButton = document.getElementById(`edit${element.id}`);



        // deleteButton.onclick = () => {
        //     deleteData(`${element.id}`);
        // }

        // editButton.onclick = () => {
        //     editData(`${element.id}`);
        // }




    });
}

addEventListener("DOMContentLoaded",fetchData)