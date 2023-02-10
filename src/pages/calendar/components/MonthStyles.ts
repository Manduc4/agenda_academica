import { SxProps } from "@mui/material";

export const monthStyle: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  // backgroundColor: "cyan",
};

interface ColumnMonthStyle {
  general: SxProps;
  numbers: SxProps;
}

export const columnMonthStyle: ColumnMonthStyle = {
  general: {
    width: "100%", display: "flex", flexDirection: "column"
  },
  numbers: {
    with: '100%', textAlign: 'center', marginTop: 2
  }
};

export const dayStyle: SxProps = {
  border: '1px solid',
  borderRadius: 3,
  margin: 1,
  minHeight: 50,
  ":hover":{ backgroundColor: '#aaa', cursor: 'pointer'}
};

// export { monthStyle, columnMonthStyle, dayStyle };
