document.addEventListener('DOMContentLoaded', () => {
   const hamburger = document.querySelector('.hamburger');
   const navMenu = document.querySelector('.nav-menu');
   const navLinks = document.querySelectorAll('.nav-links a');

   // Toggle mobilnog menija
   hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
   });

   // Zatvori meni kad se klikne na link i aktiviraj link
   navLinks.forEach(link => {
      link.addEventListener('click', () => {
         hamburger.classList.remove('active');
         navMenu.classList.remove('active');

         // Ukloni aktivnu klasu sa svih i dodaj na kliknuti
         navLinks.forEach(l => l.classList.remove('active'));
         link.classList.add('active');
      });
   });

   // --- SMOOTH SCROLL ---
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
            target.scrollIntoView({
               behavior: 'smooth'
            });
         }
      });
   });

   // --- LIGHTBOX FUNKCIONALNOST ---
   const lightbox = document.getElementById('lightbox');
   const lightboxImg = document.querySelector('.lightbox-img');
   const lightboxVideo = document.querySelector('.lightbox-video');
   const closeBtn = document.querySelector('.lightbox-close');
   const galleryContent = document.querySelectorAll('.gallery-item, .gallery-video');
   const prevBtn = document.querySelector('.lightbox-prev');
   const nextBtn = document.querySelector('.lightbox-next');

   let currentIndex = 0;
   const galleryContentArray = Array.from(galleryContent);

   // Funkcija za ažuriranje sadržaja u lightboxu (slika ili video)
   function updateLightbox() {
      const currentItem = galleryContentArray[currentIndex];

      // Sakrij oba elementa i zaustavi video za svaki slučaj
      lightboxImg.style.display = 'none';
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();

      if (currentItem.classList.contains('gallery-item')) {
         // Ako je slika
         const imgSrc = currentItem.querySelector('img').src;
         lightboxImg.src = imgSrc;
         lightboxImg.style.display = 'block';
      } else if (currentItem.classList.contains('gallery-video')) {
         // Ako je video
         const videoSrc = currentItem.querySelector('video source').src;
         lightboxVideo.src = videoSrc;
         lightboxVideo.style.display = 'block';
      }
   }

   // Otvori lightbox na klik
   galleryContent.forEach((item, index) => {
      item.addEventListener('click', () => {
         currentIndex = index;
         updateLightbox();
         lightbox.classList.add('active');
      });
   });

   // Klik na strelicu LIJEVO
   prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryContentArray.length) % galleryContentArray.length;
      updateLightbox();
   });

   // Klik na strelicu DESNO
   nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryContentArray.length;
      updateLightbox();
   });

   // Funkcija za zatvaranje lightboxa
   function closeLightbox() {
      lightbox.classList.remove('active');
      lightboxVideo.pause(); // Zaustavi video pri zatvaranju
      lightboxVideo.currentTime = 0; // Vrati video na početak
   }

   closeBtn.addEventListener('click', closeLightbox);
   lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

   // --- DYNAMIC COPYRIGHT YEAR ---
   const yearSpan = document.getElementById('copyright-year');
   if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
   }

   // --- LEGAL MODALS (Privacy, Terms) ---
   const modalTriggers = document.querySelectorAll('[data-modal-target]');

   modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
         e.preventDefault(); // Sprječava skok stranice
         const modalId = trigger.getAttribute('data-modal-target');
         const modal = document.querySelector(modalId);
         if (modal) {
            modal.classList.add('active');
         }
      });
   });

   const allModals = document.querySelectorAll('.legal-modal');
   allModals.forEach(modal => {
      modal.addEventListener('click', (e) => {
         if (e.target.classList.contains('legal-modal') || e.target.classList.contains('legal-modal-close')) {
            modal.classList.remove('active');
         }
      });
   });

   // --- COOKIE BANNER & MAPS CONSENT ---
   const cookieBanner = document.getElementById('cookie-banner');
   const acceptCookiesBtn = document.getElementById('accept-cookies');
   const mapIframes = document.querySelectorAll('iframe[data-src]');

   // Funkcija koja stvarno učitava mape (i kolačiće)
   function loadMaps() {
      mapIframes.forEach(iframe => {
         if (!iframe.getAttribute('src')) {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
         }
      });
   }

   if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
         cookieBanner.classList.add('show');
      }, 2000); // Prikaži nakon 2 sekunde
   } else {
      loadMaps(); // Ako je već prihvaćeno, učitaj odmah
   }

   acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.classList.remove('show');
      loadMaps(); // Učitaj nakon klika
   });
});