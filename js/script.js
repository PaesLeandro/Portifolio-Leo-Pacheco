    const socialLinks = {
      instagram: 'https://www.instagram.com/lpinstalacoeseletricas26?igsh=MTl4YTN1NXQxMnRqeA==',
      tiktok: 'https://www.tiktok.com/@user771020362?_r=1&_t=ZS-9912tPTFswu'
    };

    document.querySelectorAll('.js-social-link').forEach((link) => {
      const social = link.dataset.social;
      if (socialLinks[social]) {
        link.href = socialLinks[social];
      }
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const toggleIcon = darkModeToggle.querySelector('i');

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      toggleIcon.classList.remove('fa-moon');
      toggleIcon.classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');

      if (body.classList.contains('dark-mode')) {
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
      }
    });

    // Image Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryViewport = document.querySelector('.gallery-viewport');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryIndicators = document.getElementById('galleryIndicators');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentImageIndex = 0;
    let currentGalleryIndex = 0;
    let galleryAutoplayInterval = null;
    let galleryResumeTimeout = null;
    let touchStartX = 0;
    let touchEndX = 0;

    const images = [
      'imagens/antes.jpeg',
      'imagens/antes1.jpeg',
      'imagens/antes2.jpeg',
      'imagens/depois.jpeg',
      'imagens/depois1.jpeg',
      'imagens/depois2.jpeg',
      'imagens/depois3.jpeg',
      'imagens/foto8-2.jpeg',
      'imagens/foto8-3.jpeg'
    ];

    function getGalleryItemsPerView() {
      if (window.innerWidth <= 480) {
        return 1;
      }
      if (window.innerWidth <= 768) {
        return 2;
      }
      return 3;
    }

    function getGalleryMaxIndex() {
      return Math.max(0, galleryItems.length - getGalleryItemsPerView());
    }

    function updateGalleryPosition() {
      if (!galleryTrack || !galleryItems.length) {
        return;
      }

      const maxIndex = getGalleryMaxIndex();
      if (currentGalleryIndex > maxIndex) {
        currentGalleryIndex = maxIndex;
      }

      const firstItem = galleryItems[0].parentElement;
      const itemWidth = firstItem.offsetWidth;
      const gap = parseFloat(window.getComputedStyle(galleryTrack).gap) || 0;
      const offset = currentGalleryIndex * (itemWidth + gap);

      galleryTrack.style.transform = `translateX(-${offset}px)`;

      if (galleryIndicators) {
        galleryIndicators.querySelectorAll('.gallery-indicator').forEach((indicator, index) => {
          const isActive = index === currentGalleryIndex;
          indicator.classList.toggle('active', isActive);
          indicator.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      }
    }

    function goToGalleryIndex(index) {
      const maxIndex = getGalleryMaxIndex();

      if (index < 0) {
        currentGalleryIndex = maxIndex;
      } else if (index > maxIndex) {
        currentGalleryIndex = 0;
      } else {
        currentGalleryIndex = index;
      }

      updateGalleryPosition();
    }

    function stopGalleryAutoplay() {
      if (galleryAutoplayInterval) {
        clearInterval(galleryAutoplayInterval);
        galleryAutoplayInterval = null;
      }
    }

    function startGalleryAutoplay() {
      stopGalleryAutoplay();

      if (prefersReducedMotion.matches || galleryItems.length <= getGalleryItemsPerView()) {
        return;
      }

      galleryAutoplayInterval = setInterval(() => {
        goToGalleryIndex(currentGalleryIndex + 1);
      }, 5000);
    }

    function pauseGalleryAutoplay(delay = 5000) {
      stopGalleryAutoplay();
      clearTimeout(galleryResumeTimeout);

      if (prefersReducedMotion.matches) {
        return;
      }

      galleryResumeTimeout = setTimeout(() => {
        startGalleryAutoplay();
      }, delay);
    }

    function buildGalleryIndicators() {
      if (!galleryIndicators) {
        return;
      }

      galleryIndicators.innerHTML = '';
      const totalIndicators = getGalleryMaxIndex() + 1;

      for (let index = 0; index < totalIndicators; index++) {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.className = 'gallery-indicator';
        indicator.setAttribute('aria-label', `Ir para a posição ${index + 1} da galeria`);
        indicator.setAttribute('aria-current', index === currentGalleryIndex ? 'true' : 'false');
        indicator.addEventListener('click', () => {
          goToGalleryIndex(index);
          pauseGalleryAutoplay();
        });
        galleryIndicators.appendChild(indicator);
      }
    }

    function handleGalleryManualNavigation(direction) {
      goToGalleryIndex(currentGalleryIndex + direction);
      pauseGalleryAutoplay();
    }

    if (galleryPrev && galleryNext) {
      galleryPrev.addEventListener('click', () => {
        handleGalleryManualNavigation(-1);
      });

      galleryNext.addEventListener('click', () => {
        handleGalleryManualNavigation(1);
      });
    }

    if (galleryViewport) {
      galleryViewport.addEventListener('mouseenter', () => {
        stopGalleryAutoplay();
      });

      galleryViewport.addEventListener('mouseleave', () => {
        pauseGalleryAutoplay(2500);
      });

      galleryViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        stopGalleryAutoplay();
      }, { passive: true });

      galleryViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > 40) {
          handleGalleryManualNavigation(swipeDistance < 0 ? 1 : -1);
        } else {
          pauseGalleryAutoplay(2500);
        }
      }, { passive: true });
    }

    if (galleryTrack) {
      galleryTrack.addEventListener('focusin', () => {
        stopGalleryAutoplay();
      });

      galleryTrack.addEventListener('focusout', () => {
        pauseGalleryAutoplay(2500);
      });
    }

    window.addEventListener('resize', () => {
      const previousIndicators = galleryIndicators ? galleryIndicators.childElementCount : 0;
      const nextIndicators = getGalleryMaxIndex() + 1;

      if (previousIndicators !== nextIndicators) {
        buildGalleryIndicators();
      }

      updateGalleryPosition();
    });

    buildGalleryIndicators();
    updateGalleryPosition();
    startGalleryAutoplay();

    galleryItems.forEach((img, index) => {
      img.parentElement.addEventListener('click', () => {
        modal.classList.add('show');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        currentImageIndex = index;

        // Aplicar rotação no modal se a imagem original tem classe de rotação
        modalImg.className = 'modal-content'; // Reset classes
        if (img.classList.contains('img-rotate-90')) {
          modalImg.classList.add('img-rotate-90');
        } else if (img.classList.contains('img-rotate-270')) {
          modalImg.classList.add('img-rotate-270');
        }

        // Aplicar tamanho pequeno se a imagem original tem classe img-small
        if (img.classList.contains('img-small')) {
          modalImg.classList.add('img-small');
        }
      });
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });

    // Navigation arrows for modal
    function changeImage(direction) {
      currentImageIndex += direction;

      if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
      } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
      }

      modalImg.src = images[currentImageIndex];

      // Aplicar rotação baseada na imagem atual
      const currentImg = galleryItems[currentImageIndex];
      modalImg.className = 'modal-content'; // Reset classes
      if (currentImg.classList.contains('img-rotate-90')) {
        modalImg.classList.add('img-rotate-90');
      } else if (currentImg.classList.contains('img-rotate-270')) {
        modalImg.classList.add('img-rotate-270');
      }

      // Aplicar tamanho pequeno se a imagem atual tem classe img-small
      if (currentImg.classList.contains('img-small')) {
        modalImg.classList.add('img-small');
      }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
          changeImage(-1);
        } else if (e.key === 'ArrowRight') {
          changeImage(1);
        } else if (e.key === 'Escape') {
          modal.classList.remove('show');
        }
      } else if (document.activeElement && document.activeElement.closest('#galeria')) {
        if (e.key === 'ArrowLeft') {
          handleGalleryManualNavigation(-1);
        } else if (e.key === 'ArrowRight') {
          handleGalleryManualNavigation(1);
        }
      }
    });

    // Service Modal
    const serviceButtons = document.querySelectorAll('.btn-saiba-mais');
    const serviceModal = document.getElementById('serviceModal');
    const serviceModalContent = document.getElementById('serviceModalContent');
    const closeServiceModal = document.querySelector('.close-button-service');

    const serviceDetails = {
      'instalacoes': {
        title: 'Instalações Residenciais',
        content: `
                    <h3>Instalações Elétricas Completas</h3>
                    <ul>
                        <li>Projetos elétricos residenciais</li>
                        <li>Instalação de fiação completa</li>
                        <li>Distribuição de circuitos</li>
                        <li>Instalação de quadros de distribuição</li>
                        <li>Aterramento e proteção</li>
                        <li>Conformidade com normas ABNT</li>
                    </ul>
                    <p><strong>Garantia:</strong> em todos os serviços</p>
                `
      },
      'manutencao': {
        title: 'Manutenção Elétrica',
        content: `
                    <h3>Manutenção Preventiva e Corretiva</h3>
                    <ul>
                        <li>Inspeção de instalações elétricas</li>
                        <li>Troca de componentes defeituosos</li>
                        <li>Limpeza de quadros elétricos</li>
                        <li>Verificação de aterramento</li>
                        <li>Teste de disjuntores e DR</li>
                        <li>Relatório técnico detalhado</li>
                    </ul>
                    <p><strong>Segurança:</strong> Evite riscos de curto-circuito</p>
                `
      },
      'iluminacao': {
        title: 'Projetos de Iluminação',
        content: `
                    <h3>Iluminação Eficiente e Moderna</h3>
                    <ul>
                        <li>Projeto luminotécnico</li>
                        <li>Instalação de LED</li>
                        <li>Automação residencial</li>
                        <li>Sensores de presença</li>
                        <li>Dimers e controles</li>
                        <li>Iluminação decorativa</li>
                    </ul>
                    <p><strong>Economia:</strong> Até 80% de redução no consumo</p>
                `
      },
      'quadros': {
        title: 'Quadros e Disjuntores',
        content: `
                    <h3>Quadros Elétricos e Proteção</h3>
                    <ul>
                        <li>Instalação de quadros de distribuição</li>
                        <li>Disjuntores termomagnéticos</li>
                        <li>Dispositivos DR</li>
                        <li>DPS (proteção contra surtos)</li>
                        <li>Organização e identificação</li>
                        <li>Adequação às normas</li>
                    </ul>
                    <p><strong>Segurança:</strong> Proteção total da instalação</p>
                `
      },
      'tomadas': {
        title: 'Tomadas e Interruptores',
        content: `
                    <h3>Pontos Elétricos e Comando</h3>
                    <ul>
                        <li>Instalação de tomadas padrão NBR</li>
                        <li>Interruptores simples e paralelos</li>
                        <li>Tomadas USB integradas</li>
                        <li>Dimers para iluminação</li>
                        <li>Sensores de presença</li>
                        <li>Acabamento em diversas cores</li>
                    </ul>
                    <p><strong>Qualidade:</strong> Materiais de primeira linha</p>
                `
      },
      'ventiladores': {
        title: 'Ventiladores de Teto',
        content: `
                    <h3>Instalação de Ventiladores</h3>
                    <ul>
                        <li>Instalação segura em lajes</li>
                        <li>Reforço estrutural quando necessário</li>
                        <li>Ventiladores com e sem luz</li>
                        <li>Controle remoto</li>
                        <li>Regulagem de velocidade</li>
                        <li>Balanceamento perfeito</li>
                    </ul>
                    <p><strong>Conforto:</strong> Ventilação eficiente e silenciosa</p>
                `
      }
    };

    serviceButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceType = button.getAttribute('data-service');
        const service = serviceDetails[serviceType];

        if (service) {
          serviceModalContent.innerHTML = `
                        <h2>${service.title}</h2>
                        ${service.content}
                        <div style="margin-top: 30px; text-align: center;">
                            <a href="#contato" class="btn-submit" onclick="closeServiceModalHandler()">
                                <i class="fas fa-envelope"></i>
                                Solicitar Orçamento
                            </a>
                        </div>
                    `;
          serviceModal.classList.add('show');
        }
      });
    });

    closeServiceModal.addEventListener('click', () => {
      serviceModal.classList.remove('show');
    });

    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        serviceModal.classList.remove('show');
      }
    });

    function closeServiceModalHandler() {
      serviceModal.classList.remove('show');
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const whatsappConfirmationModal = document.getElementById('whatsappConfirmationModal');
    const confirmWhatsappBtn = document.getElementById('confirmWhatsappBtn');
    const cancelWhatsappBtn = document.getElementById('cancelWhatsappBtn');
    let pendingWhatsappUrl = '';

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        servico: formData.get('servico'),
        mensagem: formData.get('mensagem')
      };

      // Create WhatsApp message
      const message = `*Solicitação de Orçamento*\n\n` +
        `*Nome:* ${data.nome}\n` +
        `*Email:* ${data.email}\n` +
        `*Telefone:* ${data.telefone}\n` +
        `*Serviço:* ${data.servico}\n` +
        `*Descrição:* ${data.mensagem}`;

      pendingWhatsappUrl = `https://wa.me/5524981715411?text=${encodeURIComponent(message)}`;

      // Show WhatsApp confirmation modal
      whatsappConfirmationModal.classList.add('show');
    });

    // WhatsApp confirmation modal handlers
    confirmWhatsappBtn.addEventListener('click', () => {
      // Open WhatsApp
      window.open(pendingWhatsappUrl, '_blank');

      // Close modal
      whatsappConfirmationModal.classList.remove('show');

      // Reset form
      contactForm.reset();

      // Show brief success message
      setTimeout(() => {
        const successToast = document.createElement('div');
        successToast.innerHTML = `
          <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--verde-whatsapp);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10002;
            animation: slideInRight 0.3s ease;
          ">
            <i class="fas fa-check-circle"></i> Redirecionado para WhatsApp com sucesso!
          </div>
        `;
        document.body.appendChild(successToast);

        setTimeout(() => {
          successToast.remove();
        }, 3000);
      }, 500);
    });

    cancelWhatsappBtn.addEventListener('click', () => {
      whatsappConfirmationModal.classList.remove('show');
      pendingWhatsappUrl = '';
    });

    // Close modal when clicking outside
    whatsappConfirmationModal.addEventListener('click', (e) => {
      if (e.target === whatsappConfirmationModal) {
        whatsappConfirmationModal.classList.remove('show');
        pendingWhatsappUrl = '';
      }
    });

    // WhatsApp Direct Contact (Float Button)
    const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
    const whatsappDirectModal = document.getElementById('whatsappDirectModal');
    const confirmDirectWhatsappBtn = document.getElementById('confirmDirectWhatsappBtn');
    const cancelDirectWhatsappBtn = document.getElementById('cancelDirectWhatsappBtn');

    whatsappFloatBtn.addEventListener('click', () => {
      whatsappDirectModal.classList.add('show');
    });

    confirmDirectWhatsappBtn.addEventListener('click', () => {
      // Create direct contact message
      const directMessage = `Olá! 👋\n\nVi o site da LP Instalações Elétricas e gostaria de conversar sobre serviços elétricos.\n\nPodemos conversar?`;
      const directWhatsappUrl = `https://wa.me/5524981715411?text=${encodeURIComponent(directMessage)}`;
      
      // Open WhatsApp
      window.open(directWhatsappUrl, '_blank');
      
      // Close modal
      whatsappDirectModal.classList.remove('show');
      
      // Show brief success message
      setTimeout(() => {
        const successToast = document.createElement('div');
        successToast.innerHTML = `
          <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--verde-whatsapp);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10002;
            animation: slideInRight 0.3s ease;
          ">
            <i class="fab fa-whatsapp"></i> Conversa iniciada no WhatsApp!
          </div>
        `;
        document.body.appendChild(successToast);
        
        setTimeout(() => {
          successToast.remove();
        }, 3000);
      }, 500);
    });

    cancelDirectWhatsappBtn.addEventListener('click', () => {
      whatsappDirectModal.classList.remove('show');
    });

    // Close direct modal when clicking outside
    whatsappDirectModal.addEventListener('click', (e) => {
      if (e.target === whatsappDirectModal) {
        whatsappDirectModal.classList.remove('show');
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section, .service-card').forEach(el => {
      observer.observe(el);
    });

    // Phone number formatting
    document.getElementById('telefone').addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      e.target.value = value;
    });

    // Scroll to top functionality
    let scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 95px;
            right: 25px;
            background: rgba(90, 126, 189, 0.92);
            color: white;
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            cursor: pointer;
            display: none;
            z-index: 999;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
        `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Loading animation
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function () {
        this.style.display = 'none';
        console.warn('Imagem não encontrada:', this.src);
      });
    });
  

