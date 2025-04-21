export default function Die(props) {
    const buttonStyle = {
            backgroundColor: props.isHeld ? "#59E391" : "white"
        } 

    return (
        <button style={buttonStyle} onClick={props.hold}>
            {props.value}
        </button>
    )
}