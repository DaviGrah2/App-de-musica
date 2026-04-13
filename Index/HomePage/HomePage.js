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
});