// Select the form and result elements
const form = document.getElementById("lookupForm");
const resultDiv = document.getElementById("result");

// Supabase API environment variables
const SUPABASE_URL = "https://tcshbhpjfwlaiposniuz.supabase.co"; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjc2hiaHBqZndsYWlwb3NuaXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzODYyOTgsImV4cCI6MjA0ODk2MjI5OH0.toqp9Ej93ivsTliikldn3NfwXqoXwCyg4o-ME5-xKkU"; // Replace with your Supabase Anon Key

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from refreshing the page
  const idNumber = document.getElementById("idNumber").value;

  try {
    // Fetch data from Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/Senarai_Kehadiran1?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    const users = await response.json();
    const user = users.find((user) => user.no_badan === idNumber);

    if (user) {
      resultDiv.innerHTML = `
        <p><strong>Nama:</strong> ${user.nama}</p>
        <p><strong>No:</strong> ${user.idNumber}</p>
        <p><strong>PKT:</strong> ${user.pkt}</p>
        <p><strong>Nama Waris:</strong> ${user.nama_waris}</p>
      `;
    } else {
      resultDiv.innerHTML = "<p>TIADA INFO BERKAITAN NO BADAN TERSEBUT.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
});
