import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStores } from "../../redux/StoresDuck";
import { getProducts } from "../../redux/ProductsDuck";
import RouteTitle from "../Common/RouteTitle";
import StoreCard from "../Common/StoreCard";
import { denormalizeData } from "../../utils/formatters";

const Directory = () => {
    const dispatch = useDispatch();
    const stores = useSelector(state => state.stores.stores);

    useEffect(() => {
        dispatch(getStores());
        dispatch(getProducts());
    }, [dispatch]);

    const images = ["https://res.cloudinary.com/karen491/image/upload/c_scale,h_808/v1594705893/cleanvel/App%20pictures/kitchen-cleaning_l9pzbm.jpg", "https://res.cloudinary.com/karen491/image/upload/c_scale,h_808,w_1200/v1594716119/cleanvel/App%20pictures/car-cleaning_ndtgbs.jpg", "https://res.cloudinary.com/karen491/image/upload/c_scale,h_808,w_1200/v1594716643/cleanvel/App%20pictures/storage-icon_qwy591.jpg"]

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-margin-large-left uk-padding-remove-bottom">
                <RouteTitle title="Tiendas Cleanvel" img="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1594704795/cleanvel/App%20pictures/stores-icon_v0aop3.png" />
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-flex uk-flex-center uk-margin-medium-top">
                {denormalizeData(stores).map((store, index) => (
                    <StoreCard data={store} key={index} connect={`card-${index}`} img={images[index]} />
                ))}
            </div>
        </div>
    )
};

export default Directory;