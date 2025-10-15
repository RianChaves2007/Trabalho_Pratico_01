
// Importar os dados de lugares.js e alunos.js
import {dados} from "./lugares.js";

// Arranjar os dados para o carrossel de destaques
const dadoLugar = dados.lugares.filter(lugar => lugar.destaque).map(lugar => ({
    id: lugar.id,
    src: lugar.imagem_pincipal,
    titulo: lugar.nome,
    legenda: lugar.descricao
}));

// Criar o carrossel dinamicamente
const containerCarrossel = document.querySelector("#carrosselDinamico .carousel-inner");
const containerIndicadores = document.querySelector(".carousel-indicators");
const carrosselDinamico = document.getElementById('carrosselDinamico');

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

// Criar os cards dinamicamente
const containerCards = document.getElementById("cards");

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

// Importar Dados de Alunos.js
import {dadosAluno} from "./alunos.js";

const sobre = document.getElementById("sobre");
const autoria = document.getElementById("autoria");
const redesSociais = document.getElementById("redesSociais");

sobre.innerHTML = `${dadosAluno.sobreMim}`;
autoria.innerHTML = 
  `<p id="autoria">
    <img src="${dadosAluno.foto}" alt="Foto">
    <p>Nome: ${dadosAluno.nome}</p>
    <p>Curso: ${dadosAluno.curso}</p>
    <p>Turma: ${dadosAluno.turma}</p>
  </p>`;

if (redesSociais) {

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
  console.warn('Elemento #redesSociais não encontrado no DOM');
}






