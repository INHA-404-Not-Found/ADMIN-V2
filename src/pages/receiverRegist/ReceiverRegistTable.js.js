import { useState } from "react";
import tableStyles from "../../styles/Table2.module.css";

export default function ReceiverRegistTable({
  postId,
  setReceiver,
  setEmail,
  setPhoneNumber,
  setStudentId,
}) {
  const [localPart, setLocalPart] = useState("");
  const [domainPart, setDomainPart] = useState("");

  const handleChange1 = (part, value) => {
    if (part === "local") setLocalPart(value);
    if (part === "domain") setDomainPart(value);

    // 두 부분 합쳐서 email 상태 업데이트
    const newEmail =
      part === "local" ? `${value}@${domainPart}` : `${localPart}@${value}`;
    setEmail(newEmail);
  };

  const [part1, setPart1] = useState("010"); // 기본값 010
  const [part2, setPart2] = useState("");
  const [part3, setPart3] = useState("");

  const handleChange2 = (part, value) => {
    if (part === "part1") setPart1(value);
    if (part === "part2") setPart2(value);
    if (part === "part3") setPart3(value);

    // 세 부분 합쳐서 phone 상태 업데이트
    const newPhone =
      part === "part1"
        ? `${value}-${part2}-${part3}`
        : part === "part2"
          ? `${part1}-${value}-${part3}`
          : `${part1}-${part2}-${value}`;

    setPhoneNumber(newPhone);
  };

  return (
    <table className={tableStyles.Table2}>
      <tbody>
        <tr>
          <th>게시물 번호</th>
          <td>#{postId}</td>
        </tr>
        <tr>
          <th>
            수령인<span className={tableStyles.Req}>*</span>
          </th>
          <td>
            <input
              type="text"
              placeholder="이름"
              onChange={(e) => setReceiver(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>
            이메일<span className={tableStyles.Req}>*</span>
          </th>
          <td>
            <div className={tableStyles.Split}>
              <input
                type="text"
                placeholder="아이디"
                value={localPart}
                onChange={(e) => handleChange1("local", e.target.value)}
              />
              <span className={tableStyles.Sep}>@</span>
              <input
                type="text"
                placeholder="inha.edu"
                value={domainPart}
                onChange={(e) => handleChange1("domain", e.target.value)}
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>
            전화번호<span className={tableStyles.Req}>*</span>
          </th>
          <td>
            <div className={tableStyles.Split}>
              <input
                type="text"
                inputMode="numeric"
                maxLength={3}
                value={part1}
                onChange={(e) => handleChange2("part1", e.target.value)}
              />
              <span className={tableStyles.Sep}>-</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={part2}
                onChange={(e) => handleChange2("part2", e.target.value)}
              />
              <span className={tableStyles.Sep}>-</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={part3}
                onChange={(e) => handleChange2("part3", e.target.value)}
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>학번</th>
          <td>
            <input
              type="text"
              className={tableStyles.Mono}
              inputMode="numeric"
              placeholder="12201234 (선택)"
              onChange={(e) => setStudentId(e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
