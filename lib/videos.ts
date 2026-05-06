export interface VideoEntry {
  title: string
  artist: string
  videoId: string
  year: number
  tags: string[]
}

export type Decade = '60s' | '70s' | '80s' | '90s' | '00s' | '10s' | '20s'

export const videos: Record<Decade, VideoEntry[]> = {
  "60s": [
    {"title":"Can't Help Falling in Love","artist":"Elvis Presley","videoId":"vGJTaP6anOU","year":1961,"tags":["pop"]},
    {"title":"I Want to Hold Your Hand","artist":"The Beatles","videoId":"jenWdylTtzs","year":1963,"tags":["rock"]},
    {"title":"Respect","artist":"Aretha Franklin","videoId":"6FOUqQt3Kg0","year":1967,"tags":["soul"]},
    {"title":"Stand By Me","artist":"Ben E. King","videoId":"hwZNL7QVJjE","year":1961,"tags":["soul"]},
    {"title":"My Girl","artist":"The Temptations","videoId":"qEztui18cA8","year":1964,"tags":["motown"]},
    {"title":"California Dreamin'","artist":"The Mamas & the Papas","videoId":"N-aK6JnyFmk","year":1965,"tags":["folk"]},
    {"title":"Paint It Black","artist":"The Rolling Stones","videoId":"O4irXQhgMqg","year":1966,"tags":["rock"]},
    {"title":"Light My Fire","artist":"The Doors","videoId":"qoX6AKuYWL8","year":1967,"tags":["rock"]},
    {"title":"Good Vibrations","artist":"The Beach Boys","videoId":"Eab_beh07HU","year":1966,"tags":["pop"]},
    {"title":"Come Together","artist":"The Beatles","videoId":"45cYwDMibGo","year":1969,"tags":["rock"]},
    {"title":"These Boots Are Made for Walkin'","artist":"Nancy Sinatra","videoId":"SbyAZQ45uww","year":1966,"tags":["pop"]},
    {"title":"A Whiter Shade of Pale","artist":"Procol Harum","videoId":"Mb3iPP-tHdA","year":1967,"tags":["rock"]},
    {"title":"The Sound of Silence","artist":"Simon & Garfunkel","videoId":"4zLfCnGVeL4","year":1965,"tags":["folk"]},
    {"title":"Sugar Sugar","artist":"The Archies","videoId":"h9nE2spOw_o","year":1969,"tags":["pop"]},
    {"title":"Surfin' USA","artist":"The Beach Boys","videoId":"EDb303T-B1w","year":1963,"tags":["pop"]},
    {"title":"Twist and Shout","artist":"The Beatles","videoId":"2RicaUqd9Hg","year":1963,"tags":["rock"]},
    {"title":"Be My Baby","artist":"The Ronettes","videoId":"jSPpbOGnFgk","year":1963,"tags":["pop"]},
    {"title":"Runaway","artist":"Del Shannon","videoId":"0S13mP_pfEc","year":1961,"tags":["rock"]},
    {"title":"I Heard It Through the Grapevine","artist":"Marvin Gaye","videoId":"cXWHpbpNdHE","year":1968,"tags":["soul"]},
    {"title":"Piece of My Heart","artist":"Janis Joplin","videoId":"SCngPse1iiI","year":1968,"tags":["rock"]}
  ],
  "70s": [
    {"title":"Bohemian Rhapsody","artist":"Queen","videoId":"fJ9rUzIMcZQ","year":1975,"tags":["rock"]},
    {"title":"Stayin' Alive","artist":"Bee Gees","videoId":"I_izvAbhExY","year":1977,"tags":["disco"]},
    {"title":"Hotel California","artist":"Eagles","videoId":"EqPtz5qN7HM","year":1976,"tags":["rock"]},
    {"title":"Imagine","artist":"John Lennon","videoId":"YkgkThdzX-8","year":1971,"tags":["pop"]},
    {"title":"Superstition","artist":"Stevie Wonder","videoId":"0CFuCYNx-1g","year":1972,"tags":["funk"]},
    {"title":"Dancing Queen","artist":"ABBA","videoId":"xFrGuyw1V8s","year":1976,"tags":["pop"]},
    {"title":"Le Freak","artist":"Chic","videoId":"h1qQ1SKNlgY","year":1978,"tags":["disco"]},
    {"title":"September","artist":"Earth, Wind & Fire","videoId":"Gs069dndIYk","year":1978,"tags":["funk"]},
    {"title":"Go Your Own Way","artist":"Fleetwood Mac","videoId":"6ul-cZyuYq4","year":1977,"tags":["rock"]},
    {"title":"Roxanne","artist":"The Police","videoId":"3T1c7GkzRQQ","year":1978,"tags":["rock"]},
    {"title":"We Will Rock You","artist":"Queen","videoId":"-tJYN-eG1zk","year":1977,"tags":["rock"]},
    {"title":"Blame It on the Boogie","artist":"Jacksons","videoId":"nqxVMLVe62U","year":1978,"tags":["funk"]},
    {"title":"I Will Survive","artist":"Gloria Gaynor","videoId":"6dYWe1c3OyU","year":1978,"tags":["disco"]},
    {"title":"Dreams","artist":"Fleetwood Mac","videoId":"5oWyMakvQew","year":1977,"tags":["rock"]},
    {"title":"Let It Be","artist":"The Beatles","videoId":"QDYfEBY9NM4","year":1970,"tags":["rock"]},
    {"title":"American Pie","artist":"Don McLean","videoId":"PRpiBpDy7MQ","year":1971,"tags":["folk"]},
    {"title":"Car Wash","artist":"Rose Royce","videoId":"PkxaunLybuM","year":1976,"tags":["funk"]},
    {"title":"Play That Funky Music","artist":"Wild Cherry","videoId":"MDZsNksbw2Q","year":1976,"tags":["funk"]},
    {"title":"Don't Stop Me Now","artist":"Queen","videoId":"HgzGwKwLmgM","year":1979,"tags":["rock"]},
    {"title":"Heart of Glass","artist":"Blondie","videoId":"WGU_4-5RaxU","year":1979,"tags":["pop"]}
  ],
  "80s": [
    {"title":"Billie Jean","artist":"Michael Jackson","videoId":"Zi_XLOBDo_Y","year":1983,"tags":["pop"]},
    {"title":"Take On Me","artist":"a-ha","videoId":"djV11Xbc914","year":1985,"tags":["pop"]},
    {"title":"Sweet Child O' Mine","artist":"Guns N' Roses","videoId":"1w7OgIMMRc4","year":1987,"tags":["rock"]},
    {"title":"Like a Prayer","artist":"Madonna","videoId":"79fzeNUqQbQ","year":1989,"tags":["pop"]},
    {"title":"Africa","artist":"Toto","videoId":"FTQbiNvZqaY","year":1982,"tags":["rock"]},
    {"title":"Beat It","artist":"Michael Jackson","videoId":"oRdxUFDoQe0","year":1983,"tags":["pop"]},
    {"title":"Thriller","artist":"Michael Jackson","videoId":"sOnqjkJTMaA","year":1983,"tags":["pop"]},
    {"title":"Girls Just Want to Have Fun","artist":"Cyndi Lauper","videoId":"PIb6AZdTr-A","year":1983,"tags":["pop"]},
    {"title":"Careless Whisper","artist":"George Michael","videoId":"izGwDsrQ1eQ","year":1984,"tags":["pop"]},
    {"title":"Never Gonna Give You Up","artist":"Rick Astley","videoId":"dQw4w9WgXcQ","year":1987,"tags":["pop"]},
    {"title":"Eye of the Tiger","artist":"Survivor","videoId":"btPJPFnesV4","year":1982,"tags":["rock"]},
    {"title":"Livin' on a Prayer","artist":"Bon Jovi","videoId":"lDK9QqIzhwk","year":1986,"tags":["rock"]},
    {"title":"Time After Time","artist":"Cyndi Lauper","videoId":"VdQY7BusJNU","year":1984,"tags":["pop"]},
    {"title":"Take My Breath Away","artist":"Berlin","videoId":"Bx51eegLTY8","year":1986,"tags":["pop"]},
    {"title":"Hungry Like the Wolf","artist":"Duran Duran","videoId":"oJL-lCzEXgI","year":1982,"tags":["pop"]},
    {"title":"Karma Chameleon","artist":"Culture Club","videoId":"JmcA9LIIXWw","year":1983,"tags":["pop"]},
    {"title":"Flashdance... What a Feeling","artist":"Irene Cara","videoId":"ILWSp0m9G2U","year":1983,"tags":["pop"]},
    {"title":"Nothing's Gonna Stop Us Now","artist":"Starship","videoId":"3wxyN3z9PL4","year":1987,"tags":["pop"]},
    {"title":"Every Breath You Take","artist":"The Police","videoId":"OMOGaugKpzs","year":1983,"tags":["rock"]},
    {"title":"Wake Me Up Before You Go-Go","artist":"Wham!","videoId":"pIgZ7gMze7A","year":1984,"tags":["pop"]}
  ],
  "90s": [
    {"title":"Smells Like Teen Spirit","artist":"Nirvana","videoId":"hTWKbfoikeg","year":1991,"tags":["rock"]},
    {"title":"...Baby One More Time","artist":"Britney Spears","videoId":"C-u5WLJ9Yk4","year":1998,"tags":["pop"]},
    {"title":"No Scrubs","artist":"TLC","videoId":"FrLequ6dUdM","year":1999,"tags":["rnb"]},
    {"title":"Wonderwall","artist":"Oasis","videoId":"bx1Bh8ZvH84","year":1995,"tags":["rock"]},
    {"title":"My Heart Will Go On","artist":"Celine Dion","videoId":"FHG2oizTlpY","year":1997,"tags":["pop"]},
    {"title":"Vogue","artist":"Madonna","videoId":"GuJQSAiODqI","year":1990,"tags":["pop"]},
    {"title":"Losing My Religion","artist":"R.E.M.","videoId":"xwtdhWltSIg","year":1991,"tags":["rock"]},
    {"title":"Black or White","artist":"Michael Jackson","videoId":"F2AitTPI5U0","year":1991,"tags":["pop"]},
    {"title":"Creep","artist":"Radiohead","videoId":"XFkzRNyygfk","year":1992,"tags":["rock"]},
    {"title":"I Want It That Way","artist":"Backstreet Boys","videoId":"4fndeDfaWCg","year":1999,"tags":["pop"]},
    {"title":"Genie in a Bottle","artist":"Christina Aguilera","videoId":"kIDWgqDBNXA","year":1999,"tags":["pop"]},
    {"title":"Gangsta's Paradise","artist":"Coolio","videoId":"fPO76Jlnz6c","year":1995,"tags":["hiphop"]},
    {"title":"Waterfalls","artist":"TLC","videoId":"8WEtxJ4-sh4","year":1995,"tags":["rnb"]},
    {"title":"Say My Name","artist":"Destiny's Child","videoId":"sQgd6MccwZc","year":1999,"tags":["rnb"]},
    {"title":"Enter Sandman","artist":"Metallica","videoId":"CD-E-LDc384","year":1991,"tags":["rock"]},
    {"title":"Macarena","artist":"Los Del Rio","videoId":"zWaymcVmJ-A","year":1993,"tags":["latin"]},
    {"title":"Livin' la Vida Loca","artist":"Ricky Martin","videoId":"p47fEXGabaY","year":1999,"tags":["latin"]},
    {"title":"Torn","artist":"Natalie Imbruglia","videoId":"VV1XWJN3nJo","year":1997,"tags":["pop"]},
    {"title":"Iris","artist":"Goo Goo Dolls","videoId":"NdYWuo9OFAw","year":1998,"tags":["rock"]},
    {"title":"Baby Come On Over","artist":"Samantha Mumba","videoId":"Yd5g7JgMWks","year":1999,"tags":["pop"]}
  ],
  "00s": [
    {"title":"Hey Ya!","artist":"Outkast","videoId":"PWgvGjAhvIw","year":2003,"tags":["hiphop"]},
    {"title":"In the End","artist":"Linkin Park","videoId":"eVTXPUF4Oz4","year":2000,"tags":["rock"]},
    {"title":"Umbrella","artist":"Rihanna","videoId":"CvBfHwUxHIk","year":2007,"tags":["pop"]},
    {"title":"Hips Don't Lie","artist":"Shakira","videoId":"DUT5rEU6pqM","year":2006,"tags":["latin"]},
    {"title":"Yeah!","artist":"Usher","videoId":"GxBSyx85Kp8","year":2004,"tags":["rnb"]},
    {"title":"Toxic","artist":"Britney Spears","videoId":"LOZuxwVk7TU","year":2004,"tags":["pop"]},
    {"title":"Boulevard of Broken Dreams","artist":"Green Day","videoId":"Soa3gO7tL-c","year":2004,"tags":["rock"]},
    {"title":"Poker Face","artist":"Lady Gaga","videoId":"bESGLojNYSo","year":2008,"tags":["pop"]},
    {"title":"Bad Romance","artist":"Lady Gaga","videoId":"qrO4YZeyl0I","year":2009,"tags":["pop"]},
    {"title":"Mr. Brightside","artist":"The Killers","videoId":"gGdGFtwCNBE","year":2003,"tags":["rock"]},
    {"title":"Crazy","artist":"Gnarls Barkley","videoId":"bd2B6SjMh_w","year":2006,"tags":["soul"]},
    {"title":"Gold Digger","artist":"Kanye West","videoId":"6vwNcNOTVzY","year":2005,"tags":["hiphop"]},
    {"title":"Temperature","artist":"Sean Paul","videoId":"dW2MmuA1nI4","year":2005,"tags":["dancehall"]},
    {"title":"Beautiful Girls","artist":"Sean Kingston","videoId":"MrTz5xjmso4","year":2007,"tags":["pop"]},
    {"title":"American Boy","artist":"Estelle","videoId":"Ic5vxw3eijY","year":2008,"tags":["rnb"]},
    {"title":"Complicated","artist":"Avril Lavigne","videoId":"5NPBIwQyPWE","year":2002,"tags":["pop"]},
    {"title":"Gee","artist":"Girls' Generation","videoId":"U7mPqycQ0tQ","year":2009,"tags":["kpop"]},
    {"title":"Sorry Sorry","artist":"Super Junior","videoId":"x6QA3m58DQw","year":2009,"tags":["kpop"]},
    {"title":"Numb","artist":"Linkin Park","videoId":"kXYiU_JCYtU","year":2003,"tags":["rock"]},
    {"title":"Dilemma","artist":"Nelly","videoId":"8WYHDfJDPDc","year":2002,"tags":["hiphop"]}
  ],
  "10s": [
    {"title":"Rolling in the Deep","artist":"Adele","videoId":"rYEDA3JcQqw","year":2010,"tags":["pop"]},
    {"title":"Uptown Funk","artist":"Mark Ronson ft. Bruno Mars","videoId":"OPf0YbXqDm0","year":2014,"tags":["funk"]},
    {"title":"Shape of You","artist":"Ed Sheeran","videoId":"JGwWNGJdvx8","year":2017,"tags":["pop"]},
    {"title":"Bad Guy","artist":"Billie Eilish","videoId":"DyDfgMOUjCI","year":2019,"tags":["pop"]},
    {"title":"Gangnam Style","artist":"PSY","videoId":"9bZkp7q19f0","year":2012,"tags":["kpop"]},
    {"title":"Sorry","artist":"Justin Bieber","videoId":"fRh_vgS2dFE","year":2015,"tags":["pop"]},
    {"title":"Hello","artist":"Adele","videoId":"YQHsXMglC9A","year":2015,"tags":["pop"]},
    {"title":"Roar","artist":"Katy Perry","videoId":"CevxZvSJLk8","year":2013,"tags":["pop"]},
    {"title":"Blank Space","artist":"Taylor Swift","videoId":"e-ORhEE9VVg","year":2014,"tags":["pop"]},
    {"title":"Lean On","artist":"Major Lazer","videoId":"YqeW9_5kURI","year":2015,"tags":["edm"]},
    {"title":"Despacito","artist":"Luis Fonsi","videoId":"kJQP7kiw5Fk","year":2017,"tags":["latin"]},
    {"title":"Counting Stars","artist":"OneRepublic","videoId":"hT_nvWreIhg","year":2013,"tags":["pop"]},
    {"title":"Closer","artist":"The Chainsmokers","videoId":"PT2_F-1esPk","year":2016,"tags":["edm"]},
    {"title":"This Is America","artist":"Childish Gambino","videoId":"VYOjWnS4cMY","year":2018,"tags":["hiphop"]},
    {"title":"DNA","artist":"BTS","videoId":"MBdVXkSdhwU","year":2017,"tags":["kpop"]},
    {"title":"Faded","artist":"Alan Walker","videoId":"60ItHLz5WEA","year":2015,"tags":["edm"]},
    {"title":"Let Her Go","artist":"Passenger","videoId":"RBumgq5yVrA","year":2012,"tags":["pop"]},
    {"title":"Take Me to Church","artist":"Hozier","videoId":"PVjiKRfKpPI","year":2013,"tags":["indie"]},
    {"title":"Havana","artist":"Camila Cabello","videoId":"HCjNJDNzw8Y","year":2017,"tags":["pop"]},
    {"title":"Wake Me Up","artist":"Avicii","videoId":"IcrbM1l_BoI","year":2013,"tags":["edm"]}
  ],
  "20s": [
    {"title":"Blinding Lights","artist":"The Weeknd","videoId":"4NRXx6U8ABQ","year":2020,"tags":["pop"]},
    {"title":"As It Was","artist":"Harry Styles","videoId":"H5v3kku4y6Q","year":2022,"tags":["pop"]},
    {"title":"Flowers","artist":"Miley Cyrus","videoId":"G7KNmW9a75Y","year":2023,"tags":["pop"]},
    {"title":"Anti-Hero","artist":"Taylor Swift","videoId":"b1kbLwvqugk","year":2022,"tags":["pop"]},
    {"title":"Espresso","artist":"Sabrina Carpenter","videoId":"eVli-tstM5E","year":2024,"tags":["pop"]},
    {"title":"Stay","artist":"The Kid LAROI & Justin Bieber","videoId":"kTJczUoc26U","year":2021,"tags":["pop"]},
    {"title":"Levitating","artist":"Dua Lipa","videoId":"TUVcZfQe-Kw","year":2020,"tags":["pop"]},
    {"title":"Peaches","artist":"Justin Bieber","videoId":"tQ0yjYUFKAE","year":2021,"tags":["pop"]},
    {"title":"Watermelon Sugar","artist":"Harry Styles","videoId":"E07s5ZYygMg","year":2020,"tags":["pop"]},
    {"title":"Butter","artist":"BTS","videoId":"WMweEpGlu_U","year":2021,"tags":["kpop"]},
    {"title":"Pink Venom","artist":"BLACKPINK","videoId":"gQlMMD8auMs","year":2022,"tags":["kpop"]},
    {"title":"Unholy","artist":"Sam Smith","videoId":"Uq9gPaIzbe8","year":2022,"tags":["pop"]},
    {"title":"good 4 u","artist":"Olivia Rodrigo","videoId":"gNi_6U5Pm_o","year":2021,"tags":["pop"]},
    {"title":"Drivers License","artist":"Olivia Rodrigo","videoId":"ZmDBbnmKpqQ","year":2021,"tags":["pop"]},
    {"title":"Easy On Me","artist":"Adele","videoId":"U3ASj1L6_sY","year":2021,"tags":["pop"]},
    {"title":"Paint The Town Red","artist":"Doja Cat","videoId":"m4_9TFeMfJE","year":2023,"tags":["hiphop"]},
    {"title":"Calm Down","artist":"Rema","videoId":"WcIcVapfqXw","year":2022,"tags":["afrobeats"]},
    {"title":"Seven","artist":"Jungkook","videoId":"QU9c0053UAU","year":2023,"tags":["kpop"]},
    {"title":"Super Shy","artist":"NewJeans","videoId":"ArmDp-zijuc","year":2023,"tags":["kpop"]},
    {"title":"Houdini","artist":"Dua Lipa","videoId":"suAR1PYFNYA","year":2023,"tags":["pop"]}
  ]
}

export function getRandomVideo(decade: Decade, history: string[]): VideoEntry {
  const list = videos[decade]
  const filtered = list.filter((v) => !history.includes(v.videoId))
  const pool = filtered.length ? filtered : list
  return pool[Math.floor(Math.random() * pool.length)]
}
