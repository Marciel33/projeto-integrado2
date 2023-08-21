document.addEventListener("DOMContentLoaded", () => {
  const formularioFilme = document.getElementById("formularioFilme");

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
      console.log( response);

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
  });
  
});
function limparFormulario() {
  document.querySelector(".titulo").value = "";
  document.querySelector(".classificacao").value = "";
  document.querySelector(".lançamento").value = "";
  document.querySelector(".urlImagem").value = "";
  document.querySelector(".descricao").value = "";
}


