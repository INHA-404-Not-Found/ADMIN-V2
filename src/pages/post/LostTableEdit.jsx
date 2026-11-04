import tableStyles from "../../styles/Table2.module.css";
import checkboxStyle from "../../styles/CheckboxLabel.module.css";

export default function LostTableEdit({ postDetail, setPostDetail, categoryList }) {
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
                        const updatedCategories = prev.categories.includes(e.name)
                          ? prev.categories.filter(c => c !== e.name)
                          : [...prev.categories, e.name];
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
          <th>제목</th>
          <td>
            <input
              type="text"
              defaultValue={postDetail.title}
              onChange={(e) =>
                setPostDetail(prev => ({ ...prev, title: e.target.value }))
              }
            />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea
              defaultValue={postDetail.content}
              onChange={(e) =>
                setPostDetail(prev => ({ ...prev, content: e.target.value }))
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
