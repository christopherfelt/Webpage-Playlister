//TODO Fixes
//Its still using remain texts some how
//when using shift to get songs it doesn't include the whole thing
//Need to remove the html tags from the selectable stuff

var song_list;

var fullname;
var artist_name;
var artist_click_children;
var artist_select;
var song_name;
var searchwithin = [];
var reString;
var artist_index;
var matches;

var ds;


function checkForParent (element) {

    var iframe_tagname;
    var iframe_attributes;
    var iframe_parent;
    var iframe_parent_tagname;
    var iframe_children;
    var child_element_list = [];

    iframe_parent = element.parentElement;
    iframe_parent_tagname = iframe_parent.tagName;
    iframe_children = iframe_parent.childNodes;


    iframe_tagname = element.tagName;
    iframe_attributes = element.attributes;

    var att_dict = {};

    for(var dd = 0; dd < iframe_attributes.length; dd++){
        var childName = iframe_attributes[dd].name;
        if(childName!=='id'&&childName!=='style'){
            att_dict[childName]=element.getAttribute(childName);
        }
    }

    // attribute count match
    //TODO add something for attrbute count is undefined or zero

    for(var cc = 0; cc < iframe_children.length; cc++){
        if(iframe_children[cc].tagName === iframe_tagname){
            var iframe_child_ats = iframe_children[cc].attributes;
            var at_count = 0;
            var att_dict_keys = Object.keys(att_dict);
            var song_line = iframe_children[cc];
            for(var pp = 0; pp < att_dict_keys.length; pp++){
                if(att_dict_keys[pp]!=='id'&& att_dict_keys[pp]!=='style'){
                    for(var ifc=0; ifc < iframe_child_ats.length; ifc++){
                        if(iframe_child_ats[ifc].name!=='id'&& iframe_child_ats[ifc].name!=='style'){
                            if(iframe_child_ats[ifc].name===att_dict_keys[pp]){
                                at_count++;
                            }
                            if(at_count === att_dict_keys.length){
                                child_element_list.push(song_line.innerHTML);

                            }
                        }
                    }
                }
            }
        }
    }





    return [child_element_list];

}

var childStructure = [];

function getParent(givenElement){

    var tagArr = [];

    var node = givenElement.parentNode;
    while (node !== null){
        tagArr.push(node.tagName);
        node = node.parentNode;
    }

    return tagArr;


}

// function getStructures (iframeDocument){
//
//     var compArr = [];
//
//     var all = iframeDocument.getElementsByTagName("body");
//
//
//     findStructures(all[i].childNodes);
//
//
// }

function findStructure(elementChildren){

        var tagArr = [];

        for(var j = 0; j < elementChildren.length; j++){
            if(elementChildren[j].children.length > 0) {
                // console.log('find structure');
                // console.log(elementChildren[j]);
                findStructure(elementChildren[j].children);

            } else {

                childStructure.push(getParent(elementChildren[j]));

            }
        }



}

var getIframeSelection = function () {

    var iframe_content = document.getElementById("myIframe").contentWindow.document.getElementById("selected_element");

    // song_list = checkForParent(iframe_content)[0];
    // console.log(song_list.length);

    selectedStructure = getParent(iframe_content);
    console.log(selectedStructure);

    var bodyStuff = document.getElementById('myIframe').contentWindow.document.getElementsByTagName('body');


    console.log(bodyStuff[0].children);

    findStructure(document.getElementById("myIframe").contentWindow.document.getElementsByTagName("body")[0].children);

    for(var g = 0; g < childStructure.length; g++){
        console.log(childStructure[g]);
    }



    document.getElementById("full_name").innerHTML = iframe_content.innerHTML;

    // iframe_content.removeAttribute('id');

};



var makeSelectable = function () {
    var spanArray = [];
    var inputName;
    var inputInfo;
    var outputName;
    var container_name;

    if(this.value === 'artist'){
        inputName = "full_name";
        outputName = "artist_name";
        container_name = "container_artist";

    } else if(this.value){
        inputName = "song_fullname";
        outputName = "song_name";
        container_name = "container_song";
    }

    inputInfo = document.getElementById(inputName).innerHTML;

    for(i = 0; i <inputInfo.length; i++){

        var spanLetter = "<span class='select_span' id="+i+">"+inputInfo[i]+"</span>";
        spanArray.push(spanLetter);
    }
    document.getElementById(outputName).innerHTML =  spanArray.join("");

    ds = new DragSelect({
    selectables: document.getElementsByClassName('select_span'),
    area: document.getElementById(container_name)

    });


};


String.prototype.replaceAt = function(index, replacement, replaced){
    return this.substr(0,index)+replacement+this.substr(index + replaced.length);
};

// +this.substr(index + replaced.length)

