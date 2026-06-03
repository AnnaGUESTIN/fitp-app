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
  { title:'PLAYERS MEET & GREET', description:'Get up close and personal with Italy\'s top tennis and padel stars. An exclusive meet and greet session with autographs, photos and unforgettable moments with your favourite athletes.', lugar:'Foro Italico, Rome', hora:'12:00', duracion:'1.5 hours', pax:20, is_hero:true,  hero_img:'https://picsum.photos/seed/fitp_hero1/1200/500', card_img:'https://picsum.photos/seed/fitp_card1/500/300', img1:'https://picsum.photos/seed/fitp_1a/600/300', img2:'https://picsum.photos/seed/fitp_1b/600/300', img3:'https://picsum.photos/seed/fitp_1c/600/300', sort_order:1 },
  { title:'ACE BOX',              description:'Experience the match from our premium hospitality box with the best seats in the house. Enjoy gourmet catering, open bar and an unobstructed view of every point played on Centre Court.', lugar:'Foro Italico, Rome', hora:'14:00', duracion:'4 hours', pax:20, is_hero:false, hero_img:'https://picsum.photos/seed/fitp_hero2/1200/500', card_img:'https://picsum.photos/seed/fitp_card2/500/300', img1:'https://picsum.photos/seed/fitp_2a/600/300', img2:'https://picsum.photos/seed/fitp_2b/600/300', img3:'https://picsum.photos/seed/fitp_2c/600/300', sort_order:2 },
  { title:'SUITE ACCESS',         description:'Exclusive access to the VIP suite with panoramic views of the tournament. A premium setting with personalised service, fine dining and private lounge area for you and your guests.', lugar:'Foro Italico, Rome', hora:'13:00', duracion:'5 hours', pax:15, is_hero:false, hero_img:'https://picsum.photos/seed/fitp_hero3/1200/500', card_img:'https://picsum.photos/seed/fitp_card3/500/300', img1:'https://picsum.photos/seed/fitp_3a/600/300', img2:'https://picsum.photos/seed/fitp_3b/600/300', img3:'https://picsum.photos/seed/fitp_3c/600/300', sort_order:3 },
  { title:'TOSS UP',              description:'Be part of the official coin toss ceremony before a top match. Stand on the court alongside the players and referees for an iconic moment you will never forget.', lugar:'Centre Court, Foro Italico', hora:'10:30', duracion:'1 hour', pax:10, is_hero:false, hero_img:'https://picsum.photos/seed/fitp_hero4/1200/500', card_img:'https://picsum.photos/seed/fitp_card4/500/300', img1:'https://picsum.photos/seed/fitp_4a/600/300', img2:'https://picsum.photos/seed/fitp_4b/600/300', img3:'https://picsum.photos/seed/fitp_4c/600/300', sort_order:4 },
  { title:'FINAL MATCH',          description:'Premium front-row seats for the tournament final. Witness history being made with the best view in the stadium, complemented by exclusive pre-match hospitality and a post-match ceremony experience.', lugar:'Centre Court, Foro Italico', hora:'15:00', duracion:'3 hours', pax:20, is_hero:false, hero_img:'https://picsum.photos/seed/fitp_hero5/1200/500', card_img:'https://picsum.photos/seed/fitp_card5/500/300', img1:'https://picsum.photos/seed/fitp_5a/600/300', img2:'https://picsum.photos/seed/fitp_5b/600/300', img3:'https://picsum.photos/seed/fitp_5c/600/300', sort_order:5 },
  { title:'COURT SIDE',           description:'The closest you can get to the action without picking up a racket. Exclusive courtside seats with a dedicated host, complimentary refreshments and access to the players\' warm-up area.', lugar:'Foro Italico, Rome', hora:'11:00', duracion:'2 hours', pax:20, is_hero:false, hero_img:'https://picsum.photos/seed/fitp_hero6/1200/500', card_img:'https://picsum.photos/seed/fitp_card6/500/300', img1:'https://picsum.photos/seed/fitp_6a/600/300', img2:'https://picsum.photos/seed/fitp_6b/600/300', img3:'https://picsum.photos/seed/fitp_6c/600/300', sort_order:6 },
  { title:'LOCKER ROOM TOUR',     description:'Go behind the scenes with an exclusive guided tour of the players\' locker rooms, the tunnel and training facilities at Foro Italico — areas the public never gets to see.', lugar:'Foro Italico, Rome', hora:'09:00', duracion:'2 hours', pax:15, is_hero:false, hero_img:'https://picsum.photos/seed/fitp_hero7/1200/500', card_img:'https://picsum.photos/seed/fitp_card7/500/300', img1:'https://picsum.photos/seed/fitp_7a/600/300', img2:'https://picsum.photos/seed/fitp_7b/600/300', img3:'https://picsum.photos/seed/fitp_7c/600/300', sort_order:7 },
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
      `INSERT INTO experiences (title,description,lugar,hora,duracion,pax,is_hero,hero_img,card_img,img1,img2,img3,sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [e.title,e.description,e.lugar,e.hora,e.duracion,e.pax,e.is_hero,e.hero_img,e.card_img,e.img1,e.img2,e.img3,e.sort_order]
    );
  }
  console.log(`✅ Seeded ${SEED.length} experiences`);
}

migrate()
  .then(() => { console.log('✅ Migration complete'); process.exit(0); })
  .catch(err => { console.error('❌ Migration failed:', err.message); process.exit(1); });
