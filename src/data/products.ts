const BUCKET = 'https://sr-demo-products.s3.eu-central-1.amazonaws.com';

const variants = [
  {
    name: 'Blanco',
    color: '#FAFAFA',
    sides: {
      front: '',
    },
  },
  {
    name: 'Onyx',
    color: '#2A2A2C',
  },
  {
    name: 'OatMilk',
    color: '#EBDFC7',
  },
  {
    name: 'MatchaTea',
    color: '#B8CCB4',
  },
  {
    name: 'Cloudy',
    color: '#C7C9CC',
  },
  {
    name: 'ClearSky',
    color: '#9FBCD3',
  },
  {
    name: 'Oceana',
    color: '#404B67',
  },
  {
    name: 'PinkPetal',
    color: '#EFC4DC',
  },
  {
    name: 'Lavender',
    color: '#BFB4CD',
  },
  {
    name: 'LemonDrop',
    color: '#F9E39A',
  },
];

const PRODUCTS = [
  {
    name: 'T-Shirt',
    fabric: 'Recycled cotton jersey',
    fit: 'Regular',
    price: 37,
    urlPrefix: `${BUCKET}/10001005_REGULAR_FIT_TSHIRT_RECYCLED_COTTON/10001005_REGULAR_FIT_TSHIRT_Packshot`,
    description:
      'A FABRIC MADE FROM 50% RECLAIMED COTTON AND 50% ORGANIC COTTON JERSEY FOR THAT OH SO SOFT FEEL. TREATED WITH PPRMINTTM OIL, A DURA- BLE ODOR CONTROL AND BROAD-SPEC- TRUM ANTIMICROBIAL TREATMENT THAT ENABLES OUR PRODUCTS TO STAY FRESHER FOR LONGER. DUE TO ITS ANTIBACTERIAL PROPERTIES, YOU CAN WEAR CLOTHING TREATED WITH PPRMINTTM MANY TIMES BEFORE THEY NEED WASHING.',
    variants,
    tags: ['Genderless', 'Short sleeves'],
    madeIn: 'Portugal',
  },
  {
    name: 'Skater T-Shirt',
    fabric: 'Organic cotton',
    fit: 'Oversized',
    price: 40,
    urlPrefix: `${BUCKET}/10001019_OVERSIZED_SKATER_TSHIRT_RECYCLED_COTTON/10001019_OVERSIZED_SKATER_TSHIRT_Packshot`,
    description:
      'A MIDWEIGHT FABRIC MADE USING 100% ORGANIC COTTON, WITH A LOOP- BACK TEXTURE INSIDE AND A FINISHING THAT PROVIDES EXTRA SOFTNESS. IT IS DESIGNED TO BE WORN ALL YEAR ROUND. TREATED WITH PPRMINTTM OIL, A DURABLE ODOR CONTROL AND BROAD-SPECTRUM ANTIMICROBIAL TREATMENT THAT ENABLES OUR PROD- UCTS TO STAY FRESHER FOR LONGER. DUE TO ITS ANTIBACTERIAL PROPER- TIES, YOU CAN WEAR CLOTHING TREAT- ED WITH PPRMINTTM MANY TIMES BEFORE THEY NEED WASHING.',
    variants,
    tags: ['Genderless', 'Relaxed boxy fit with short sleeves'],
    madeIn: 'Portugal',
  },
  {
    name: 'T-Shirt',
    fit: 'Long Sleeve Regular',
    fabric: 'Recycled cotton lightweight',
    price: 42,
    urlPrefix: `${BUCKET}/10001006_LONG_SLEEVE_REGULAR_FIT_TSHIRT_RECYCLED_COTTON/10001006_LONG_SLEEVE_REGULAR_FIT_TSHIRT_Packshot`,
    description:
      'A FABRIC MADE FROM 50% RECLAIMED COTTON AND 50% ORGANIC COTTON JERSEY FOR THAT OH SO SOFT FEEL. TREATED WITH PPRMINTTM OIL, A DURA- BLE ODOR CONTROL AND BROAD-SPEC- TRUM ANTIMICROBIAL TREATMENT THAT ENABLES OUR PRODUCTS TO STAY FRESHER FOR LONGER. DUE TO ITS ANTIBACTERIAL PROPERTIES, YOU CAN WEAR CLOTHING TREATED WITH PPRMINTTM MANY TIMES BEFORE THEY NEED WASHING.',
    variants,
    tags: ['Genderless', 'Long sleeves'],
    madeIn: 'Portugal',
  },
  {
    name: 'T-Shirt',
    fit: 'Oversized Long Sleeve',
    fabric: 'Organic cotton',
    price: 45,
    urlPrefix: `${BUCKET}/10001020_OVERSIZED_LONG_SLEEVE_TSHIRT_RECYCLED_COTTON/10001020_OVERSIZED_LONG_SLEEVE_TSHIRT_Packshot`,
    description:
      'A MIDWEIGHT FABRIC MADE USING 100% ORGANIC COTTON, WITH A LOOP- BACK TEXTURE INSIDE AND A FINISHING THAT PROVIDES EXTRA SOFTNESS. IT IS DESIGNED TO BE WORN ALL YEAR ROUND. TREATED WITH PPRMINTTM OIL, A DURABLE ODOR CONTROL AND BROAD-SPECTRUM ANTIMICROBIAL TREATMENT THAT ENABLES OUR PROD- UCTS TO STAY FRESHER FOR LONGER. DUE TO ITS ANTIBACTERIAL PROPER- TIES, YOU CAN WEAR CLOTHING TREAT- ED WITH PPRMINTTM MANY TIMES BEFORE THEY NEED WASHING.',
    variants,
    tags: ['Genderless', 'Relaxed boxy fit with short sleeves'],
    madeIn: 'Portugal',
  },
  {
    name: 'Rugby Shirt',
    fit: '',
    fabric: 'Organic cotton',
    price: 55,
    urlPrefix: `${BUCKET}/10001008_RUGBY_SHIRT_ORGANIC_100/10001008_RUGBY_SHIRT_Packshot`,
    description:
      'A MIDWEIGHT FABRIC MADE USING 100% ORGANIC COTTON, WITH A LOOPBACK TEXTURE INSIDE AND A FINISHING THAT PROVIDES EXTRA SOFTNESS. IT IS DESIGNED TO BE WORN ALL YEAR ROUND. TREATED WITH PPRMINTTM OIL, A DURABLE ODOR CONTROL AND BROAD-SPECTRUM ANTIMICROBIAL TREATMENT THAT ENABLES OUR PRODUCTS TO STAY FRESH- ER FOR LONGER. DUE TO ITS ANTIBACTE- RIAL PROPERTIES, YOU CAN WEAR CLOTH- ING TREATED WITH PPRMINTTM MANY TIMES BEFORE THEY NEED WASHING.',
    variants,
    tags: ['Genderless', 'Relaxed fit with long sleevess'],
    madeIn: 'Portugal',
  },
  {
    name: 'Sweatshirt',
    fit: 'Regular',
    fabric: 'Recycled cotton lightweight',
    price: 55,
    urlPrefix: `${BUCKET}/10001003_REGULAR_FIT_SWEATSHIRT_LIGHTWEIGHT_50/10001003_REGULAR_FIT_SWEATSHIRT_Packshot`,
    description:
      'THIS SWEATSHIRT IS MADE WITH 100% ORGANIC RECYCLED COTTON AND TREATED WITH OUR TRADEMARK PEPPERMINT OIL (PPRMINT) TO KEEP IT FRESHER FOR LONGER. DESIGNED TO BE WORN ACROSS THE SEASONS.',
    variants,
    tags: ['Genderless', 'Round neck', 'Fitted cuffs and hem'],
    madeIn: 'Portugal',
  },
  {
    name: 'Sweatshirt',
    fit: 'Oversized',
    fabric: 'Recycled cotton lightweight',
    price: 58,
    urlPrefix: `${BUCKET}/10001003_REGULAR_FIT_SWEATSHIRT_LIGHTWEIGHT_50/10001003_REGULAR_FIT_SWEATSHIRT_Packshot`,
    description:
      'THIS SWEATSHIRT IS MADE WITH 100% ORGANIC RECYCLED COTTON AND TREATED WITH OUR TRADEMARK PEPPERMINT OIL (PPRMINT) TO KEEP IT FRESHER FOR LONGER. DESIGNED TO BE WORN ACROSS THE SEASONS.',
    variants,
    tags: ['Genderless', 'Loose, relaxed fit', 'Fitted cuffs and hem'],
    madeIn: 'Portugal',
  },
  {
    name: 'Sleeveless hoodie',
    fit: '',
    fabric: 'Recycled cotton lightweight',
    price: 53,
    urlPrefix: `${BUCKET}/10000987_SLEEVELESS_HOODIE_LIGHTWEIGHT_50/10000987_SLEEVELESS_HOODIE_Packshot`,
    description:
      'THIS HOODIE IS MADE WITH 100% ORGANIC RECYCLED COTTON AND IS DESIGNED TO BE WORN YEAR-ROUND, ACROSS THE SEASONS. IT IS TREATED WITH NATURAL PEPPERMINT OIL (PPR- MINTTM), TO KEEP IT FRESHER FOR LONGER.',
    variants,
    tags: ['Genderless', 'Loose, relaxed fit'],
    madeIn: 'Portugal',
  },
  {
    name: 'Hoodie',
    fit: '',
    fabric: 'Recycled cotton lightweight',
    price: 55,
    urlPrefix: `${BUCKET}/10000998_REGULAR_FIT_HOODIE_LIGHTWEIGHT_50/10000998_REGULAR_FIT_HOODIE_Packshot`,
    description:
      'THIS HOODIE IS MADE WITH 100% ORGANIC RECYCLED COTTON AND IS DESIGNED TO BE WORN YEAR-ROUND, ACROSS THE SEASONS. IT IS TREATED WITH NATURAL PEPPERMINT OIL (PPR- MINTTM), TO KEEP IT FRESHER FOR LONGER.',
    variants,
    tags: ['Genderless', 'Loose, relaxed fit'],
    madeIn: 'Portugal',
  },
  {
    name: 'Hoodie',
    fit: 'Oversized',
    fabric: 'Recycled cotton lightweight',
    price: 63,
    urlPrefix: `${BUCKET}/10001016_OVERSIZED_HOODIE_LIGHTWEIGHT_50/10001016_OVERSIZED_HOODIE_Packshot`,
    description:
      'THIS HOODIE IS MADE WITH 100% ORGANIC RECYCLED COTTON AND IS DESIGNED TO BE WORN YEAR-ROUND, ACROSS THE SEASONS. IT IS TREATED WITH NATURAL PEPPERMINT OIL (PPRMINTTM), TO KEEP IT FRESHER FOR LONGER.',
    variants,
    tags: ['Genderless', 'Loose fit with raglan sleeves'],
    madeIn: 'Portugal',
  },
  {
    name: 'Hoodie',
    fit: 'Cropped',
    fabric: 'Recycled cotton lightweight',
    price: 53,
    urlPrefix: `${BUCKET}/10001015_CROPPED_HOODIE_LIGHTWEIGHT_50/10001015_CROPPED_HOODIE_Packshot`,
    description:
      'THIS HOODIE IS MADE WITH 100% ORGANIC RECYCLED COTTON AND IS DESIGNED TO BE WORN YEAR-ROUND, ACROSS THE SEASONS. IT IS TREATED WITH NATURAL PEPPERMINT OIL (PPRMINTTM), TO KEEP IT FRESHER FOR LONGER.',
    variants,
    tags: ['Genderless', 'Loose fit with raw hem'],
    madeIn: 'Portugal',
  },
  {
    name: 'Hoodie',
    fit: '',
    fabric: 'Recycled cotton heavyweight',
    price: 63,
    urlPrefix: `${BUCKET}/10001229_REGULAR_FIT_HOODIE_HEAVYWEIGHT_50/10001229_REGULAR_FIT_HOODIE_Packshot`,
    description:
      'THIS HOODIE IS MADE WITH 100% ORGANIC RECYCLED COTTON AND IS DESIGNED TO BE WORN YEAR-ROUND, ACROSS THE SEASONS. IT IS TREATED WITH NATURAL PEPPERMINT OIL (PPRMINTTM), TO KEEP IT FRESHER FOR LONGER.',
    variants,
    tags: ['Genderless', 'Loose fit with raw hem'],
    madeIn: 'Portugal',
  },
  {
    name: 'Hoodie',
    fit: 'Oversized',
    fabric: 'Recycled cotton heavyweight',
    price: 65,
    urlPrefix: `${BUCKET}/10001230_OVERSIZED_HOODIE_HEAVYWEIGHT_50/10001230_OVERSIZED_HOODIE_Packshot`,
    description:
      'A HEAVYWEIGHT RECYCLED COTTON FABRIC MADE FROM 50% RECLAIMED COTTON AND 50% ORGANIC COTTON THAT IS BRUSHED ON THE INSIDE -PERFECT FOR DAYS YOU WANT A SUPER SOFT, COZIER FEEL. TREATED WITH PPRMINTTM OIL, A DURABLE ODOR CONTROL AND BROAD-SPECTRUM ANTIMICROBIAL TREATMENT THAT ENABLES OUR PRODUCTS TO STAY FRESHER FOR LONGER. DUE TO ITS ANTIBACTERIAL PROPERTIES, YOU CAN WEAR CLOTHING TREATED WITH PPRMINTTM MANY TIMES BEFORE THEY NEED WASHING.',
    variants,
    tags: ['Genderless', 'Loose fit with raglan sleeves'],
    madeIn: 'Portugal',
  },
  {
    name: 'Hoodie',
    fit: 'Cropped',
    fabric: 'Recycled cotton heavyweight',
    price: 55,
    urlPrefix: `${BUCKET}/10001230_OVERSIZED_HOODIE_HEAVYWEIGHT_50/10001230_OVERSIZED_HOODIE_Packshot`,
    description:
      'A HEAVYWEIGHT RECYCLED COTTON FABRIC MADE FROM 50% RECLAIMED COTTON AND 50% ORGANIC COTTON THAT IS BRUSHED ON THE INSIDE-PERFECT FOR DAYS YOU WANT A SUPER SOFT, COZIER FEEL. TREATED WITH PPRMINTTM OIL, A DURABLE ODOR CONTROL AND BROAD-SPECTRUM ANTIMICROBIAL TREATMENT THAT ENABLES OUR PRODUCTS TO STAY FRESHER FOR LONGER. DUE TO ITS ANTIBACTERIAL PROPERTIES, YOU CAN WEAR CLOTHING TREATED WITH PPRMINTTM MANY TIMES BEFORE THEY NEED WASHING.',
    variants,
    tags: ['Genderless', 'Loose fit with raw hem'],
    madeIn: 'Portugal',
  },
];

export default PRODUCTS;
