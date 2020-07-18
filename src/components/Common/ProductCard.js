import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Text = styled.h4`
font-family: monospace;
color: #17252A;
`
const Border = styled.div`
border: 1px solid gray;
border-radius: 50%;
background-color: #25424dd0;
`

const ProductCard = ({ image, title, to }) => {
    return (
        <Link to={to} >
            <Border className="uk-inline uk-dark">
                <img className="product-card-img" src={image} alt="" />
            </Border>
            <Text className="uk-margin-remove-top test-text">{title}</Text>
        </Link>
    )
};

export default ProductCard;