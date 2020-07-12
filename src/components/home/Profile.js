import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/es"
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

const ProfileCard = styled.div`
align-items: center;
`
const ProfileBody = styled.div`
align-items: center;
text-align: center;
color: rgb(7, 9, 48);
`
const Title = styled.h3`
color: rgb(17, 107, 9);
font-weight: 500;
`

const Profile = () => {
    const user = useSelector(state => state.user.data);

    return (
        <ProfileCard className="uk-card">
            <ProfileBody className="uk-card-body">
                <img className="uk-border-circle uk-align-center" width="90" height="90" src={user.profile_picture ? user.profile_picture : "/images/cleanvel-logo-letter.png"} alt={user.name} />
                <Title className="uk-card-title uk-margin-remove">{user.name} {user.last_name}</Title>
                <p className="uk-margin-remove">Usuario: {user.username}</p>
                <p className="uk-margin-remove">Activo desde {dayjs(user.createdAt).locale("es").format("MMMM YYYY")}</p>
            </ProfileBody>
        </ProfileCard>
    )
};

export default Profile;