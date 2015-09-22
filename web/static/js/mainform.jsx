var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var Nav = ReactBootstrap.Nav;
var MenuItem = ReactBootstrap.MenuItem;

import TxtResultList from "./txt_result_list"

class MainForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			page: "Empty"
		};
	}
	
	componentDidMount() {
	}

	handleClick(str) {
		console.log("Loading " + str);
		this.setState({
			page: str
		});
	}

	render() {
		var content = <div/>;
		switch(this.state.page) {
			case 'TxtResultList':
				content = <TxtResultList/>;
				break;
			default:
				content = <div/>;
				break;
		}
		return (
				<div>
				<Navbar brand="Tx Portal">
				<Nav>
				<NavItem eventKey={1} href="javascript:void(0);" onClick={this.handleClick.bind(this, "TxtResultList")}>Test Results</NavItem>
				<NavItem eventKey={2} href="#" onClick={this.handleClick.bind(this, "Abc")}>Abc</NavItem>
				<NavDropdown eventKey={3} title="More" id="basic-nav-dropdown">
				<MenuItem eventKey="1">Action</MenuItem>
				<MenuItem eventKey="2">Another action</MenuItem>
				<MenuItem eventKey="3">Something else here</MenuItem>
				<MenuItem divider />
				<MenuItem eventKey="4">Separated link</MenuItem>
				</NavDropdown>
				</Nav>
				</Navbar>
				{content}
				</div>
		       )
	}
}

export default MainForm
