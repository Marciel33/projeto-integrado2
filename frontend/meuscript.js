
//FUNÇÃO PARA BUSCAR OS FILMES DO SERVIDOR
async function fetchFilmes() {
   try {
      const response = await fetch("http://localhost:3000/filmes");
      if (!response.ok) {
         throw new Error("Erro ao buscar filmes do servidor");
      }

      const data = await response.json();

      return data;

   } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return [];
   }
}

// FUNÇÃO PARA EXIBIR OS FILMES NA PÁGINA 
async function displayFilmes() {
   console.log("Função displayFilmes chamada");
   const filmeList = document.getElementById("filmeList");
   const filmes = await fetchFilmes();

   if (!filmeList) {
      console.error('Elemento com ID "filmeList" não encontrado.');
      return;
   }

   filmeList.innerHTML = "";

   if (filmes && filmes.length > 0) {
      filmes.forEach((filme, index) => {
         const filmeElement = document.createElement("div");
         filmeElement.classList.add("cartao-filme");
         filmeElement.innerHTML = `
            <div class="cartao">
               <a href="descricao.html?id=${filme.id}" class="cartao-img-link">
                  <img class="cartao-img-top" src="${filme.urlImagem}" alt="${filme.titulo}">
               </a>
               <div class="cardbody">
                  <p class="id"> ${filme.id}</p>
                  <h5 class="card-title">${filme.titulo}</h5>
                  <p>classificação: ${filme.classificacao}</p>
                  <p>ano de lançamento: ${filme.anoDeLancamento}</p>
                  <p class="card-text">${filme.descricao}</p>
                  <a href="Pagdescricao.html?id=${filme.id}" class="btn btn-primary mr-2">Acessar Filme</a>
               </div>
            </div>
         `;

          // Adicionar evento de clique para cada filme na página principal
          filmeElement.addEventListener("click", function () {
            const filmeId = filme.id; 
            acessarFilme(filmeId);
         });
         filmeList.appendChild(filmeElement);
      });
   } else {
      console.log("Nenhum filme encontrado.");
   }
}




// meuscript.js

document.addEventListener("DOMContentLoaded", function () {
   const filmeList = document.getElementById("filmeList");
   const descricaoFilme = document.querySelector(".descricao-filme");
 
   // Adicionar evento de clique para cada filme na PÁGINA PRINCIPAL
   filmeList.querySelectorAll("[data-filme-id]").forEach(function (filme) {
     filme.addEventListener("click", function () {
       const filmeId = this.getAttribute("data-filme-id");
       const titulo = document.querySelector(`[data-filme-id="${filmeId}"] .titulo`).textContent;
       const classificacaoDoFilme = filme.classificacao;
       const anoDeLancamento = filme.anoDeLancamento;
       const descricaoDoFilme = filme.descricao;

       // Atualizar as informações na descrição do filme
       descricaoFilme.querySelector(".titulo-do-filme .titulo").textContent = `NOME DO FILME: ${nomeDoFilme}`;
       descricaoFilme.querySelector(".classificação-do-filme .Classificacao").textContent = `CLASSIFICAÇÃO DO FILME: ${classificacaoDoFilme}`;
       descricaoFilme.querySelector(".ano-lancamento .Ano-de-Lancamento").textContent = `ANO DE LANÇAMENTO: ${anoDeLancamento}`;
       descricaoFilme.querySelector(".descricao-filme .Descricao").textContent = `DETALHES DO FILME: ${descricaoDoFilme}`;
 
       // Exibir a descrição do filme 
       descricaoFilme.style.display = "block";
     });
   });
 });
 

   // FUNÇÃO PARA REDIRECIONAR PARA A DESCRIÇÃO DO FILME
   function acessarFilme(filmeID) {
      window.location.href = `Pagdescricao.html?id=${filmeID}`;
      
   }
   

   // FUNÇÃO PARA BUSCAR OS FILMES DO SERVIDOR
   async function fetchFilmes() {
      
   }



   // FUNÇÃO PARA EXIBIR OS FILMES DA PÁGINA
   async function recuperarFilmes() {
      try {
         
         //CHAMA A FUNÇÃO FETCHF ILMES() PARA RECUPERAR OS DADOS DOS FILMES DOS SERVIDOR
         const filmes = await fetchFilmes();
         const catalogoFilmes = document.querySelector(".catalogo_filmes");

         // LIMPAR O CONTEUDO EXISTENTE NO CATALOGO FILMES
         catalogoFilmes.innerHTML = "";

         filmes.forEach((filme, index) => {

            // CRIE UM ELEMENTO DIV PARA CADA FILME
            const filmeElement = document.createElement("div");
            filmeElement.classList.add(`filme${index + 1}`);

            // CRIE UM ELEMENTO DIV PARA O CARTÃO DO FILME
            const cartaoFilmeElement = document.createElement("div");
            cartaoFilmeElement.classList.add("cartao-filme");

            // CRIE A IMAGEM DO FILME
            const imagemFilme = document.createElement("img");
            imagemFilme.src = filme.imagem;
            imagemFilme.alt = filme.titulo;

            // CRIE UM BOTÃO PARA ACESSAR O FILME
            const botaoAcessarFilme = document.createElement("button");
            botaoAcessarFilme.textContent = "Acessar Filme";
            botaoAcessarFilme.addEventListener("click", function () {
               acessarFilme(`filme${index + 1}`);
            });

            //  ADICIONE A IMAGEM E O BOTÃO AO CARTÃO DO FILME
            cartaoFilmeElement.appendChild(imagemFilme);
            cartaoFilmeElement.appendChild(botaoAcessarFilme);

            // ADICIONE  O CARTÃO DO FILME AO ELEMENTO DO FILME
            filmeElement.appendChild(cartaoFilmeElement);

            // ADICIONE O FILME AO CATÁLOGO DE FILMES
            catalogoFilmes.appendChild(filmeElement);
         });
      } catch (error) {
         console.error("Erro ao recuperar filmes:", error);
      }
   }
   document.addEventListener("DOMContentLoaded", function () {
      const botaoAcessarFilmes = document.querySelectorAll(".acessarFilme");
   
      botaoAcessarFilmes.forEach((botao) => {
         botao.addEventListener("click", function () {
            const filmeId = this.getAttribute("data-filme-id");
            acessarFilme(filmeId);
         });
      });
   });
  

   // Função para buscar um filme pelo ID no servidor
