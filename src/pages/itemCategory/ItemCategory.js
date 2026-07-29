import StatusSelect from "../../components/StatusSelect";
import styles from "../../styles/Mainboard.module.css";
import tableStyles from "../../styles/Table3.module.css";
import pageStyles from "../../styles/Pagination.module.css";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../api/category";

export default function ItemCategory() {
    const [categoryList, setCategoryList] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        getAllCategories(setCategoryList);
    }, []);

    const fetchCategories = () => {
        getAllCategories(setCategoryList);
    };

    {/*메인보드*/}
    return (
        <div className={styles.Container}>
            <div className={styles.Title_Container}>물품 카테고리 관리</div>

            <br></br>

            {/*검색창*/}
            <div className={styles.Add_Input}>
                <input
                    placeholder="물품 카테고리 추가" 
                    value={newCategory}
                    onChange={(e) => {setNewCategory(e.target.value);}}
                />
                <button
                    type="submit"
                    onClick={async () => {
                        if (newCategory.trim() === "") return alert("값을 입력하세요.");
                        await createCategory(newCategory);

                        setNewCategory("");
                        fetchCategories();
                    }}
                >
                    추가하기
                </button>
            </div>

            <br></br>

            {/*물품 카테고리 리스트*/}
            <div>
                {/*테이블*/}
                <div>
                    <table className={tableStyles.Table}>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>카테고리</th>
                                <th>수정하기</th>
                                <th>삭제하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList.map((e) => (
                                <tr key={e.id}>
                                    <td style={{ textAlign:"center" }}>{e.id}</td>
                                    <td style={{ textAlign:"center" }}>{e.name}</td>
                                <td 
                                    style={{ textAlign:"center", cursor: "pointer" }}
                                    className="action modify"
                                    onClick={async () => {
                                        const categoryName = prompt("수정할 카테고리 이름을 적으세요.");
                                        if(!categoryName || categoryName.trim() === ""){
                                            return;
                                        }
                                        await updateCategory(e.id, categoryName);
                                        fetchCategories();
                                    }}
                                >
                                    수정하기
                                </td>

                                <td style={{ textAlign:"center", cursor: "pointer" }}
                                    className="action delete"
                                    onClick={async () => {
                                        const deleteConfirmMsg = prompt("삭제하면 복구할 수 없습니다. 삭제하려면 카테고리의 이름을 그대로 따라 적으세요.")
                                        if(deleteConfirmMsg === e.name){
                                            await deleteCategory(e.id);
                                            fetchCategories();
                                        } else{
                                            alert("일치하지 않습니다.")
                                        }
                                    }}
                                >
                                    삭제하기
                                </td>
                                </tr>
                            ))}
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={pageStyles.Pagination}>
            </div>

            <footer className={styles.FooterContainer}>
                <div>© 2025 404-Not-Found. All rights reserved.</div>
                <div>jiyun421 | eheka78 | Kdoby | yuminmi</div>
            </footer>
        </div>
    )

}