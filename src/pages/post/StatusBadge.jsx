import tableStyles from "../../styles/Table2.module.css";

const STATUS = {
  UNCOMPLETED: ["미완료", tableStyles.BadgeUncompleted],
  COMPLETED: ["완료", tableStyles.BadgeCompleted],
  POLICE: ["인계", tableStyles.BadgePolice],
};

export default function StatusBadge({ status }) {
  const matched = STATUS[status];
  if (!matched) return "-";

  const [label, colorClass] = matched;

  return <span className={`${tableStyles.Badge} ${colorClass}`}>{label}</span>;
}
