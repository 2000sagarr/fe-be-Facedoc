import Button from "./Button"

const Header = ({title}) => {
    const onclick= ()=>{
        alert('Helloo')
    }
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button color='black' text='Add' onClick={onclick} />
    </header>
  )
}

Header.defaultProps={
    title: "Sample React",
}

export default Header