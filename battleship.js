$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.   
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if ($('td[data-r=' + i + '][data-c=' + j + ']').hasClass('ship')) {
          $('td[data-r=' + i + '][data-c=' + j + ']').removeClass('ship').addClass('water');
        }
      }
    }

    const ships = [5, 4, 3, 3, 2];

    for (let i = 0; i < ships.length; i++) {
      shipLength = ships[i];
      positionValid = false;

      while (!positionValid) {
        startPointX = Math.round(Math.random() * (9 - 0) + 0);
        startPointY = Math.round(Math.random() * (9 - 0) + 0);
        directionIndex = Math.round(Math.random() * (3 - 0) + 0);
        directions = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
        positionValid = inGameArea() && checkSurrounding(startPointX - directions[directionIndex].x, startPointY - directions[directionIndex].y);
      }

      if (positionValid) {
        drawShip(startPointX, startPointY);
      }
    }

    function checkSurrounding(x, y) {
      for (let i = 0; i <= shipLength + 1; i++) {
        if ($('td[data-r=' + x + '][data-c=' + y + ']').hasClass('ship')) {
          return false;
        } else if ($('td[data-r=' + (x + directions[directionIndex].y) + '][data-c=' + (y + directions[directionIndex].x) + ']').hasClass('ship')) {
          return false;
        } else if ($('td[data-r=' + (x - directions[directionIndex].y) + '][data-c=' + (y - directions[directionIndex].x) + ']').hasClass('ship')) {
          return false;
        }
        x += directions[directionIndex].x;
        y += directions[directionIndex].y;
      }
      return true;
    }

    function inGameArea() {
      if (startPointX + (shipLength * directions[directionIndex].x) >= 10 || startPointX + (shipLength * directions[directionIndex].x) < 0) {
        return false;
      } else if (startPointY + (shipLength * directions[directionIndex].y) >= 10 || startPointY + (shipLength * directions[directionIndex].y) < 0) {
        return false;
      }
      return true;
    }

    function drawShip(x, y) {
      for (let i = 0; i < shipLength; i++) {
        $('td[data-r=' + x + '][data-c=' + y + ']').removeClass('water').addClass('ship');
        x += directions[directionIndex].x;
        y += directions[directionIndex].y;
      }
    }

    // Tip: The next line of code demonstrates how you can select a table cell
    // using coordinates, remove CSS classes and add CSS classes.     
  });
});