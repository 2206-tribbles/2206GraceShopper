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
  try {
    const response = await fetch(`${BASE}/users/login`, {
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

export async function getUserByToken(token) {
  try {
    const response = await fetch(`${BASE}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("result: ", result);
    console.log("line 23 this is response:", response);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function checkoutUser(token, cart) {
  try {
    const response = await fetch(`${BASE}/carts/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cart),
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

export async function getCartByUserId(userId) {
  try {
    const response = await fetch(`${BASE}/carts/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createCart(userId) {
  try {
    const response = await fetch(`${BASE}/products/createCart/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(token) {
  try{
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}api/users/me`, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
})
  const result = await response.json()
  return result
} catch (error){
  console.log(error, "your getUserByUsername function is breaking")
  }
}

export async function createProduct({
  title,
  artist,
  description,
  release_date,
  price,
  inventory,
  format,
  genre,
  photo,
  spotif,
  staffpick
}
  )
   {
    try {const response = await fetch(`${BASE}/products/Admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        artist,
        description,
        release_date,
        price,
        inventory,
        format,
        genre,
        photo,
        spotif,
        staffpick
      }),
    });
    const data = await response.json()
    console.log("data in Create Product ",data);
    return data
  } 
  catch (error) {console.log(error, "your createProduct function is breaking")}
  }

  export async function destroyProduct(ProductId) {
    try{
      const response = await fetch(`${BASE}/products/${ProductId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      }) 
      console.log(response, "is this working?")
      const result = await response.json()
      console.log(result, "line 185")
      return result
  
    }catch (error) {
      console.error
    }
  }

  export async function updateCart(userId, cartId, cart) {
    console.log("cart in frontend", cart);
    try {
      const response = await fetch(`${BASE}/carts/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
          user_id: userId,
          cart_id: cartId,
        }),
      });
      const result = await response.json();
      console.log("result: ", result);
      console.log("line 23 this is response:", response);
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function getAllUsers() {
    try {
      const response = await fetch(`${BASE}/users`)
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }