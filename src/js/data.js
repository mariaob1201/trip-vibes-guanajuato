// @ts-nocheck
const destinations = [

  // ── Historia y Cultura ──────────────────────────────────────────────────
  {
    id: 1, category: "culture",
    name: "Museo de las Momias",
    region: "Cerro del Panteón, Guanajuato",
    tags: ["museum", "history"],
    description: "One of Mexico's most iconic museums — naturally preserved mummies discovered in the city's crypts. Eerie, unforgettable, and completely unique to Guanajuato.",
    difficulty: "Easy",
    bestFor: "Solo, couples, curious minds",
    image: "https://images.unsplash.com/photo-1518982380512-5a3c6a8b8d8d?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Museo+de+las+Momias+Guanajuato",
    rating: 4.7
  },
  {
    id: 2, category: "culture",
    name: "Teatro Juárez",
    region: "Centro Histórico, Guanajuato",
    tags: ["history", "art"],
    description: "A stunning neoclassical opera house built in 1903 with a grand Doric colonnade and a lavish Moorish interior. Attend a performance or simply stand in awe of it.",
    difficulty: "Easy",
    bestFor: "Couples, culture lovers",
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Teatro+Juarez+Guanajuato",
    rating: 4.8
  },
  {
    id: 3, category: "culture",
    name: "Mina y Templo de La Valenciana",
    region: "Valenciana, 5 km norte",
    tags: ["history", "mine"],
    description: "The world's most productive silver mine in the 18th century, now a UNESCO World Heritage site. Descend into the tunnels and visit the baroque La Valenciana church next door.",
    difficulty: "Easy to Moderate",
    bestFor: "History buffs, families, adventurers",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Mina+La+Valenciana+Guanajuato",
    rating: 4.5
  },
  {
    id: 4, category: "culture",
    name: "Museo y Casa Diego Rivera",
    region: "Centro Histórico, Guanajuato",
    tags: ["museum", "art"],
    description: "Birthplace of muralist Diego Rivera, now a museum housing his early works and period furniture. A beautiful colonial house telling the story of one of Mexico's greatest artists.",
    difficulty: "Easy",
    bestFor: "Art lovers, solo, couples",
    image: "https://images.unsplash.com/photo-1580811465854-8cf071621cdb?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Museo+Diego+Rivera+Guanajuato",
    rating: 4.6
  },
  {
    id: 5, category: "culture",
    name: "Callejón del Beso",
    region: "Centro, Guanajuato",
    tags: ["history", "romance"],
    description: "The famous 'Alley of the Kiss' — so narrow you can reach across from opposing balconies. Legend says couples who kiss on the third step are blessed with seven years of happiness.",
    difficulty: "Easy",
    bestFor: "Couples, romantics, everyone",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Callejon+del+Beso+Guanajuato",
    rating: 4.9
  },

  // ── Comida y Mercados ───────────────────────────────────────────────────
  {
    id: 6, category: "food",
    name: "Mercado Hidalgo",
    region: "Centro Histórico, Guanajuato",
    tags: ["market", "street-food"],
    description: "A stunning 1910 Art Nouveau market hall packed with produce, local cheeses, gorditas, and crafts. The best spot for breakfast — try enchiladas mineras straight from the comal.",
    difficulty: "Easy",
    bestFor: "Families, foodies, everyone",
    image: "https://images.unsplash.com/photo-1585444744772-3dfe56a2d7e7?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Mercado+Hidalgo+Guanajuato",
    rating: 4.6
  },
  {
    id: 7, category: "food",
    name: "Enchiladas Mineras (El Truco 7)",
    region: "Calle el Truco, Centro",
    tags: ["restaurant", "local-food"],
    description: "Guanajuato's signature dish: red chile-dipped tortillas topped with potatoes, carrots, and fresh cheese at one of the city's most beloved restaurants, steps from the university.",
    difficulty: "Easy",
    bestFor: "Foodies, groups, solo diners",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=El+Truco+7+Guanajuato",
    rating: 4.5
  },
  {
    id: 8, category: "food",
    name: "Dulces Típicos de Guanajuato",
    region: "Cerca del Mercado Hidalgo",
    tags: ["sweets", "market"],
    description: "Taste xoconostle candy, cajeta de Celaya, charamuscas (sugar skulls), and ates de membrillo. The candy stalls near Mercado Hidalgo are a sugar-lover's paradise.",
    difficulty: "Easy",
    bestFor: "Families, kids, sweet tooths",
    image: "https://images.unsplash.com/photo-1559682468-a6a29c465abb?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Dulces+Tipicos+Guanajuato",
    rating: 4.4
  },
  {
    id: 9, category: "food",
    name: "Mezcalerías del Centro",
    region: "Barrio de Pastita / Centro",
    tags: ["mezcal", "bars"],
    description: "Guanajuato's mezcalerías offer guided tastings of artisanal mezcal from Oaxaca, Durango, and Guerrero alongside local botanas. A slow, social way to spend an afternoon.",
    difficulty: "Easy",
    bestFor: "Adults, couples, friends",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Mezcalerias+Guanajuato",
    rating: 4.7
  },
  {
    id: 10, category: "food",
    name: "Terrazas del Jardín Unión",
    region: "Jardín Unión, Centro",
    tags: ["cafe", "social"],
    description: "The tree-shaded plaza is ringed with café terraces — order a café de olla, watch street musicians, and let the hours drift. Best enjoyed on a slow morning with no agenda.",
    difficulty: "Easy",
    bestFor: "Couples, solo, groups",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Jardin+Union+Guanajuato",
    rating: 4.8
  },

  // ── Exterior y Naturaleza ───────────────────────────────────────────────
  {
    id: 11, category: "outdoor",
    name: "Cerro del Cubilete",
    region: "Silao, 35 km oeste",
    tags: ["views", "hiking"],
    description: "Mexico's geographic center at 2,740 m, crowned with a monumental Christ statue. A short but steep climb from the lot rewards you with 360° panoramic views over the bajío.",
    difficulty: "Moderate",
    bestFor: "Families, hikers, spiritual visitors",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Cerro+del+Cubilete+Guanajuato",
    rating: 4.5
  },
  {
    id: 12, category: "outdoor",
    name: "Presa de la Olla",
    region: "La Olla, este del Centro",
    tags: ["nature", "walking"],
    description: "A peaceful 19th-century dam and reservoir on the city's eastern edge. Walk the promenade, rent a rowboat, and picnic on the grass — a quiet escape from the busy centro.",
    difficulty: "Easy",
    bestFor: "Families, couples, solo",
    image: "https://images.unsplash.com/photo-1490394686-f7d2e5bcc9e1?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Presa+de+la+Olla+Guanajuato",
    rating: 4.3
  },
  {
    id: 13, category: "outdoor",
    name: "Mirador del Pípila",
    region: "Cerro San Miguel, Centro",
    tags: ["views", "walking"],
    description: "Climb the steps or take the funicular to the statue of El Pípila for the city's most dramatic panoramic view — a sea of colorful colonial rooftops spreading up the canyon walls.",
    difficulty: "Easy to Moderate",
    bestFor: "Everyone, couples, photographers",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Monumento+Pipila+Guanajuato",
    rating: 4.9
  },
  {
    id: 14, category: "outdoor",
    name: "Parque Embajadoras",
    region: "Barrio Embajadoras",
    tags: ["nature", "walking"],
    description: "A leafy city park popular with locals for morning jogs, family picnics, and lazy afternoons under eucalyptus trees. A genuine slice of everyday Guanajuato life.",
    difficulty: "Easy",
    bestFor: "Families, runners, locals",
    image: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Parque+Embajadoras+Guanajuato",
    rating: 4.2
  },
  {
    id: 15, category: "outdoor",
    name: "Sierra de Guanajuato",
    region: "Al norte de la ciudad",
    tags: ["hiking", "nature"],
    description: "Rugged trails through the Sierra Madre foothills with sweeping views of old mine ruins and desert scrubland. Go early to beat the heat; a local guide makes it much richer.",
    difficulty: "Moderate to Hard",
    bestFor: "Hikers, adventurers",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Sierra+de+Guanajuato",
    rating: 4.4
  },

  // ── Vida Nocturna y Festivales ──────────────────────────────────────────
  {
    id: 16, category: "nightlife",
    name: "Festival Internacional Cervantino",
    region: "Toda la ciudad — Octubre",
    tags: ["festival", "tradition"],
    description: "One of Latin America's biggest arts festivals, held every October. Theatre, dance, concerts, and street performances take over every plaza and alleyway for three magical weeks.",
    difficulty: "Easy",
    bestFor: "Everyone, arts lovers, groups",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Festival+Cervantino+Guanajuato",
    rating: 5.0
  },
  {
    id: 17, category: "nightlife",
    name: "Callejoneadas Nocturnas",
    region: "Callejones del Centro",
    tags: ["music", "tradition"],
    description: "Follow an estudiantina — a troubadour band in medieval capes — through the city's alleyways at night, singing, sipping wine from bota bags, and stopping at historic spots. Pure magic.",
    difficulty: "Easy",
    bestFor: "Groups, couples, first-timers",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Callejoneadas+Guanajuato",
    rating: 4.9
  },
  {
    id: 18, category: "nightlife",
    name: "Día de los Muertos",
    region: "Panteón Municipal y Centro — 1–2 Nov",
    tags: ["festival", "tradition"],
    description: "Guanajuato's Día de los Muertos features altar competitions, candlelit cemetery vigils, callejoneadas, and the Feria de San Juan. One of the most moving cultural experiences in Mexico.",
    difficulty: "Easy",
    bestFor: "Everyone, families, culture seekers",
    image: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Panteon+Municipal+Guanajuato",
    rating: 4.9
  },
  {
    id: 19, category: "nightlife",
    name: "Bares de la Calle Sopeña",
    region: "Calle Sopeña / Alonso, Centro",
    tags: ["bars", "dance"],
    description: "The street behind Jardín Unión transforms at night into a bar district of mezcal spots, craft beer taps, and live music venues. Local crowd, honest prices, welcoming atmosphere.",
    difficulty: "Easy",
    bestFor: "Friends, adults, nightlife seekers",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Calle+Sopena+Guanajuato",
    rating: 4.6
  },
  {
    id: 20, category: "nightlife",
    name: "Serenatas en el Jardín Unión",
    region: "Jardín Unión, Centro",
    tags: ["music", "dance"],
    description: "Every Thursday and Friday evening, the city's central plaza hosts free outdoor serenades — mariachi, folk, and contemporary acts under the laurel trees. The most romantic free show in Mexico.",
    difficulty: "Easy",
    bestFor: "Couples, families, everyone",
    image: "https://images.unsplash.com/photo-1543373072-33f9c4e3a2f8?w=800&auto=format&fit=crop&q=80",
    mapLink: "https://maps.google.com/?q=Jardin+Union+Guanajuato",
    rating: 4.8
  },
];
