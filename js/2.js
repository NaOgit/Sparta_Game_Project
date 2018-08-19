$(document).ready(function(){
  //Declared function to toggle menu
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  //Event action
  window.onclick = function(event) {
    myFunction();
    if (!event.target.matches('.dropbtn')) {
      var dropdowns =
      document.getElementsByClassName("dropdown-content");
      var i;
      //Conditions to show or hide menus
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
});
