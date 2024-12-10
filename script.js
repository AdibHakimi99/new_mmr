const guests = [
    { name: "John Doe", id: "A001", phone: "+60123456789", seat: "Table 1" },
    { name: "Jane Smith", id: "A002", phone: "+60198765432", seat: "Table 2" }
  ];
  
  const searchBar = document.getElementById("search-bar");
  const resultsTable = document.getElementById("results-table");
  const resultsBody = document.getElementById("results-body");
  
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase().trim();
    const filteredGuests = guests.filter(guest => 
      guest.name.toLowerCase() === query ||
      guest.id.toLowerCase() === query ||
      guest.phone.toLocaleLowerCase() === query
    );
    displayResults(filteredGuests);
  });
  
  function displayResults(guests) {
    resultsBody.innerHTML = "";
    if (guests.length > 0) {
      resultsTable.style.display = "table";
      guests.forEach(guest => {
        const row = `<tr>
          <td>${guest.name}</td>
          <td>${guest.id}</td>
          <td>${guest.phone}</td>
          <td>${guest.seat}</td>
        </tr>`;
        resultsBody.innerHTML += row;
      });
    } else {
      resultsTable.style.display = "none";
    }
  }
  
  function showImage(image) {
    const seatingImage = document.querySelector(".image-section img:nth-child(2)");
    seatingImage.src = image;
  }
  