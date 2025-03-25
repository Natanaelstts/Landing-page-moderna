document.addEventListener("DOMContentLoaded", function () {
  // Menu Mobile
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      nav.classList.toggle("active");
    });
  }

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", function () {
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        nav.classList.remove("active");
      }
    });
  });

  // Header scroll
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // Botão voltar ao topo
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
  }

  // ========== Filtro do Portfólio ========== //
  const portfolioFilter = function () {
    const filterBtns = document.querySelectorAll(
      ".portfolio-filter .filter-btn"
    );
    const portfolioItems = document.querySelectorAll(
      ".portfolio-grid .portfolio-item"
    );

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Remove active de todos os botões
          filterBtns.forEach((btn) => btn.classList.remove("active"));
          // Adiciona active no botão clicado
          this.classList.add("active");

          const filterValue = this.getAttribute("data-filter");

          portfolioItems.forEach((item) => {
            if (
              filterValue === "all" ||
              item.getAttribute("data-category") === filterValue
            ) {
              item.style.display = "block";
              item.classList.add("animate__animated", "animate__fadeIn");
            } else {
              item.style.display = "none";
              item.classList.remove("animate__animated", "animate__fadeIn");
            }
          });
        });
      });
    }
  };
  portfolioFilter();

  // ========== Slider de Depoimentos ========== //
  const testimonialSlider = function () {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");

    if (slides.length > 0) {
      let currentIndex = 0;

      function showSlide(index) {
        // Verifica os limites
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        currentIndex = index;

        // Esconde todos os slides
        slides.forEach((slide) => {
          slide.classList.remove("active");
        });

        // Remove active de todos os dots
        dots.forEach((dot) => {
          dot.classList.remove("active");
        });

        // Mostra slide atual
        slides[index].classList.add("active");
        dots[index].classList.add("active");
      }

      // Eventos de navegação
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          showSlide(currentIndex + 1);
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          showSlide(currentIndex - 1);
        });
      }

      // Eventos dos dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
        });
      });

      // Inicializa o slider
      showSlide(0);

      // Auto-rotacionar (opcional)
      // setInterval(() => showSlide(currentIndex + 1), 5000);
    }
  };
  testimonialSlider();

  // ========== Animação de Contagem ========== //
  const animateCounters = function () {
    const counters = document.querySelectorAll(".stat-number");

    if (counters.length > 0) {
      function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          element.textContent = Math.floor(progress * (end - start) + start);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }

      function checkIfInView() {
        counters.forEach((counter) => {
          const rect = counter.getBoundingClientRect();
          const isInView =
            rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;

          if (isInView && !counter.hasAttribute("data-animated")) {
            const target = +counter.getAttribute("data-count");
            animateValue(counter, 0, target, 2000);
            counter.setAttribute("data-animated", "true");
          }
        });
      }

      window.addEventListener("scroll", checkIfInView);
      checkIfInView(); // Verifica ao carregar
    }
  };
  animateCounters();

  // ========== Formulário de Contato ========== //
  const contactForm = document.getElementById("form-contato");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Mensagem enviada com sucesso! (Simulação)");
      this.reset();
    });
  }

  // ========== Smooth Scroll ========== //
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