function clicked(e) {

    if(e.target.tagName === "SPAN"){
        e.target.style.color = "red";
        e.target.className = "selected";
    }

}

document.addEventListener('click', clicked, false);


var artistRegEx;
var songRegEx;


var getRegex = function(infoType){


    var inputInfo;
    var inputInfoA;
    var inputInfoS;
    var info_select;
    var info_index;
    var info_indexA;
    var info_indexS;

    var artistRE;
    var songRE;

    if(infoType==='artist'){
        inputInfo = document.getElementById('full_name').innerHTML;
        info_select = document.getElementById('click_artist').innerHTML;
        info_index = inputInfo.indexOf(info_select);
        artistRE = inputInfo.replaceAt(info_index, "(.*)", info_select);
        songRE = inputInfo.replaceAt(info_index, "*", info_select);

    } else if(infoType === 'song'){
        inputInfoA = artistRegEx;
        inputInfoS = songRegEx;
        info_select = document.getElementById('click_song').innerHTML;
        info_indexA = inputInfoA.indexOf(info_select);
        info_indexS = inputInfoS.indexOf(info_select);
        artistRE = inputInfoA.replaceAt(info_indexA, "*", info_select);
        songRE = inputInfoS.replaceAt(info_indexS, "(.*)", info_select);
    }

    artistRegEx = artistRE;
    // console.log(artistRegEx);
    songRegEx = songRE;
    // console.log(songRegEx);

};

var getSelect =  function(){

    console.log(this.value);

    var click_children;
    var fullInput;
    var info_value = this.value;
    var info_type;
    var click_type;
    var children_array = [];
    var info_select;
    var info_index;

    if(info_value==='artist') {
        fullInput = 'full_name';
        info_type = 'artist_name';
        click_type = 'click_artist';
    }else{
        fullInput = 'song_fullname';
        info_type = 'song_name';
        click_type = 'click_song';
    }

    click_children = document.getElementById(info_type).childNodes;


    for(j=0; j<click_children.length; j++){


        if(click_children[j].className === "select_span ds-selectable ds-selected ds-hover"){

            children_array.push(click_children[j].innerHTML);

        }

    }

    document.getElementById(click_type).innerHTML =  children_array.join("");

    var replaceName = document.getElementById(fullInput).innerHTML;

    info_select = children_array.join("");
    info_index = replaceName.indexOf(info_select);

    var replaceText;

    if(info_value==='artist'){
        replaceText = replaceName.replaceAt(info_index,"", info_select);
        document.getElementById("search_within_artist").innerHTML = replaceText;
        document.getElementById("song_fullname").innerHTML = replaceText;
        getRegex('artist');
    } else if (info_value==='song') {
        replaceText = replaceName.replaceAt(info_index,"", info_select);
        document.getElementById("search_within_song").innerHTML = replaceText;
        getRegex('song');
    }


};

var printArtist = function(){
    console.log('Artist');
    console.log(artistRegEx);
    console.log('Song');
    console.log(songRegEx);

    var new_artist;
    var new_song;
    var test_song;

    test_song = document.getElementById("test_fullname").innerHTML;

    console.log(test_song);

    new_artist = test_song.match(artistRegEx);
    new_song = test_song.match(songRegEx);

    console.log(new_artist);
    console.log(new_song);

    var outputArtist = document.getElementById("artist_output");
    outputArtist.innerHTML = new_artist[1];

    var outputSong = document.getElementById("song_output");
    outputSong.innerHTML = new_song[1];

};

function refineRegex (re_string){

    var symbolArr = ['(',')',':','<','>'];

    console.log(/<[a-z][\s\S]*>./i.test(re_string));
    var re_tags = /<[a-z][\s\S]*>./ig;
    var myArray = re_string.match(re_tags);

    return myArray;



}




var getAllSongs = function(){

    //refine regex functions
    console.log(artistRegEx);
    console.log(refineRegex(artistRegEx));



    // var song_list_div = document.getElementById("song_list");
    //
    //
    // for(var sl = 0; sl<song_list.length; sl++){
    //     var artist = song_list[sl].match(artistRegEx);
    //     var song = song_list[sl].match(songRegEx);
    //     var combo = artist[1]+" - "+song[1];
    //     var p = document.createElement('p');
    //     p.innerHTML = combo;
    //     song_list_div.appendChild(p);
    //
    //
    // }


};

document.getElementById("get_stuff").onclick = getIframeSelection;
document.getElementById("get_select_artist").onclick = makeSelectable;
document.getElementById("get_select_song").onclick = makeSelectable;
document.getElementById("artist_button").onclick = getSelect;
document.getElementById("song_button").onclick = getSelect;
document.getElementById('test_button').onclick = getAllSongs;














