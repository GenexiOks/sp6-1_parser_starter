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

  let meta = {
    title:
      document.querySelector('title')?.textContent.split(' ', 2).join(' ') ||
      null,
    description:
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') || null,
    keywords:
      document
        .querySelector("meta[name='keywords']")
        ?.getAttribute('content')
        .split(',') || null,
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
    discountPercent: `${(discount / oldPrice) * 100}%`,
  };

  return {
    meta,
    product,
    suggested: [],
    reviews: [],
  };
}

window.parsePage = parsePage;
