import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadZip = async (data: string[], fileName: string) => {
  const zip = new JSZip();

  for (const [index, url] of data.entries()) {
    const response = await fetch(url);

    const blob = await response.blob();

    zip.file(`image_${index + 1}.jpg`, blob);
  }
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `${fileName}.zip`);
  });
};
