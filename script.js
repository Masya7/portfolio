// Навигация - добавление класса при прокрутке
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Плавная прокрутка к секциям
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

// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Анимация счетчиков
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

// Intersection Observer для анимаций при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Анимация счетчиков
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
            
            // Анимация прогресс-баров навыков
            if (entry.target.classList.contains('skill-progress')) {
                const skill = entry.target.getAttribute('data-skill');
                entry.target.style.width = skill + '%';
                observer.unobserve(entry.target);
            }
            
            // Общая анимация появления
            if (entry.target.classList.contains('animate-on-scroll')) {
                entry.target.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Наблюдение за элементами
document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
document.querySelectorAll('.skill-progress').forEach(el => observer.observe(el));
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Анимация timeline при прокрутке
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// Анимация education items
const educationItems = document.querySelectorAll('.education-item');
educationItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    educationObserver.observe(item);
});

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// Динамические частицы в фоне
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.width = Math.random() * 10 + 5 + 'px';
    particle.style.height = particle.style.width;
    
    document.querySelector('.particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
};

// Создание частиц каждые 2 секунды
setInterval(createParticle, 2000);

// Форма контактов
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Получение данных формы
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Форма отправлена:', data);
        
        // Показать уведомление об успешной отправке
        showNotification('Сообщение успешно отправлено!');
        
        // Очистка формы
        contactForm.reset();
    });
}

// Функция показа уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Функция скачивания резюме
async function downloadResume() {
    try {
        // Загружаем HTML файл резюме
        const response = await fetch('./resume.html');
        const htmlContent = await response.text();
        
        // Создаем Blob с HTML содержимым и MIME типом для Word
        const blob = new Blob([htmlContent], { 
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        });
        
        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Резюме_Микоши_Максим.doc';
        
        // Добавляем ссылку в DOM, кликаем и удаляем
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        showNotification('Резюме успешно загружено!');
    } catch (error) {
        console.error('Ошибка при загрузке резюме:', error);
        showNotification('Ошибка при загрузке резюме. Попробуйте позже.');
    }
}

// Кнопка скачивания резюме
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadResume();
    });
}

// Добавление стилей для уведомлений
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        z-index: 1001;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .floating-particle {
        position: absolute;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        border-radius: 50%;
        bottom: -20px;
        animation: floatUp linear infinite;
    }
    
    @keyframes floatUp {
        to {
            bottom: 100%;
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: fixed;
        flex-direction: column;
        background: white;
        top: 70px;
        right: 0;
        width: 250px;
        padding: 2rem;
        box-shadow: var(--shadow-xl);
        border-radius: 0 0 0 12px;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Активная навигация при прокрутке
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Инициализация анимаций при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Добавление классов для анимации при загрузке
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3, .animate-scale-in');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
    });
    
    // Запуск анимации skill icons
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, index * 100);
    });
}); 