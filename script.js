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
        // Videos now have manual controls, no auto-playback
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
    document.querySelectorAll('.age-display').forEach(node => node.remove());
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

        // create or reuse a dedicated container for the age display
        let ageContainer = info.querySelector('.age-display');
        if (!ageContainer) {
            ageContainer = document.createElement('div');
            ageContainer.className = 'age-display';
            descEl.insertAdjacentElement('afterend', ageContainer);
        }

        ageContainer.innerHTML = `<p class="planet-age" aria-live="polite"><strong>${planetName} —</strong> ${ageOnPlanet} ${planetName === 'Moon' ? 'lunar years' : 'years'}</p>`;
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

// Celestial body carousel data
const celestialBodies = {
    'earth-moon': [
        {
            name: 'Earth',
            video: 'videos/Earth.mkv?v=2',
            title: 'Earth',
            description: 'Our home planet, with oceans, landmasses, and dynamic weather systems.',
            extra: 'Earth is the only known planet to harbor life. Its atmosphere, composed primarily of nitrogen and oxygen, protects us from harmful solar radiation while maintaining the perfect temperature range for diverse ecosystems.',
            data: [
                { label: 'Age', value: '4.54 billion years' },
                { label: 'Revolution', value: '365 days' },
                { label: 'Orbital Period', value: '1 Earth year' },
                { label: 'Distance from Sun', value: '149.6 million km' }
            ]
        },
        {
            name: 'Moon',
            video: 'videos/Moon Finals/Earth Moon.mp4?v=2',
            title: 'Moon',
            description: 'Earth\'s natural satellite, with cratered highlands and a thin exosphere.',
            extra: 'The Moon plays a crucial role in stabilizing Earth\'s axis and creates the tides through its gravitational pull. Its phases have guided human timekeeping for millennia, and it remains our nearest celestial neighbor.',
            data: [
                { label: 'Age', value: '4.51 billion years' },
                { label: 'Revolution', value: '27.3 Earth days' },
                { label: 'Orbital Period', value: '27.3 Earth days' },
                { label: 'Distance from Earth', value: '384,400 km' }
            ]
        }
    ],
    'mars': [
        {
            name: 'Mars',
            video: 'videos/Mars.mkv?v=2',
            title: 'Mars',
            description: 'The red planet, known for its dusty terrain, ancient riverbeds, and polar ice caps.',
            extra: 'Mars is a terrestrial planet with a thin atmosphere composed mainly of carbon dioxide. Its rust-colored surface, created by iron oxide in the soil, has fascinated astronomers for centuries. Evidence suggests it once had flowing water.',
            data: [
                { label: 'Age', value: '4.6 billion years' },
                { label: 'Revolution', value: '687 Earth days' },
                { label: 'Orbital Period', value: '1.88 Earth years' },
                { label: 'Distance from Sun', value: '227.9 million km' }
            ]
        },
        {
            name: 'Mars Moon',
            video: 'videos/Moon Finals/Mars Moon.mp4?v=2',
            title: 'Mars Moons',
            description: 'Mars has two small moons: Phobos and Deimos, irregular rocky bodies.',
            extra: 'Phobos and Deimos are named after the Greek gods of fear and panic. These small, oddly-shaped moons may be captured asteroids. Phobos is gradually spiraling toward Mars and will eventually be torn apart by tidal forces.',
            data: [
                { label: 'Primary Moons', value: 'Phobos & Deimos' },
                { label: 'Phobos Orbit', value: '7.66 hours' },
                { label: 'Deimos Orbit', value: '30.3 hours' },
                { label: 'Type', value: 'Rocky asteroids' }
            ]
        }
    ],
    'jupiter': [
        {
            name: 'Jupiter',
            video: 'videos/Jupiter.mkv?v=2',
            title: 'Jupiter',
            description: 'A gas giant with swirling storms, including the Great Red Spot, and many moons.',
            extra: 'Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined. Its iconic Great Red Spot is a hurricane larger than Earth that has raged for at least 350 years. The planet\'s rapid rotation creates distinct atmospheric bands.',
            data: [
                { label: 'Age', value: '4.6 billion years' },
                { label: 'Revolution', value: '4,333 Earth days' },
                { label: 'Orbital Period', value: '11.86 Earth years' },
                { label: 'Distance from Sun', value: '778.5 million km' }
            ]
        },
        {
            name: 'Jupiter Moons',
            video: 'videos/Moon Finals/Jupiter Moons.mp4?v=2',
            title: 'Jupiter Moons',
            description: 'Jupiter has at least 95 known moons, including the four Galilean moons: Io, Europa, Ganymede, and Callisto.',
            extra: 'The Galilean moons are among the most fascinating objects in our solar system. Europa has a hidden ocean beneath its ice, Europa and Io is the most volcanically active body known. Ganymede is the largest moon in the solar system, larger than Mercury.',
            data: [
                { label: 'Total Moons', value: '95+' },
                { label: 'Galilean Moons', value: 'Io, Europa, Ganymede, Callisto' },
                { label: 'Largest Moon', value: 'Ganymede' },
                { label: 'Notable Feature', value: 'Europa has subsurface ocean' }
            ]
        }
    ],
    'saturn': [
        {
            name: 'Saturn',
            video: 'videos/Saturn.mkv?v=2',
            title: 'Saturn',
            description: 'Famous for its ring system, Saturn is a gas giant with icy rings and a striking appearance.',
            extra: 'Saturn\'s magnificent ring system consists of billions of icy particles ranging from dust-sized to mountain-sized chunks. The rings are relatively young, perhaps only 100-200 million years old. Saturn has 146 known moons, the most of any planet.',
            data: [
                { label: 'Age', value: '4.5 billion years' },
                { label: 'Revolution', value: '10,759 Earth days' },
                { label: 'Orbital Period', value: '29.45 Earth years' },
                { label: 'Distance from Sun', value: '1.43 billion km' }
            ]
        },
        {
            name: 'Saturn Moons',
            video: 'videos/Moon Finals/Saturn Moons.mp4?v=2',
            title: 'Saturn Moons',
            description: 'Saturn has 146 known moons, the most of any planet, including the large moon Titan with a thick atmosphere.',
            extra: 'Titan is Saturn\'s crown jewel, possessing a thick nitrogen atmosphere and liquid methane lakes on its surface. Enceladus shoots geysers of water from its subsurface ocean. These moons represent diverse worlds within a single planetary system.',
            data: [
                { label: 'Total Moons', value: '146+' },
                { label: 'Largest Moon', value: 'Titan' },
                { label: 'Titan Atmosphere', value: 'Thick nitrogen atmosphere' },
                { label: 'Other Notable Moons', value: 'Enceladus, Rhea, Iapetus' }
            ]
        }
    ],
    'uranus': [
        {
            name: 'Uranus',
            video: 'videos/Uranus.mkv?v=2',
            title: 'Uranus',
            description: 'An ice giant that rotates on its side, with a faint ring system and cold, blue atmosphere.',
            extra: 'Uranus is the only planet that rotates on its side, likely due to a massive collision early in its history. Its blue-green color comes from methane in its atmosphere. Despite being the third-largest planet, it remains relatively unexplored.',
            data: [
                { label: 'Age', value: '4.5 billion years' },
                { label: 'Revolution', value: '30,687 Earth days' },
                { label: 'Orbital Period', value: '84.02 Earth years' },
                { label: 'Distance from Sun', value: '2.87 billion km' }
            ]
        },
        {
            name: 'Uranus Moon',
            video: 'videos/Moon Finals/Uranus Moon.mp4?v=2',
            title: 'Uranus Moons',
            description: 'Uranus has 28 known moons, including the large moons Titania and Oberon named after Shakespearean characters.',
            extra: 'All of Uranus\'s moons are named after characters from Shakespeare and Alexander Pope\'s works. Titania and Oberon are the largest, while the smaller moons feature dramatic surface features and complex orbital dynamics.',
            data: [
                { label: 'Total Moons', value: '28' },
                { label: 'Largest Moons', value: 'Titania & Oberon' },
                { label: 'Naming Scheme', value: 'Shakespearean characters' },
                { label: 'Notable Feature', value: 'Rotational axis tilted 98°' }
            ]
        }
    ],
    'neptune': [
        {
            name: 'Neptune',
            video: 'videos/Neptune.mkv?v=2',
            title: 'Neptune',
            description: 'A distant ice giant with strong winds and a deep blue atmosphere, farthest from the Sun.',
            extra: 'Neptune is the windiest planet in the solar system, with wind speeds exceeding 2,100 km/h. Its beautiful deep blue color comes from atmospheric methane. Despite its distance, it remains an object of fascination for planetary scientists.',
            data: [
                { label: 'Age', value: '4.5 billion years' },
                { label: 'Revolution', value: '60,190 Earth days' },
                { label: 'Orbital Period', value: '164.8 Earth years' },
                { label: 'Distance from Sun', value: '4.50 billion km' }
            ]
        },
        {
            name: 'Neptune Moons',
            video: 'videos/Moon Finals/Neptune Moons.mp4?v=2',
            title: 'Neptune Moons',
            description: 'Neptune has 16 known moons, the most notable being Triton, which orbits retrograde with cryovolcanoes.',
            extra: 'Triton is unique among large moons for its retrograde orbit, suggesting it was captured from the Kuiper Belt. Its surface features cryovolcanoes that erupt nitrogen ice. The other moons reveal a complex, dynamic system.',
            data: [
                { label: 'Total Moons', value: '16' },
                { label: 'Largest Moon', value: 'Triton' },
                { label: 'Triton Orbit', value: 'Retrograde' },
                { label: 'Notable Feature', value: 'Cryovolcanoes on Triton' }
            ]
        }
    ],
    'pluto': [
        {
            name: 'Pluto',
            video: 'videos/Pluto.mkv?v=2',
            title: 'Pluto',
            description: 'A small icy world in the Kuiper Belt, rich in nitrogen ice and distant dwarf planet charm.',
            extra: 'Pluto was reclassified as a dwarf planet in 2006, but remains scientifically fascinating. Its surface features nitrogen ice plains, water ice mountains, and a thin atmosphere. The New Horizons mission revealed an unexpectedly complex and geologically active world.',
            data: [
                { label: 'Age', value: '4.5 billion years' },
                { label: 'Revolution', value: '90,560 Earth days' },
                { label: 'Orbital Period', value: '248 Earth years' },
                { label: 'Distance from Sun', value: '5.91 billion km' }
            ]
        },
        {
            name: 'Pluto Moons',
            video: 'videos/Moon Finals/Pluto Moons.mp4?v=2',
            title: 'Pluto Moons',
            description: 'Pluto has 5 known moons, the largest being Charon, which is so large that Pluto and Charon orbit their common center of mass.',
            extra: 'Charon is nearly half the size of Pluto, making this a binary system unlike any planet-moon relationship. The system appears to be tidally locked, with one side of Charon always facing Pluto. The other moons orbit in a complex configuration.',
            data: [
                { label: 'Total Moons', value: '5' },
                { label: 'Largest Moon', value: 'Charon' },
                { label: 'Charon Size', value: 'Half the size of Pluto' },
                { label: 'System Type', value: 'Binary dwarf planet system' }
            ]
        }
    ]
};

