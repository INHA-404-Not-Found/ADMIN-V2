import { useEffect, useState } from "react";
import tableStyles from "../../styles/Table2.module.css";
import checkboxStyle from "../../styles/CheckboxLabel.module.css";
import toggleStyle from "../../styles/Toggle.module.css";
import { getAllCategories } from "../../api/category";
import { getAllLocations } from "../../api/location";

export default function GainTableRegist({
  toggleChecked,
  setToggleChecked,
  setStudentId,
  categories,
  setCategories,
  setLocation,
  setLocationDetail,
  setStorageLocation,
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
          <th>습득물에 학번 존재 유무</th>
          <td>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <input
                type="checkbox"
                id="Toggle"
                className={toggleStyle.Toggle}
                checked={toggleChecked}
                onChange={(e) => setToggleChecked(e.target.checked)}
                hidden
              />
              <label htmlFor="Toggle" className={toggleStyle.ToggleSwitch}>
                <span className={toggleStyle.ToggleButton}></span>
              </label>
              <input
                type="text"
                disabled={!toggleChecked}
                placeholder={toggleChecked ? "작성 가능" : "토글 켜야 입력 가능"}
                style={{
                  padding: "5px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  flex: 1,
                }}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
          </td>
        </tr>
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
          <th>습득 장소</th>
          <td>
            <select
              defaultValue={-1}
              onChange={(e) => setLocation(Number(e.target.value))}
            >
              <option key={-1} value={-1}>--미선택--</option>
              {locationList.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            <input
              type="text"
              style={{ marginTop: "4px" }}
              onChange={(e) => setLocationDetail(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>보관 위치</th>
          <td>
            <input type="text" onChange={(e) => setStorageLocation(e.target.value)} />
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
            <textarea onChange={(e) => setContent(e.target.value)} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
