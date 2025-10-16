
// Importar os dados de lugares.js e alunos.js
import {dados} from "./lugares.js";

// Arranjar os dados para o carrossel de destaques
const dadoLugar = dados.lugares.filter(lugar => lugar.destaque).map(lugar => ({
    id: lugar.id,
    src: lugar.imagem_pincipal,
    titulo: lugar.nome,
    legenda: lugar.descricao
}));

//Criar header dinamicamente
const header = document.querySelector(".cabeçalho");
header.innerHTML = 
  `<div class="logo"><img src="/assets/img/Logo.png" alt=""></div>
    <nav>
      <ul><a href="/index.html"><i class="fa-solid fa-house"></i></a></ul>
      <ul class="responsivo">
        <li><a href="/index.html">Home</a></li>
        <li><a id="botao" href="#">Descrição</a></li>
      </ul>
      <div id="popup"><p>Este site segue as orientações referentes ao Trabalho prático 1 da semana 10 da disciplina EaD de Desenvolvimento de Interfaces WEB. A escolha do tema foi sobre lugares e atrações (escolhido desde as atividades anteriores) onde é mostrado um catálogo de lugares, em que, ao clicar em cada um, o usuário entrará em uma página de detalhes que apresentará mais informações sobre o lugar selecionado. O banco de dados foi acrescentado a partir da estrutura JSON fornecida como exemplo pelo professor. As demais informações são simbólicas, somente para representar com o site poderia ser aplicado. O layout segue o wireframe fornecido pelo professor e possui a personalização requerida. O site também é responsivo, adaptando-se a diferentes tipos de tela.</p></div>
    </nav>`;

const botao = document.getElementById("botao");
const popup = document.getElementById("popup");

botao.addEventListener("click", () => {
  popup.style.display = "block";
});

document.addEventListener("click", (event) => {
  const clicouDentro = popup.contains(event.target) || botao.contains(event.target);
  if (!clicouDentro) {
    popup.style.display = "none";
  }
});

// Criar o carrossel dinamicamente
const containerCarrossel = document.querySelector("#carrosselDinamico .carousel-inner");
const containerIndicadores = document.querySelector(".carousel-indicators");
const carrosselDinamico = document.getElementById('carrosselDinamico');

if (containerCarrossel && containerIndicadores && carrosselDinamico) {
dadoLugar.forEach((slide, i) => {
  // Criar o item do carrossel
  const div = document.createElement("div");
  div.classList.add('carousel-item');
  if (i === 0) div.classList.add('active');
  div.innerHTML = 
  `<img src="${slide.src}" class="d-block w-100" alt="${slide.titulo}">
  <div class="carousel-caption d-none d-md-block">
      <a href="/detalhes.html?id=${slide.id}"><h5>${slide.titulo}</h5></a>
      <p>${slide.legenda}</p>
  </div>`;
  
  containerCarrossel.appendChild(div);

  // Criar os indicadores do carrossel
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.bsTarget = '#carrosselDinamico';
  button.dataset.bsSlideTo = i;
  button.setAttribute('aria-label', `Slide ${i + 1}`);
  if (i === 0) button.classList.add('active');
  containerIndicadores.appendChild(button);
});

const prev = document.createElement('button');
prev.classList.add('carousel-control-prev');
prev.type = 'button';
prev.dataset.bsTarget = '#carrosselDinamico';
prev.dataset.bsSlide = 'prev';
prev.innerHTML = `
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Anterior</span>
`;

const next = document.createElement('button');
next.classList.add('carousel-control-next');
next.type = 'button';
next.dataset.bsTarget = '#carrosselDinamico';
next.dataset.bsSlide = 'next';
next.innerHTML = `
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Próximo</span>
`;

carrosselDinamico.appendChild(prev);
carrosselDinamico.appendChild(next);

new bootstrap.Carousel(carrosselDinamico, {
interval: 4000,
ride: 'carousel'
});
}else{console.warn("Elemento não encontrado no DOM");};

// Criar os cards dinamicamente
const containerCards = document.getElementById("cards");

if (containerCards){
const dadoCard = dados.lugares.map(lugar => ({
    id: lugar.id,
    src: lugar.imagem_pincipal,
    titulo: lugar.nome,
    legenda: lugar.descricao
}));

dadoCard.forEach(card => {
    const div = document.createElement("div");
    div.classList.add('col');
    div.innerHTML = 
      `<div class="card h-100"">
          <img src="${card.src}" class="card-img-top" alt="${card.titulo}">
          <div class="card-body">
            <h5 class="card-title">${card.titulo}</h5>
            <p class="card-text">${card.legenda}</p>
          </div>
        </div>`;
    div.querySelector('.card').addEventListener('click', () =>{
      window.location.href = `detalhes.html?id=${card.id}`;
    });
    containerCards.appendChild(div);
});
} else {console.warn("Elemento não encontrado no DOM");};

// Importar Dados de Alunos.js
import {dadosAluno} from "./alunos.js";

const sobre = document.getElementById("sobre");
const autoria = document.getElementById("autoria");
const redesSociais = document.getElementById("redesSociais");

if (redesSociais && autoria && redesSociais) {
sobre.innerHTML = `${dadosAluno.sobreMim}`;
autoria.innerHTML = 
  `<p id="autoria">
    <img src="${dadosAluno.foto}" alt="Foto">
    <p>Nome: ${dadosAluno.nome}</p>
    <p>Curso: ${dadosAluno.curso}</p>
    <p>Turma: ${dadosAluno.turma}</p>
  </p>`;

  let ul = redesSociais.querySelector('ul');
  if (!ul) {
    ul = document.createElement('ul');
    ul.className = 'social-list';
    redesSociais.appendChild(ul);
  }

  dadosAluno.redesSociais.forEach(elem => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = elem.Link || '#';
    a.innerHTML = elem.icone || '';
    li.appendChild(a);
    ul.appendChild(li);
  });

} else {
  console.warn("Elemento não encontrado no DOM");
}

//carregar pagina de detalhes
if (window.location.pathname.includes("detalhes.html")) {
  let params = new URLSearchParams(location.search);
  let idStr = params.get("id");
  let id = Number(idStr);
  const lugar = dados.lugares.find((elem) => elem.id === id);
  const sessao = document.querySelector(".infoLugar")
  if (lugar) {
    const div = document.createElement("div");
    div.classList.add("container");
    div.classList.add("text-center");
    div.innerHTML = 
      `<div class="linha row">
          <div class="col">
              <img src="${lugar.imagem_pincipal}" alt="${lugar.pais}">
              <figcaption>${lugar.descricao} ${lugar.data}</figcaption>
          </div>
          <div class="col">
              <h2>${lugar.nome}</h2>
              <p>${lugar.conteudo} <a href="/maisDetalhes.html?id=${lugar.id}">Leia Mais.</a></p>
          </div>
      </div>`;
    sessao.appendChild(div);

    const outros = document.querySelector(".outros");
    lugar.atracoes.forEach((elem) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = 
        `<img src="${elem.imagem}" class="card-img-top" alt="${elem.nome}">
            <div class="card-body">
                <h5 class="card-title">${elem.nome}</h5>
                <p class="card-text">${elem.descricao}</p>
                <a href="/maisDetalhes.html?id=${elem.id}" class="btn btn-primary">Explorar</a>`;
      outros.appendChild(div);
    });} else { alert("lugar NÃO identificado")};
};

