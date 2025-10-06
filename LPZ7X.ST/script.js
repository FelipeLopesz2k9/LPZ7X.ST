// --- Lógica do Carrinho (script.js) ---

// Função para carregar o carrinho do localStorage
function getCart() {
    const cart = localStorage.getItem('lpz7x_cart');
    return cart ? JSON.parse(cart) : [];
}

// Função para salvar o carrinho no localStorage
function saveCart(cart) {
    localStorage.setItem('lpz7x_cart', JSON.stringify(cart));
}

// Função para atualizar o contador do carrinho no cabeçalho
function updateCartCount() {
    const cart = getCart();
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        // Conta a quantidade total de itens (se você quiser contar a soma das quantidades)
        // countElement.textContent = cart.reduce((total, item) => total + item.quantity, 0); 
        
        // Ou, conta apenas o número de produtos diferentes no carrinho (como no seu exemplo)
        countElement.textContent = cart.length;
    }
}

// Adiciona evento aos botões "Adicionar ao Carrinho"
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            const newItem = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1, // Assumindo quantidade inicial de 1
                selected: true // Item começa sempre selecionado
            };

            let cart = getCart();

            // Verifica se o item já existe no carrinho
            const existingItem = cart.find(item => item.id === productId && item.name === productName); 
            
            if (existingItem) {
                // Se já existir, apenas incrementa a quantidade (opcional)
                existingItem.quantity += 1;
            } else {
                // Se não existir, adiciona o novo item
                cart.push(newItem);
            }

            saveCart(cart);
            updateCartCount();
            alert(`"${productName}" adicionado ao carrinho!`);
        });
    });

    // Inicializa a contagem do carrinho ao carregar a página
    updateCartCount();
});