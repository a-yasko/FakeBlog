(() => {
    // Константы
    const post = document.querySelector('#post'),
          comments = document.querySelector('#comments'),
          btn = document.querySelector('.btn');

    // Создаем пост
    function createPost(header, body) {
        const post = document.createElement('div'),
              h1 = document.createElement('h1'),
              p = document.createElement('p');
              
        h1.classList.add('mt-5', 'mb-4');
        h1.textContent = header;
        p.textContent = body;
        post.append(h1);
        post.append(p);

        return post;
    }

    // Создаем комментарии
    function createComments(author, body) {
        const comment = document.createElement('div'),
              h5 = document.createElement('h5'),
              p = document.createElement('p');

        h5.textContent = author;
        p.textContent = body;
        comment.append(h5);
        comment.append(p);

        return comment;
    }

    async function displayPostAndComments() {
        const pageParams = new URLSearchParams(window.location.search);

        // Отправляем запрос на пост
        const responsePost = await fetch(`https://gorest.co.in/public-api/posts/${pageParams.get('id')}`);
        const dataPost = await responsePost.json();

        // Отправляем запрос на все комментарии
        const responseComment = await fetch(`https://gorest.co.in/public-api/comments?post_id=${pageParams.get('id')}`);
        const dataComment = await responseComment.json();

        // Кнопка назад
        if (pageParams.get('page') == 1) {
            btn.setAttribute('href', './index.html');
        } else {
            btn.setAttribute('href', `./index.html?page=${pageParams.get('page')}`);
        }

        // Отображем пост
        post.append(createPost(dataPost.data.title, dataPost.data.body));

        // Отображаем комментарии
        dataComment.data.forEach(i => {
            comments.append(createComments(i.name, i.body));
        });
    }

    displayPostAndComments();
})();