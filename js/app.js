document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'd0dbde9e16f44b70ba0a34a3bd9a8a98'; // Chave da API NewsAPI
  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`; // URL da API
  const noticiasContainer = document.getElementById('noticias-container'); // Container onde as notícias serão inseridas

  // Requisição para a API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha ao buscar as notícias'); // Lança erro caso a resposta da API não seja ok
      }
      return response.json(); // Retorna a resposta como JSON
    })
    .then(data => {
      // Verifica se há notícias
      if (!data.articles || data.articles.length === 0) {
        noticiasContainer.innerHTML = '<p>Não há notícias disponíveis no momento.</p>';
        return;
      }

      // Preenche as notícias no HTML
      const noticias = data.articles;
      noticias.forEach(noticia => {
        const cardHTML = `
          <div class="col-12 col-md-4"> <!-- Responsivo, exibe 3 colunas em telas grandes -->
            <div class="card">
              <img src="${noticia.urlToImage}" class="card-img-top" alt="${noticia.title}"> <!-- Imagem da notícia -->
              <div class="card-body">
                <h5 class="card-title">${noticia.title}</h5> <!-- Título da notícia -->
                <p class="card-text">${noticia.description}</p> <!-- Descrição da notícia -->
                <a href="${noticia.url}" target="_blank" class="btn btn-primary">Leia mais</a> <!-- Link para mais detalhes -->
              </div>
            </div>
          </div>
        `;
        noticiasContainer.innerHTML += cardHTML; // Adiciona cada notícia no container
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as notícias:', error); // Exibe erro no console
      noticiasContainer.innerHTML = '<p>Ocorreu um erro ao carregar as notícias. Tente novamente mais tarde.</p>';
    });
});
