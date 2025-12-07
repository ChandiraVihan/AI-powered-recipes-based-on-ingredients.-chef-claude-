import headerImage from './assets/chef-claude-icon.png';


function Header(){
    return(
        <header>
            <img className = "headerImage" src={headerImage} alt="Chef Claude Icon" />
            <span>Chef Claude</span>
        </header>
    )
}

export default Header;