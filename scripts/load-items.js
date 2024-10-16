const loadHTML = async (id, url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    document.getElementById(id).innerHTML = await response.text();
  } catch (error) {
    console.error('Failed to load HTML content:', error);
  }
};

// Load each item
// loadHTML('item44', './items/item44.html');
// loadHTML('item45', './items/item45.html');
// loadHTML('item46', './items/item46.html');
// loadHTML('item47', './items/item47.html');
// loadHTML('item48', './items/item48.html');
loadHTML('item49', './items/item49.html');
loadHTML('item50', './items/item50.html');
loadHTML('item51', './items/item51.html');
loadHTML('item52', './items/item52.html');
loadHTML('item53', './items/item53.html');
