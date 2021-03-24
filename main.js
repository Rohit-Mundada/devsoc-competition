var nos = 1;
function updateCard(ele) {
    var i = ele.id;
    i = i.charAt(10);
    var newdata = document.getElementById("modalCard" + i + "Content");
    var data = document.getElementById("card" + i + "Text");
    data.innerHTML = newdata.value;
}

function newCard() {
    nos += 1;
    var title = document.getElementById("modalAdderTitle").value;
    var content = document.getElementById("modalAdderContent").value;
    var link = document.getElementById("modalAdderLink").value;
    var newCardData = `
        <div class="col-sm-2">
            <div class="card" id = card`+ nos.toString() + `>
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src="`+ link + `" class="img-fluid" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">`+ title + `</h5>
                    <p class="card-text" id="card`+ nos.toString() + `Text">
                        `+ content + `
                    </p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-mdb-toggle="modal"
                        data-mdb-target="#modalCard`+ nos.toString() + `">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    `
    document.getElementById("row").innerHTML += newCardData;
    setTimeout(function () {
        var newModalData = `
    <div class="modal fade" id="modalCard`+ nos.toString() + `" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCard`+ nos.toString() + `Title">` + title + `</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <input type="text" id="modalCard`+ nos.toString() + `Content" name="modalCard` + nos.toString() + `Content" value="` + content + `"><br>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                    Close
                </button>
                <button type="button" class="btn btn-primary" id="deleteCard`+ nos.toString() + `Button" onclick="delCard(this)"
                    data-mdb-dismiss="modal">Delete card</button>
                <button type="button" class="btn btn-primary" id="updateCard`+ nos.toString() + `Button" onclick="updateCard(this)"
                    data-mdb-dismiss="modal">Save changes</button>
            </div>
        </div>
    </div>
    </div>
    `
        document.getElementById("body").innerHTML += newModalData;
    }, 500);
}


function searchCard(ele){
  var squery=document.getElementById("squery");
  var search_text=squery.value;
  //console.log(search_text)
  var title_array=[];
  var card_list = document.getElementsByClassName("card")
  for(i=0;i<card_list.length;i++){
    var card_title = document.getElementsByClassName("card")[i].getElementsByClassName("card-body")[0].getElementsByClassName("card-title");
    title_array.push(card_title[0].innerHTML)
  }
  var div_list = document.getElementsByClassName("Container")[0].getElementsByClassName("col-sm-2")
  var mismatch_count=0
  for(i=0;i<div_list.length;i++){
    if(search_text==""){
      for(i=0;i<div_list.length;i++){
        div_list[i].style.display="block"
      }
      alert('Please type something in search field')
      break
    }
    if(search_text==title_array[i]){
      div_list[i].style.display="block"
    }
    else{
      div_list[i].style.display="none"
      mismatch_count++
    }
  }
  if (mismatch_count==div_list.length){
    for(i=0;i<div_list.length;i++){
      div_list[i].style.display="block"
    }
    alert('No matches')
  }
  //console.log(search_text)
  //temp[1].style.display="none"
  //console.log(temp[0].style)
  //console.log(title_array)
}

function delCard(ele) {
    var i = ele.id;
    i = i.charAt(10);
    var x = document.getElementById("modalCard" + i);
    //var y = document.getElementById("card" + i);
    var y = document.getElementById("card" + i).parentElement;
    setTimeout(function () { x.remove(); y.remove(); }, 500);
}
