async function loadHTML(id, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.text();
    document.getElementById(id).innerHTML = data;
  } catch (error) {
    console.error('Failed to load HTML content:', error);
  }
}

// Load each item
loadHTML('item44', '/items/item44.html');
loadHTML('item45', '/items/item44.html');
loadHTML('item46', '/items/item44.html');
loadHTML('item47', '/items/item44.html');
loadHTML('item48', '/items/item44.html');
