// @todo: напишите здесь код парсера

function parsePage() {
  let price =
    +document
      .querySelector('.price')
      .textContent.replace(/[^\d]+/g, ' ')
      .trim()
      .split(' ')[0] || null;

  let oldPrice =
    +document
      .querySelector('.price')
      .textContent.replace(/[^\d]+/g, ' ')
      .trim()
      .split(' ')[1] || null;

  let discount = oldPrice - price;

  let discountPercent = (discount / oldPrice) * 100;

  let currency = document.querySelector('.price').textContent.split('');

  function currencyFn(data) {
    for (let elem of data) {
      if (elem == '₽') {
        return (currency = 'RUB');
      }
      if (elem == '$') {
        return (currency = 'USD');
      }
      if (elem == '€') {
        return (currency = 'EUR');
      }
      if (!elem) {
        return (currency = 'Невозможно определить валюту!');
      }
    }
  }

  currencyFn(currency);

  let description = document.querySelector('.description');

  description.querySelector('h3').removeAttribute('class');

  let propertiesObj = {};

  let properties = document.querySelectorAll('.properties li');

  properties.forEach((li) => {
    let spans = li.querySelectorAll('span');
    const key = spans[0].textContent.trim();
    const value = spans[1].textContent.trim();
    propertiesObj[key] = value;
  });

  let imagesArray = [];

  let imagesDom = document.querySelectorAll('.preview nav img');

  imagesDom.forEach((img) => {
    let imgData = {};
    imgData.preview = img.getAttribute('src');
    imgData.full = img.getAttribute('data-src');
    imgData.alt = img.getAttribute('alt');
    imagesArray.push(imgData);
  });

  let suggestedArray = [];

  let suggestedDom = document.querySelectorAll('.suggested article');

  suggestedDom.forEach((card) => {
    let cardData = {};
    cardData.name = card.querySelector('h3').textContent;
    cardData.description = card.querySelector('p').textContent;
    cardData.image = card.querySelector('img').getAttribute('src');
    cardData.price = card.querySelector('b').textContent.match(/\d+/)[0];
    cardData.currency = card.querySelector('b').textContent.includes('₽')
      ? 'RUB'
      : 'Невозможно определить валюту!';
    suggestedArray.push(cardData);
  });

  let reviewsArray = [];

  let reviewsDom = document.querySelectorAll('.reviews article');

  reviewsDom.forEach((card) => {
    cardData = {};
    card.querySelectorAll('.rating span').forEach((elem) => {
      if (!cardData.rating) {
        cardData.rating = 0;
      }
      if (elem.classList.value == 'filled') {
        cardData.rating++;
      }
    });

    cardData.author = {
      avatar: card.querySelector('.author img').getAttribute('src'),
      name: card.querySelector('.author span').textContent,
    };
    cardData.title = card.querySelector('.title').textContent;
    cardData.description = card.querySelector('p').textContent;
    cardData.date = card.querySelector('i').textContent.replace(/[^\d]+/g, '.');
    reviewsArray.push(cardData);
  });

  let meta = {
    title:
      document
        .querySelector('title')
        ?.textContent.split(' ')
        .slice(0, 2)
        .join(' ') || null,
    description:
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') || null,
    keywords:
      document
        .querySelector("meta[name='keywords']")
        ?.getAttribute('content')
        .split(',')
        .map((str) => str.trim()) || null,
    language: document.querySelector('html')?.getAttribute('lang') || null,
    opengraph: {
      title:
        document
          .querySelector("meta[property='og:title']")
          ?.getAttribute('content')
          .split(' ', 2)
          .join(' ') || null,
      image:
        document
          .querySelector("meta[property='og:image']")
          ?.getAttribute('content') || null,
      type:
        document
          .querySelector("meta[property='og:type']")
          ?.getAttribute('content') || null,
    },
  };

  product = {
    id: document.querySelector('.product')?.getAttribute('data-id') || null,
    name:
      document.querySelector('title')?.textContent.split(' ', 2).join(' ') ||
      null,
    isLiked: document.querySelector('.like.active') ? true : false,
    tags: {
      category:
        document.querySelector('.green')?.textContent.split(',') || null,
      discount: document.querySelector('.red')?.textContent.split(',') || null,
      label: document.querySelector('.blue')?.textContent.split(',') || null,
    },
    price: price,
    oldPrice: oldPrice,
    discount: discount,
    discountPercent: `${discountPercent.toFixed(2)}%`
      ? `${discountPercent.toFixed(2)}%`
      : '0%',
    currency: currency,
    properties: propertiesObj,
    description: document.querySelector('.description').innerHTML.trim(),
    images: imagesArray,
  };

  let suggested = suggestedArray;

  let reviews = reviewsArray;

  return {
    meta,
    product,
    suggested,
    reviews,
  };
}

window.parsePage = parsePage;
