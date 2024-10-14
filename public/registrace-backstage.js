let click = false;
const form = document.querySelector('form');
document.getElementById('backstageForm').addEventListener('submit', async function(e) {
    
    e.preventDefault(); 
    if(!click){

        const formData = new FormData(form);
        const formObj = {};

        formData.forEach((value, key) => {
            formObj[key] = value;
        });

        click = true
        
        try {
            const response = await fetch('http://localhost:8080/admin/register-backstage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formObj) 
            });
    
            const data = await response.json();
    
            if (response.ok) {
                window.location.href = data.page;
            } else {
                alert(data.message); 
            }
            
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
});