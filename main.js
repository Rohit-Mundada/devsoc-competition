var total_cards = 0;
var row_number = 1;
function updateCard(ele) {
  var i = ele.id;
  var flag = 0;
  i = i.charAt(10);
  var newcontent = document.getElementById("modalCard" + i + "Content").value;
  var content = document.getElementById("card" + i + "Text");
  if (newcontent.length >= 20) {
    flag = 1;
    newcontent = newcontent.slice(0, 20) + `<span id="dots` + i + `">...</span><span style="display: none;" id="more` + i + `">` + newcontent.slice(20, newcontent.length) + `</span>`
  }
  else {
    flag = 2;
  }
  content.innerHTML = newcontent;
  var newtitle = document.getElementById("modalCard" + i + "NewTitle");
  var title1 = document.getElementById("modalCard" + i + "Title");
  var title2 = document.getElementById("card" + i + "Title");
  title1.innerHTML = newtitle.value;
  title2.innerHTML = newtitle.value;
  var newimg = document.getElementById("modalCard" + i + "Link");
  var img = document.getElementById("card" + i + "Link");
  img.src = newimg.value;
  var dots = document.getElementById("dots" + i);
  var moreText = document.getElementById("more" + i);
  var btn = document.getElementById("readmore" + i);
  if (flag == 1) {
    dots.style.display = "inline";
    moreText.style.display = "none";
    btn.innerHTML = "Read more";
  }
  else if (flag == 2) {
    btn.innerHTML = "Read more";
  }

}
imgno = Math.floor(Math.random() * 100);
function newCard() {
  imgno += 1;
  total_cards += 1;
  var title = document.getElementById("modalAdderTitle").value;
  var content = document.getElementById("modalAdderContent").value;
  var content2 = document.getElementById("modalAdderContent").value;
  var link = document.getElementById("modalAdderLink").value;
  var date = document.getElementById("modalAdderDueDate").value;
  var ran = Math.floor(Math.random() * 100);
  if ((content == "") && (title == "")) { content = postjson[ran].body; title = postjson[ran].title; }
  if (content.length >= 20) {
    content2 = content.slice(0, 20) + `<span id="dots` + total_cards.toString() + `">...</span><span style="display: none;" id="more` + total_cards.toString() + `">` + content.slice(20, content.length) + `</span>`
  }
  if (link == "") { link = "https://picsum.photos/id/" + imgno.toString() + "/600"; }

  var newCardData = `
        <div class="col-sm-2 mx-auto">
            <div class="card" id = card`+ total_cards.toString() + `>
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img id= "card`+ total_cards.toString() + `Link"src="` + link + `" class="img-fluid"/>
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title" id="card`+ total_cards.toString() + `Title">` + title + `</h5>
                    <p class="card-text" id="card`+ total_cards.toString() + `Text">
                        `+ content2 + `
                    </p>
                    <!-- Button trigger modal -->
                    <div class="dropdown">
                    <button type="dropdown" style="position: relative; float: right;" class="btn btn-primary-link" dropdown-toggle" data-mdb-toggle="dropdown" data-mdb-toggle="modal" data-mdb-target="#modalCard`+ total_cards.toString() + `"><span class="iconify" data-icon="bi-three-dots-vertical" data-inline="false"></span></button>
                    <div class="dropdown-menu aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#" data-mdb-toggle="modal" data-mdb-target="#modalCard`+ total_cards.toString() + `">Edit</a>
                        <a class="dropdown-item" href="#" data-mdb-toggle="modal" data-mdb-target="#modalCard`+ total_cards.toString() + `Delete"">Delete</a>
                        <a class="dropdown-item" href="#" onclick="readMore(this)" id="readmore`+ total_cards.toString() + `"">Read More</a> 
                        
                
                </div></div>






          <!-- The delete button has to be fixed now it works as an Edit button  -->


                </div>
            </div>
        </div>
    `
  if (((total_cards - 1) % 3 == 0) && (total_cards != 1)) {
    row_number += 1;
    newCardData = `<div class="row mt-5 mt-b" id="row` + row_number.toString() + `">` + newCardData;
    newCardData = newCardData + `</div>`;
    document.getElementById("Container").innerHTML += newCardData;
  }
  else {
    document.getElementById("row" + row_number.toString()).innerHTML += newCardData;
  }


  setTimeout(function () {
    var newModalEditData = `
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
                <input type="text" id="modalCard`+ total_cards.toString() + `NewTitle" name="modalEditTitle" size="50"   value="` + title + `"><br><br>
                <label for="modalEditContent">Description</label><br>
                <textarea class="form-control" id="modalCard`+ total_cards.toString() + `Content" rows="4">` + content + `</textarea><br>
                <label for="modalEditDueDate"> Due date</label><br>
                <input type="date" id="modalCard`+ total_cards.toString() + `DueDate" name="modalEditDueDate" size="50" value="` + date + `"><br><br>
                <label for="modalEditLink">Note image link</label><br>
                <input type="text" id="modalCard`+ total_cards.toString() + `Link" name="modalEditLink" size="50" value="` + link + `"><br>

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
    var newModalDeleteData = `
    <div class="modal fade" id="modalCard`+ total_cards.toString() + `Delete" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title" id="modalCard`+ total_cards.toString() + `DeleteTitle">` + title + `</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            Are you sure you want to delete this event?
            </div>
            <div class="modal-footer border-0">

                <button type="button" class="btn btn-primary" id="exitCard`+ total_cards.toString() + `Button"
                    data-mdb-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="deleteCard`+ total_cards.toString() + `Button" onclick="delCard(this)"
                    data-mdb-dismiss="modal">DELETE</button>
            </div>
        </div>
    </div>
    </div>
    `;
    document.getElementById("body").innerHTML += newModalEditData; document.getElementById("body").innerHTML += newModalDeleteData;
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
  var div_list = document.getElementsByClassName("Container")[0].getElementsByClassName("col-sm-2 mx-auto")
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
    var div_list = document.getElementsByClassName("Container")[0].getElementsByClassName("col-sm-2 mx-auto")
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
  setTimeout(function () { x.remove(); y.remove(); total_cards -= 1; }, 500);
}


function press_enter(event) {
  //console.log(event);
  var x = event.keyCode;
  if (x === 13) {
    event.preventDefault();
    document.getElementById("button-addon1").click();
  }
}

function dynamic_search(event) {
  var x = event.keyCode;
  if (x >= 32 || x === 8) {
    var squery = document.getElementById("squery");
    var search_text = squery.value;
    search_text = search_text.toLowerCase();
    var title_array = [];
    var card_list = document.getElementsByClassName("card")
    for (i = 0; i < card_list.length; i++) {
      var card_title = document.getElementsByClassName("card")[i].getElementsByClassName("card-body")[0].getElementsByClassName("card-title");
      //console.log(card_title[0].innerHTML)
      var title = card_title[0].innerHTML.toLowerCase();
      title_array.push(title);
    }
    var div_list = document.getElementsByClassName("Container")[0].getElementsByClassName("col-sm-2 mx-auto")
    var mismatch_count = 0
    var no_matches = document.getElementById("no_matches");
    no_matches.style.display = "none";
    var search_length = search_text.length
    //console.log(search_length)
    for (i = 0; i < div_list.length; i++) {
      if (search_text == "") {
        for (i = 0; i < div_list.length; i++) {
          div_list[i].style.display = "block"
        }
        //alert('Please type something in search field')
        break
      }
      //console.log("i:", i)
      //console.log("search text(LHS):", search_text)
      //console.log("RHS:", title_array[i].slice(0, search_length))
      if (search_text == (title_array[i].slice(0, search_length))) {
        //console.log("i got in:", i)
        div_list[i].style.display = "block"
      }
      else {
        div_list[i].style.display = "none"
        mismatch_count++
      }
    }

    if (mismatch_count == div_list.length) {
      for (i = 0; i < div_list.length; i++) {
        div_list[i].style.display = "none"
      }
      //alert('No matches')
      no_matches.style.display = "block";
      no_matches.innerHTML = "Sorry, there are no results that match your search";
      no_matches.style.fontSize = "40px";
      no_matches.style.color = "#ffffff";
    }
  }

}

var postjson;

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => { postjson = data; });

function readMore(ele) {
  var no = ele.id.charAt(8);
  var dots = document.getElementById("dots" + no);
  var moreText = document.getElementById("more" + no);
  var btn = document.getElementById("readmore" + no);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    moreText.style.display = "none";
    btn.innerHTML = "Read more";
  } else {
    dots.style.display = "none";
    moreText.style.display = "inline";
    btn.innerHTML = "Read less";
  }
}
setTimeout(function(){newCard();newCard();},100);
