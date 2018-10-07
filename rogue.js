var writer = new function() {
    this.text_area = document.getElementById("text_area");
    this.screen_text = "";
    this.screen_matrix = [];
    
    this.write = function() {
        text = "";
        for (b = 0; b < 25; ++b){
            for (a = 0; a < 80; ++a){
                char = this.screen_matrix[b * 80 + a];
                if(char != undefined){
                    text += char;
                }else{
                    text += " ";
                }
            }
            text += "<br>";
        }
        this.text_area.innerHTML = text;
    }
    
    this.write_at = function(x, y, string, color) {
        if(!color) color = "#999999";
        var pos = 0;
        for (var a = 0; a < string.length; ++a){
            if(string[a] == "\n"){
                pos = 0;
                ++y;
                continue;
            }
            this.screen_matrix[y * 80 + x + pos] = "<span style='color:"+color+"'>"+string[a]+"</span>";
            ++pos;
        }
    }
    
    this.rect = function(x, y, width, height, color) {
        if(!color) color = "#999999";
        for (var h = 0; h < height; ++h){
            for (var w = 0; w < width; ++w){
                char = " ";
                if (w == 0 || w == width - 1)
                    char = "<span style='color:"+color+"'>|</span>";
                if (h == 0 || h == height - 1)
                    char = "<span style='color:"+color+"'>-</span>";
                if ((w == 0 || w == width - 1) && (h == 0 || h == height - 1))
                    char = "<span style='color:"+color+"'>+</span>";
                this.screen_matrix[x + y * 80 + w + h * 80] = char;
            }
        }
    }
    
    this.clear = function(){
        this.screen_matrix = [];
    }
    
    this.clear();
}

function put_logo(x, y){
    writer.write_at(x, y  , "  _                _    _            _     ", "#994400");
    writer.write_at(x, y+1, " | |              | |  | |          | |    ", "#995500");
    writer.write_at(x, y+2, " | |     __ _ _ __| |__| | __ _  ___| | __ ", "#996600");
    writer.write_at(x, y+3, " | |    / _` | '__|  __  |/ _` |/ __| |/ / ", "#997700");
    writer.write_at(x, y+4, " | |___| (_| | |  | |  | | (_| | (__|   <  ", "#998800");
    writer.write_at(x, y+5, " |______\\__,_|_|  |_|  |_|\\__,_|\\___|_|\\_\\", "#999900");
    writer.write_at(x, y+7, "       ~ the epic ascii adventure ~       ");
    writer.write_at(x, y+8, "            by Martín del Río");
}

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    
    state_keydown(e);
    
//     else if (e.keyCode == '37') {
//        // left arrow
//     }
//     else if (e.keyCode == '39') {
//        // right arrow
//     }
    
    //Rerun the current state
    state_machine();
    
    //Return false to prevent default behaviour.
    return false;
}

var selected_option = 0;

function state_menu_keydown(e){
    if (e.keyCode == '38') {
        selected_option = 0;
        console.log(0);
    }
    else if (e.keyCode == '40') {
        selected_option = 1;
        console.log(1);
    }
}

function state_menu() {
    writer.rect(0, 0, 80, 25);
    put_logo(1, 1);
    writer.rect(55, 13, 23, 10, "#008888");
    writer.write_at(56, 14, "[ ] Login & Continue");
    writer.write_at(56, 15, "[ ] New Character");
    writer.write_at(57, 14 + selected_option, "*", "#BB3399");
    writer.write_at(56, 17, "Use the arrow keys to\nchoose an option.");
    writer.write_at(56, 20, "Press enter to\nconfirm and proceed.");
    writer.write();
}

state_machine = state_menu;
state_keydown = state_menu_keydown;

state_machine();
