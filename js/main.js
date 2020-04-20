let URL = "http://127.0.0.1:8080/tarefa";

recuperarLista();

function salvar() {
    var tarefa = document.getElementById("nome").value;
    
    if(tarefa == "") {
        alert("Digite o nome da tarefa");
        document.getElementById("nome").classList.add('error');
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var dados = JSON.stringify({ "nome": tarefa });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: dados,
        redirect: 'follow'
    };

    fetch(URL, requestOptions)
        .then(response => response.text())
        .then(result => recuperarLista())
        .catch(error => console.log('error', error));
}

function atualizarLista(resultado) {
    var tarefa = document.getElementById("nome");
    //var json = JSON.parse(resultado);
    var lista = document.getElementById("lista");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(`${resultado.id} - ${resultado.nome}`));
    lista.appendChild(li);
    tarefa.value="";
}

function recuperarLista() {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(URL, requestOptions)
        .then(response => response.text())
        .then(result => popularLista(result))
        .catch(error => console.log('error', error));
}

function popularLista(resultado) {
    var json = JSON.parse(resultado);
    var lista = document.getElementById("lista");
    lista.innerHTML = "";
    for(var item of json) {
        atualizarLista(item);
    }
}