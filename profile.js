const profileUser = localStorage.getItem('loggedInUser');

if (!profileUser) {
  window.location.href = 'index.html';
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || {};
}

function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

function renderProfile() {
  const users = getUsers();
  const user = users[profileUser];
  const profileSection = document.getElementById('profile-info');
  const userPosts = getPosts().filter(p => p.username === profileUser);

  profileSection.innerHTML = `
    <h2>@${profileUser}</h2>
    <p>Followers: ${user.followers.length}</p>
    <p>Following: ${user.following.length}</p>
  `;

  const postsContainer = document.getElementById('user-posts');
  postsContainer.innerHTML = '<h2>My Posts</h2>';

  userPosts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
      <p>${post.text}</p>
      <small>${new Date(post.timestamp).toLocaleString()}</small>
    `;
    postsContainer.appendChild(postEl);
  });
}

window.onload = renderProfile;
