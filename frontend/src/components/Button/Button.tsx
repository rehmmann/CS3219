import { IconButton } from "@mui/material";

type ButtonProps = {
  title: string,
  event: () => void,
  style: React.CSSProperties,
}

const Button = (props: ButtonProps) => {
  const { title, event, style } = props;

  return (
    <IconButton
      sx={{
        color: 'black',
        backgroundColor: 'white',
        height: 33,
        width: 100,
        borderRadius: 14,
        border: '3px solid black',
        "&:hover": {
          color: 'black',
          border: '3px solid black',
        },
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 13,
        ...style
      }}
      disableRipple
      onClick={event}
    >
      {title}
    </IconButton>
  )
}

export default Button;