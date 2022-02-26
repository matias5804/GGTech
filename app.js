const url = 'https://fakerapi.it/api/v1/custom?title=text&image=image&short_description=text&published_at=date_time&last_news=boolean&_quantity=100';

const saveData = (listData) => {
    localStorage.setItem(
        'data', 
        JSON.stringify(listData)
    );
}

const getData = (start, end) => {
    let uno = localStorage.getItem('data');
    let dos = JSON.parse(uno);
    let tres = [...dos];
    tres = tres.slice(start, end)
    return tres;
}

const init = async () => {
    try {
        const response = await fetch(url);
        const resJson = await response.json();

        saveData(resJson.data);
    } catch (error) {
        console.log(error)
    }
}

const printCards = () => {
    const rows = getData(0, 4);
    const cards = rows.map(item => {
        return `      
            <div class='card'>
                <div class="divImgCard">
                    <h4 class="date-hour">${moment(item.published_at.date).format('DD/MM/YY HH:MM')}</h4>           
                    <img class="imgCard" src='${item.image}' alt="image api"/>
                </div>
                <div class="divTitleTxtCard">
                    <h3 class="titleCard">${item.title.substring(0, 10)}<h3/>
                    <p class="txtCard">${item.short_description.substring(0, 70)}...</p>
                </div>
            </div>
        `;
    });
    let elementCards = document.getElementById('cards')
    elementCards.innerHTML = cards.join('');
}

const printTable = (start, end) => {
    let elementCards = document.getElementById('tbRow');
    elementCards.innerHTML = '';

    const rows = getData(start, end);
 //   console.log("entro")
    const cards = rows.map(item => {
        return `
            <tr>
                <td >${item.title.substring(0, 18)}...</td>
                <td class="descriptionTable">${item.short_description.substring(0, 185)}</td>
                <td class="dateTable">${moment(item.published_at.date).format('DD/MM/YY')}</td>
            </tr>
        `;
    });
    elementCards.innerHTML = cards.join('');
}

init();
printCards();
printTable(0, 10);

var busqueda = document.getElementById('buscar');
var table = document.getElementById("tabla").tBodies[0];

buscaTabla = function(){
    texto = busqueda.value.toLowerCase();
    var r=0;
    while(row = table.rows[r++])
    {
    if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
        row.style.display = null;
    else
        row.style.display = 'none';
    }
}

busqueda.addEventListener('keyup', buscaTabla);