document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileModal = document.getElementById('profileModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelProfileBtn = document.getElementById('cancelProfileBtn');
    const profileForm = document.getElementById('profileForm');

    const profileTitle = document.querySelector('.FeaturedTitle');
    const profileDesc = document.querySelector('.FeaturedDesc');
    const profileMeta = document.querySelector('.ProfileMeta');
    const profileAvatar = document.querySelector('.ProfileAvatar');
    const likedSongsValue = document.querySelector('.StatsGrid .StatCard:nth-child(1) .StatValue');
    const playlistsCreatedValue = document.querySelector('.StatsGrid .StatCard:nth-child(2) .StatValue');
    const favoriteArtistsValue = document.querySelector('.StatsGrid .StatCard:nth-child(3) .StatValue');

    const nameInput = document.getElementById('profileName');
    const planInput = document.getElementById('profilePlan');
    const subscriptionInput = document.getElementById('profileSubscription');
    const descriptionInput = document.getElementById('profileDescription');
    const likedSongsInput = document.getElementById('profileLikedSongs');
    const playlistsCreatedInput = document.getElementById('profilePlaylistsCreated');
    const favoriteArtistsInput = document.getElementById('profileFavoriteArtists');

    const defaultProfile = {
        name: 'Gabriel Davi',
        plan: 'Premium',
        subscription: 'Wavefy+',
        description: 'Bem-vindo ao seu espaço musical. Veja suas estatísticas, playlists favoritas e artistas que você mais escuta.',
        likedSongs: 128,
        playlistsCreated: 12,
        favoriteArtists: 34
    };

    let profileData = JSON.parse(localStorage.getItem('profileData')) || defaultProfile;

    function getInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    }

    function renderProfile() {
        profileTitle.textContent = profileData.name;
        profileDesc.textContent = profileData.description;
        profileMeta.innerHTML = `
            <span>${profileData.subscription}</span>
            <span>Plano: ${profileData.plan}</span>
        `;
        profileAvatar.textContent = getInitials(profileData.name);
        likedSongsValue.textContent = profileData.likedSongs;
        playlistsCreatedValue.textContent = profileData.playlistsCreated;
        favoriteArtistsValue.textContent = profileData.favoriteArtists;
    }

    function openModal() {
        nameInput.value = profileData.name;
        planInput.value = profileData.plan;
        subscriptionInput.value = profileData.subscription;
        descriptionInput.value = profileData.description;
        likedSongsInput.value = profileData.likedSongs;
        playlistsCreatedInput.value = profileData.playlistsCreated;
        favoriteArtistsInput.value = profileData.favoriteArtists;
        profileModal.style.display = 'flex';
    }

    function closeModal() {
        profileModal.style.display = 'none';
    }

    editProfileBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelProfileBtn.addEventListener('click', closeModal);
    profileModal.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            closeModal();
        }
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        profileData = {
            name: nameInput.value.trim() || defaultProfile.name,
            plan: planInput.value.trim() || defaultProfile.plan,
            subscription: subscriptionInput.value.trim() || defaultProfile.subscription,
            description: descriptionInput.value.trim() || defaultProfile.description,
            likedSongs: parseInt(likedSongsInput.value, 10) || 0,
            playlistsCreated: parseInt(playlistsCreatedInput.value, 10) || 0,
            favoriteArtists: parseInt(favoriteArtistsInput.value, 10) || 0
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
        renderProfile();
        closeModal();
    });

    renderProfile();
});