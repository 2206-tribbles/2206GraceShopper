const BASE = "localhost:3005/api";

export async function registerUser(userObj) {
  try {
    const response = await fetch(`${BASE}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function loginUser(username, password) {
  console.log(username, password, "line 12");
  try {
    const response = await fetch(`${BASE}/users/login`);
  } catch (error) {
    throw error;
  }
}
export async function getHealth() {
  try {
    const response = await fetch(`${BASE}/health`);
    return response;
  } catch (error) {
    throw error;
  }
}
