(() => {
    // Константы
    const posts = document.querySelector('#posts'),
          countPages = document.querySelector('#maxPages'),
          inputPage = document.querySelector('#inputPage'),
          btnPage = document.querySelector('.btn');

    // Создаем посты
    function createPosts(header, text, id, pageParams) {
        const col = document.createElement('div'),
              link = document.createElement('a'),
              card = document.createElement('div'),
              cardBody = document.createElement('div'),
              h5 = document.createElement('h5'),
              p = document.createElement('p');

        col.classList.add('col-xl-6', 'mb-4');
        if (pageParams.get('page')) {
            link.setAttribute('href', `./post.html?id=${id}&page=${pageParams.get('page')}`);
        } else {
            link.setAttribute('href', `./post.html?id=${id}&page=1`);
        }
        card.classList.add('card');
        cardBody.classList.add('card-body');
        h5.classList.add('card-title');
        h5.textContent = header;
        p.classList.add('card-text', 'mt-4');
        p.textContent = text;

        col.append(link);
        link.append(card);
        card.append(cardBody);
        cardBody.append(h5, p);

        return col;
    }

    // Пагинация
    function createPagintaion(pageParams, count) {
        countPages.textContent = ` of ${count}`;

        btnPage.addEventListener('click', () => {
            if (inputPage.value == 1) {
                btnPage.setAttribute('href', `./index.html`);
            } else {
                btnPage.setAttribute('href', `./index.html?page=${inputPage.value}`);
            }
        });

        if (pageParams.get('page')) {
            inputPage.setAttribute('placeholder', `${pageParams.get('page')}`);
        } else {
            inputPage.setAttribute('placeholder', `1`);
        }
    }
    
    // Запускаем приложение
    async function blog() {
        const pageParams = new URLSearchParams(window.location.search);
        // Отправляем запрос на список всех постов
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${pageParams.get('page')}`);
        const dataPosts = await response.json();

        dataPosts.data.forEach(post => {
            posts.append(createPosts(post.title, post.body, post.id, pageParams));
        });

        createPagintaion(pageParams, dataPosts.meta.pagination.pages);
    }

    blog();
})();