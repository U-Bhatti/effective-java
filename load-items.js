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
loadHTML('item44', './item44.html');
loadHTML('item45', './item45.html');
loadHTML('item46', './item46.html');
loadHTML('item47', './item47.html');
loadHTML('item48', './item48.html');
