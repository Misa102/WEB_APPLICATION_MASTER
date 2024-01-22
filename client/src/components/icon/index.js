export default function Icon({ iconName, color }) {
    return (
        <span className="material-symbols-outlined" style={{ color: color }}>
            {iconName}
        </span>
    );
}
