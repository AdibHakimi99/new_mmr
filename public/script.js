// Path to your CSV file
const csvFilePath = "data.csv"; // Ensure the correct path to your CSV file

let guests = []; // This will hold the parsed guest data

const searchBar = document.getElementById("search-bar");
const resultsTable = document.getElementById("results-table");
const resultsBody = document.getElementById("results-body");

// Function to load CSV file
function loadCSV() {
  Papa.parse(csvFilePath, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      guests = results.data.map((guest) => ({
        name: guest.NAMA,       // Map 'NAMA' to 'name'
        id: guest["NO TENTERA"], // Map 'NO TENTERA' to 'id'
        phone: guest.NO,        // Map 'NO' to 'phone'
        seat: guest.MEJA,       // Map 'MEJA' to 'seat'
      }));
      console.log("CSV Loaded:", guests); // Debug: Log loaded data
    },
    error: function (error) {
      console.error("Error loading CSV:", error.message);
    },
  });
}

// Function to display results
function displayResults(filteredGuests) {
  resultsBody.innerHTML = ""; // Clear previous results
  if (filteredGuests.length > 0) {
    resultsTable.style.display = "table"; // Show the table if results are found
    filteredGuests.forEach((guest) => {
      const row = `<tr>
        <td>${guest.name}</td>
        <td>${guest.id}</td>
        <td>${guest.phone}</td>
        <td>${guest.seat}</td>
      </tr>`;
      resultsBody.innerHTML += row;
    });
  } else {
    resultsTable.style.display = "none"; // Hide the table if no results are found
  }
}

// Search event listener
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase().trim();
  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(query) ||
      guest.id.toLowerCase().includes(query) ||
      guest.phone.toLowerCase().includes(query)
  );
  displayResults(filteredGuests);
});

// Load CSV on page load
document.addEventListener("DOMContentLoaded", loadCSV);
