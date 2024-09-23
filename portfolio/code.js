// Функция для скрытия и отображения дополнительной информации
document.getElementById('toggleInfo').addEventListener('click', function() {
    const extraInfo = document.getElementById('extraInfo');
    if (extraInfo.style.display === 'none') {
        extraInfo.style.display = 'block';
    } else {
        extraInfo.style.display = 'none';
    }
});

const colors = ['darkgrey', 'lightblue', 'lightgreen', 'salmon']; // Массив цветов
let currentIndex = 0; // Индекс текущего цвета

// Сохранение изначальных цветов в localStorage
const initialColors = {
    body: 'rgb(217, 161, 217)',
    header: '#b76be1',
    footer: '#b76be1'
};

// Сохраняем цвета в localStorage
localStorage.setItem('colors', JSON.stringify(initialColors));

// Устанавливаем изначальные цвета при загрузке страницы
document.body.style.backgroundColor = localStorage.body;
document.querySelector('header').style.backgroundColor = localStorage.header;
document.querySelector('footer').style.backgroundColor = localStorage.footer;

document.getElementById('interestingButton').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % colors.length; // Увеличиваем индекс и сбрасываем его при достижении конца массива
    const newColor = colors[currentIndex]; // Получаем новый цвет из массива
    document.body.style.backgroundColor = newColor; 
    document.querySelector('header').style.backgroundColor = newColor; 
    document.querySelector('footer').style.backgroundColor = newColor; 
});

// Функция для возврата к изначальным цветам
function revertToInitialColors() {
    const colors = JSON.parse(localStorage.getItem('colors')); // Получаем цвета из localStorage
    document.body.style.backgroundColor = colors.body; // Возвращаем цвет body
    document.querySelector('header').style.backgroundColor = colors.header; // Возвращаем цвет header
    document.querySelector('footer').style.backgroundColor = colors.footer; // Возвращаем цвет footer
}

// Обработчик для кнопки возврата к изначальным цветам
document.getElementById('revertButton').addEventListener('click', revertToInitialColors);
currentIndex = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

document.getElementById('next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
});

document.getElementById('prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

function updateSlider() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

const reposContainer = document.getElementById('repos');
const username = 'Ivan-Lapin'; 

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.className = 'repo';
            repoDiv.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${repo.description || 'Нет описания'}</p>
                <a href="${repo.html_url}" target="_blank">Перейти к репозиторию</a>
            `;
            reposContainer.appendChild(repoDiv);
        });
    })
    .catch(error => {
        console.error('Ошибка при получении репозиториев:', error);
    });