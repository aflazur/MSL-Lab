# Lab 6 - Posts and Comments

## How to run
1. `npm install`
2. `npm start`
3. Open http://localhost:3000

## Files
- `index.js`          : Express server, it only serves the `public` folder
- `public/index.html` : page structure + Tailwind CSS (loaded from CDN)
- `public/script.js`  : downloads posts and comments from JSONPlaceholder and shows them

## Data
- https://jsonplaceholder.typicode.com/posts
- https://jsonplaceholder.typicode.com/comments

`comment.postId` = `post.id` -> this is how a comment is matched with its post.
