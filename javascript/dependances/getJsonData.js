
export const getJsonData = async() => {
      const url = "../data/data.json"
      const jsonData = await fetch(url)
      const data = await jsonData.json()

      const photographData = [...data.photographers];
      const mediaData = [...data.media];

      return {
        photographData,
        mediaData
      }
}