import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgProfileIcon() {
  const svgMarkup = `<svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8.5" cy="8.5" r="8.5" fill="#ECC08D"/>
  <circle cx="8.49996" cy="8.50005" r="4.72222" fill="#DEA768"/>
  <rect x="4.71033" y="17.3541" width="7.68542" height="9.91667" rx="0.991667" fill="#ECC08D"/>
  <rect x="3.22299" y="17.3541" width="10.6604" height="6.44583" rx="0.991667" fill="#ECC08D"/>
  </svg>   
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100px" />;

  return <SvgImage />;
}
