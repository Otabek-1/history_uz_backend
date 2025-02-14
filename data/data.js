const getTests = [
  {
    id: 1,
    questionText: "Vatan so'zi qanday ma'noni anglatadi?",
    options: ["Ona yurt", "Aziz tuproq", "Muqaddas joy", "Ota yurt"],
    correct: 0
  },
  {
    id: 2,
    questionText: "Vatan so'zining kelib chiqish tili qaysi?",
    options: ["Fors", "Arab", "Lotin", "Rus"],
    correct: 1
  },
  {
    id: 3,
    questionText: "Tarix fani nimani o'rganadi?",
    options: ["Geografik hududlarni", "O'tmish voqealarini", "Yangi texnologiyalarni", "Falsafa asoslarini"],
    correct: 1
  },
  {
    id: 4,
    questionText: "Tarix so'zi qaysi tilga oid?",
    options: ["Yunon", "Lotin", "Arab", "Fors"],
    correct: 2
  },
  {
    id: 5,
    questionText: "Kalendar so'zining ma'nosi nima?",
    options: ["Kunlar hisobi", "Yil boshi", "Har oyning birinchi kuni", "Vaqtni o'lchash"],
    correct: 2
  },
  {
    id: 6,
    questionText: "Dastlabki kalendar qayerda yaratilgan?",
    options: ["Rim", "Misr", "Gretsiya", "Bobil"],
    correct: 1
  },
  {
    id: 7,
    questionText: "Xronologiya so'zi qanday ma'noni anglatadi?",
    options: ["Voqealar vaqt tartibi", "Sanalar ro'yxati", "Ilmiy kitob", "Tarixiy joylar"],
    correct: 0
  },
  {
    id: 8,
    questionText: "Xronos so'zi qaysi ma'noni bildiradi?",
    options: ["Vaqt", "Fan", "Voqea", "Shaxs"],
    correct: 0
  },
  {
    id: 9,
    questionText: "Milod tushunchasining ma'nosi nima?",
    options: ["Yil hisobi", "Tug'ilish", "Asrning boshi", "Voqea"],
    correct: 1
  },
  {
    id: 10,
    questionText: "Hijriy yil hisobi qayerda yaratilgan?",
    options: ["Arabiston", "Misr", "Hindiston", "Xitoy"],
    correct: 0
  },
  {
    id: 11,
    questionText: "Arxeologiya fani nimani o'rganadi?",
    options: ["Qadimgi yozuvlarni", "Moddiy manbalarni", "Til tarixini", "Shaharlarni"],
    correct: 1
  },
  {
    id: 12,
    questionText: "Arxeologiya so'zi qaysi tildan olingan?",
    options: ["Lotin", "Yunon", "Arab", "Fors"],
    correct: 0
  },
  {
    id: 13,
    questionText: "Xarita nima?",
    options: ["Yozuv turi", "Tosh surat", "Yer yuzasining tasviri", "Tarixiy asar"],
    correct: 2
  },
  {
    id: 14,
    questionText: "Globusning ma'nosi nima?",
    options: ["Yer olmasi", "To'p", "Shar", "Dumaloq"],
    correct: 2
  },
  {
    id: 15,
    questionText: "Qaysi odam turi olovdan foydalangan?",
    options: ["Zinjantrop", "Sinantrop", "Kromanyon", "Neandertal"],
    correct: 1
  },
  {
    id: 16,
    questionText: "Neandertal odam qayerdan topilgan?",
    options: ["Fransiya", "Xitoy", "Germaniya", "Misr"],
    correct: 2
  },
  {
    id: 17,
    questionText: "Qoyatosh suratlari nimani bildiradi?",
    options: ["San'atning ilk namunasi", "Yozuvning boshlanishi", "Ov qurollari", "Geografik joy"],
    correct: 0
  },
  {
    id: 18,
    questionText: "Altamira g'ori qayerda joylashgan?",
    options: ["Fransiya", "Ispaniya", "Gretsiya", "Boshqirdiston"],
    correct: 1
  },
  {
    id: 19,
    questionText: "Yozuv qanday vosita?",
    options: ["Aloqa tizimi", "Geografik xarita", "Toshdagi surat", "San'at"],
    correct: 0
  },
  {
    id: 20,
    questionText: "Birinchi alifbo qayerda yaratilgan?",
    options: ["Finikiya", "Misr", "Xitoy", "Shumer"],
    correct: 0
  },
  {
    id: 21,
    questionText: "Avesto kitobi qayerda yaratilgan?",
    options: ["Baqtriya", "Sug'd", "Xorazm", "Bobil"],
    correct: 2
  },
  {
    id: 22,
    questionText: "Avesto qanday ma'noni anglatadi?",
    options: ["Muqaddas qonun", "Yozma manba", "Ezgu niyat", "Buyuk podshoh"],
    correct: 0
  },
  {
    id: 23,
    questionText: "O'rta asrlarda O'rta Osiyoda eng mashhur madrasalar qaysi shaharlarda joylashgan edi?",
    options: ["Buxoro va Samarqand", "Xiva va Qo'qon", "Termiz va Shahrisabz", "Farg'ona va Toshkent"],
    correct: 0
  },
  {
    id: 24,
    questionText: "Amir Temurning shaxsiy kutubxonasi qaysi shaharda joylashgan edi?",
    options: ["Samarqand", "Buxoro", "Shahrisabz", "Xiva"],
    correct: 0
  },
  {
    id: 25,
    questionText: "Islom Karimov qaysi yili Oʻzbekiston Respublikasining birinchi Prezidenti etib saylangan?",
    options: ["1990", "1991", "1992", "1993"],
    correct: 1
  },
  {
    id: 26,
    questionText: "Temuriylar sulolasining asoschisi kim?",
    options: ["Ulug'bek", "Bobur", "Amir Temur", "Shayboniyxon"],
    correct: 2
  },
  {
    id: 27,
    questionText: "Xorazmiy qaysi sohada mashhur bo'lgan?",
    options: ["Astronomiya", "Geografiya", "Matematika", "Tibbiyot"],
    correct: 2
  },
  {
    id: 28,
    questionText: "Buyuk ipak yo‘li qanday ahamiyatga ega bo‘lgan?",
    options: ["Faqat savdo uchun", "Madaniy almashinuv uchun", "Harbiy yurishlar uchun", "Faqatgina Xitoy bilan aloqalar uchun"],
    correct: 1
  },
  {
    id: 29,
    questionText: "O‘zbekiston Respublikasining Davlat madhiyasi qachon qabul qilingan?",
    options: ["1990", "1991", "1992", "1993"],
    correct: 2
  },
  {
    id: 30,
    questionText: "Jaloliddin Manguberdi qaysi davlat bosqiniga qarshi kurashgan?",
    options: ["Vizantiya", "Mo'g'ullar", "Xitoy", "Rossiya"],
    correct: 1
  }
];



