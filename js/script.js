var request = new XMLHttpRequest()

request.open('GET', 'https://api.github.com/users/JoseLucasQ/repos', true)

request.onload = function () {
  var data = JSON.parse(this.response);

  var statusHTML = '';
  $.each(data, function(i, status) {
    statusHTML += '<tr>';
    statusHTML += '<td>' + status.name + '</td>';
    statusHTML += '<td>' + status.updated_at.slice(8, 10) + '/' + status.updated_at.slice(5, 7) + '/' + status.updated_at.slice(0, 4) + '</td>';
    statusHTML += '<td>' + status.archived + '</td>';
    statusHTML += '<td>' + status.language + '</td>';
    statusHTML += '</tr>';
  });
  $('tbody').html(statusHTML);
}

request.send();

async function busca() {

  var nome_repositorio = document.getElementById("Nome").value
  var arquivado = document.querySelector('input[name="arquivado"]:checked').value;
  var parent = document.getElementById("table");
  var ordem = document.querySelector('input[name="ordem"]:checked').value;
  var index_para_deletar = []

  if(ordem == 'alf'){

    const url = "https://api.github.com/users/JoseLucasQ/repos"
    const response = await fetch(url)
    const result = await response.json()

    index_para_deletar = await index_removiveis(result, nome_repositorio, arquivado)

    console.log(result)

    if(index_para_deletar.length !== 0){
      for(const i of index_para_deletar){
        delete result[i];
      }
    }

    $("#table  tbody").remove();

    dados_para_tabela(result, parent)

  }else if(ordem == 'data'){

    const url = "https://api.github.com/users/JoseLucasQ/repos?sort=updated"
    const response = await fetch(url)
    const result = await response.json()

    index_para_deletar = await index_removiveis(result, nome_repositorio, arquivado)

    console.log(index_para_deletar)

    if(index_para_deletar.length !== 0){
      for(const i of index_para_deletar){
        delete result[i];
      }
    }
    $("#table  tbody").remove();

    dados_para_tabela(result, parent)
  }
}

async function index_removiveis(obj, nome, arquivado){

  var delete_index = []

  for(const i of obj){
      if(await (nome && !i.name.toLowerCase().includes(nome.toLowerCase())) || (arquivado && i.archived.toString() !== arquivado)){
        index = obj.findIndex(x => x.id === i.id);
        delete_index.push(index);
      }
    }

    return delete_index
}

function dados_para_tabela(obj, parent){
  var statusHTML = '';
  obj.forEach(i=>{
    statusHTML += '<tr>';
    statusHTML += '<td>' + i.name + '</td>';
    statusHTML += '<td>' + i.updated_at.slice(8, 10) + '/' + i.updated_at.slice(5, 7) + '/' + i.updated_at.slice(0, 4) + '</td>';
    statusHTML += '<td>' + i.archived + '</td>';
    statusHTML += '<td>' + i.language + '</td>';
    statusHTML += '</tr>';
  })

  parent.innerHTML += statusHTML
}
