

function updateRole(button) {

    const userId = button.getAttribute('data-userId');

    fetch(`/api/users/premium/${userId}`, {
        method: 'PUT',
    })
    .then(response => {
        if (response.ok) {
            alert('USER ROLE UPDATED');
            location.reload()
        } else {
            throw new Error('Failed to delete product from cart');
        }
    })
    .catch(error => {
        console.error(error);
    });
};

function deleteUser(button) {
    const userId = button.getAttribute('data-userId');
    
    fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 200) {
            alert('USER DELETED');
            window.location.reload();
        } else {
            console.error('Error en la solicitud Fetch');
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
    });
};


function deleteInactiveUsers() {

    fetch(`/api/users`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 200) {
        alert('USUARIOS ELIMINADOS')
    } else {
        console.error('Error en la solicitud Fetch');
    }
    window.location.reload();
})
    .catch(error => {
        // Manejar errores de red aquí
        console.error('Error de red:', error);
    });
};