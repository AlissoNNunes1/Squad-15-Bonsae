function Dropdown(props) {
    return (
        <div>
            <button class="filtro">
        Filtrar por
        <div class= "listas">
            <img src={props.foto} alt="filtro"/>
        </div>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a href="#">Opção 1</a></li>
            <li><a href="#">Opção 2</a></li>
            <li><a href="#">Opção 3</a></li>
            <li><a href="#">Opção 4</a></li>
            <li><a href="#">Opção 5</a></li>
        </ul>
    </button>
        </div>
    )
}

export default Dropdown