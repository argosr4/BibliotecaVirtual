// Selecionar elementos da página
const images = document.querySelectorAll('.manga img');
const pageNumber = document.getElementById('page-number');
const currentPage = document.getElementById('current-page');
const totalPages = document.getElementById('total-pages');
const header = document.querySelector('.header');
const select = document.querySelector('select');
const manga = document.querySelector('.manga');
const selector = document.getElementById('capituloSelector');
const imagemExibida = document.getElementById('imagemCapitulo');
const valor = null;
const capa = document.getElementById('capa')

// Função para atualizar o número da página
function updatePageNumber() {
  const currentIndex = Array.prototype.findIndex.call(images, (image) => {
    const rect = image.getBoundingClientRect();
    return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  });

  const currentPageNumber = currentIndex !== -1 ? currentIndex + 1 : 1;
  currentPage.textContent = currentPageNumber;
  totalPages.textContent = images.length;
}

// Adicionar evento de clique às imagens
function addClickEventToImages() {
  images.forEach((image, index) => {
    image.addEventListener('click', () => {
      const nextIndex = (index + 1) % images.length;
      const nextImage = images[nextIndex];
      const nextImageTop = nextImage.offsetTop;
      window.scrollTo({
        top: nextImageTop,
        behavior: 'smooth'
      });
    });
  });
}

// Adicionar evento de mudança ao seletor
function addChangeEventToSelector() {
  select.addEventListener('change', (e) => {
    const paginaSelecionada = e.target.value;
    const imagem = document.getElementById(paginaSelecionada);
    if (imagem) {
      imagem.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Função para trocar a imagem ao selecionar um capítulo
function trocarImagem() {
  const selector = document.getElementById('capituloSelector');
  const imagemExibida = document.getElementById('imagemCapitulo');
  imagemExibida.src = selector.value;
}

// Função para atualizar a rolagem e o número da página
function handleScroll() {
  updatePageNumber();
  const scrollPosition = window.scrollY;
  header.style.transform = `translateY(${scrollPosition}px)`;
}

// Adicionar evento de rolagem
function addScrollEvent() {
  window.addEventListener('scroll', handleScroll);
}

// Inicializar opções do seletor de capítulos
function initializeCapituloSelector() {
  const imagens = [
    { 
      nome: "Capítulo 1", 
      imagens: [
        { src: "https://meo.comick.pictures/1-_acrCO1qL2Mym-m.jpg" },
        { src: "https://meo.comick.pictures/2-OuyvabFZthR05-m.jpg" },
        { src: "https://meo.comick.pictures/3-bH-HFBojOAbHv.jpg" }
      ]
    },
    { 
      nome: "Capítulo 2", 
      imagens: [
        { src: "capitulo2_1.jpg" },
        { src: "capitulo2_2.jpg" }
      ]
    },
    { 
      nome: "Capítulo 3", 
      imagens: [
        { src: "capitulo3_1.jpg" }
      ]
    }
  ];

  const selector = document.getElementById('imagemSelector');
  const imagensExibidas = document.getElementById('imagensExibidas');

  // Adicionar opções ao seletor
  imagens.forEach((capitulo, index) => {
    const option = document.createElement('option');
    option.value = index; // usa o índice como valor para identificar o capítulo
    option.textContent = capitulo.nome;
    selector.appendChild(option);
  });

  // Mostrar imagens selecionadas
  selector.addEventListener('change', () => {
    const selectedValue = selector.value;
    imagensExibidas.innerHTML = ''; // Limpa as imagens anteriores

    if (selectedValue) {
      const capitulo = imagens[selectedValue];
      capitulo.imagens.forEach(imagem => {
        const imgElement = document.createElement('img');
        imgElement.src = imagem.src;
        imgElement.alt = capitulo.nome;
        imagensExibidas.appendChild(imgElement);
      });
    }
  });
}
  

if (selector === null) {
  capa.style.display = 'block'
} else{
  capa.style.display = 'none'
}

// Chamar as funções de inicialização
addClickEventToImages();
addChangeEventToSelector();
addScrollEvent();
initializeCapituloSelector();
