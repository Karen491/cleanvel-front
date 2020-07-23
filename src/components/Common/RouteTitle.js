import React from "react";
import styled from 'styled-components'

const Title = styled.h3`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
font-weight: 600;
`

const RouteTitle = ({ title, img }) => {
    return (
        <Title className="uk-margin-top uk-text-capitalize">
            <span><img className="uk-margin-small-right" src={img} alt="" width={60} /></span>
            {title}
        </Title>
    )
}

export default RouteTitle;