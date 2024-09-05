// Selecionar elementos da página
const images = document.querySelectorAll('.manga img');
const pageNumber = document.getElementById('page-number');
const currentPage = document.getElementById('current-page');
const totalPages = document.getElementById('total-pages');
const header = document.querySelector('.header');
const select = document.querySelector('select');
const manga = document.querySelector('.manga');

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

// Adicionar evento de mudança ao select
select.addEventListener('change', (e) => {
  const paginaSelecionada = e.target.value;
  const imagem = document.getElementById(paginaSelecionada);
  if (imagem) {
    imagem.scrollIntoView({ behavior: 'smooth' });
  }
});

// Adicionar evento de rolagem à janela
window.addEventListener('scroll', () => {
  updatePageNumber();
  const scrollPosition = window.scrollY;
  header.style.transform = `translateY(${scrollPosition}px)`;
});

// Chamar a função ao carregar a página
window.addEventListener('scroll', () => {
    updatePageNumber();
    // remove the transform property, we don't need it anymore
    // header.style.transform = `translateY(${scrollPosition}px)`;
  });