document.addEventListener("DOMContentLoaded", leerApi);
const url = "http://localhost:3000/aprendiz";
function leerApi() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let tbody = document.querySelector("#tbody");
            data.forEach((aprendiz) => {
                const tr = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = aprendiz.id;
                const tdNombre = document.createElement("td");
                tdNombre.textContent = aprendiz.nombre;
                const tdApellido = document.createElement("td");
                tdApellido.textContent = aprendiz.apellido;
                const tdMatricula = document.createElement("td");
                tdMatricula.textContent = aprendiz.Matricula ===true ? "Sí" : "No";
                const tdEmail = document.createElement("td");
                tdEmail.textContent = aprendiz.email;

                const tdacciones = document.createElement("td");

                //BTN Editar
                const btnEditar = document.createElement("button");
                btnEditar.classList.add("btn", "btn-success", "bi", "bi-plus-circle-fill");
                btnEditar.textContent = " Editar";
                btnEditar.addEventListener("click", () => {
                    console.log("Editar aprendiz:", aprendiz.id);
                    mostrarModal(aprendiz)
                });

                tdacciones.appendChild(btnEditar);

                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdApellido);
                tr.appendChild(tdMatricula);
                tr.appendChild(tdEmail);
                tr.appendChild(tdacciones);

                tbody.appendChild(tr);
                
            });
            let tabla = document.querySelector("#tbody");
        })
        .catch((error) => console.log(error));
}
////////////////////////////editar aprendiz///////////////////////////////////////


let modalEditarBootstrap;


function mostrarModal(aprendiz) {
    const modalEditar = document.querySelector("#modalEditar");
    if (!modalEditarBootstrap) {
        modalEditarBootstrap = new bootstrap.Modal(modalEditar);
    }

    document.querySelector("#idAprendiz").value = aprendiz.id;
    document.querySelector("#nombreAprendiz").value = aprendiz.nombre;
    document.querySelector("#apellidoAprendiz").value = aprendiz.apellido;
    document.querySelector("#emailAprendiz").value = aprendiz.email;
    document.querySelector("#matriculaAprendiz").value = aprendiz.Matricula;

    modalEditarBootstrap.show();

}

document.querySelector("#formEditar").addEventListener("submit", (e) => {
    e.preventDefault();
    guardarCambios();
});

function guardarCambios() {
    const id = document.querySelector("#idAprendiz").value;
    const urlEditar = `http://localhost:3000/aprendiz/${id}`;
    const Data = {
        nombre: document.querySelector("#nombreAprendiz").value,
        apellido: document.querySelector("#apellidoAprendiz").value,
        Matricula: document.querySelector("#matriculaAprendiz").value === "true",
        email: document.querySelector("#emailAprendiz").value,
    };

    fetch(urlEditar, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
    })
        .then((response) => {
            if (!response.ok) throw new Error("Error HTTP: " + response.status);
            return response.json();
        })
        .then((data) => {
            console.log("Éxito:", data);
            modalEditarBootstrap.hide();            
            document.addEventListener("DOMContentLoaded",   );
        })
        .catch((error) => console.error("Error:", error.message));

    console.log("Cambios guardados correctamente");
}

/////////////////////////////////////////////////////////AÑADIR NUEVO APRENDIZ///////////////////////////////////////////////////////////

const formAgregar = document.querySelector("#formAgregar");

formAgregar.addEventListener("submit", (e) => {
    e.preventDefault();

    let Data = {
        id: document.querySelector("#id").value,
        nombre: document.querySelector("#nombre").value,
        apellido: document.querySelector("#apellido").value,
        Matricula: true,
        email: document.querySelector("#email").value,
    };
    
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Data),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error HTTP: " + response.status);
                return response.json();
            })
            .then((data) => {
                console.log("Éxito:", data);
                window.location.href = "index.html";
            })
            .catch((error) => console.error("Error:", error.message));

    console.log("Formulario enviado correctamente");
});
/////////////////////////////////////////////////////////ELIMINAR APRENDIZ///////////////////////////////////////////////////////////












