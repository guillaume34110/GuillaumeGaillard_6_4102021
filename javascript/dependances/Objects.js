export function Photograph(name, id, city, country, tags, tagline, price, portrait) {

    this.name = name
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
    this.newName= name.replace(/ /g, "");
    
  }

export function Galery(id, photographerId, title, image,video, likes, date, price) {
  
    this.id = id;
    this.photographerId = photographerId
    this.title = title;
    this.image= image;
    this.video= video;
    this.likes = likes
    this.date = date
    this.price = price
    this.foundSrc  = (pathName) =>  {
      let media
      if (image)media =image
      else media = video
      this.src=`./assets/SamplePhotos/${pathName}/${media}`
    }
  }
 