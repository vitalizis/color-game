var r = 255,
    g = 0,
    b = 0;
//-------------------создание таблицы------------------------------------
function createTable(m, n) {
    var tableName = document.getElementById('game-table');
    for (var i = 0; i < m; i++) {
        var idNameRow = 'm' + i;
        var row = tableName.insertRow(i).setAttribute('id', idNameRow);
        var rowNumber = document.getElementById(idNameRow);
        rowNumber.classList.add('rows');
        row
        for (var j = 0; j < n; j++) {
            var idNameColumn = i + 'n' + j;
            rowNumber.insertCell(j).setAttribute('id', idNameColumn);
            var columnNumber = document.getElementById(idNameColumn);
            columnNumber.classList.add('columns');
        }
    }
}
createTable(4, 4);
//----------------------создание игрока и его начального положения----------------
var player = {
    coordinateM: null,
    coordinateN: null,
    score: null
};

function CreatePlayer(a, b /*тут будет еще цвет*/ ) { //создает и удаляет квадратик пользователя,
    // на вход подаються координаты, которые генерируються главной функции игры game
    if (document.getElementById('idPlayer') != null) {
        var deleteIdPlayer = document.getElementById('idPlayer');
        deleteIdPlayer.parentNode.removeChild(deleteIdPlayer);
    }
    if (a > 3) { //ограничения что бы клетка не выходила за поля
        a = 3;
    }
    if (b > 3) {
        b = 3;
    }
    if (a < 0) {
        a = 0;
    }
    if (b < 0) {
        b = 0;
    }
    player.coordinateM = a;
    player.coordinateN = b;
    var createIdPlayer = document.createElement('div');
    var varidCellParent = a + 'n' + b;
    var idCellParent = document.getElementById(varidCellParent);
    idCellParent.appendChild(createIdPlayer);
    createIdPlayer.id = 'idPlayer';
}
//-----------------------Создание еды------------------------------------------------
var food = [];

function createFood() {
    var varNumberFood = document.getElementsByClassName('food').length;
    var idCell = [],
        div = [],
        divStyle = [],
        idcoordinate = [];
    if (varNumberFood == 0) { //начальное состояние еды, создаем 3 штук
        var varBoolean = false;
        while (varBoolean != true) {
            for (var k = 1; k <= 3; k++) {
                food[k] = {
                    value: null,
                    coordinateM: null,
                    coordinateN: null,
                    numberFoodCurrent: null
                }
                food[k].value = parseInt(Math.random() * 8 + 1);
                food[k].coordinateM = Math.floor(Math.random() * 4) + 0;
                food[k].coordinateN = Math.floor(Math.random() * 4) + 0;
            }
            varBoolean = checkCoordinate(food, player);
        }
        for (var kk = 1; kk <= 3; kk++) {
            div[kk] = document.createElement('div');
            divStyle[kk] = document.createElement('div');
            idcoordinate[kk] = food[kk].coordinateM + 'n' + food[kk].coordinateN;
            idCell[kk] = document.getElementById(idcoordinate[kk]);
            idCell[kk] = document.getElementById(idcoordinate[kk]);
            idCell[kk].appendChild(div[kk]).classList.add('food');
            div[kk].id = 'k' + kk;
            div[kk].appendChild(divStyle[kk]).classList.add('div-style-food');
            divStyle[kk].innerHTML = food[kk].value;
        }
    } //конец начального состояния еды
    if (varNumberFood != 3 && varNumberFood != 0) {
        //ищим id которого нет
        var deletedElement;
        for (var y = 1; y <= 3; y++) {
            if (document.getElementById('k' + y) == null) {
                deletedElement = y;
            }
        } //конец поиска элемента
        for (var w = 0; w < 10; w++) {
div[deletedElement] = document.createElement('div'); 
divStyle[deletedElement] = document.createElement('div');
            divStyle[deletedElement] = document.createElement('div');
            food[deletedElement].value = parseInt(Math.random() * 8 + 1);
            food[deletedElement].coordinateM = Math.floor(Math.random() * 4) + 0;
            food[deletedElement].coordinateN = Math.floor(Math.random() * 4) + 0;
            if (checkCoordinate(food, player) == true) {
                idcoordinate[deletedElement] = food[deletedElement].coordinateM + 'n' + food[deletedElement].coordinateN;
                idCell[deletedElement] = document.getElementById(idcoordinate[deletedElement]);
                idCell[deletedElement].appendChild(div[deletedElement]).classList.add('food');
                div[deletedElement].id = 'k' + deletedElement;
                div[deletedElement].appendChild(divStyle[deletedElement]).classList.add('div-style-food');
                divStyle[deletedElement].innerHTML = food[deletedElement].value;
                break;
            }

            console.log(div[deletedElement]);
        }

    } //конец создания одного элемента

    if ((check(food, player) != null) || (check(food, player) != undefined)) {
        var a = check(food, player);
        player.score += a;
        r -= parseInt(a / 2);
        b += parseInt(a / 2);
        var divScore = document.getElementById('score');
        divScore.innerHTML = player.score;
    }
    var color = 'rgb' + '(' + r + ',' + g + ',' + b + ')';
    document.getElementById('idPlayer').style.backgroundColor = color;
    for (var dd = 1; dd <= 3; dd++) {
        var f = document.getElementById('k' + dd);
        var p = document.getElementById('idPlayer');
                if ((f.parentNode == p.parentNode)) {
            f.remove();
        }
    }
} //end createFood function

CreatePlayer(0, 3);
createFood();
//--------------------------------------------------------------------------------------------------
function checkCoordinate(food, player) {
    if (((food[1].coordinateM == food[2].coordinateM) && (food[1].coordinateN == food[2].coordinateN)) ||
        ((food[1].coordinateM == food[3].coordinateM) && (food[1].coordinateN == food[3].coordinateN)) ||
        ((food[2].coordinateM == food[3].coordinateM) && (food[2].coordinateN == food[3].coordinateN))) {
        varBoolean = false;
    } else {
        varBoolean = true;
        for (var t = 1; t <= 3; t++) {
            if ((food[t].coordinateM == player.coordinateM) && (food[t].coordinateN == player.coordinateN)) {
                varBoolean = false;
            }
        }
    }
    return varBoolean;
}

function check(food, player) {
    for (var i = 1; i <= 3; i++) {
        if ((food[i].coordinateM == player.coordinateM) && (food[i].coordinateN == player.coordinateN)) {
            var a = Number(document.getElementById('k' + i).textContent);
        }
    }
    return a;
}
//----------------------добавление обработчика событий----------------------------------------------

var some = document.getElementsByTagName('body');
some[0].onkeydown = function(e) {
        switch (e.keyCode) {
            case 38:
                // CreatePlayer(player.coordinateM+0,player.coordinateN+1);
                CreatePlayer((player.coordinateM - 1), player.coordinateN + 0);
                createFood();
                //=================up=====================
                break;
            case 40:
                CreatePlayer((player.coordinateM + 1), (player.coordinateN + 0));
                createFood();
                //=================down===================
                break;
            case 37:
                CreatePlayer((player.coordinateM + 0), (player.coordinateN - 1));
                createFood();
                // //==================left==================
                break;
            case 39:
                CreatePlayer((player.coordinateM + 0), (player.coordinateN + 1));
                createFood();
                //==================right=================
                break;

        } //end switch
    }
    //---------------------------------------------------------------------------------------------------