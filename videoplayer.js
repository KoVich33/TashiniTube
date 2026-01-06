        // Элементы плеера
        const videoPlayer = document.getElementById('videoPlayer');
        const videoWrapper = document.getElementById('videoWrapper');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const progressContainer = document.getElementById('progressContainer');
        const currentTimeEl = document.getElementById('currentTime');
        const durationEl = document.getElementById('duration');
        const volumeBtn = document.getElementById('volumeBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumePercent = document.getElementById('volumePercent');
        const speedBtn = document.getElementById('speedBtn');
        const speedMenu = document.getElementById('speedMenu');
        const speedOptions = document.querySelectorAll('.speed-option');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const skipBackBtn = document.getElementById('skipBackBtn');
        const skipForwardBtn = document.getElementById('skipForwardBtn');
        const fileInput = document.getElementById('fileInput');
        const sampleButtons = document.querySelectorAll('.sample-btn');
        const videoTitle = document.getElementById('videoTitle');
        const viewCount = document.getElementById('viewCount');
        
        // Состояние плеера
        let isPlaying = false;
        let isMuted = false;
        let lastVolume = 100;
        let currentSpeed = 1;
        let isFullscreen = false;
        let views = 0;
        let speedMenuVisible = false;
        
        // Примеры видео (ссылки на бесплатные видео с Pexels)
        const sampleVideos = {
            sample1: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
            sample2: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-a-forest-4153-large.mp4',
            sample3: 'https://assets.mixkit.co/videos/preview/mixkit-scientist-looking-through-a-microscope-4832-large.mp4'
        };
        
        const sampleTitles = {
            sample1: 'Волны в океане - Красивый пейзаж',
            sample2: 'Аэросъемка реки в лесу',
            sample3: 'Ученый смотрит в микроскоп'
        };
        
        // Инициализация
        function initPlayer() {
            // Устанавливаем начальный объем
            videoPlayer.volume = volumeSlider.value / 100;
            
            // Обработчики событий
            videoPlayer.addEventListener('loadedmetadata', updateDuration);
            videoPlayer.addEventListener('timeupdate', updateProgress);
            videoPlayer.addEventListener('play', updatePlayButton);
            videoPlayer.addEventListener('pause', updatePlayButton);
            videoPlayer.addEventListener('volumechange', updateVolumeButton);
            videoPlayer.addEventListener('click', togglePlay);
            
            // Кнопка play/pause
            playPauseBtn.addEventListener('click', togglePlay);
            
            // Прогресс бар
            progressContainer.addEventListener('click', setProgress);
            
            // Перемотка
            skipBackBtn.addEventListener('click', () => skipTime(-10));
            skipForwardBtn.addEventListener('click', () => skipTime(10));
            
            // Громкость
            volumeSlider.addEventListener('input', updateVolume);
            volumeBtn.addEventListener('click', toggleMute);
            
            // Скорость воспроизведения - ЗАКРЕПЛЕННОЕ меню
            speedBtn.addEventListener('click', toggleSpeedMenu);
            
            // Обработчики для опций скорости
            speedOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setPlaybackSpeed(parseFloat(option.dataset.speed));
                    speedOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    hideSpeedMenu();
                });
            });
            
            // Полноэкранный режим
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            
            // Загрузка файлов
            fileInput.addEventListener('change', handleFileUpload);
            
            // Примеры видео
            sampleButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const videoKey = btn.dataset.video;
                    loadSampleVideo(videoKey);
                });
            });
            
            // Закрытие меню скорости при клике вне его
            document.addEventListener('click', (e) => {
                if (speedMenuVisible && !speedMenu.contains(e.target) && !speedBtn.contains(e.target)) {
                    hideSpeedMenu();
                }
            });
            
            // Закрытие меню скорости при взаимодействии с другими элементами управления
            const controlElements = [
                playPauseBtn, skipBackBtn, skipForwardBtn, 
                volumeBtn, fullscreenBtn, progressContainer
            ];
            
            controlElements.forEach(element => {
                element.addEventListener('click', () => {
                    if (speedMenuVisible) {
                        hideSpeedMenu();
                    }
                });
            });
            
            // Загружаем первый пример по умолчанию
            loadSampleVideo('sample1');
        }
        
        // Управление меню скорости
        function toggleSpeedMenu() {
            if (speedMenuVisible) {
                hideSpeedMenu();
            } else {
                showSpeedMenu();
            }
        }
        
        function showSpeedMenu() {
            speedMenu.classList.add('show');
            speedMenuVisible = true;
            speedBtn.style.backgroundColor = 'rgba(255,255,255,0.1)';
        }
        
        function hideSpeedMenu() {
            speedMenu.classList.remove('show');
            speedMenuVisible = false;
            speedBtn.style.backgroundColor = 'transparent';
        }
        
        // Загрузка примера видео
        function loadSampleVideo(videoKey) {
            videoPlayer.src = sampleVideos[videoKey];
            videoTitle.textContent = sampleTitles[videoKey];
            
            // Сбрасываем состояние
            videoPlayer.load();
            views++;
            viewCount.textContent = `${views} просмотров`;
            
            // Закрываем меню скорости при загрузке нового видео
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
            
            // Показываем уведомление
            showNotification(`Загружено видео: "${sampleTitles[videoKey]}"`);
        }
        
        // Обработка загрузки файла
        function handleFileUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('video/')) {
                showNotification('Пожалуйста, выберите видео файл', true);
                return;
            }
            
            const url = URL.createObjectURL(file);
            videoPlayer.src = url;
            videoTitle.textContent = file.name.replace(/\.[^/.]+$/, "");
            views++;
            viewCount.textContent = `${views} просмотров`;
            
            // Закрываем меню скорости при загрузке нового видео
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
            
            showNotification(`Видео "${file.name}" загружено`);
        }
        
        // Воспроизведение/пауза
        function togglePlay() {
            if (videoPlayer.paused) {
                videoPlayer.play();
                isPlaying = true;
            } else {
                videoPlayer.pause();
                isPlaying = false;
            }
            
            // Закрываем меню скорости при воспроизведении/паузе
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
        }
        
        function updatePlayButton() {
            const icon = playPauseBtn.querySelector('i');
            if (videoPlayer.paused) {
                icon.className = 'fas fa-play';
                playPauseBtn.title = 'Воспроизвести (Space)';
            } else {
                icon.className = 'fas fa-pause';
                playPauseBtn.title = 'Пауза (Space)';
            }
        }
        
        // Обновление прогресса
        function updateProgress() {
            const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
            progressBar.style.width = `${percent}%`;
            
            currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
        }
        
        function updateDuration() {
            durationEl.textContent = formatTime(videoPlayer.duration);
        }
        
        // Установка прогресса по клику
        function setProgress(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const percent = (clickX / width);
            
            videoPlayer.currentTime = percent * videoPlayer.duration;
            
            // Закрываем меню скорости при перемотке
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
        }
        
        // Перемотка
        function skipTime(seconds) {
            videoPlayer.currentTime += seconds;
            showNotification(`${seconds > 0 ? 'Вперед' : 'Назад'} на ${Math.abs(seconds)} сек`);
            
            // Закрываем меню скорости при перемотке
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
        }
        
        // Громкость
        function updateVolume() {
            const volume = volumeSlider.value;
            videoPlayer.volume = volume / 100;
            volumePercent.textContent = `${volume}%`;
            
            // Обновляем иконку
            updateVolumeIcon(volume);
            
            // Закрываем меню скорости при изменении громкости
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
        }
        
        function toggleMute() {
            if (videoPlayer.volume === 0) {
                videoPlayer.volume = lastVolume / 100;
                volumeSlider.value = lastVolume;
            } else {
                lastVolume = volumeSlider.value;
                videoPlayer.volume = 0;
                volumeSlider.value = 0;
            }
            updateVolume();
            
            // Закрываем меню скорости при отключении звука
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
        }
        
        function updateVolumeButton() {
            updateVolumeIcon(videoPlayer.volume * 100);
        }
        
        function updateVolumeIcon(volume) {
            const icon = volumeBtn.querySelector('i');
            
            if (volume == 0) {
                icon.className = 'fas fa-volume-mute';
                volumeBtn.title = 'Включить звук (m)';
            } else if (volume < 50) {
                icon.className = 'fas fa-volume-down';
                volumeBtn.title = 'Выключить звук (m)';
            } else {
                icon.className = 'fas fa-volume-up';
                volumeBtn.title = 'Выключить звук (m)';
            }
            
            volumePercent.textContent = `${Math.round(volume)}%`;
        }
        
        // Скорость воспроизведения
        function setPlaybackSpeed(speed) {
            videoPlayer.playbackRate = speed;
            currentSpeed = speed;
            speedBtn.title = `Скорость: ${speed}x`;
            showNotification(`Скорость: ${speed}x`);
        }
        
        // Полноэкранный режим
        function toggleFullscreen() {
            if (!isFullscreen) {
                if (videoWrapper.requestFullscreen) {
                    videoWrapper.requestFullscreen();
                } else if (videoWrapper.mozRequestFullScreen) {
                    videoWrapper.mozRequestFullScreen();
                } else if (videoWrapper.webkitRequestFullscreen) {
                    videoWrapper.webkitRequestFullscreen();
                } else if (videoWrapper.msRequestFullscreen) {
                    videoWrapper.msRequestFullscreen();
                }
                videoWrapper.classList.add('fullscreen');
                isFullscreen = true;
                
                // Меняем иконку
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                fullscreenBtn.title = 'Выйти из полноэкранного режима (f)';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                videoWrapper.classList.remove('fullscreen');
                isFullscreen = false;
                
                // Меняем иконку
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                fullscreenBtn.title = 'Полноэкранный режим (f)';
            }
            
            // Закрываем меню скорости при переключении полноэкранного режима
            if (speedMenuVisible) {
                hideSpeedMenu();
            }
        }
        
        // Форматирование времени
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        // Уведомления
        function showNotification(message, isError = false) {
            // Удаляем старое уведомление
            const oldNotification = document.querySelector('.notification');
            if (oldNotification) {
                oldNotification.remove();
            }
            
            // Создаем новое уведомление
            const notification = document.createElement('div');
            notification.className = `notification ${isError ? 'error' : ''}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background-color: ${isError ? '#cc0000' : 'rgba(28,28,28,0.9)'};
                color: white;
                padding: 12px 24px;
                border-radius: 4px;
                z-index: 1000;
                font-size: 14px;
                animation: fadeInOut 3s ease-in-out;
            `;
            
            // Добавляем стили для анимации
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(notification);
            
            // Удаляем уведомление после анимации
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        }
        
        // Горячие клавиши
        document.addEventListener('keydown', (e) => {
            // Пропускаем, если фокус на поле ввода
            if (e.target.tagName === 'INPUT') return;
            
            switch(e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'm':
                    e.preventDefault();
                    toggleMute();
                    break;
                case 'f':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'arrowleft':
                case 'j':
                    e.preventDefault();
                    skipTime(-10);
                    break;
                case 'arrowright':
                case 'l':
                    e.preventDefault();
                    skipTime(10);
                    break;
                case '>':
                case '.':
                    e.preventDefault();
                    setPlaybackSpeed(Math.min(currentSpeed + 0.25, 4));
                    break;
                case '<':
                case ',':
                    e.preventDefault();
                    setPlaybackSpeed(Math.max(currentSpeed - 0.25, 0.25));
                    break;
                case '0':
                case 'home':
                    e.preventDefault();
                    videoPlayer.currentTime = 0;
                    break;
                case 'end':
                    e.preventDefault();
                    videoPlayer.currentTime = videoPlayer.duration;
                    break;
                case 'escape':
                    if (speedMenuVisible) {
                        e.preventDefault();
                        hideSpeedMenu();
                    }
                    break;
            }
        });
        
        // Обработка выхода из полноэкранного режима
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                videoWrapper.classList.remove('fullscreen');
                isFullscreen = false;
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                fullscreenBtn.title = 'Полноэкранный режим (f)';
            }
        });
        
        // Инициализация плеера при загрузке страницы
        window.addEventListener('DOMContentLoaded', initPlayer);