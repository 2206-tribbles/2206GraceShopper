const BASE = "http://localhost:3005/api"; //Port to talk to Backend Server

export async function registerUser(userObj) {
  try {
    const response = await fetch(`${BASE}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function loginUser(userObj) {
  console.log(userObj, "line 12");
  try {
    const response = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const result = await response.json();
    console.log("result: ", result);
    console.log("line 23 this is response:", response);
    return result;
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
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(productId) {
  try {
    const response = await fetch(`${BASE}/products/productById/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
