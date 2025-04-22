document.addEventListener("DOMContentLoaded", leerApi)


const url = "http://localhost:3000/aprendiz";

function leerApi(){
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let html = "";
        data.forEach(aprendiz => {
            html += `
            <tr>
                <td>${aprendiz.id}</td>
                <td>${aprendiz.nombre}</td>
                <td>${aprendiz.apellido}</td>    
                <td>${aprendiz.Matricula}</td>
                <td>${aprendiz.email}</td>
            </tr>`
        });
        document.querySelector("#tbody").innerHTML = html;
    })
    .catch(error => console.log(error))

}