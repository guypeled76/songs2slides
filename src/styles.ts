import pptxgen from "pptxgenjs";

export const FontStyle = "Arial";

export const TitleStyle : pptxgen.TextPropsOptions = { 
  x: 0.5,
  y: 0.5, 
  w: "90%",
  fontFace: FontStyle,
  color: "363636", 
  fontSize: 16,
  align: "right",
  margin: 0.5
};

export const SubtitleStyle : pptxgen.TextPropsOptions = { 
  x: 0.5,
  y: 1, 
  w: "90%",
  fontFace: FontStyle,
  color: "363636", 
  fontSize: 13,
  align: "right",
  margin: 0.5
};

export const TableStyle : pptxgen.TableProps = {
  x: 0.5,
  y: 1.4,
  w: "90%",
  h: 4,
  fontFace: FontStyle,
  fontSize: 12,
  color: "000000",
  valign: "top",
  align: "right",
  margin: 0,
};

export const IndexTableStyle : pptxgen.TableProps = {
  x: 0.5,
  y: 0.8,
  w: "90%",
  h: 5,
  fontFace: FontStyle,
  fontSize: 11,
  color: "000000",
  valign: "top",
  align: "right",
  margin: 0,
  rowH: 0.18
};

export const IndexTitle = "שירים";

export const linesPerColumn = 13;
