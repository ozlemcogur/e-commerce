const categoryList = document.querySelector('.categories')
const productList = document.querySelector('.products')
const modal = document.querySelector('.modal-wrapper')
const openBtn = document.querySelector('#open-btn')
const closeBtn = document.querySelector('#close-btn')
const modalList = document.querySelector('.modal-list')
const modalInfo = document.querySelector('#modal-info')






document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchProduct();
})

// kategoriyi çekme

function fetchCategories() {
    fetch('https://api.escuelajs.co/api/v1/categories')
        .then((res) => res.json())
        .then((data) =>
            data.slice(0, 4).forEach((category) => {
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category');
                categoryDiv.innerHTML = `<img src="${category.image}" alt="">
     <span>${category.name}</span>`

                categoryList.appendChild(categoryDiv);

            })
        )

        .catch()
}


//ürünleri çekme

function fetchProduct() {
    fetch('https://api.escuelajs.co/api/v1/products')

        .then((res) => res.json())
        .then((data) =>
            data.slice(0, 25).forEach((item) => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product')
                productDiv.innerHTML = `  <img src="${item.images[0]}" alt="">
      <p>${item.title}</p>
      <p>${item.category.name}</p>
      <div class="product-action">
          <p>${item.price}$</p>
          <button onclick = "addToBasket({id: ${item.id},item: '${item.title}',price: ${item.price},
          image: '${item.images[0]}', amount:1 })">Sepete Ekle</button>
      </div>`;
                productList.appendChild(productDiv);

            })
        );

}

//sepet
let basket = [];
let total = 0;

function addToBasket(product) {
    console.log(product)
    const foundItem = basket.find((basketItem) =>
        basketItem.id === product.id
    );
    if (foundItem) {
        foundItem.amount++;


    } else {
        basket.push(product)

    }
}


//açma ve kapatma
openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    //sepetin içine ürünleri listeleme
    addList()
    //toplam ilgisini güncelleme
    modalInfo.innerText = total;

})
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    //sepeti kapatınca içini temizleme
    modalList.innerHTML = '';
    total = 0;


})

//sepete ekleme
function addList() {
    basket.forEach((product) => {
        console.log(product)

        //her bir obje için div oluştur
        const listItem = document.createElement('div');
        // bunlara class ekle
        listItem.classList.add('list-item');
        //içeriğini değiştir
        listItem.innerHTML = `<img src="${product.image}" alt="">
    <h2>${product.item}</h2>
    <h2 class='price'>${product.price}  $</h2>
    <p>Miktar: ${product.amount}</p>
    <button id="del" onclick = "deleteItem({id: ${product.id}, price:${product.price} , amount:${product.amount} })">sil</button>
    `;
        //elemanı htmle gönder
        modalList.appendChild(listItem);
        //total değeri
        total += product.price*product.amount;

    });

}

//sepetten silme fonksiyonu

function deleteItem(deletingItem) {
  basket =  basket.filter (( i)=> i.id !== deletingItem.id );

  //silinen elemanın fiyatını totalden çıkarma
  total-= deletingItem.price * deletingItem.amount;
  modalInfo.innerText = total;


};
//elemanı html den kaldırma
modalList.addEventListener('click', (e)=> {
    if (e.target.id=='del') {
        e.target.parentElement.remove();
    }

})


//dışarıya tıklandığında kapatma
modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-wrapper')) {
        modal.classList.remove('active');


    }

})