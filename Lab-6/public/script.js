const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const postsBox = document.getElementById('posts');
const statsBox = document.getElementById('stats');

let allPosts = [];
let allComments = [];

function createCommentHTML(comment) {
    const letter = comment.email[0].toUpperCase();

    return `
        <li class="flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
            <div class="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-indigo-500 font-bold text-white">
                ${letter}
            </div>
            <div>
                <p class="text-sm font-semibold">${comment.name}</p>
                <p class="text-xs text-indigo-600">${comment.email}</p>
                <p class="mt-1 text-sm text-slate-500">${comment.body}</p>
            </div>
        </li>
    `;
}

function createPostHTML(post, isFirstPost) {
    const postComments = allComments.filter((comment) => comment.postId === post.id);
    let commentsHTML = '';
    for (const comment of postComments) {
        commentsHTML += createCommentHTML(comment);
    }

    let openAttribute = '';
    if (isFirstPost) {
        openAttribute = 'open';
    }

    return `
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <p class="text-xs font-semibold text-indigo-600">POST #${post.id}</p>
            <h2 class="mt-1 text-lg font-semibold first-letter:uppercase">${post.title}</h2>
            <p class="mb-4 mt-2 whitespace-pre-line text-slate-500">${post.body}</p>

            <!-- <details> opens and closes when you click <summary> -->
            <details ${openAttribute}>
                <summary class="cursor-pointer rounded-lg bg-indigo-50 px-4 py-2 font-semibold text-indigo-600">
                    Comments (${postComments.length})
                </summary>
                <ul class="mt-3 grid gap-2">
                    ${commentsHTML}
                </ul>
            </details>
        </article>
    `;
}


function showPosts() {
    let html = '';

    for (let i = 0; i < allPosts.length; i++) {
        const isFirstPost = i === 0;
        html += createPostHTML(allPosts[i], isFirstPost);
    }

    postsBox.innerHTML = html;
}

function showStats() {
    const chipClass = 'rounded-full bg-white/20 px-3 py-1 text-sm';

    statsBox.innerHTML = `
        <span class="${chipClass}">${allPosts.length} posts</span>
        <span class="${chipClass}">${allComments.length} comments</span>
    `;
}


async function loadData() {
    try {
        const postsResponse = await fetch(POSTS_URL);
        allPosts = await postsResponse.json();

        const commentsResponse = await fetch(COMMENTS_URL);
        allComments = await commentsResponse.json();

        showStats();
        showPosts();
    } catch (error) {
        console.log(error);
        postsBox.innerHTML = '<p class="text-red-600">Could not load data. Check your internet and refresh.</p>';
    }
}

loadData();
