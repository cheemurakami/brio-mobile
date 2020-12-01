import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgStarMainIcon() {
  const svgMarkup = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.4372 1.06301C11.6267 0.533441 12.3366 0.441856 12.6543 0.90601L16.911 7.12579C17.0354 7.30751 17.2391 7.41882 17.4592 7.4253L24.9929 7.64709C25.5551 7.66364 25.8616 8.31055 25.5183 8.75609L20.9184 14.7265C20.784 14.9009 20.7411 15.1291 20.8029 15.3404L22.92 22.5739C23.078 23.1137 22.5575 23.6051 22.0277 23.4163L14.928 20.8865C14.7206 20.8126 14.4903 20.8423 14.3084 20.9664L8.0832 25.2152C7.61864 25.5322 6.99044 25.189 7.00627 24.6268L7.21839 17.0928C7.22459 16.8727 7.12519 16.6629 6.95093 16.5283L0.986411 11.9207C0.541306 11.5768 0.673595 10.8733 1.2132 10.7146L8.44397 8.58826C8.65522 8.52614 8.82404 8.36676 8.89822 8.15943L11.4372 1.06301Z" fill="#ECC08D"/>
  </svg>  
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100px" />;

  return <SvgImage />;
}
