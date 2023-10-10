import { AttachmentInterface } from '@/backend/services/attachments/interfaces/attachment-interface';
import { FileItem } from '@/components/common/FileUploader';

const fetchFileFromURL = async (
  url: string,
  filename: string
): Promise<File> => {
  const response = await fetch(url);
  const data = await response.blob();
  const file = new File([data], filename, { type: data.type });
  return file;
};

export const formatToFileItem = async (
  dataObj: AttachmentInterface
): Promise<FileItem> => {
  try {
    const file = await fetchFileFromURL(dataObj.path, dataObj.originalFileName);

    const fileItem: FileItem = {
      id: dataObj.id.toString(),
      file: file,
      status: 'loaded',
      error: null,
      reader: new FileReader(),
    };

    return fileItem;
  } catch (error) {
    console.error('There was an error:', error);
    return {
      id: dataObj.id.toString(),
      file: new File([], 'errorFile'),
      status: 'error',
      error: error instanceof DOMException ? error : null,
      reader: new FileReader(),
    };
  }
};

export const formatAllToFileItems = async (
  dataObjects: AttachmentInterface[]
): Promise<FileItem[]> => {
  const promises = dataObjects.map(dataObj => formatToFileItem(dataObj));
  const fileItems = await Promise.all(promises);
  return fileItems;
};
