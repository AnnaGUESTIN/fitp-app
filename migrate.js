require('dotenv').config();
const db = require('./db');

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS experiences (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    lugar       VARCHAR(255),
    hora        VARCHAR(50),
    duracion    VARCHAR(50),
    pax         INTEGER      DEFAULT 20,
    is_hero     BOOLEAN      DEFAULT false,
    active      BOOLEAN      DEFAULT true,
    owned       BOOLEAN      DEFAULT false,
    price       VARCHAR(100) DEFAULT '',
    hero_img    TEXT,
    card_img    TEXT,
    img1        TEXT,
    img2        TEXT,
    img3        TEXT,
    sort_order  INTEGER      DEFAULT 0,
    created_at  TIMESTAMP    DEFAULT NOW(),
    updated_at  TIMESTAMP    DEFAULT NOW()
  );
`;

const SEED = [
  {
    title: 'FORO ITALICO TOUR',
    description: "Enjoy an exclusive tour of the Foro Italico, the iconic venue of the ATP Rome tournament. Discover the history, facilities, and behind-the-scenes areas of one of the most prestigious tennis events in the world, while experiencing the unique atmosphere that makes the Internazionali BNL d'Italia so special.",
    lugar: 'Foro Italico', hora: '11:00', duracion: '3 hours', pax: 20,
    is_hero: false, owned: false, price: '150€',
    hero_img: 'https://external-preview.redd.it/2026-will-be-the-last-year-in-which-the-rome-tournament-v0-dLRuYP77YG00EoKsNhMc8ETUHHRfrQej8d-huSjUmYg.jpeg?width=640&crop=smart&auto=webp&s=5e38c038e0fba377aa25ee6632f0726d40df754c',
    card_img: 'https://external-preview.redd.it/2026-will-be-the-last-year-in-which-the-rome-tournament-v0-dLRuYP77YG00EoKsNhMc8ETUHHRfrQej8d-huSjUmYg.jpeg?width=640&crop=smart&auto=webp&s=5e38c038e0fba377aa25ee6632f0726d40df754c',
    sort_order: 0
  },
  {
    title: 'PLAYERS MEET & GREET',
    description: "Get up close and personal with Italy's top tennis and padel stars. An exclusive meet and greet session with autographs, photos and unforgettable moments with your favourite athletes.",
    lugar: 'Foro Italico, Rome', hora: '12:00', duracion: '1.5 hours', pax: 20,
    is_hero: true, owned: false, price: '150€',
    hero_img: 'https://scontent-mad2-1.cdninstagram.com/v/t51.82787-15/714949232_18057773066741401_4286718650151763365_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=109&ig_cache_key=MzkxMDc3NTQ2MTc0NjgwMjIwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WtfFM2m489YQ7kNvwES27He&_nc_oc=AdosSUwK5ftzMOprPDLpdN_4lCfod4KzKDocp9pi2cK6iXr7LMZpg226DLKhDhpmqZc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_gid=a44FdVziAHnGjvPH3VnSfQ&_nc_ss=7a22e&oh=00_Af_59e6MPePa_1eM8VsM-2G7Lhr2R77XanT4_xCSqrDb_w&oe=6A2617D8',
    card_img: 'https://scontent-mad2-1.cdninstagram.com/v/t51.82787-15/714949232_18057773066741401_4286718650151763365_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=109&ig_cache_key=MzkxMDc3NTQ2MTc0NjgwMjIwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WtfFM2m489YQ7kNvwES27He&_nc_oc=AdosSUwK5ftzMOprPDLpdN_4lCfod4KzKDocp9pi2cK6iXr7LMZpg226DLKhDhpmqZc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_gid=a44FdVziAHnGjvPH3VnSfQ&_nc_ss=7a22e&oh=00_Af_59e6MPePa_1eM8VsM-2G7Lhr2R77XanT4_xCSqrDb_w&oe=6A2617D8',
    sort_order: 1
  },
  {
    title: 'ACE BOX',
    description: 'Experience the match from our premium hospitality box with the best seats in the house. Enjoy gourmet catering, open bar and an unobstructed view of every point played on Centre Court.',
    lugar: 'Foro Italico, Rome', hora: '14:00', duracion: '4 hours', pax: 20,
    is_hero: false, owned: false, price: '150€',
    hero_img: 'https://www.nittoatpfinals.com/-/media/sites/finals/images/hospitality/2025-ace-box.jpg?h=1280&iar=0&w=1920&hash=CBB6D63AA7FB112A2A697F2C9884B5EB',
    card_img: 'https://www.nittoatpfinals.com/-/media/sites/finals/images/hospitality/2025-ace-box.jpg?h=1280&iar=0&w=1920&hash=CBB6D63AA7FB112A2A697F2C9884B5EB',
    sort_order: 2
  },
  {
    title: 'GALA NIGHT',
    description: 'Exclusive access to the VIP suite with panoramic views of the tournament. A premium setting with personalised service, fine dining and private lounge area for you and your guests.',
    lugar: 'Foro Italico, Rome', hora: '20:00', duracion: '3 hours', pax: 15,
    is_hero: false, owned: false, price: '150€',
    hero_img: 'https://scontent-mad2-1.cdninstagram.com/v/t51.82787-15/711474251_18058472153772504_6548988045013402302_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=108&ig_cache_key=MzkxMDU1Mjk5Njc0ODQ4NDA4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuNzIwLnNkci52aWRlb19kZWZhdWx0X2NvdmVyX2ZyYW1lLkMzIn0%3D&_nc_ohc=7c3-95RUbW0Q7kNvwHyj7eC&_nc_oc=AdrICZjSDTLLzAVHcIgondOhMsgr477MolisOxN3OswCNBmr9mGAdtjY2NZ1sAjWhiQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_gid=2sBbweF9NaEM14rFnBZhFQ&_nc_ss=7a22e&oh=00_Af8WGfsmpKMdYZL96tlW4UThZXfttWTrgCnkCur6qu02SQ&oe=6A25F844',
    card_img: 'https://scontent-mad2-1.cdninstagram.com/v/t51.82787-15/711474251_18058472153772504_6548988045013402302_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=108&ig_cache_key=MzkxMDU1Mjk5Njc0ODQ4NDA4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuNzIwLnNkci52aWRlb19kZWZhdWx0X2NvdmVyX2ZyYW1lLkMzIn0%3D&_nc_ohc=7c3-95RUbW0Q7kNvwHyj7eC&_nc_oc=AdrICZjSDTLLzAVHcIgondOhMsgr477MolisOxN3OswCNBmr9mGAdtjY2NZ1sAjWhiQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_gid=2sBbweF9NaEM14rFnBZhFQ&_nc_ss=7a22e&oh=00_Af8WGfsmpKMdYZL96tlW4UThZXfttWTrgCnkCur6qu02SQ&oe=6A25F844',
    sort_order: 3
  },
  {
    title: 'FINAL MATCH',
    description: 'Premium front-row seats for the tournament final. Witness history being made with the best view in the stadium, complemented by exclusive pre-match hospitality and a post-match ceremony experience.',
    lugar: 'Centre Court, Foro Italico', hora: '15:00', duracion: '3 hours', pax: 20,
    is_hero: false, owned: false, price: '150€',
    hero_img: 'https://www.atptour.com/-/media/images/news/2025/05/06/19/54/rome-2025-schedule.jpg',
    card_img: 'https://www.atptour.com/-/media/images/news/2025/05/06/19/54/rome-2025-schedule.jpg',
    sort_order: 5
  },
  {
    title: 'COURT SIDE',
    description: "The closest you can get to the action without picking up a racket. Exclusive courtside seats with a dedicated host, complimentary refreshments and access to the players' warm-up area.",
    lugar: 'Foro Italico, Rome', hora: '11:00', duracion: '2 hours', pax: 20,
    is_hero: false, owned: false, price: '150€',
    hero_img: 'https://www.atptour.com/-/media/images/news/2026/04/30/16/07/rome-2026-site-upgrade-feature-pan-angle.jpg',
    card_img: 'https://www.atptour.com/-/media/images/news/2026/04/30/16/07/rome-2026-site-upgrade-feature-pan-angle.jpg',
    sort_order: 6
  },
  {
    title: 'CENTER COURT TRAINING',
    description: "Go behind the scenes with an exclusive guided tour of the players' locker rooms, the tunnel and training facilities at Foro Italico — areas the public never gets to see.",
    lugar: 'Foro Italico, Rome', hora: '09:00', duracion: '2 hours', pax: 15,
    is_hero: false, owned: false, price: '150€',
    hero_img: 'https://s3.sportstatics.com/relevo/www/multimedia/202406/18/media/cortadas/roma-premier-padel-RiEAb49qq5ULcTMtWN0TPzK-1200x648@Relevo.jpg',
    card_img: 'https://s3.sportstatics.com/relevo/www/multimedia/202406/18/media/cortadas/roma-premier-padel-RiEAb49qq5ULcTMtWN0TPzK-1200x648@Relevo.jpg',
    sort_order: 7
  }
];

async function migrate() {
  console.log('⏳ Creating tables...');
  await db.query(CREATE_TABLE);
  console.log('✅ Table created');
  const { rows } = await db.query('SELECT COUNT(*) FROM experiences');
  if (parseInt(rows[0].count) > 0) { console.log('ℹ️  Already seeded'); return; }
  console.log('⏳ Seeding FITP experiences...');
  for (const e of SEED) {
    await db.query(
      `INSERT INTO experiences (title,description,lugar,hora,duracion,pax,is_hero,active,owned,price,hero_img,card_img,sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [e.title,e.description,e.lugar,e.hora,e.duracion,e.pax,e.is_hero,true,e.owned,e.price,e.hero_img,e.card_img,e.sort_order]
    );
  }
  console.log(`✅ Seeded ${SEED.length} experiences`);
}

migrate()
  .then(() => { console.log('✅ Migration complete'); process.exit(0); })
  .catch(err => { console.error('❌ Migration failed:', err.message); process.exit(1); });
