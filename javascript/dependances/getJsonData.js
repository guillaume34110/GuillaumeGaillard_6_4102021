
export const getJsonData = async() => {
      const url = "../data/API/data.json"
      const jsonData = await fetch(url)
      const data = await jsonData.json()
     
      console.log(data);
      const photographData = [...data.photographers];
      const mediaData = [...data.media];

      return {
        photographData,
        mediaData
      }
}