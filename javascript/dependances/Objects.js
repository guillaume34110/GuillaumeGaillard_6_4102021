export function Photograph(name, id, city, country, tags, tagline, price, portrait) {

    this.name = name
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
    this.newName= name.replace(/ /g, ""); // permet de cré le nom a affiché
    
  }

export function Galery (id, photographerId, title, likes, date, price) { // fonction Objet
  
    this.id = id;
    this.photographerId = photographerId
    this.title = title;
    this.likes = likes
    this.date = date
    this.price = price
    
  
  this.createMedia =(data)  => {
    if (data.image) 
    return new Image(data.id ,data.photographerId,data.title,data.image,data.likes,data.date,data.price)
    if (data.video) 
    return new Video(data.id ,data.photographerId,data.title, data.video,data.likes,data.date,data.price)
  }
  
    this.foundSrc = (pathName) => { // permet de cré l'url de l'objet
      let media
      if (this.image)media =this.image
      else media = this.video
      this.src=`./assets/SamplePhotos/${pathName}/${media}`
    }
  }
 class Video extends Galery{//class qui extend la fonction galery et permet de crée les videos
  constructor(id, photographerId, title,video, likes, date, price) {
    super(id, photographerId, title, likes, date, price)
    this.video = video
  }
}

 class Image extends Galery{
  constructor(id, photographerId, title,image, likes, date, price) {
    super(id, photographerId, title, likes, date, price)
    this.image = image
  }
}