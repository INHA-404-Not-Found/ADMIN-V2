import Mainboard from "./Mainboard";
import Logo from "../../components/Logo";
import Menu from "../../components/Menu";

import { useState } from "react";
import PopUpFrame from "../../components/PopUpFrame";
import { getAllPosts, modifyPosts } from "../../api/post";

export default function MainPage() {
    const [postList, setPostList] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [type, setType] = useState('');
    const [postId, setPostId] = useState(0);

    const fetchPostList = async () => {
        await getAllPosts(setPostList, 1);
    };

    // 수령인 등록 화면 저장
    const handleSave = async () => {
        await modifyPosts(Array.isArray(postId) ? postId : [postId], "COMPLETED");

        setShowPopUp(false);
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "2fr 9fr",
                height: "100%",
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
                <Mainboard
                    showPopUp={showPopUp}
                    setShowPopUp={setShowPopUp}
                    setType={setType}
                    setPostId={setPostId}
                    postList={postList}
                    setPostList={setPostList}
                />
            </div>

            {showPopUp &&
                <PopUpFrame
                    type={type} setType={setType} postId={postId} 
                    onClose={ async () => setShowPopUp(false) } 
                    handleSave={handleSave}
                />
            }
        </div>
    )
}