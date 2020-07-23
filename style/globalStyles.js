import { COLORS } from "./colors";

export const GLOBAL_STYLES = {
  PADDING: 16,
  MARGIN_LEFT: 20,
};

export const columnStyles = {
  cardWrapper: {
    flexDirection: "column",
    width: 150,
    height: 280,
    borderRadius: 8,
    backgroundColor: COLORS.DARK,
    margin: 5,
    marginBottom: 20,
  },

  imgWrapper: {
    width: "100%",
    height: 174,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  productImg: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
};
