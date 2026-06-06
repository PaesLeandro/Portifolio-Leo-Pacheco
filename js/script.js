// Espera todo o HTML ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    const body = document.body;

    // --- MODO ESCURO (DARK MODE) ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        // Função para atualizar o ícone (evita repetição de código)
        const updateDarkModeUI = () => {
            const icon = darkModeToggle.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        };

        // Evento de clique para alternar o modo
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.setItem('dark-mode', 'disabled');
            }
            updateDarkModeUI(); // Atualiza o ícone
        });

        // Verifica o estado salvo no localStorage ao carregar a página
        if (localStorage.getItem('dark-mode') === 'enabled') {
            body.classList.add('dark-mode');
        }
        updateDarkModeUI(); // Atualiza o ícone inicial
    }


    // --- MODAIS DE SERVIÇO ---
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        const closeServiceModal = serviceModal.querySelector('.close-button-service');
        const saibaMaisButtons = document.querySelectorAll('.btn-saiba-mais');
        const serviceModalTitle = document.getElementById('serviceModalTitle');
        const serviceModalDescription = document.getElementById('serviceModalDescription');
        const ctaButtonInModal = serviceModal.querySelector('.cta-btn.primary'); // Botão "Solicitar Orçamento" dentro do modal

        const serviceDetails = {
            'instalacoes-residenciais': {
                title: 'Instalações Residenciais',
                description: 'Realizamos toda a instalação elétrica para sua nova casa ou reforma, garantindo segurança e funcionalidade. Nossos serviços incluem projeto elétrico, instalação completa de fiação, quadros de distribuição, tomadas, interruptores e iluminação. Trabalhamos seguindo todas as normas da ABNT e utilizamos materiais de primeira qualidade.'
            },
            'manutencao': {
                title: 'Manutenção Elétrica',
                description: 'Oferecemos serviços completos de manutenção preventiva e corretiva para manter sua instalação elétrica sempre em perfeito estado e evitar problemas futuros. Inclui revisão de fiação, teste de disjuntores, verificação de tomadas e interruptores, e correção de problemas elétricos.'
            },
            'iluminacao': {
                title: 'Iluminação',
                description: 'Desenvolvemos projetos e realizamos instalações de iluminação que otimizam ambientes e reduzem o consumo de energia. Trabalhamos com LED, iluminação decorativa, spots, lustres e sistemas de automação luminosa para criar o ambiente perfeito.'
            },
            'quadros-disjuntores': {
                title: 'Quadros e Disjuntores',
                description: 'Realizamos a instalação, adequação e manutenção de quadros de distribuição e disjuntores, sempre com foco na segurança da sua instalação elétrica. Inclui adequação às normas vigentes, instalação de DR, DPS e dimensionamento correto dos circuitos.'
            },
            'tomadas-interruptores': {
                title: 'Tomadas e Interruptores',
                description: 'Oferecemos serviços de substituição e instalação de novas tomadas, interruptores e pontos elétricos conforme sua necessidade. Trabalhamos com diversos modelos e padrões, sempre garantindo segurança e funcionalidade.'
            },
            'ventiladores-teto': {
                title: 'Ventiladores de Teto',
                description: 'Fazemos a instalação segura e eficiente de ventiladores de teto em diversos ambientes, garantindo fixação adequada e funcionamento perfeito. Trabalhamos com diversos modelos e incluímos a instalação completa com controle remoto quando necessário.'
            }
        };

        saibaMaisButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                console.log('Botão clicado:', this);
                const serviceId = this.dataset.service;
                console.log('Service ID:', serviceId);
                const details = serviceDetails[serviceId];
                console.log('Details:', details);
                if (details) {
                    serviceModalTitle.textContent = details.title;
                    serviceModalDescription.textContent = details.description;
                    serviceModal.style.display = 'flex';
                    body.style.overflow = 'hidden';
                    console.log('Modal aberto');
                } else {
                    console.error('Serviço não encontrado:', serviceId);
                }
            });
        });

        // Função centralizada para fechar o modal
        const closeModal = () => {
            serviceModal.style.display = 'none';
            body.style.overflow = '';
        };

        // Eventos para fechar o modal
        closeServiceModal.addEventListener('click', closeModal);
        ctaButtonInModal.addEventListener('click', closeModal); // <--- ALTERAÇÃO ADICIONADA AQUI
        window.addEventListener('click', (event) => {
            if (event.target == serviceModal) {
                closeModal();
            }
        });
    }


    // --- GALERIA DE IMAGENS (MODAL) ---
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('caption');
        const closeImageModalBtn = imageModal.querySelector('.close-modal');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const modalThumbnailsContainer = imageModal.querySelector('.modal-thumbnails');
        const prevButton = imageModal.querySelector('.prev');
        const nextButton = imageModal.querySelector('.next');

        let currentImageIndex = 0;
        const images = Array.from(galleryItems).map(img => ({ src: img.src, alt: img.alt }));

        const openImageModal = (index) => {
            if (index < 0 || index >= images.length) return;
            currentImageIndex = index;
            modalImage.src = images[index].src;
            modalCaption.textContent = images[index].alt;
            imageModal.style.display = 'flex';
            body.style.overflow = 'hidden';
            updateModalThumbnails(index);
        };

        const updateModalThumbnails = (activeIndex) => {
            modalThumbnailsContainer.innerHTML = '';
            images.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img.src;
                thumb.alt = img.alt;
                thumb.classList.add('modal-thumbnail-item');
                if (index === activeIndex) {
                    thumb.classList.add('active');
                }
                thumb.addEventListener('click', () => openImageModal(index));
                modalThumbnailsContainer.appendChild(thumb);
            });
            const activeThumbnail = modalThumbnailsContainer.querySelector('.active');
            if (activeThumbnail) {
                activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        };

        const showNextImage = () => openImageModal((currentImageIndex + 1) % images.length);
        const showPrevImage = () => openImageModal((currentImageIndex - 1 + images.length) % images.length);

        galleryItems.forEach((item, index) => {
            item.parentElement.addEventListener('click', () => openImageModal(index));
        });

        const closeImageModal = () => {
            imageModal.style.display = 'none';
            body.style.overflow = '';
        };

        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);
        closeImageModalBtn.addEventListener('click', closeImageModal);
        window.addEventListener('click', (event) => {
            if (event.target == imageModal) {
                closeImageModal();
            }
        });
    }


    // --- SCROLL SUAVE DO MENU ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });


    // --- FORMULÁRIO DE ORÇAMENTO ---
    const orcamentoForm = document.getElementById('orcamentoForm');
    if (orcamentoForm) {
        const phoneInput = document.getElementById('telefone');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const whatsappBtn = document.getElementById('whatsappBtn');

        // Máscara para telefone
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.substring(0, 11);
                let formattedValue = '';
                if (value.length > 2) {
                    formattedValue = `(${value.substring(0, 2)}) `;
                    if (value.length > 7) {
                        formattedValue += `${value.substring(2, 7)}-${value.substring(7)}`;
                    } else {
                        formattedValue += value.substring(2);
                    }
                } else if (value.length > 0) {
                    formattedValue = `(${value}`;
                }
                e.target.value = formattedValue;
            });
        }

        // Envio do formulário via AJAX para Formspree
        orcamentoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(orcamentoForm);

            fetch(orcamentoForm.action, { // Usando o action do próprio formulário
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        successMessage.style.display = 'block';
                        errorMessage.style.display = 'none';
                        orcamentoForm.reset();
                        setTimeout(() => { successMessage.style.display = 'none'; }, 5000);
                    } else {
                        throw new Error('Erro no envio');
                    }
                })
                .catch(error => {
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                    setTimeout(() => { errorMessage.style.display = 'none'; }, 5000);
                });
        });

        // Botão para enviar via WhatsApp
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const nome = document.getElementById('nome').value;
                const telefone = document.getElementById('telefone').value;
                const tipoServico = document.getElementById('tipoServico').value;
                const descricao = document.getElementById('descricao').value;
                const emergencia = document.getElementById('emergencia').checked ? 'Sim' : 'Não';
                const message = `Olá, meu nome é ${nome}. \nMeu telefone é ${telefone}. \nPreciso de um orçamento para: ${tipoServico}. \n\nDescrição: ${descricao}. \n\nÉ uma emergência: ${emergencia}.`;
                const whatsappUrl = `https://wa.me/5524981715411?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }
    }
});