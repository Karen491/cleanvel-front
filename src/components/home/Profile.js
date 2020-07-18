import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/es"
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

const Title = styled.h3`
font-weight: 500;
color: white;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const Profile = () => {
    const user = useSelector(state => state.user.data);

    return (
        <div>
            <Title className="uk-text-center">{user.name} {user.last_name}</Title>
            <img className="uk-border-circle uk-align-center" width="100" height="90" src={user.profile_picture ? user.profile_picture : "/images/cleanvel-logo-letter.png"} alt={user.name} />
            <div>
                <span className="uk-margin-large-right">Usuario:</span>
                <span>{user.username}</span>
            </div>
            <hr></hr>
            <div>
                <span className="uk-margin-medium-right">Activo desde:</span>
                <span>{dayjs(user.createdAt).locale("es").format("MMMM YYYY")}</span>
            </div>
        </div>
    )
};

export default Profile;
