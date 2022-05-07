import { react, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";
import axios from "axios";
import { TextField } from "@mui/material/TextField";

export default function MenuAppBar() {
	const [auth, setAuth] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const history = useHistory();
	const logout = () => {
		axiosInstance.post("logout/", {
			refresh_token: localStorage.getItem("refresh_token"),
		});
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		axiosInstance.defaults.headers["Authorization"] = null;
		history.push("/signin");
	};

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [name, setName] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:8000/user/profile", {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNzYwNTA1LCJpYXQiOjE2NTE3NjAyMDUsImp0aSI6ImNmMjdhZTE0MmEwMzQ4YWRiZDFiYmUwZDAzOGFhYTE2IiwidXNlcl9pZCI6MX0.lMXL6Y9WFv3glGr7KdI14VwWLW4_qC3EKEZf2dZOPik`,
				},
			})
			.then((res) => {
				console.log(res.data);

				const { fname, lname } = res.data;
				setName(fname + " " + lname);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				
				<AppBar position='fixed' sx={{ backgroundColor: "black" }}>
					<Toolbar>
						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							<Link
								href='/landing'
								style={{
									color: "white",
									textDecoration: "none",
									cursor: "pointer",
								}}
							>
								FaceDoc
							</Link>
						</Typography>
						{auth && (
							<div>
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleMenu}
									color='inherit'
								>
									<AccountCircle /> <Typography padding={1}>{name}</Typography>
								</IconButton>
								<Menu
									id='menu-appbar'
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem>
										{" "}
										<Link className='home-link' to='/user'>
											Profile
										</Link>{" "}
									</MenuItem>
									<MenuItem onClick={logout}>
										{" "}
										<Link className='home-link' to='/signin'>
											Logout
										</Link>
									</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	);
}