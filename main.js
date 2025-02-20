document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const loader = document.getElementById('loader');
    let page = 1;
    const limit = 5;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const loadPosts = async () => {
        loader.style.display = 'block';
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
            const posts = await response.json();
            displayPosts(posts);
            page++;
            console.log(page);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            loader.style.display = 'none';
        }
        await delay(3000);
    };

    const displayPosts = (posts) => {
        posts.forEach(post => {
            const postCard = createPostCard(post);
            postsContainer.appendChild(postCard);
        });
    };

    const createPostCard = (post) => {
        const postCard = document.createElement('div');
        postCard.className = 'post';

        postCard.innerHTML = `
            <div class="card gedf-card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img class="rounded-circle me-2" width="45" src="https://picsum.photos/50/50" alt="">
                        <div>
                            <div class="h5 m-0">@user${post.userId}</div>
                            <div class="h7 text-muted">User ${post.userId}</div>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="gedf-drop1">
                            <li><h6 class="dropdown-header">Configuration</h6></li>
                            <li><a class="dropdown-item" href="#">Save</a></li>
                            <li><a class="dropdown-item" href="#">Hide</a></li>
                            <li><a class="dropdown-item" href="#">Report</a></li>
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <div class="text-muted h7 mb-2"><i class="fa fa-clock-o"></i> ${new Date().toLocaleTimeString()}</div>
                    <a class="card-link" href="#">
                        <h5 class="card-title">${post.title}</h5>
                    </a>
                    <p class="card-text">${post.body}</p>

                </div>
                <div class="card-footer d-flex justify-content-between">
                    <a href="#" class="card-link"><i class="fa-solid fa-thumbs-up"></i> Like</a>
                    <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                    <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
                </div>
            </div>
        `;

        return postCard;
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            loadPosts();
        }
    };

    window.addEventListener('scroll', handleScroll);

    loadPosts();
});