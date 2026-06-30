document.addEventListener('DOMContentLoaded', async function () {
    await loadSharedHeader();
    loadAssignments();
    setActiveNavLink();
    loadWeather();
    });

    function loadSharedHeader() {
    var placeForHeader = document.getElementById('header-placeholder');
    if (!placeForHeader) {
        return Promise.resolve();
    }

    return fetch('header.html')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Header load failed');
            }
            return response.text();
        })
        .then(function (html) {
            placeForHeader.innerHTML = html;
        });
    }
    
    function loadAssignments() {
    const container = document.getElementById('assignments');
    if (!container) return;

    fetch('/api/assignmentsget')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            container.innerHTML = '';
            data.forEach(function (assignment) {
                const card = document.createElement('div');
                card.className = 'assignment';
                card.innerHTML = `
                    <p><strong>Subject: </strong> ${assignment.subject || ''}</p>
                    <p><strong>Details: </strong> ${assignment.details || ''}</p>
                    <p><strong>Due date: </strong> ${assignment.date || ''}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(function () {
            container.textContent = 'Could not load assignments';
        });
    }

    function loadWeather() {
    const container = document.getElementById('weather');
    if (!container) return;

    fetch('https://wttr.in/Tel+Aviv?format=j1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const temp = data.current_condition[0].temp_C;

            if (temp >= 20 && temp <= 28) {
            container.innerHTML = `<strong>The weather in Tel-Aviv is: ${temp}°C</strong> - It's a nice day to study outside.`;
            } else if (temp < 20) {
            container.innerHTML = `<strong>The weather in Tel-Aviv is: ${temp}°C</strong> - It's quite cold, you might want to study indoor.`;
            } else {
            container.innerHTML = `<strong>The weather in Tel-Aviv is: ${temp}°C</strong> - It's getting hot, you might want to study indoor.`;
            }
        })
        .catch(function (err) {
            container.textContent = "Couldn't load weather data.";
    });
}

    function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav a');

    links.forEach(function (link) {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}