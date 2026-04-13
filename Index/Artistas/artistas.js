// artistas.js - Página de Artistas

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo de artistas
    const allArtists = [
        { name: 'Artista A', genre: 'Pop / Eletrônico', listens: 0 },
        { name: 'Artista B', genre: 'Hip-Hop / Rap', listens: 0 },
        { name: 'Artista C', genre: 'Rock / Indie', listens: 0 },
        { name: 'Artista D', genre: 'Samba / Forró', listens: 0 },
        { name: 'Artista E', genre: 'Jazz / Blues', listens: 0 },
        { name: 'Artista F', genre: 'Reggae / Ska', listens: 0 },
        { name: 'Artista G', genre: 'Country / Folk', listens: 0 },
        { name: 'Artista H', genre: 'Classical', listens: 0 }
    ];

    // Carregar dados do localStorage
    let artistListens = JSON.parse(localStorage.getItem('artistListens')) || {};
    allArtists.forEach(artist => {
        artist.listens = artistListens[artist.name] || 0;
    });

    // Função para renderizar seção de artistas
    function renderArtists(sectionClass, artists) {
        const grid = document.querySelector(`.${sectionClass} .ArtistsGrid`);
        grid.innerHTML = '';
        artists.forEach(artist => {
            const card = document.createElement('div');
            card.className = 'ArtistCard';
            card.innerHTML = `
                <div class="ArtistImage">👤</div>
                <h3 class="ArtistName">${artist.name}</h3>
                <p class="ArtistGenre">${artist.genre}</p>
                <p class="ArtistListens">${artist.listens} ouvidas</p>
                <button onclick="listenToArtist('${artist.name}')">Ouvir</button>
            `;
            grid.appendChild(card);
        });
    }

    // Artistas em Alta (todos)
    renderArtists('TopArtistsSection', allArtists);

    // Artistas Mais Ouvidos (ordenados por listens)
    const mostListened = [...allArtists].sort((a, b) => b.listens - a.listens);
    renderArtists('MostListenedSection', mostListened);

    // Artistas Relacionados (exemplo: baseados no gênero do mais ouvido)
    const topGenre = mostListened[0]?.genre.split(' / ')[0] || 'Pop';
    const related = allArtists.filter(artist => artist.genre.includes(topGenre) && artist !== mostListened[0]);
    renderArtists('RelatedArtistsSection', related);

    // Função para ouvir artista
    window.listenToArtist = function(name) {
        const artist = allArtists.find(a => a.name === name);
        if (artist) {
            artist.listens++;
            artistListens[name] = artist.listens;
            localStorage.setItem('artistListens', JSON.stringify(artistListens));
            // Re-renderizar seções
            renderArtists('TopArtistsSection', allArtists);
            const mostListenedUpdated = [...allArtists].sort((a, b) => b.listens - a.listens);
            renderArtists('MostListenedSection', mostListenedUpdated);
            const topGenreUpdated = mostListenedUpdated[0]?.genre.split(' / ')[0] || 'Pop';
            const relatedUpdated = allArtists.filter(a => a.genre.includes(topGenreUpdated) && a !== mostListenedUpdated[0]);
            renderArtists('RelatedArtistsSection', relatedUpdated);
        }
    };

    // Pesquisa
    const searchInput = document.querySelector('.SearchInput');
    searchInput.addEventListener('input', function() {
        const term = searchInput.value.toLowerCase();
        document.querySelectorAll('.ArtistCard').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(term) ? 'block' : 'none';
        });
    });

    // Settings Modal
    const settingsBtn = document.querySelector('.SettingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const toggleTheme = document.getElementById('toggleTheme');
    const logout = document.getElementById('logout');
    const deleteAccount = document.getElementById('deleteAccount');

    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('show');
    });

    closeSettings.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsModal.classList.remove('show');
    });

    // Fechar modal ao clicar fora
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('show');
        }
    });

    // Toggle Theme
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        alert(isLight ? 'Modo Claro ativado!' : 'Modo Escuro ativado!');
    });

    // Logout
    logout.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja fazer logout?')) {
            localStorage.clear();
            alert('Logout realizado!');
            window.location.href = '../Login/Login.html';
        }
    });

    // Delete Account
    deleteAccount.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
            localStorage.clear();
            alert('Conta excluída!');
            window.location.href = '../CriarConta/CriarConta.html';
        }
    });

    // Load theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
});