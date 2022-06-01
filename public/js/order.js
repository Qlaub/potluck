const restaurantEls = document.querySelectorAll('restaurant');

restaurantEls.forEach(restaurantEl => {
  restaurantEl.addEventListener('click', () => {
    window.location.href = `/menu/${restaurantEl.dataset.id}`
  });
});
