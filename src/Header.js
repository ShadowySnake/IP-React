import './index.css';

function Header() {
    const title = 'Istoric';

    return (
        <div className="header">
            <h1>{title}</h1>
        </div>
  );
}

export default Header;

/*
Buttons that should have led to an authentification page
<form action="" className="header__form">
                <input type="text" placeholder="Nume utilizator"/>
                <input type="password" placeholder="Parolă"/>
                <button type="submit">Autentificare</button>
                <button>Înregistrare</button>
            </form>
*/