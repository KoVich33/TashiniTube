    // Массив с данными видео
const videoData = [
{
    id: 1,
    title: "🥶БАГ НА ОПЫТ! КАРТА ДЛЯ ОПЫТА В ФОРНАЙТ, СЕЗОН OG (ОКОЛО 500.000 XP)",
    channel: "",
    time: "5 нояб. 2023 г.",
    duration: "04:08",
    category: ["Fortnite", "опыт", "баг"],
    thumbnail: "res/img/pw_vid001.jpg",
    url: "pages/🥶БАГ НА ОПЫТ! КАРТА ДЛЯ ОПЫТА В ФОРНАЙТ, СЕЗОН OG (ОКОЛО 500.000 XP).html"
},
{
    id: 2,
    title: "10 минут колонии строгого режима",
    channel: "TashiniOMG",
    time: "8 мар. 2024 г.",
    duration: "10:07",
    category: ["Minecraft", "коллабарация", "летсплей"],
    thumbnail: "res/img/pw_vid002.jpg",
    url: "pages/10 минут колонии строгого режима"
},
{
    id: 3,
    title: "🔥МЫ ТОЛЬКО СБЕЖАЛИ ИЗ ТЮРМЫ, И УЖЕ ВЫЖИВАЕМ В ПИТЕРЕ😱😱😱",
    channel: "TashiniOMG",
    time: "9 мар. 2024 г.",
    duration: "18:24",
    category: ["Minecraft", "коллабарация", "летсплей"],
    thumbnail: "res/img/pw_vid003.jpg",
    url: "pages/🔥МЫ ТОЛЬКО СБЕЖАЛИ ИЗ ТЮРМЫ, И УЖЕ ВЫЖИВАЕМ В ПИТЕРЕ😱😱😱"
},
{
    id: 4,
    title: "🔥😱КАК СДЕЛАТЬ МЕДНОГО БЫКА В МАЙНЕ!😱🔥 (смертельный файл)",
    channel: "TashiniOMG",
    time: "10 мар. 2024 г.",
    duration: "08:11",
    category: ["Minecraft", "постройка", "смертельный файл"],
    thumbnail: "res/img/pw_vid004.jpg",
    url: "pages/🔥😱КАК СДЕЛАТЬ МЕДНОГО БЫКА В МАЙНЕ!😱🔥 (смертельный файл)"
},
{
    id: 5,
    title: "🔥😱КАК СТРОИТЬ ЭЛЕКТРИЧЕСКИЙ СТУЛ В МАЙНКРАФТЕ🔥😱! (смертельный файл)",
    channel: "TashiniOMG",
    time: "11 мар. 2024 г.",
    duration: "08:36",
    category: ["Minecraft", "постройка", "смертельный файл"],
    thumbnail: "res/img/pw_vid005.jpg",
    url: "pages/🔥😱КАК СТРОИТЬ ЭЛЕКТРИЧЕСКИЙ СТУЛ В МАЙНКРАФТЕ🔥😱! (смертельный файл)"
},
{
    id: 6,
    title: "🔥😱КАК ПОСТРОИТЬ ГИЛЬОТИНУ В МАЙНКРАФТЕ?! 🔥😱",
    channel: "TashiniOMG",
    time: "15 мар. 2024 г.",
    duration: "04:46",
    category: ["Minecraft", "постройка", "смертельный файл"],
    thumbnail: "res/img/pw_vid006.jpg",
    url: "pages/🔥😱КАК ПОСТРОИТЬ ГИЛЬОТИНУ В МАЙНКРАФТЕ! 🔥😱"
},
{
    id: 7,
    title: "💀🔥СМОТРИМ ДУБЛИКАТЫ С УМСТВЕННЫМИ ОТКЛОНЕНИЯМИ🔥💀",
    channel: "TashiniOMG",
    time: "24 мар. 2024 г.",
    duration: "27:05",
    category: ["Garry's mod", "коллабарация", "летсплей", "gmod"],
    thumbnail: "res/img/pw_vid007.jpg",
    url: "https://youtu.be/hmDGyLxAAYo?si=Ch46Ivg7vcQa-x48"
},
{
    id: 8,
    title: "САМЫЕ ПОПУЛЯРНЫЕ РЕЖИМЫ В ROBLOX",
    channel: "TashiniOMG",
    time: "29 мар. 2024 г.",
    duration: "03:03",
    category: ["Roblox", "летсплей", "пародия"],
    thumbnail: "res/img/pw_vid008.jpg",
    url: "pages/САМЫЕ ПОПУЛЯРНЫЕ РЕЖИМЫ В ROBLOX"
},
{
    id: 9,
    title: "нажав на это видео, ты узнаешь о себе всё что нужно...",
    channel: "TashiniOMG",
    time: "4 июн. 2024 г.",
    duration: "07:39",
    category: ["Garry's mod", "skibidi toilet", "скибиди туалет", "gmod"],
    thumbnail: "res/img/pw_vid009.jpg",
    url: "pages/нажав на это видео, ты узнаешь о себе всё что нужно"
}

/*
{
    id: 6,
    title: "Создание REST API с Node.js и Express - Полный курс",
    channel: "TashiniOMG",
    time: "3 недели назад",
    duration: "25:47",
    category: ["Node.js", "Backend", "Обучение"],
    thumbnail: "",
    url: "https://google.com/"
}
*/
    ];

