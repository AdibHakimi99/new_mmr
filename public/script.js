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
        seat_no: guest.NO,        // Map 'NO' to 'seat_no'
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
        <td>${guest.seat}</td>
        <td>${guest.seat_no}</td>
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

  // If search bar is empty, clear results and hide the table
  if (!query) {
    resultsBody.innerHTML = "";
    resultsTable.style.display = "none";
    return;
  }

  // Proceed only if the query is not empty
  const filteredGuests = guests.filter(
    (guest) =>
      guest.id.toLowerCase() === query || // Full match for ID
      guest.name.toLowerCase().split(" ").some((part) => part === query)  // Full word match in name
  );

  displayResults(filteredGuests);
});

// Load CSV on page load
document.addEventListener("DOMContentLoaded", loadCSV);
