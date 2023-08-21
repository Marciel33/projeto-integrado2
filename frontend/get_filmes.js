
async function recuperarFilmes() {
   try {
      const response = await fetch("http://localhost:3001/filmes");
      
      if (!response.ok) {
         throw new Error('Falha ao buscar filmes');
      }
      
      const lista = await response.json();
      const caixaTitulos = document.createElement("div"); 

      lista.forEach((filme) => {
         const filmeElement = document.createElement("div");
         filmeElement.classList.add("filme");

         const html = `
            <div class="imagem-do-filme"><img src="${filme.urlImagem}" alt="${filme.titulo}" /></div>
            <div class="titulo-do-filme">${filme.titulo}</div>
            <div class="remover-dos-favoritos">
               Remover dos<br />favoritos
            </div>
         `;

         filmeElement.innerHTML = html;
         caixaTitulos.appendChild(filmeElement);
      });

      
      const divFavoritos = document.querySelector(".catalogo_filmes");
      divFavoritos.appendChild(caixaTitulos);

   } catch (error) {
      console.error('Erro ao buscar ou processar filmes:', error);
   }
}

document.addEventListener("DOMContentLoaded", () => {
   recuperarFilmes();
});


