import { styled } from "@mui/system";

const MatxTagSub = props => {
  let { type, ...rest } = props;
  const styleFun = () => {
    switch (type) {
      case "purple":
        return {
          background: "#7B1FA2",
          color: "#fff"
        };
      case "red":
        return {
          background: "#D32F2F",
          color: "#fff"
        };
      case "green":
        return {
          background: "#4CAF50",
          color: "#fff"
        };
      default:
        return {
          background: "#1976D2",
          color: "#fff"
        };
    }
  };
  const TagBox = styled("div")(() => ({
    padding: "2px 12px",
    fontWeight: 600,
    fontSize: "12px",
    textAlign: 'center',
    borderRadius: '999px',
    background: styleFun().background,
    color: styleFun().color
  }));

  return <TagBox {...rest}>{props.children}</TagBox>;
};

export default MatxTagSub;
