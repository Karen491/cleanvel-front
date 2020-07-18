import React from "react";
import styled from "styled-components";
import EditStore from "../Stores/EditStore";

const CardContainder = styled.div`
background-color: #25424dd0;
color: #FEFFFF;
border: 1px solid #90a09f;
border-radius: 5%;

h3, h2, h5, h4, p {
color: #FEFFFF;  
}
`

const Img = styled.img`
border-top-left-radius: 5%;
border-top-right-radius: 5%;
`

const StoreCard = ({ data, connect, img }) => {

    return (
        <CardContainder className="uk-width-1-4@m uk-margin-left uk-margin-right" uk-grid="true">
            <ul className="uk-switcher" id={connect}>
                <li>
                    <div className="uk-card-media-top">
                        <Img className="uk-width-1-1" src={img} alt="" />
                    </div>
                    <div className="uk-card-body">
                        <h3 className="uk-margin-remove">{data.name}</h3>
                        <h5 className="uk-margin-remove"><span uk-icon="icon: location; ratio: 1.2"></span>{data.address.state}, {data.address.country}</h5>
                    </div>
                </li>

                <li>
                    <div className="uk-card-body">
                        <div className="uk-flex">
                            <h2 className="uk-margin uk-margin-right">Detalles</h2>
                            <EditStore id={data._id} />
                        </div>

                        <div>
                            <h4 className="uk-margin-remove-bottom">Dirección:</h4>
                            <p className="uk-margin-remove-top">{data.address.street}, {data.address.zip_code} {data.address.city}, {data.address.state}.</p>
                        </div>

                        <div>
                            <h4 className="uk-margin-remove-bottom">Teléfono:</h4>
                            <p className="uk-margin-remove-top">{data.phone_number}</p>
                        </div>
                    </div>
                </li>
            </ul>

            <ul className="uk-subnav uk-margin-remove-top uk-margin-right uk-flex-right" uk-switcher={`connect: #${connect}`}>
                <li><a className="uk-text-capitalize" href="/"><p>General</p></a></li>
                <li><a className="uk-text-capitalize" href="/"><p>. . .</p></a></li>
            </ul>
        </CardContainder>
    )
};

export default StoreCard;