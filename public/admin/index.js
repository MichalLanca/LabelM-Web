document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const json = JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    })

    const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = data.page;
    } else {
        alert(data.message); 
    }
});