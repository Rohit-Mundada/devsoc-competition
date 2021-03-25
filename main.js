var total_cards = 1;
var row_number = 1;

function updateCard(ele) {
    var i = ele.id;
    i = i.charAt(10);
    var newdata = document.getElementById("modalCard" + i + "Content");
    var data = document.getElementById("card" + i + "Text");
    data.innerHTML = newdata.value;
}

function newCard() {
    total_cards += 1;
    var title = document.getElementById("modalAdderTitle").value;
    var content = document.getElementById("modalAdderContent").value;
    var link = document.getElementById("modalAdderLink").value;
    var newCardData = `
        <div class="col-sm-2">
            <div class="card" id = card`+ total_cards.toString() + `>
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src="`+ link + `" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">`+ title + `</h5>
                    <p class="card-text" id="card`+ total_cards.toString() + `Text">
                        `+ content + `
                    </p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-mdb-toggle="modal"
                        data-mdb-target="#modalCard`+ total_cards.toString() + `">
                        Edit
                    </button>
                    <button type="button" class="btn btn-primary" data-mdb-toggle="modal"
                        data-mdb-target="#modalCard`+ total_cards.toString() + `">
                        Delete
                    </button>





          <!-- The delete button has to be fixed now it works as an Edit button  -->


                </div>
            </div>
        </div>
    `
    if (((total_cards-1) % 6 == 0) && (total_cards !=1)) {
        row_number += 1;
        newCardData = `<div class="row mt-3" id="row` + row_number.toString() + `">` + newCardData;
        newCardData = newCardData + `</div>`;
        document.getElementById("Container").innerHTML += newCardData;
    }
    else {
        document.getElementById("row" + row_number.toString()).innerHTML += newCardData;
    }


    setTimeout(function () {
        var newModalData = `
    <div class="modal fade" id="modalCard`+ total_cards.toString() + `" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title" id="modalCard`+ total_cards.toString() + `Title">` + title + `</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                <label for="modalEditTitle">Title</label><br>
                <input type="text" id="modalEditTitle" name="modalEditTitle" size="50"   value=""><br><br>
                <label for="modalEditContent">Description</label><br>
                <textarea class="form-control" id="modalEditContent" rows="4"></textarea><br>
                <label for="modalEditDueDate"> Due date</label><br>
                <input type="date" id="modalEditDueDate" name="modalEditDueDate" size="50" value=""><br><br>
                <label for="modalEditLink">Note image link</label><br>
                <input type="text" id="modalEditLink" name="modalEditLink" size="50" value=""><br>

                </form>

            </div>
            <div class="modal-footer border-0">

                <button type="button" class="btn btn-primary" id="updateCard`+ total_cards.toString() + `Button" onclick="updateCard(this)"
                    data-mdb-dismiss="modal">Save changes</button>
            </div>
        </div>
    </div>
    </div>
    `
        document.getElementById("body").innerHTML += newModalData;
    }, 500);
}

/*
function searchCard(ele){
  var squery=document.getElementById("squery");
  var search_text=squery.value;
  var title_array=[];
  var card_list = document.getElementsByClassName("card")
  for(i=0;i<card_list.length;i++){
    var card_title = document.getElementsByClassName("card")[i].getElementsByClassName("card-body")[0].getElementsByClassName("card-title");
    title_array.push(card_title[0].innerHTML)
  }
  var div_list = document.getElementsByClassName("Container")[0].getElementsByClassName("col-sm-2")
  var mismatch_count=0
  var no_matches=document.getElementById("no_matches");
  no_matches.style.display="none";
  for(i=0;i<div_list.length;i++){
    if(search_text==""){
      for(i=0;i<div_list.length;i++){
        div_list[i].style.display="block"
      }
      //alert('Please type something in search field')
      break
    }
    if(search_text==title_array[i]){
      div_list[i].style.display="block"
    }
    var div_list = document.getElementsByClassName("Container")[0].getElementsByClassName("col-sm-2")
    var mismatch_count = 0
    for (i = 0; i < div_list.length; i++) {
        if (search_text == "") {
            for (i = 0; i < div_list.length; i++) {
                div_list[i].style.display = "block"
            }
            alert('Please type something in search field')
            break
        }
        if (search_text == title_array[i]) {
            div_list[i].style.display = "block"
        }
        else {
            div_list[i].style.display = "none"
            mismatch_count++
        }
    }
  }

  if (mismatch_count==div_list.length){
    for(i=0;i<div_list.length;i++){
      div_list[i].style.display="none"
    }
    //alert('No matches')
    no_matches.style.display="block";
    no_matches.innerHTML="Sorry, there are no results that match your search";
    no_matches.style.fontSize="40px"
  }


  //console.log(search_text)
  //temp[1].style.display="none"
  //console.log(temp[0].style)
  //console.log(title_array)
}
*/

function delCard(ele) {
    var i = ele.id;
    i = i.charAt(10);
    var x = document.getElementById("modalCard" + i);
    var y = document.getElementById("card" + i).parentElement;
    setTimeout(function () { x.remove(); y.remove(); }, 500);
}


function press_enter(event){
  //console.log(event);
  var x =event.keyCode;
  if(x === 13){
    event.preventDefault();
    document.getElementById("button-addon1").click();
  }
}

function dynamic_search(event){
  var x =event.keyCode;
  if(x>=32 || x===8)
  {
    var squery=document.getElementById("squery");
    var search_text=squery.value;
    var title_array=[];
    var card_list = document.getElementsByClassName("card")
    for(i=0;i<card_list.length;i++){
      var card_title = document.getElementsByClassName("card")[i].getElementsByClassName("card-body")[0].getElementsByClassName("card-title");
      title_array.push(card_title[0].innerHTML)
    }
    var div_list = document.getElementsByClassName("Container")[0].getElementsByClassName("col-sm-2")
    var mismatch_count=0
    var no_matches=document.getElementById("no_matches");
    no_matches.style.display="none";
    var search_length = search_text.length
    //console.log(search_length)
    for(i=0;i<div_list.length;i++){
      if(search_text==""){
        for(i=0;i<div_list.length;i++){
          div_list[i].style.display="block"
        }
        //alert('Please type something in search field')
        break
      }
      console.log("i:",i)
      console.log("search text(LHS):",search_text)
      console.log("RHS:",title_array[i].slice(0,search_length))
      if(search_text==(title_array[i].slice(0,search_length))){
        console.log("i got in:",i)
        div_list[i].style.display="block"
      }
      else{
        div_list[i].style.display="none"
        mismatch_count++
      }
    }

    if (mismatch_count==div_list.length){
      for(i=0;i<div_list.length;i++){
        div_list[i].style.display="none"
      }
      //alert('No matches')
      no_matches.style.display="block";
      no_matches.innerHTML="Sorry, there are no results that match your search";
      no_matches.style.fontSize="40px"
    }
  }

}
