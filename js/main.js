/**
 * Futsal Championship 2025
 * Main JavaScript File
 * Dengan integrasi anime.js untuk animasi
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark', 'shadow');
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-dark');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });


    
    // Form submission dengan animasi
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const teamName = document.getElementById('teamName').value;
            const captainName = document.getElementById('captainName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            // Simple validation
            if (!teamName || !captainName || !email || !phone) {
                showAlert('Mohon isi semua field yang diperlukan', 'danger');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Memproses...';
            
            // Animasi form saat submit
            anime({
                targets: registrationForm.elements,
                opacity: [1, 0.7],
                translateY: [0, 5],
                easing: 'easeOutExpo',
                duration: 300
            });
            
            try {
            
               
                // Animasi sukses (anggap berhasil)
                anime({
                    targets: registrationForm.elements,
                    opacity: [0.7, 1],
                    translateY: [5, 0],
                    easing: 'easeOutExpo',
                    duration: 300
                });
                
                // Tampilkan pesan sukses dan reset form
                showAlert('Pendaftaran berhasil! Tim ' + teamName + ' telah terdaftar.', 'success');
                registrationForm.reset();
            } catch (error) {
                console.error('Error:', error);
                showAlert('Gagal mengirim data. Silakan coba lagi nanti.', 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // Alert function
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Find the form container and insert alert before the form
        const formContainer = document.querySelector('.card-body');
        if (formContainer) {
            formContainer.insertBefore(alertDiv, formContainer.firstChild);
            
            // Auto dismiss after 5 seconds
            setTimeout(() => {
                const bsAlert = new bootstrap.Alert(alertDiv);
                bsAlert.close();
            }, 5000);
        }
    }

    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const eventDate = new Date('2025-07-01T00:00:00').getTime();
        
        const updateCountdown = function() {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            if (distance < 0) {
                countdownElement.innerHTML = 'Pendaftaran telah dibuka!';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Hari</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Jam</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Menit</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Detik</span>
                </div>
            `;
        };
        
        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Animation on scroll dengan anime.js
    const animateElements = document.querySelectorAll('.animate-fade-in');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        easing: 'easeOutExpo',
                        duration: 800,
                        delay: 300
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            observer.observe(element);
        });
    }
    
    // Hero section animations
    anime.timeline({
        easing: 'easeOutExpo',
    })
    .add({
        targets: '.hero-img',
        scale: [1.2, 1],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutSine'
    })
    .add({
        targets: '.hero-overlay',
        opacity: [0, 0.7],
        duration: 800,
    }, '-=1200')
    .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        delay: 300
    }, '-=800')
    .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800,
    }, '-=600')
    .add({
        targets: '.hero-buttons',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
    }, '-=400');
    
    // Tambahkan efek parallax pada hero image
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            anime({
                targets: '.hero-img',
                translateY: scrollPosition * 0.3,
                duration: 0,
                easing: 'linear'
            });
        }
    });
    
    // Section title animations
    const sectionTitles = document.querySelectorAll('.anime-section-title');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [-30, 0],
                    scale: [0.9, 1],
                    easing: 'easeOutExpo',
                    duration: 1000,
                    delay: 200
                });
                
                // Tambahkan animasi garis di bawah judul setelah judul muncul
                anime({
                    targets: entry.target.querySelector('::after'),
                    width: [0, 50],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: 1000
                });
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        sectionObserver.observe(title);
    });
    
    // Trophy animation
    const trophyIcon = document.querySelector('.trophy-icon');
    if (trophyIcon) {
        const trophyObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: trophyIcon,
                    translateY: [-50, 0],
                    opacity: [0, 1],
                    scale: [0.5, 1],
                    rotate: {value: 360, duration: 1200},
                    easing: 'easeOutElastic(1, .5)',
                    duration: 1500
                });
                trophyObserver.unobserve(trophyIcon);
            }
        }, { threshold: 0.1 });
        
        trophyIcon.style.opacity = '0';
        trophyObserver.observe(trophyIcon);
    }
    
    // Gallery animation
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
        const galleryObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: galleryItems,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(150)
                });
                galleryObserver.unobserve(galleryContainer);
            }
        }, { threshold: 0.1 });
        
        galleryItems.forEach(item => {
            item.style.opacity = '0';
        });
        galleryObserver.observe(galleryContainer);
    }
    
    // Sponsors animation
    const sponsorsContainer = document.querySelector('.sponsors-container');
    if (sponsorsContainer) {
        const sponsorItems = sponsorsContainer.querySelectorAll('.sponsor-item');
        const sponsorsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: sponsorItems,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(100)
                });
                sponsorsObserver.unobserve(sponsorsContainer);
            }
        }, { threshold: 0.1 });
        
        sponsorItems.forEach(item => {
            item.style.opacity = '0';
        });
        sponsorsObserver.observe(sponsorsContainer);
    }
    
    // Contact cards animation
    const contactCards = document.querySelectorAll('.contact-info');
    if (contactCards.length > 0) {
        const contactObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: contactCards,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(200)
                });
                contactObserver.unobserve(entries[0].target.parentElement);
            }
        }, { threshold: 0.1 });
        
        contactCards.forEach(card => {
            card.style.opacity = '0';
        });
        contactObserver.observe(contactCards[0].parentElement);
    }

    // Gallery image modal
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const modalId = 'imageModal';
                let modal = document.getElementById(modalId);
                
                if (!modal) {
                    // Create modal if it doesn't exist
                    modal = document.createElement('div');
                    modal.id = modalId;
                    modal.className = 'modal fade';
                    modal.tabIndex = '-1';
                    modal.setAttribute('aria-hidden', 'true');
                    modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <img src="" class="img-fluid" id="modalImage">
                                </div>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                }
                
                // Set image source
                document.getElementById('modalImage').src = this.src;
                
                // Show modal
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            });
        });
    }
});
