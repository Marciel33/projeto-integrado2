document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log(id);

  if (!id) {
     console.error("ID do filme não foi fornecido na URL.");
     return;
  }

  try {
     const response = await fetch(`http://localhost:3000/filmes/${id}`);
     const descricaoResponse = await fetch(`http://localhost:3000/filme/${id}/descricao`);

     if (response.ok && descricaoResponse.ok) {
        const data = await response.json();
        console.log(data);
        const descricaoData = await descricaoResponse.json();

        const tituloDoFilmeElement = document.querySelector(".titulo");
        const classificacaoDoFilmeElement = document.querySelector(".Classificacao");
        const anoDeLancamentoElement = document.querySelector(".Ano-de-Lancamento");
        const descricaoDoFilmeElement = document.querySelector(".Descricao");
        const imagemFilmeElement = document.querySelector(".urlImagem img");

        tituloDoFilmeElement.textContent = `Nome do Filme: ${data.titulo}`;
        classificacaoDoFilmeElement.textContent = `Classificação: ${data.classificacao}`;
        anoDeLancamentoElement.textContent = `Ano de Lançamento: ${data.anoDeLancamento}`;
        descricaoDoFilmeElement.textContent = `Descrição: ${descricaoData.descricao}`;
        imagemFilmeElement.src = data.urlImagem;

        const descricaoFilme = document.querySelector(".descricao-conteudo");
        descricaoFilme.style.display = "block";
     } else {
        console.error("Erro na requisição:", response.status);
     }
  } catch (error) {
     console.error("Erro na requisição:", error);
  }

  // código das estrelas de avaliação
  const estrelas = document.querySelectorAll(".estrela");

  estrelas.forEach((estrela) => {
    estrela.addEventListener('click', () => {
      const avaliacao = parseInt(estrela.getAttribute('data-avaliacao'));
      const filmeId = document.getElementById('filmeList').getAttribute('data-filme-id'); 

      estrelas.forEach((outraEstrela) => {
        outraEstrela.classList.remove('selecionada');
      });

      for (let i = 1; i <= avaliacao; i++) {
        estrelas[i - 1].classList.add('selecionada');
      }

      if (filmeId) {
        fetch(`http://localhost:3000/filmes/${filmeId}`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ avaliacao })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Erro ao enviar avaliação:', error);
        });
      } else {
        console.error('Valor de filmeId não está definido ou é inválido.');
      }
    });
  });
 
});