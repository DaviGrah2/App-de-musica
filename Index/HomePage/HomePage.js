// Função de pesquisa
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.SearchInput');
    const playlistCards = document.querySelectorAll('.PlaylistCard');
    const artistCards = document.querySelectorAll('.ArtistCard');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        // Filtrar playlists
        playlistCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Filtrar artistas
        artistCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
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

    closeSettings.addEventListener('click', () => {
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