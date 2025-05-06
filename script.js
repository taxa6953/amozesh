function toggleTopic(element) {
  document.querySelectorAll('.topic').forEach(el => {
    if (el !== element) el.classList.remove('active');
  });
  element.classList.toggle('active');
}
