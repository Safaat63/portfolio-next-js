// Quick test to add admin user via API
async function createAdmin() {
  try {
    // Start dev server first, then call this
    const res = await fetch("http://localhost:3001/api/auth/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        username: "admin", 
        password: "admin123" 
      }),
    });
    
    const data = await res.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

createAdmin();
