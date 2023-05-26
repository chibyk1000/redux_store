import axios from "axios";

export const uploadMultipleFiles = async (files: File[], url: string) => {
  try {
    let urls = [];
      for (let i = 0; i < files.length; i++) {
          const formdata = new FormData();
               formdata.append("file",files[i] );
      urls.push(axios.post(url, formdata));
    }


      const res: any = await axios.all(urls);
    
      
    let output: string[] = [];
    for (let i = 0; i < res.length; i++) {
        let link = res[i].data.location;
      output.push(link);
    }
    return output;
  } catch (error) {
      
      console.log(error);
      
  }
};
