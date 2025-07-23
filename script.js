const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser && window.location.pathname.endsWith('feed.html')) {
  window.location.href = 'index.html';
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function createPost() {
  const textArea = document.getElementById('post-text');
  const text = textArea.value.trim();
  if (!text) return alert('Post cannot be empty');

  const posts = getPosts();
  posts.unshift({
    id: Date.now(),
    username: loggedInUser,
    text,
    timestamp: new Date().toISOString(),
    likes: [],
    comments: []
  });

  savePosts(posts);
  textArea.value = '';
  renderPosts();
}

function renderPosts() {
  const posts = getPosts();
  const container = document.getElementById('posts-container');
  container.innerHTML = '';

  posts.forEach(post => {
    const liked = post.likes.includes(loggedInUser);
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
      <p><strong>@${post.username}</strong></p>
      <p>${post.text}</p>
      <div class="post-footer">
        <span>${new Date(post.timestamp).toLocaleString()}</span>
        <button class="like-btn" onclick="toggleLike(${post.id})">
          ${liked ? '❤️' : '🤍'} ${post.likes.length}
        </button>
      </div>
    `;
    container.appendChild(postEl);
  });
}

function toggleLike(postId) {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const index = post.likes.indexOf(loggedInUser);
  if (index === -1) {
    post.likes.push(loggedInUser);
  } else {
    post.likes.splice(index, 1);
  }
  savePosts(posts);
  renderPosts();
}

window.onload = () => {
  if (window.location.pathname.endsWith('feed.html')) {
    renderPosts();
  }
};
