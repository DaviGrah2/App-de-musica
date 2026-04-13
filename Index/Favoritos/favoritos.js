// Função para carregar músicas favoritas do localStorage
function loadFavoriteSongs() {
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [
        { title: 'Música Favorita 1', artist: 'Artista A', duration: '3:45' },
        { title: 'Hit do Verão', artist: 'Artista B', duration: '4:12' },
        { title: 'Clássico', artist: 'Artista C', duration: '5:20' },
        { title: 'Nova Música', artist: 'Artista D', duration: '3:30' }
    ];
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
    return favoriteSongs;
}

// Função para renderizar músicas favoritas
function renderFavoriteSongs(songs) {
    const songsGrid = document.querySelector('.SongsGrid');
    songsGrid.innerHTML = '';
    songs.forEach(song => {
        const songCard = document.createElement('div');
        songCard.className = 'SongCard';
        songCard.innerHTML = `
            <div class="SongImage">🎵</div>
            <h3 class="SongTitle">${song.title}</h3>
            <p class="SongArtist">${song.artist}</p>
        `;
        songsGrid.appendChild(songCard);
    });
}

// Função de pesquisa
document.addEventListener('DOMContentLoaded', function() {
    const favoriteSongs = loadFavoriteSongs();
    renderFavoriteSongs(favoriteSongs);

    const searchInput = document.querySelector('.SearchInput');
    const songCards = document.querySelectorAll('.SongCard');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        // Filtrar músicas
        const filteredSongs = favoriteSongs.filter(song =>
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        );
        renderFavoriteSongs(filteredSongs);
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