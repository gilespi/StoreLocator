const storeForm = document.querySelector('#store-form');
const storeName = document.querySelector('#store-name');
const storeAddress = document.querySelector('#store-address');
const storePhone = document.querySelector('#store-phone');
const storeWeb = document.querySelector('#store-web');

async function addStore(e) {
  e.preventDefault();

  if (
    storeName.value === '' ||
    storeAddress.value === '' ||
    storePhone.value === '' ||
    storeWeb.value === ''
  ) {
    swal('Error!', 'Please, fill in required fields!', 'error');
    return;
  }

  const sendBody = {
    name: storeName.value,
    address: storeAddress.value,
    phone: storePhone.value,
    web: storeWeb.value,
  };

  try {
    const res = await fetch('/api/v2/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error('The store already exist!');
    }

    swal('Success!', 'Store Added!', 'success');
    setTimeout(() => {
      document.location.reload();
    }, 2500);
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener('submit', addStore);