let currentFilter = "Все";
    let currentSearchQuery = "";
    let currentVideos = [...videoData];

    // Функция сортировки видео по ID (от большего к меньшему)
    function sortVideosByDescendingId(videos) {
        return [...videos].sort((a, b) => b.id - a.id);
    }

    // Функция для рендеринга видео
    function renderVideos(videos) {
        const videoGrid = document.querySelector('.video-grid');
        if (!videoGrid) return;
        
        videoGrid.innerHTML = '';
        
        if (videos.length === 0) {
            videoGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 48px; color: #666; margin-bottom: 20px;"></i>
                    <h3 style="color: #aaa; margin-bottom: 10px;">Видео не найдены</h3>
                    <p style="color: #666;">Попробуйте изменить поисковый запрос или выберите другую категорию</p>
                </div>
            `;
            return;
        }
        
        // Сортируем видео по убыванию ID перед отображением
        const sortedVideos = sortVideosByDescendingId(videos);
        
        sortedVideos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.dataset.id = video.id;
            videoCard.dataset.category = video.category.join(',');
            
            videoCard.innerHTML = `
                <div class="thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='https://via.placeholder.com/300x170/272727/fff?text=Thumbnail'">
                    <span class="video-duration">${video.duration}</span>
                    <div class="video-id-badge" style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                    </div>
                </div>
                <div class="video-info">
                    <div class="channel-icon">${video.channel.charAt(0)}</div>
                    <div class="video-details">
                        <h3 class="video-title">${video.title}</h3>
                        <p class="channel-name">${video.channel}</p>
                        <p class="video-stats">${video.time}</p>
                        <div class="video-categories" style="margin-top: 5px; font-size: 12px; color: #888;">
                            ${video.category.map(cat => `<span class="category-tag">${cat}</span>`).join(' ')}
                        </div>
                    </div>
                </div>
            `;
            
            videoGrid.appendChild(videoCard);
        });
        
        // Добавляем обработчики событий для карточек видео
        document.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', function() {
                const videoId = this.dataset.id;
                const video = videoData.find(v => v.id == videoId);
                if (video) {
                    window.location.href = video.url;
                }
            });
        });
    }

    // Функция для фильтрации видео
    function filterVideos() {
        let filteredVideos = [...videoData];
        
        // Применяем поисковый запрос
        if (currentSearchQuery.trim()) {
            const query = currentSearchQuery.toLowerCase().trim();
            filteredVideos = filteredVideos.filter(video => {
                return video.title.toLowerCase().includes(query) ||
                       video.channel.toLowerCase().includes(query) ||
                       video.category.some(cat => cat.toLowerCase().includes(query));
            });
        }
        
        // Применяем фильтр категории
        if (currentFilter !== "Все") {
            filteredVideos = filteredVideos.filter(video => 
                video.category.some(cat => cat === currentFilter)
            );
        }
        
        currentVideos = filteredVideos;
        renderVideos(filteredVideos);
        
        // Обновляем счетчик результатов
        updateResultsCounter(filteredVideos.length);
    }

    // Функция для обновления счетчика результатов
    function updateResultsCounter(count) {
        const resultsCounter = document.getElementById('results-counter');
        if (!resultsCounter) {
            // Создаем счетчик, если его нет
            const filterButtons = document.querySelector('.filter-buttons');
            if (filterButtons) {
                const counter = document.createElement('div');
                counter.id = 'results-counter';
                counter.style.cssText = `
                    color: #aaa;
                    font-size: 14px;
                    margin-left: auto;
                    padding-right: 10px;
                    display: none;
                `;
                filterButtons.parentNode.insertBefore(counter, filterButtons);
            }
        }
        
        const counter = document.getElementById('results-counter');
        if (counter) {
            if (currentSearchQuery.trim() || currentFilter !== "Все") {
                counter.textContent = `Найдено видео: ${count}`;
                counter.style.display = 'block';
            } else {
                counter.style.display = 'none';
            }
        }
    }

    // Функция для сброса фильтров
    function resetFilters() {
        currentFilter = "Все";
        currentSearchQuery = "";
        const searchInput = document.querySelector('.search-input');
        if (searchInput) searchInput.value = "";
        
        // Сбрасываем активные кнопки фильтров
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === "Все") {
                btn.classList.add('active');
            }
        });
        
        // Сбрасываем кнопку очистки поиска
        const clearBtn = document.querySelector('.clear-search');
        if (clearBtn) {
            clearBtn.style.display = 'none';
        }
        
        filterVideos();
    }

    // Функция для отложенного поиска (debounce)
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        // Инициализируем видео (уже отсортированы по ID)
        renderVideos(videoData);
        
        // Обработчики для кнопок фильтров
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.textContent;
                filterVideos();
            });
        });
        
        // Обработчики для боковой панели
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                if (!this.classList.contains('active')) {
                    sidebarItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Если выбран пункт "Главная", сбрасываем фильтры
                    if (this.querySelector('span')?.textContent === "Главная") {
                        resetFilters();
                    }
                }
            });
        });
        
        // Элементы поиска
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        // Функция для обработки поиска
        function performSearch() {
            currentSearchQuery = searchInput.value;
            filterVideos();
        }
        
        // Поиск по кнопке
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        
        // Поиск по Enter
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            // Реальный поиск с задержкой (300ms)
            searchInput.addEventListener('input', debounce(function() {
                if (this.value.trim()) {
                    currentSearchQuery = this.value;
                    filterVideos();
                } else if (currentSearchQuery !== "") {
                    // Если очистили поле поиска
                    currentSearchQuery = "";
                    filterVideos();
                }
            }, 300));
        }
        
        // Добавляем кнопку очистки поиска
        if (searchInput) {
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer) {
                const clearBtn = document.createElement('button');
                clearBtn.className = 'clear-search';
                clearBtn.innerHTML = '<i class="fas fa-times"></i>';
                clearBtn.style.cssText = `
                    position: absolute;
                    right: 70px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #aaa;
                    font-size: 16px;
                    cursor: pointer;
                    padding: 0 10px;
                    display: none;
                    z-index: 2;
                `;
                clearBtn.addEventListener('click', function() {
                    searchInput.value = '';
                    currentSearchQuery = '';
                    filterVideos();
                    this.style.display = 'none';
                });
                searchContainer.appendChild(clearBtn);
                
                // Показывать/скрывать кнопку очистки
                searchInput.addEventListener('input', function() {
                    clearBtn.style.display = this.value ? 'block' : 'none';
                });
            }
        }
        
        // Кнопка сброса фильтров
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Сбросить фильтры';
        resetBtn.id = 'reset-filters';
        resetBtn.style.cssText = `
            background: #272727;
            color: #f1f1f1;
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 14px;
            cursor: pointer;
            margin-left: 10px;
            display: none;
        `;
        resetBtn.addEventListener('click', resetFilters);
        
        const filterButtonsContainer = document.querySelector('.filter-buttons');
        if (filterButtonsContainer) {
            filterButtonsContainer.appendChild(resetBtn);
        }
        
        // Показывать кнопку сброса при активных фильтрах
        function updateResetButton() {
            const resetBtn = document.getElementById('reset-filters');
            if (resetBtn) {
                if (currentSearchQuery.trim() || currentFilter !== "Все") {
                    resetBtn.style.display = 'block';
                } else {
                    resetBtn.style.display = 'none';
                }
            }
        }
        
        // Модифицируем filterVideos для обновления кнопки сброса
        const originalFilterVideos = filterVideos;
        filterVideos = function() {
            originalFilterVideos();
            updateResetButton();
        };
        
        // Стили для тегов категорий
        const style = document.createElement('style');
        style.textContent = `
            .category-tag {
                background: #272727;
                padding: 2px 6px;
                border-radius: 4px;
                margin-right: 4px;
                display: inline-block;
            }
            
            .video-id-badge {
                position: absolute;
                top: 8px;
                left: 8px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
        
        // Инициализируем сортировку по ID
        filterVideos();
    });

    // Функция для добавления нового видео (для расширения функционала)
    function addNewVideo(title, channel, views, time, duration, category, thumbnail) {
        // Находим максимальный ID и увеличиваем его на 1
        const maxId = videoData.reduce((max, video) => Math.max(max, video.id), 0);
        const newVideoId = maxId + 1;
        
        const newVideo = {
            id: newVideoId,
            title,
            channel,
            views,
            time,
            duration,
            category: Array.isArray(category) ? category : [category],
            thumbnail
        };
        
        // Добавляем видео в начало массива, чтобы оно было первым после сортировки
        videoData.unshift(newVideo);
        filterVideos(); // Перерисовываем с учетом нового видео
        return newVideoId;
    }

    // Экспортируем функции для использования в консоли (для тестирования)
    window.videoSearch = {
        filterVideos,
        resetFilters,
        addNewVideo,
        sortVideosByDescendingId,
        getCurrentVideos: () => currentVideos,
        getVideoData: () => videoData,
        // Функция для изменения порядка видео
        reverseVideoOrder: function() {
            videoData.reverse();
            filterVideos();
        }
    };