const dailyCompetition = [
  {
    id: 1,
    questionText: "Vatan so'zi qanday ma'noni anglatadi?",
    options: ["Ona yurt", "Aziz tuproq", "Muqaddas joy", "Ota yurt"],
    correct: 0
  },
  {
    id: 2,
    questionText: "Vatan so'zining kelib chiqish tili qaysi?",
    options: ["Fors", "Arab", "Lotin", "Rus"],
    correct: 1
  },
  {
    id: 3,
    questionText: "Tarix fani nimani o'rganadi?",
    options: ["Geografik hududlarni", "O'tmish voqealarini", "Yangi texnologiyalarni", "Falsafa asoslarini"],
    correct: 1
  },
  {
    id: 4,
    questionText: "Tarix so'zi qaysi tilga oid?",
    options: ["Yunon", "Lotin", "Arab", "Fors"],
    correct: 2
  },
  {
    id: 5,
    questionText: "Kalendar so'zining ma'nosi nima?",
    options: ["Kunlar hisobi", "Yil boshi", "Har oyning birinchi kuni", "Vaqtni o'lchash"],
    correct: 2
  },
  {
    id: 6,
    questionText: "Dastlabki kalendar qayerda yaratilgan?",
    options: ["Rim", "Misr", "Gretsiya", "Bobil"],
    correct: 1
  },
  {
    id: 7,
    questionText: "Xronologiya so'zi qanday ma'noni anglatadi?",
    options: ["Voqealar vaqt tartibi", "Sanalar ro'yxati", "Ilmiy kitob", "Tarixiy joylar"],
    correct: 0
  },
  {
    id: 8,
    questionText: "Xronos so'zi qaysi ma'noni bildiradi?",
    options: ["Vaqt", "Fan", "Voqea", "Shaxs"],
    correct: 0
  },
  {
    id: 9,
    questionText: "Milod tushunchasining ma'nosi nima?",
    options: ["Yil hisobi", "Tug'ilish", "Asrning boshi", "Voqea"],
    correct: 1
  },
  {
    id: 10,
    questionText: "Hijriy yil hisobi qayerda yaratilgan?",
    options: ["Arabiston", "Misr", "Hindiston", "Xitoy"],
    correct: 0
  },
  {
    id: 11,
    questionText: "Arxeologiya fani nimani o'rganadi?",
    options: ["Qadimgi yozuvlarni", "Moddiy manbalarni", "Til tarixini", "Shaharlarni"],
    correct: 1
  },
  {
    id: 12,
    questionText: "Arxeologiya so'zi qaysi tildan olingan?",
    options: ["Lotin", "Yunon", "Arab", "Fors"],
    correct: 0
  },
  {
    id: 13,
    questionText: "Xarita nima?",
    options: ["Yozuv turi", "Tosh surat", "Yer yuzasining tasviri", "Tarixiy asar"],
    correct: 2
  },
  {
    id: 14,
    questionText: "Globusning ma'nosi nima?",
    options: ["Yer olmasi", "To'p", "Shar", "Dumaloq"],
    correct: 2
  },
  {
    id: 15,
    questionText: "Qaysi odam turi olovdan foydalangan?",
    options: ["Zinjantrop", "Sinantrop", "Kromanyon", "Neandertal"],
    correct: 1
  },
  {
    id: 16,
    questionText: "Neandertal odam qayerdan topilgan?",
    options: ["Fransiya", "Xitoy", "Germaniya", "Misr"],
    correct: 2
  },
  {
    id: 17,
    questionText: "Qoyatosh suratlari nimani bildiradi?",
    options: ["San'atning ilk namunasi", "Yozuvning boshlanishi", "Ov qurollari", "Geografik joy"],
    correct: 0
  },
  {
    id: 18,
    questionText: "Altamira g'ori qayerda joylashgan?",
    options: ["Fransiya", "Ispaniya", "Gretsiya", "Boshqirdiston"],
    correct: 1
  },
  {
    id: 19,
    questionText: "Yozuv qanday vosita?",
    options: ["Aloqa tizimi", "Geografik xarita", "Toshdagi surat", "San'at"],
    correct: 0
  },
  {
    id: 20,
    questionText: "Birinchi alifbo qayerda yaratilgan?",
    options: ["Finikiya", "Misr", "Xitoy", "Shumer"],
    correct: 0
  },
  {
    id: 21,
    questionText: "Avesto kitobi qayerda yaratilgan?",
    options: ["Baqtriya", "Sug'd", "Xorazm", "Bobil"],
    correct: 2
  },
  {
    id: 22,
    questionText: "Avesto qanday ma'noni anglatadi?",
    options: ["Muqaddas qonun", "Yozma manba", "Ezgu niyat", "Buyuk podshoh"],
    correct: 0
  },
  {
    id: 23,
    questionText: "O'rta asrlarda O'rta Osiyoda eng mashhur madrasalar qaysi shaharlarda joylashgan edi?",
    options: ["Buxoro va Samarqand", "Xiva va Qo'qon", "Termiz va Shahrisabz", "Farg'ona va Toshkent"],
    correct: 0
  },
  {
    id: 24,
    questionText: "Amir Temurning shaxsiy kutubxonasi qaysi shaharda joylashgan edi?",
    options: ["Samarqand", "Buxoro", "Shahrisabz", "Xiva"],
    correct: 0
  },
  {
    id: 25,
    questionText: "Islom Karimov qaysi yili Oʻzbekiston Respublikasining birinchi Prezidenti etib saylangan?",
    options: ["1990", "1991", "1992", "1993"],
    correct: 1
  },
  {
    id: 26,
    questionText: "Temuriylar sulolasining asoschisi kim?",
    options: ["Ulug'bek", "Bobur", "Amir Temur", "Shayboniyxon"],
    correct: 2
  },
  {
    id: 27,
    questionText: "Xorazmiy qaysi sohada mashhur bo'lgan?",
    options: ["Astronomiya", "Geografiya", "Matematika", "Tibbiyot"],
    correct: 2
  },
  {
    id: 28,
    questionText: "Buyuk ipak yo‘li qanday ahamiyatga ega bo‘lgan?",
    options: ["Faqat savdo uchun", "Madaniy almashinuv uchun", "Harbiy yurishlar uchun", "Faqatgina Xitoy bilan aloqalar uchun"],
    correct: 1
  },
  {
    id: 29,
    questionText: "O‘zbekiston Respublikasining Davlat madhiyasi qachon qabul qilingan?",
    options: ["1990", "1991", "1992", "1993"],
    correct: 2
  },
  {
    id: 30,
    questionText: "Jaloliddin Manguberdi qaysi davlat bosqiniga qarshi kurashgan?",
    options: ["Vizantiya", "Mo'g'ullar", "Xitoy", "Rossiya"],
    correct: 1
  }
]


module.exports = { getTests, dailyCompetition };

