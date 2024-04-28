import './button.scss'

export default function Button({text, onClick}) {
    return (
        <button className="chal-button" onClick={onClick}>
            {text}
        </button>
    )
}