const BASE = 'localhost:3005/api';

export async function registerUser(firstName, lastName, email, address, username, password) {
    try {
        const response = await fetch(`${BASE}/users/register`)
        
    } catch (error) {
        throw error;
    }
}

export async function getHealth() {
    try {
        const response = await fetch(`${BASE}/health`)
        return response;
    } catch (error) {
        throw error;
    }
}
