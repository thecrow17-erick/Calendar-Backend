import * as csv from 'csvtojson';



export const convertCsvToJson = async(path: string):Promise<any[]> =>{
  const data = await csv({
    delimiter: [';',' '],
    checkColumn: true,
    ignoreEmpty: true
  }).fromFile(path);
  return data;
}