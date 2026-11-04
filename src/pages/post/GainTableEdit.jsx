import tableStyles from "../../styles/Table2.module.css";
import checkboxStyle from "../../styles/CheckboxLabel.module.css";

export default function GainTableEdit({ postDetail, setPostDetail, categoryList, locationList }) {
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
                    checked={postDetail.categories?.includes(e.name) || false}
                    onChange={() => {
                      setPostDetail((prev) => {
                        let updatedCategories;
                        if (prev.categories.includes(e.name)) {
                          updatedCategories = prev.categories.filter(c => c !== e.name);
                        } else {
                          updatedCategories = [...prev.categories, e.name];
                        }
                        return { ...prev, categories: updatedCategories };
                      });
                    }}
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
              value={postDetail.locationName || -1}
              onChange={(e) => {
                const selectedName = e.target.value;
                setPostDetail(prev => ({ ...prev, locationName: selectedName }));
              }}
            >
              <option key={-1} value={-1}>--미선택--</option>
              {locationList.map((e) => (
                <option key={e.id} value={e.name}>{e.name}</option>
              ))}
            </select>
            <input
              type="text"
              style={{ marginTop: "4px" }}
              defaultValue={postDetail.locationDetail}
              onChange={(e) => setPostDetail(prev => ({ ...prev, locationDetail: e.target.value }))}
            />
          </td>
        </tr>
        <tr>
          <th>보관 위치</th>
          <td>
            <input
              type="text"
              defaultValue={postDetail.storedLocation}
              onChange={(e) => setPostDetail(prev => ({ ...prev, storedLocation: e.target.value }))}
            />
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td>
            <input
              type="text"
              defaultValue={postDetail.title}
              onChange={(e) => setPostDetail(prev => ({ ...prev, title: e.target.value }))}
            />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea
              defaultValue={postDetail.content}
              onChange={(e) => setPostDetail(prev => ({ ...prev, content: e.target.value }))}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