function switchCelestialBody(groupId, direction) {
    const bodies = celestialBodies[groupId];
    if (!bodies) return;

    // Get the carousel container to track current index with data attribute
    const carouselContainer = document.getElementById(`${groupId}-carousel`);
    if (!carouselContainer) {
        return;
    }

    // Get current index from data attribute, default to 0
    let currentIndex = parseInt(carouselContainer.dataset.currentIndex || '0', 10);

    // Calculate next index with proper wrapping
    let nextIndex = currentIndex + direction;
    if (nextIndex >= bodies.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = bodies.length - 1;

    const nextBody = bodies[nextIndex];
    
    // Update video
    const videoEl = document.getElementById(`${groupId}-video`);
    videoEl.src = nextBody.video;
    videoEl.currentTime = 0;
    videoEl.load();

    // Update info
    const infoEl = document.getElementById(`${groupId}-info`);
    const titleEl = infoEl.querySelector('.project-title');
    const descEl = infoEl.querySelector('.project-desc');
    const dataEl = infoEl.querySelector('.planet-data');
    let extraEl = infoEl.querySelector('.planet-description-extra');

    titleEl.textContent = nextBody.title;
    descEl.textContent = nextBody.description;
    
    dataEl.innerHTML = nextBody.data.map(item => 
        `<li><strong>${item.label}:</strong> ${item.value}</li>`
    ).join('');

    // Handle extra description
    if (nextBody.extra) {
        if (!extraEl) {
            extraEl = document.createElement('div');
            extraEl.className = 'planet-description-extra';
            descEl.insertAdjacentElement('afterend', extraEl);
        }
        extraEl.textContent = nextBody.extra;
    } else if (extraEl) {
        extraEl.remove();
    }

    // Update indicator
    document.getElementById(`${groupId}-current`).textContent = nextBody.name;

    // Store the new index in data attribute
    carouselContainer.dataset.currentIndex = nextIndex;

    // Enable both buttons for cycling
    const prevBtn = document.getElementById(`${groupId}-prev`);
    const nextBtn = document.getElementById(`${groupId}-next`);
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

// Initialize all carousels with descriptions on page load
function initializeCarousels() {
    for (const groupId in celestialBodies) {
        const bodies = celestialBodies[groupId];
        const firstBody = bodies[0];
        const infoEl = document.getElementById(`${groupId}-info`);
        
        if (!infoEl) continue;
        
        // Add extended description if it exists
        if (firstBody.extra) {
            const descEl = infoEl.querySelector('.project-desc');
            let extraEl = infoEl.querySelector('.planet-description-extra');
            
            if (!extraEl) {
                extraEl = document.createElement('div');
                extraEl.className = 'planet-description-extra';
                descEl.insertAdjacentElement('afterend', extraEl);
            }
            extraEl.textContent = firstBody.extra;
        }
        
        // Initialize carousel index
        const carouselContainer = document.getElementById(`${groupId}-carousel`);
        if (carouselContainer) {
            carouselContainer.dataset.currentIndex = '0';
        }
    }
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCarousels);
