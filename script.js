/* --- 1. DATA CONFIGURATION --- */
const cars = [
    {
        team: "Red Bull Racing",
        model: "RB19 (2023)",
        img: "images/rb.png",
        drivers: [
            { name: "Max Verstappen", number: "1", img: "https://placehold.co/100x100?text=MV" },
            { name: "Sergio Perez", number: "11", img: "https://placehold.co/100x100?text=SP" }
        ]
    },
    {
        team: "Scuderia Ferrari",
        model: "SF-23 (2023)",
        img: "images/ferrari.png",
        drivers: [
            { name: "Charles Leclerc", number: "16", img: "https://placehold.co/100x100?text=CL" },
            { name: "Carlos Sainz", number: "55", img: "https://placehold.co/100x100?text=CS" }
        ]
    },
    {
        team: "Mercedes-AMG Petronas",
        model: "W14 (2023)",
        img: "images/amg.png",
        drivers: [
            { name: "Lewis Hamilton", number: "44", img: "https://placehold.co/100x100?text=LH" },
            { name: "George Russell", number: "63", img: "https://placehold.co/100x100?text=GR" }
        ]
    },
    {
        team: "McLaren F1 Team",
        model: "MCL60 (2023)",
        img: "images/mclaren.png",
        drivers: [
            { name: "Lando Norris", number: "4", img: "https://placehold.co/100x100?text=LN" },
            { name: "Oscar Piastri", number: "81", img: "https://placehold.co/100x100?text=OP" }
        ]
    }
];

//НОВЫЕ ДАННЫЕ ДЛЯ ТАБЛИЦЫ ЛИДЕРОВ
const INITIAL_DRIVERS = [
    { id: 'nor', name: 'Lando Norris', team: 'McLaren', points: 408 },
    { id: 'ver', name: 'Max Verstappen', team: 'Red Bull', points: 396 },
    { id: 'pia', name: 'Oscar Piastri', team: 'McLaren', points: 392 },
    { id: 'lec', name: 'Charles Leclerc', team: 'Ferrari', points: 350 },
    { id: 'sai', name: 'Carlos Sainz', team: 'Williams', points: 280 },
    { id: 'ham', name: 'Lewis Hamilton', team: 'Ferrari', points: 220 },
    { id: 'rus', name: 'George Russell', team: 'Mercedes', points: 200 },
    { id: 'alo', name: 'Fernando Alonso', team: 'Aston Martin', points: 150 },
    { id: 'gas', name: 'Pierre Gasly', team: 'Alpine', points: 80 },
    { id: 'alb', name: 'Alex Albon', team: 'Williams', points: 50 }
];

const SCHEDULE = [
    // Вы можете изменить даты на реальные предстоящие гонки
    { name: "Qatar Grand Prix", date: "2025-11-30T17:00:00Z", location: "Lusail Circuit" },
    { name: "Abu Dhabi Grand Prix", date: "2025-12-07T13:00:00Z", location: "Yas Marina Circuit" }
];

// --- 2. CAR SELECTOR LOGIC (SMOOTH TRANSITION) ---
let currentIndex = 0;
const domRefs = {
    image: document.getElementById('carImage'),
    team: document.getElementById('teamName'),
    model: document.getElementById('carModel'),
    display: document.getElementById('carDisplay'),
    drivers: document.getElementById('driversContainer')
};

function updateContent(index) {
    // 1. Fade Out
    domRefs.display.style.opacity = '0';
    domRefs.drivers.style.opacity = '0';
    // Настраиваем CSS transition через JS на случай, если его нет в CSS
    domRefs.display.style.transition = 'opacity 0.4s ease-in-out';
    domRefs.drivers.style.transition = 'opacity 0.4s ease-in-out';

    setTimeout(() => {
        const data = cars[index];

        // 2. Update Data
        domRefs.image.src = data.img;
        domRefs.image.onerror = function() { this.src = 'https://placehold.co/800x400?text=Image+Not+Found'; };
        
        domRefs.team.innerText = data.team;
        domRefs.model.innerText = data.model;

        domRefs.drivers.innerHTML = data.drivers.map(driver => `
            <div class="driver-card">
                <img src="${driver.img}" class="driver-img" alt="${driver.name}">
                <div class="driver-info">
                    <h4>${driver.name}</h4>
                    <p>Driver #${driver.number}</p>
                </div>
            </div>
        `).join('');

        // 3. Fade In
        domRefs.display.style.opacity = '1';
        domRefs.drivers.style.opacity = '1';
    }, 400);
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cars.length;
    updateContent(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cars.length) % cars.length;
    updateContent(currentIndex);
});

// Инициализация
updateContent(currentIndex);


// --- 3. DARK MODE LOGIC ---
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateButtonText(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText(newTheme);
});

function updateButtonText(theme) {
    themeToggle.innerText = theme === 'light' ? '🌙 Dark' : '☀️ Light';
}


// --- 4. ANIMATIONS (Scroll) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-section');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.hidden-section').forEach((el) => observer.observe(el));

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-title').forEach(h2 => {
    titleObserver.observe(h2);
});


// --- 5. RESPONSIVE NAV ---
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('mainNav');

mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

function closeMenu() {
    if (window.innerWidth <= 768) {
        nav.classList.remove('nav-active');
    }
}


// --- 6. STANDINGS & COUNTDOWN LOGIC ---

// Рендеринг таблицы лидеров
function renderStandings() {
    const tbody = document.getElementById('standings-body');
    tbody.innerHTML = '';

    // Сортировка по очкам (от большего к меньшему)
    const sortedDrivers = [...INITIAL_DRIVERS].sort((a, b) => b.points - a.points);
    const leaderPoints = sortedDrivers[0].points;

    sortedDrivers.forEach((driver, index) => {
        const tr = document.createElement('tr');
        
        // Позиция
        const posTd = document.createElement('td');
        posTd.textContent = index + 1;
        
        // Имя
        const driverTd = document.createElement('td');
        driverTd.innerHTML = `<strong>${driver.name}</strong>`;
        
        // Команда
        const teamTd = document.createElement('td');
        teamTd.textContent = driver.team;
        teamTd.style.color = 'var(--text-secondary)';
        
        // Очки и отрыв
        const ptsTd = document.createElement('td');
        ptsTd.classList.add('pts-cell');
        
        if (index === 0) {
            ptsTd.innerHTML = `<span class="badge badge-leader">LEADER</span> ${driver.points}`;
        } else {
            const gap = leaderPoints - driver.points;
            ptsTd.innerHTML = `<span style="font-size:0.8rem; color:#888; margin-right:5px;">-${gap}</span> ${driver.points}`;
        }

        tr.appendChild(posTd);
        tr.appendChild(driverTd);
        tr.appendChild(teamTd);
        tr.appendChild(ptsTd);
        tbody.appendChild(tr);
    });
}

function startTimer() {
    const now = new Date().getTime();

    const nextRace = SCHEDULE.find(race => new Date(race.date).getTime() > now);

    if (nextRace) {
        document.getElementById('race-name').textContent = nextRace.name;
        document.getElementById('race-circuit').textContent = nextRace.location;
        document.getElementById('race-status').textContent = "Upcoming";

        const updateCountdown = () => {
            const currentTime = new Date().getTime();
            const raceTime = new Date(nextRace.date).getTime();
            const distance = raceTime - currentTime;

            if (distance < 0) {
                document.getElementById('race-status').textContent = "Race Started / Finished";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days < 10 ? '0' + days : days;
            document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('mins').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('secs').textContent = seconds < 10 ? '0' + seconds : seconds;
        };

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Запуск сразу
    } else {
        document.getElementById('race-name').textContent = "Season Completed";
        document.getElementById('race-circuit').textContent = "See you next year!";
        document.getElementById('countdown-ui').style.display = 'none';
    }
}

// Запуск при загрузке
(function init() {
    renderStandings();
    startTimer();
})();

// --- 7. FEEDBACK FORM ANIMATION ---
const btn = document.getElementById('submit-btn');
const btnText = btn.querySelector('.btn-text');

btn.addEventListener('click', function(e) {
    if(this.checkValidity && !document.getElementById('feedbackForm').checkValidity()) return;
    
    e.preventDefault();
    if(this.classList.contains('loading') || this.classList.contains('success')) return;

    this.classList.add('loading');
    btnText.textContent = "Sending...";
    
    setTimeout(() => {
        this.classList.remove('loading');
        this.classList.add('success');
        btnText.textContent = "Confirmed";
        alert('Feedback sent successfully!');
        
        setTimeout(() => {
            this.classList.remove('success');
            btnText.textContent = "Submit Feedback";
            document.getElementById('feedbackForm').reset();
        }, 3000);
    }, 2000);
});
// --- F1 PRELOADER ---
document.addEventListener('DOMContentLoaded', () => {
    const LIGHT_DURATION = 400;
    const LIGHT_COUNT = 5;
    const CAR_DRIVE_DURATION = 1500;
    const PRELOADER_FADE_DURATION = 800;

    const preloader = document.getElementById('f1-preloader');
    const lights = [];
    for (let i = 1; i <= LIGHT_COUNT; i++) {
        lights.push(document.getElementById(`light-${i}`));
    }
    const carTrack = document.querySelector('.car-track');

    function animateLightsOn(index) {
        if (index >= LIGHT_COUNT) {
            setTimeout(animateLightsOff, LIGHT_DURATION);
            return;
        }
        lights[index].classList.add('active');
        setTimeout(() => animateLightsOn(index + 1), LIGHT_DURATION);
    }

    function animateLightsOff() {
        lights.forEach(light => {
            light.classList.remove('active');
            light.classList.add('fade-out');
        });
        setTimeout(animateCarDrive, 200);
    }

    function animateCarDrive() {
        carTrack.classList.add('driving');
        setTimeout(hidePreloader, CAR_DRIVE_DURATION + 100);
    }

    function hidePreloader() {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), PRELOADER_FADE_DURATION);
    }

    window.addEventListener('load', () => {
        setTimeout(() => animateLightsOn(0), 500);
    });

    if (document.readyState === 'complete') {
        setTimeout(() => animateLightsOn(0), 500);
    }
});