async function recuperarFilme(filmeID) {
   try {
      const response = await fetch(`http://localhost:3000/filmes/${filmeID}`);
      if (!response.ok) {
         throw new Error("Erro ao buscar filme do servidor");
      }

      const filme = await response.json();

      return filme;

   } catch (error) {
      console.error("Erro ao buscar filme:", error);
      return null;
   }
}




function pesquisarFilmes() {
   const termoPesquisa = document.querySelector('.input_busca').value.toLowerCase().replace(/\s/g, ''); // Remove espaços e coloca em minúsculas
   const cartoesFilme = document.querySelectorAll('.cartao-filme');

   cartoesFilme.forEach((cartao) => {
      const nomeFilme = cartao.getAttribute('data-filme-nome').toLowerCase().replace(/\s/g, ''); // Remove espaços e coloca em minúsculas
      const botaoAcessar = cartao.querySelector('.acessarFilme');

      if (nomeFilme.includes(termoPesquisa)) {
         cartao.style.display = 'block'; // Exibe o cartão se o termo estiver presente no nome do filme
         botaoAcessar.style.display = 'block'; // Exibe o botão de acesso
      } else {
         cartao.style.display = 'none'; // Oculta o cartão se o termo não estiver presente no nome do filme
         botaoAcessar.style.display = 'none'; // Oculta o botão de acesso
      }
   });
}







document.addEventListener("DOMContentLoaded", () => {
  const formularioFilme = document.getElementById("formularioFilme");

 if (formularioFilme){
    formularioFilme.addEventListener("submit", async (event) => {
       event.preventDefault();

    const titulo = document.querySelector(".titulo").value;
    const classificacao = document.querySelector(".classificacao").value;
    const anoDeLancamento = document.querySelector(".lançamento").value;
    const urlImagem = document.querySelector(".urlImagem").value;
    const descricao = document.querySelector(".descricao").value;

    const filme = {
      titulo,
      classificacao,
      anoDeLancamento,
      urlImagem,
      descricao,
    };

    try {
      const response = await fetch("http://localhost:3000/filmes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filme),
      });
      console.log(response);

      if (response.ok) {
        alert("Filme cadastrado com sucesso!");

        window.location.reload(); // Recarrega a página para mostrar o novo filme
      } else {
        alert("Erro ao cadastrar o filme.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na requisição. Verifique o console para mais detalhes.");
    }
   })
}
   
  });


 function limparFormulario() {
  document.querySelector(".titulo").value = "";
  document.querySelector(".classificacao").value = "";
  document.querySelector(".lançamento").value = "";
  document.querySelector(".urlImagem").value = "";
  document.querySelector(".descricao").value = "";
 }

 // FUNÇÃO PARA ENVIAR INFORMAÇÕES PARA O SERVIDOR
 async function enviarFilme(filme) {
  try {
    const response = await fetch("http://localhost:3000/filmes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filme),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar o filme");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao enviar o filme:", error);
    return null;
  }
};

   

  

  
 
 








      

   
  



  
   
    

