// import Link from 'next/Link'
import { RiMenu3Line } from 'react-icons/ri';

export default function Navbar({connectWallet, address}) {
  return (
   <>
  <nav className="navbar navbar-expand-lg text-white py-3" style={{backgroundColor:'#161b22', background:'rgba(0,0,0,0.1)'}}>
  <div className="container-fluid">
    <a className="navbar-brand" style={{color:'white', fontWeight: 'bold'}} href="#">Dragon Ball Club</a>
    <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <RiMenu3Line size={28} style={{color:'white'}} />
    </div>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav" style={{marginLeft:'auto'}}>
        <li className="nav-item">
          <a className="nav-link text-white" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/profile">Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white disabled">Disabled</a>
        </li>

      </ul>
      <button disabled={address && true} onClick={!address ? () => connectWallet('injected') : null} className="btn btn-outline-warning">{address ?  address.slice(0,14) : 'Connect Wallet'}</button>

    </div>
  </div>
</nav>
   </>
  )
}