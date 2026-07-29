import { useState } from "react";
import ItemCategory from "./ItemCategory";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";
import PopUpFrame from "../../components/PopUpFrame";


export default function ItemCategoryPage() {
    const [showPopUp, setShowPopUp] = useState(false);
    const [type, setType] = useState('');

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "2fr 9fr",
                height: "100%"
            }}
        >
            {/*왼쪽 메뉴*/}
            <div
                style={{
                    background: "#fafafa",
                    border: "1px solid #ddd",
                    boxShadow: "inset -5px 0 8px rgba(0, 0, 0, 0.15)",

                    position: "sticky",
                    top: 0,
                    overflowY: "auto",
                    height: "100%",
                }}
            >
                <div style={{margin: "0 5% 0 10%" }}>
                    {/*로고*/}
                    <Logo />

                    <br></br>

                    {/*메뉴*/}
                    <Menu setShowPopUp={setShowPopUp} setType={setType} />
                </div>
            </div>
            
            {/*메인보드*/}
            <div
                style={{
                    overflowY: "auto",
                    height: "100vh",
                }}
            >
                <ItemCategory />
            </div>

            {showPopUp && <PopUpFrame type={type} setType={setType} onClose={() => setShowPopUp(false)} />}
        </div>
    )

}