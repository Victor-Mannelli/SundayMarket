import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { PageDefaultStyle, SearchBar, SearchIcon, StyledInput } from "../GeneralStyles";
import Product from "../components/Product";
import Header from "../components/Header";
import loading from "../assets/loading.gif";
import MobileHeader from "../components/MobileHeader";

export default function HomePage() {
	const [productsList, setProductsList] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios
			.get("https://sundaymarket-api.onrender.com/products")
			.then((e) => setProductsList(e.data))
			.catch((e) => console.log(e));
	}, []);
	
	return productsList.length === 0 ? (
		<LoadingPage>
			<Header />
			<img src={loading} alt="loading" />
		</LoadingPage>
	) : (
		<PageDefaultStyle>
			<Header />
			<MobileHeader />
			<SearchBar>
				<StyledInput
					placeholder="Search for an Item"
					onChange={(e) => setFilter(e.target.value)}
				/>
				<SearchIcon />
			</SearchBar>
			<Products>
				{filter !== "" && (
					<div>
						<Title>
							<h1> Are you looking for </h1>
						</Title>
						<EspecificProducts>
							{productsList?.allproducts
								?.filter((e) => e.name.toLowerCase().includes(filter) === true)
								.map((e) => {
									return (
										<Product
											key={e._id}
											name={e.name}
											price={e.price}
											image={e.image}
											quantity={e.stock}
											productId={e._id}
										/>
									);
								})}
						</EspecificProducts>
					</div>
				)}
				<div>
					<Title> 
						<h1> All Products</h1>
					</Title>
					<EspecificProducts>
						{productsList?.allproducts?.map((e) => {
							return (
								<Product
									key={e._id}
									name={e.name}
									price={e.price}
									quantity={e.stock}
									image={e.image}
									productId={e._id}
								/>
							);
						})}
					</EspecificProducts>
				</div>
			</Products>
		</PageDefaultStyle>
	);
}
const Products = styled.div`
	width: 80%;
	display: grid;
	grid-template-rows: auto auto auto;
	padding-bottom: 25px;
	@media (max-width: 993px) {
		width: 95%;
	}
`;
const EspecificProducts = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 250px);
	grid-gap: 15px;
	justify-content: center;
`;
const Title = styled.div`
	display: flex;
	justify-content: center;
	padding: 15px;
	color: black;
	font-family: "Roboto", sans-serif;
	font-size: 20px;
`;
const LoadingPage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 70px;
	width: 100%;
	min-height: 100vh;
	background-color: var(--darkmode);
	cursor: default;
	img {
		width: 100px;
		height: 100px;
	}
`;
