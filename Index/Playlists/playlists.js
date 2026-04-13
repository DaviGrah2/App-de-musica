// playlists.js - Gerenciamento de Playlists

document.addEventListener('DOMContentLoaded', function() {
    const playlistsGrid = document.querySelector('.PlaylistsGrid');
    const addPlaylistBtn = document.querySelector('.AddPlaylistBtn');
    const modal = document.querySelector('.Modal');
    const modalContent = document.querySelector('.ModalContent');
    const closeModalBtn = document.querySelector('.BtnSecondary');

    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    // Renderizar playlists
    function renderPlaylists() {
        playlistsGrid.innerHTML = '';
        playlists.forEach((playlist, index) => {
            const card = document.createElement('div');
            card.className = 'PlaylistCard';
            card.innerHTML = `
                <div class="PlaylistImage">🎧</div>
                <h3 class="PlaylistTitle">${playlist.name}</h3>
                <p class="PlaylistDesc">${playlist.songs.length} músicas</p>
                <button class="Btn BtnPrimary" onclick="viewPlaylist(${index})">Ver</button>
                <button class="Btn BtnSecondary" onclick="deletePlaylist(${index})">Excluir</button>
            `;
            playlistsGrid.appendChild(card);
        });
    }

    // Adicionar playlist
    addPlaylistBtn.addEventListener('click', () => {
        modalContent.innerHTML = `
            <h2>Adicionar Nova Playlist</h2>
            <form id="addPlaylistForm">
                <div class="FormGroup">
                    <label for="playlistName">Nome da Playlist</label>
                    <input type="text" id="playlistName" placeholder="Digite o nome" required>
                </div>
                <div class="BtnGroup">
                    <button type="button" class="Btn BtnSecondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="Btn BtnPrimary">Adicionar</button>
                </div>
            </form>
        `;
        modal.style.display = 'flex';

        document.getElementById('addPlaylistForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('playlistName').value;
            playlists.push({ name, songs: [] });
            savePlaylists();
            renderPlaylists();
            closeModal();
        });
    });

    // Ver playlist
    window.viewPlaylist = function(index) {
        const playlist = playlists[index];
        modalContent.innerHTML = `
            <h2>${playlist.name}</h2>
            <div class="SongList">
                ${playlist.songs.map((song, songIndex) => `
                    <div class="SongItem">
                        <span>${song.title} - ${song.artist}</span>
                        <div>
                            <button onclick="playSong('${song.title}', '${song.artist}')">▶ Tocar</button>
                            <button onclick="deleteSong(${index}, ${songIndex})">Excluir</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <h3>Adicionar Música</h3>
            <form id="addSongForm">
                <div class="FormGroup">
                    <label for="songTitle">Título da Música</label>
                    <input type="text" id="songTitle" placeholder="Digite o título" required>
                </div>
                <div class="FormGroup">
                    <label for="songArtist">Artista</label>
                    <input type="text" id="songArtist" placeholder="Digite o artista" required>
                </div>
                <div class="BtnGroup">
                    <button type="button" class="Btn BtnSecondary" onclick="closeModal()">Fechar</button>
                    <button type="submit" class="Btn BtnPrimary">Adicionar Música</button>
                </div>
            </form>
        `;
        modal.style.display = 'flex';

        document.getElementById('addSongForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('songTitle').value;
            const artist = document.getElementById('songArtist').value;
            playlist.songs.push({ title, artist });
            savePlaylists();
            viewPlaylist(index); // Re-render
        });
    };

    // Excluir playlist
    window.deletePlaylist = function(index) {
        if (confirm('Tem certeza que deseja excluir esta playlist?')) {
            playlists.splice(index, 1);
            savePlaylists();
            renderPlaylists();
        }
    };

    // Excluir música
    window.deleteSong = function(playlistIndex, songIndex) {
        if (confirm('Tem certeza que deseja excluir esta música?')) {
            playlists[playlistIndex].songs.splice(songIndex, 1);
            savePlaylists();
            viewPlaylist(playlistIndex);
        }
    };

    // Tocar música (simulação)
    window.playSong = function(title, artist) {
        alert(`Tocando: ${title} - ${artist}`);
    };

    // Fechar modal
    window.closeModal = function() {
        modal.style.display = 'none';
    };

    // Salvar no localStorage
    function savePlaylists() {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }

    // Inicializar
    renderPlaylists();

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