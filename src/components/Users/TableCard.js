import React from "react";
import NewUser from "./NewUser";

const TableCard = () => {
    return (
        <div className="uk-card uk-card-default">
            <div className="uk-card-media-top">
                <img className="uk-align-center" src="https://res.cloudinary.com/karen491/image/upload/v1594178220/cleanvel/App%20pictures/table-image_zitbkx.jpg" alt="" width={380} />
            </div>
            <div className="body-card">
                <NewUser />
            </div>
        </div>
    )
}

export default TableCard;