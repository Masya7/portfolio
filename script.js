// Функция для получения московского времени
function getMoscowTime() {
    const now = new Date();
    const moscowTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
    return moscowTime;
}

// Функция расчета стажа работы
function calculateWorkExperience(startDate) {
    const start = new Date(startDate);
    const now = getMoscowTime();
    
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    if (years > 0 && months > 0) {
        return `${years} ${getYearWord(years)} ${months} ${getMonthWord(months)}`;
    } else if (years > 0) {
        return `${years} ${getYearWord(years)}`;
    } else {
        return `${months} ${getMonthWord(months)}`;
    }
}

// Функция для правильного склонения слов
function getYearWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'лет';
    }
    if (lastDigit === 1) {
        return 'год';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'года';
    }
    return 'лет';
}

function getMonthWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'месяцев';
    }
    if (lastDigit === 1) {
        return 'месяц';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'месяца';
    }
    return 'месяцев';
}

// Обновление стажа работы при загрузке страницы
function updateWorkExperience() {
    // Основная работа - с ноября 2023
    const mainJobElement = document.querySelector('.experience-duration-main');
    if (mainJobElement) {
        const experience = calculateWorkExperience('2023-11-01');
        mainJobElement.textContent = experience;
    }
    
    // Фриланс - с августа 2022
    const freelanceElement = document.querySelector('.experience-duration-freelance');
    if (freelanceElement) {
        const experience = calculateWorkExperience('2022-08-01');
        freelanceElement.textContent = experience;
    }
    
    // Общий IT стаж
    const totalExperienceElement = document.querySelector('.total-experience');
    if (totalExperienceElement) {
        const experience = calculateWorkExperience('2022-08-01');
        totalExperienceElement.textContent = experience;
    }
}

// Инициализация EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Замените на ваш публичный ключ EmailJS
})();

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

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

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
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.width = Math.random() * 10 + 5 + 'px';
    particle.style.height = particle.style.width;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
};

// Создание частиц каждые 2 секунды
setInterval(createParticle, 2000);

// Форма контактов с EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Показать загрузку
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        try {
            // Отправка через EmailJS
            const result = await emailjs.sendForm(
                'YOUR_SERVICE_ID', // Замените на ваш Service ID
                'YOUR_TEMPLATE_ID', // Замените на ваш Template ID
                contactForm
            );
            
            console.log('Сообщение отправлено:', result);
            showNotification('Сообщение успешно отправлено! Я отвечу в ближайшее время.', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showNotification('Произошла ошибка при отправке. Попробуйте написать напрямую в Telegram.', 'error');
        } finally {
            // Восстановить кнопку
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Функция показа уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
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
        
        showNotification('Резюме успешно загружено!', 'success');
    } catch (error) {
        console.error('Ошибка при загрузке резюме:', error);
        showNotification('Ошибка при загрузке резюме. Попробуйте позже.', 'error');
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

// Фильтрация проектов
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Обновить активную кнопку
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    // Показать/скрыть проекты
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.9)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Добавление стилей для уведомлений и других элементов
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
        max-width: 350px;
    }
    
    .notification.error {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .floating-particle {
        position: absolute;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        border-radius: 50%;
        bottom: -20px;
        animation: floatUp linear infinite;
        pointer-events: none;
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
    
    .experience-duration {
        color: var(--primary-color);
        font-weight: 600;
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Обновить стаж работы
    updateWorkExperience();
    
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
    
    // Инициализация фильтров проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;
            filterProjects(category);
        });
    });
}); 