const grade5Tests = [
    {
        id: 1,
        question: "O`zbekiston Respublikasi tarkibida nechta respublika va viloyat bor?",
        options: ["12 ta viloyat", "5 ta respublika 15 ta viloyat", "1 ta respublika 12 t viloyat", "2 ta respublika 11 ta viloyat"],
        correct: 2
    },
    {
        id: 2,
        question: "O`zbekistonda qancha millat va elat yashagan?",
        options: ["100 dan ortiq", "50 ga yaqin", "60 dan ortiq", "130 ga yaqin"],
        correct: 3
    },
    {
        id: 3,
        question: "’’Tarix’’ so`zi qaysi tildan olingan va u qanday ma’noni anglatadi?",
        options: ["arabcha ‘’o`tgan voqealar haqida hikoya", "yunoncha ‘’o`tmish haqida hikoyalar", "lotincha ‘’ajdodlarning uzoq va yaqin o`tmishi", "arabcha ‘’o`zlikni anglash manaviy barkamollik"],
        correct: 0
    },
    {
        id: 4,
        question: "Hozir dunyoda qanday yil hisoblari qo`llanilmoqda?",
        options: ["hijriy, shamtiy", "milodiy,qamariy", "shamtiy, qamariy", "hijriy, milodiy"],
        correct: 3
    },
    {
        id: 5,
        question: "Hozirgi kunda qo`llanayotgan kalendar qaysi?",
        options: ["Grigoriy", "Yuliy", "Misr", "Xorazm"],
        correct: 0
    },
    {
        id: 6,
        question: "Eng qadimgi odamlar yer yuzida qachondan yashay boshlaganlar?",
        options: ["bundan 3-4 mln yil oldin", "bundan 2-3mln yil oldin", "bundan 500-700 ming yil oldin", "bundan 12-40 ming yil oldin"],
        correct: 1
    },
    {
        id: 7,
        question: "Eng qadimgi odamlar qayerlarda yashaganlar?",
        options: ["qal’alarda ,g`orlard ,chaylalarda", "yerto`lalarda ,o`rmonlarda hujralarda", "daraxt kovaklarida, g`orlarda poxsa uylarda", "g`or, ungir o`rmon chakalakzorlarda"],
        correct: 3
    },
    {
        id: 8,
        question: "Inson qo’lga o’rgatgan birinchi hayvon qaysi?",
        options: ["ot", "it", "sigir", "echki"],
        correct: 1
    },
    {
        id: 9,
        question: "O’zbekiston tarixiga oid ilk manbaalarni aniqlang?",
        options: ["Behustun bitiklari", "Avesto kitobi", "Gerodotning ,,tarix’’ asari", "barcha javoblar to’g’ri"],
        correct: 1
    },
    {
        id: 10,
        question: "Dunyoda dastlabki davlatlar qayerda tashkil topgan?",
        options: ["Misrda", "Mesopotamiyada", "Hindistonda", "Xitoyda"],
        correct: 1
    },
    {
        id: 11,
        question: "Qaysi xalqda aholi 4 kastaga bo’lingan?",
        options: ["Misrliklarda", "Mesopotamiyada", "Hindlarda", "Xitoylarda"],
        correct: 2
    },
    {
        id: 12,
        question: "Xalqaro sport musoboqasi -Olimpiada qayerda paydo bo’lgan?",
        options: ["Hindistonda", "Misrda", "Mesopotamiyada", "Yunonistonda"],
        correct: 3
    },
    {
        id: 13,
        question: "Lotin yozuvining vatani qayer?",
        options: ["Rim", "Yunoniston", "Mesopotamiya", "Misr"],
        correct: 0
    },
    {
        id: 14,
        question: "Misr nimasi bilan mashhur?",
        options: ["ehromlari bilan", "kalendar yaratgani bilan", "ilk davlat tuzilgani bilan", "barchasi"],
        correct: 1
    },
    {
        id: 15,
        question: "Nomi “yorug’ osmon” ma’nosini bildiradi, uning sharafiga sport musobaqalari o’tkaziladi. U …?",
        options: ["Ossuriya malikasi Semiramida", "Olimp xudosi Zevs", "Ma’buda Artemida", "Quyosh xudosi Gelios"],
        correct: 1
    },
    {
        id: 16,
        question: "O’zbekiston hududida davlatlar qachon vujudga kelgan?",
        options: ["m.a.IV mingyillikda", "m.a.VII asrda", "m.a.II mingyillikda", "m.a.V asrda"],
        correct: 1
    },
    {
        id: 17,
        question: "O’zbekiston hududidagi ilk davlatlarni belgilang.",
        options: ["Xorazm", "Baqtriya", "Sug’diyona", "barchasi"],
        correct: 3
    },
    {
        id: 18,
        question: "M.a. 530-yilda massagetlar malikasi qaysi bosqinchini yengdi?",
        options: ["Kir II", "Doro I", "Sparganis", "To’maris"],
        correct: 0
    },
    {
        id: 19,
        question: "Doro I ni yenggan Shiroq qaysi qabiladan edi?",
        options: ["massaget", "sug’d", "fors", "sak"],
        correct: 3
    },
    {
        id: 20,
        question: "Turon podshosining nomini toping.",
        options: ["Siyovush", "Afrosiyob", "Kaykovus", "Kayxusrav"],
        correct: 1
    },
    {
        id: 21,
        question: "’’Tabiiy tarix asari necha kitobdan iborat?",
        options: ["30", "37", "9"],
        correct: 1
    },
    {
        id: 22,
        question: "’’Toshli yer” bu?",
        options: ["Yunoniston", "Rim", "Xitoy"],
        correct: 1
    },
    {
        id: 23,
        question: "’’Respublika” so’zining ma’nosi?",
        options: ["Umumxalq ishi", "Umumiy ish", "Saylov"],
        correct: 0
    },
    {
        id: 24,
        question: "Xeops piramidasi necha metr bo’lgan?",
        options: ["146,5", "147", "150"],
        correct: 0
    },
    {
        id: 25,
        question: "’’Semiramida osma bog’lari” necha qavat bo’lgan?",
        options: ["2", "3", "4"],
        correct: 2
    },
    {
        id: 26,
        question: "Sfinks haykali necha metr bo’lg?an?",
        options: ["10", "20", "30"],
        correct: 1
    },
    {
        id: 27,
        question: "Semiramida osma bog’lari kim tomonidan qurdirilgan?",
        options: ["Navuxodonosor", "Semiramida", "Fidiy"],
        correct: 0
    }
]

module.exports = { grade5Tests };