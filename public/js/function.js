async function displayStore() {
  const res = await axios.get('/api/v2/stores');
  const data = await res.data.data;
  const ul = document.querySelector('#store-ul-list');

  for (let i = 0; i < data.length; i++) {
    const li = document.createElement('li');
    const div = document.createElement('div');

    div.classList.add('store-item');
    const a = document.createElement('a');
    const p = document.createElement('p');
    const w = document.createElement('w');
    a.innerHTML = res.data.data[i].name;
    a.href = '#';
    a.addEventListener('click', () => {
      map.flyTo(
        [
          res.data.data[i].geometry.coordinates[1],
          res.data.data[i].geometry.coordinates[0],
        ],
        16,
        {
          animate: true,
          duration: 4,
        }
      );
    });

    p.innerHTML = res.data.data[i].geometry.formattedAddress;
    w.innerHTML = res.data.data[i].web;
    w.href = ' <a href="#">${res.data.data[i].web}</a>';

    w.addEventListener('click', () => {
      window.location = w.href;
    });

    div.appendChild(a);
    div.appendChild(p);
    div.appendChild(w);
    li.appendChild(div);
    ul.appendChild(li);
  }
}
displayStore();
