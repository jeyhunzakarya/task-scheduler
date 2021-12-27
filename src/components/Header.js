import Button from "./Button"
const Header = ({title, onAdd, showAdd}) => {
    return (
    <header className="header">
        <h1>{title.title}</h1>
        {<Button color = {showAdd? "red" : "blue"} text = {showAdd? "close" : "open add task"} onclick={onAdd}/>}
    </header>            
    )
}

export default Header
