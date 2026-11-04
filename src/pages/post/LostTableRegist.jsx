import { useEffect, useState } from "react";
import tableStyles from "../../styles/Table2.module.css";
import checkboxStyle from "../../styles/CheckboxLabel.module.css";
import { getAllCategories } from "../../api/category";
import { getAllLocations } from "../../api/location";

export default function LostTableRegist({
  categories,
  setCategories,
  setTitle,
  setContent
}) {
  const [categoryList, setCategoryList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    getAllCategories(setCategoryList);
    getAllLocations(setLocationList);
  }, []);

  const handleCheckboxChange = (id) => {
    setCategories((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      return [...prev, id];
    });
  };

  return (
    <table className={tableStyles.Table2}>
      <tbody>
        <tr>
          <th>물품 카테고리</th>
          <td>
            <div className={checkboxStyle.Checkbox_Style}>
              {categoryList.map((e) => (
                <label key={e.id}>
                  <input
                    type="checkbox"
                    checked={categories.includes(e.id)}
                    onChange={() => handleCheckboxChange(e.id)}
                  />
                  <span>{e.name}</span>
                </label>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea rows="5" onChange={(e) => setContent(e.target.value)} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
