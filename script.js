/* jshint esversion: 6 */
/* global document, fetch */

// Load header from header.html
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        // Set active nav link after header is loaded
        const links = document.querySelectorAll('nav a.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'home.html';
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    });

// Load footer from footer.html
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .finally(() => {
        document.querySelectorAll('video.planet-video').forEach(video => {
            video.defaultPlaybackRate = 0.75;
            video.addEventListener('loadedmetadata', () => {
                video.playbackRate = 0.75;
            });
        });
    });

const orbitalRatios = {
    Sun: 1,
    Mercury: 0.24,
    Venus: 0.62,
    Earth: 1,
    Moon: 0.074,
    Mars: 1.88,
    Jupiter: 11.86,
    Saturn: 29.45,
    Uranus: 84.02,
    Neptune: 164.8,
    Pluto: 248
};

function clearAgeResults() {
    document.querySelectorAll('.planet-age').forEach(node => node.remove());
}

function formatAge(age) {
    return Number(age.toFixed(2));
}

function updatePlanetAges(ageYears) {
    clearAgeResults();

    document.querySelectorAll('.planet-info').forEach(info => {
        const titleEl = info.querySelector('.project-title');
        const descEl = info.querySelector('.project-desc');
        if (!titleEl || !descEl) return;

        const planetName = titleEl.textContent.trim();
        const ratio = orbitalRatios[planetName];
        if (typeof ratio !== 'number') return;

        const ageOnPlanet = formatAge(ageYears / ratio);
        const resultText = `Your age on ${planetName}: ${ageOnPlanet} ${planetName === 'Moon' ? 'lunar years' : 'years'}`;

        const resultEl = document.createElement('p');
        resultEl.className = 'planet-age';
        resultEl.textContent = resultText;
        descEl.insertAdjacentElement('afterend', resultEl);
    });
}

function showError(message) {
    const errorEl = document.getElementById('age-error');
    errorEl.textContent = message;
}

function handleAgeInput() {
    const input = document.getElementById('age-input');
    const ageValue = input.value.trim();
    const parsedAge = Number(ageValue);

    if (!ageValue) {
        showError('Enter your age to see planetary ages.');
        clearAgeResults();
        return;
    }

    if (!Number.isFinite(parsedAge) || parsedAge <= 0 || !Number.isInteger(parsedAge)) {
        showError('Please enter a valid whole number greater than 0.');
        clearAgeResults();
        return;
    }

    showError('');
    updatePlanetAges(parsedAge);
}

document.getElementById('age-submit').addEventListener('click', handleAgeInput);
document.getElementById('age-input').addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        handleAgeInput();
    }
});
