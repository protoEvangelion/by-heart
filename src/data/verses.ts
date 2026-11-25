// The Navigators Topical Memory System: 60 verses in five series of twelve.
// Scripture text: Legacy Standard Bible (LSB), fetched verse by verse from the
// official LSB reader (read.lsbible.org) and stored verbatim, including poetry
// line breaks. Reference strings follow the published TMS card list.

export type SeriesLetter = "A" | "B" | "C" | "D" | "E";

export type Verse = {
  id: string;
  ref: string;
  book: string;
  series: SeriesLetter;
  seriesName: string;
  topic: string;
  poem: boolean;
  lines: string[];
  text: string;
};

export const SERIES: { letter: SeriesLetter; name: string }[] = [
  {
    "letter": "A",
    "name": "Live the New Life"
  },
  {
    "letter": "B",
    "name": "Proclaim Christ"
  },
  {
    "letter": "C",
    "name": "Rely on God's Resources"
  },
  {
    "letter": "D",
    "name": "Be Christ's Disciple"
  },
  {
    "letter": "E",
    "name": "Grow in Christlikeness"
  }
];

export const VERSES: Verse[] = [
  {
    "id": "A1",
    "ref": "2 Corinthians 5:17",
    "book": "2 Corinthians",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Christ the Center",
    "poem": false,
    "lines": [
      "Therefore if anyone is in Christ, he is a new creation; the old things passed away; behold, new things have come."
    ],
    "text": "Therefore if anyone is in Christ, he is a new creation; the old things passed away; behold, new things have come."
  },
  {
    "id": "A2",
    "ref": "Galatians 2:20",
    "book": "Galatians",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Christ the Center",
    "poem": false,
    "lines": [
      "“I have been crucified with Christ, and it is no longer I who live, but Christ lives in me. And the life which I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself up for me."
    ],
    "text": "“I have been crucified with Christ, and it is no longer I who live, but Christ lives in me. And the life which I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself up for me."
  },
  {
    "id": "A3",
    "ref": "Romans 12:1",
    "book": "Romans",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Obedience to Christ",
    "poem": false,
    "lines": [
      "Therefore I exhort you, brothers, by the mercies of God, to present your bodies as a sacrifice—living, holy, and pleasing to God, which is your spiritual service of worship."
    ],
    "text": "Therefore I exhort you, brothers, by the mercies of God, to present your bodies as a sacrifice—living, holy, and pleasing to God, which is your spiritual service of worship."
  },
  {
    "id": "A4",
    "ref": "John 14:21",
    "book": "John",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Obedience to Christ",
    "poem": false,
    "lines": [
      "“He who has My commandments and keeps them is the one who loves Me; and he who loves Me will be loved by My Father, and I will love him and will disclose Myself to him.”"
    ],
    "text": "“He who has My commandments and keeps them is the one who loves Me; and he who loves Me will be loved by My Father, and I will love him and will disclose Myself to him.”"
  },
  {
    "id": "A5",
    "ref": "2 Timothy 3:16",
    "book": "2 Timothy",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "The Word",
    "poem": false,
    "lines": [
      "All Scripture is God-breathed and profitable for teaching, for reproof, for correction, for training in righteousness,"
    ],
    "text": "All Scripture is God-breathed and profitable for teaching, for reproof, for correction, for training in righteousness,"
  },
  {
    "id": "A6",
    "ref": "Joshua 1:8",
    "book": "Joshua",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "The Word",
    "poem": false,
    "lines": [
      "“This book of the law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it; for then you will make your way successful, and then you will be prosperous."
    ],
    "text": "“This book of the law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it; for then you will make your way successful, and then you will be prosperous."
  },
  {
    "id": "A7",
    "ref": "John 15:7",
    "book": "John",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Prayer",
    "poem": false,
    "lines": [
      "“If you abide in Me, and My words abide in you, ask whatever you wish, and it will be done for you."
    ],
    "text": "“If you abide in Me, and My words abide in you, ask whatever you wish, and it will be done for you."
  },
  {
    "id": "A8",
    "ref": "Philippians 4:6-7",
    "book": "Philippians",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Prayer",
    "poem": false,
    "lines": [
      "Be anxious for nothing, but in everything by prayer and petition with thanksgiving let your requests be made known to God.",
      "And the peace of God, which surpasses all comprehension, will guard your hearts and your minds in Christ Jesus."
    ],
    "text": "Be anxious for nothing, but in everything by prayer and petition with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all comprehension, will guard your hearts and your minds in Christ Jesus."
  },
  {
    "id": "A9",
    "ref": "Matthew 18:20",
    "book": "Matthew",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Fellowship",
    "poem": false,
    "lines": [
      "“For where two or three have gathered together in My name, I am there in their midst.”"
    ],
    "text": "“For where two or three have gathered together in My name, I am there in their midst.”"
  },
  {
    "id": "A10",
    "ref": "Hebrews 10:24-25",
    "book": "Hebrews",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Fellowship",
    "poem": false,
    "lines": [
      "And let us consider how to stimulate one another to love and good deeds,",
      "not forsaking our own assembling together, as is the habit of some, but encouraging one another, and all the more as you see the day drawing near."
    ],
    "text": "And let us consider how to stimulate one another to love and good deeds, not forsaking our own assembling together, as is the habit of some, but encouraging one another, and all the more as you see the day drawing near."
  },
  {
    "id": "A11",
    "ref": "Matthew 4:19",
    "book": "Matthew",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Witnessing",
    "poem": false,
    "lines": [
      "And He *said to them, “Follow Me, and I will make you fishers of men.”"
    ],
    "text": "And He *said to them, “Follow Me, and I will make you fishers of men.”"
  },
  {
    "id": "A12",
    "ref": "Romans 1:16",
    "book": "Romans",
    "series": "A",
    "seriesName": "Live the New Life",
    "topic": "Witnessing",
    "poem": false,
    "lines": [
      "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek."
    ],
    "text": "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek."
  },
  {
    "id": "B1",
    "ref": "Romans 3:23",
    "book": "Romans",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "All Have Sinned",
    "poem": false,
    "lines": [
      "for all have sinned and fall short of the glory of God,"
    ],
    "text": "for all have sinned and fall short of the glory of God,"
  },
  {
    "id": "B2",
    "ref": "Isaiah 53:6",
    "book": "Isaiah",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "All Have Sinned",
    "poem": true,
    "lines": [
      "All of us like sheep have gone astray,",
      "Each of us has turned to his own way;",
      "But Yahweh has caused the iniquity of us all",
      "To fall on Him."
    ],
    "text": "All of us like sheep have gone astray, Each of us has turned to his own way; But Yahweh has caused the iniquity of us all To fall on Him."
  },
  {
    "id": "B3",
    "ref": "Romans 6:23",
    "book": "Romans",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Sin's Penalty",
    "poem": false,
    "lines": [
      "For the wages of sin is death, but the gracious gift of God is eternal life in Christ Jesus our Lord."
    ],
    "text": "For the wages of sin is death, but the gracious gift of God is eternal life in Christ Jesus our Lord."
  },
  {
    "id": "B4",
    "ref": "Hebrews 9:27",
    "book": "Hebrews",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Sin's Penalty",
    "poem": false,
    "lines": [
      "And inasmuch as it is appointed for men to die once and after this comes judgment,"
    ],
    "text": "And inasmuch as it is appointed for men to die once and after this comes judgment,"
  },
  {
    "id": "B5",
    "ref": "Romans 5:8",
    "book": "Romans",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Christ Paid the Penalty",
    "poem": false,
    "lines": [
      "But God demonstrates His own love toward us, in that while we were yet sinners, Christ died for us."
    ],
    "text": "But God demonstrates His own love toward us, in that while we were yet sinners, Christ died for us."
  },
  {
    "id": "B6",
    "ref": "1 Peter 3:18",
    "book": "1 Peter",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Christ Paid the Penalty",
    "poem": false,
    "lines": [
      "For Christ also suffered for sins once for all, the righteous for the unrighteous, so that He might bring you to God, having been put to death in the flesh, but made alive in the spirit;"
    ],
    "text": "For Christ also suffered for sins once for all, the righteous for the unrighteous, so that He might bring you to God, having been put to death in the flesh, but made alive in the spirit;"
  },
  {
    "id": "B7",
    "ref": "Ephesians 2:8-9",
    "book": "Ephesians",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Salvation Is Not by Works",
    "poem": false,
    "lines": [
      "For by grace you have been saved through faith, and this not of yourselves, it is the gift of God;",
      "not of works, so that no one may boast."
    ],
    "text": "For by grace you have been saved through faith, and this not of yourselves, it is the gift of God; not of works, so that no one may boast."
  },
  {
    "id": "B8",
    "ref": "Titus 3:5",
    "book": "Titus",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Salvation Is Not by Works",
    "poem": false,
    "lines": [
      "He saved us, not by works which we did in righteousness, but according to His mercy, through the washing of regeneration and renewing by the Holy Spirit,"
    ],
    "text": "He saved us, not by works which we did in righteousness, but according to His mercy, through the washing of regeneration and renewing by the Holy Spirit,"
  },
  {
    "id": "B9",
    "ref": "John 1:12",
    "book": "John",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Must Receive Christ",
    "poem": false,
    "lines": [
      "But as many as received Him, to them He gave the right to become children of God, even to those who believe in His name,"
    ],
    "text": "But as many as received Him, to them He gave the right to become children of God, even to those who believe in His name,"
  },
  {
    "id": "B10",
    "ref": "Revelation 3:20",
    "book": "Revelation",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Must Receive Christ",
    "poem": false,
    "lines": [
      "‘Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and will dine with him, and he with Me."
    ],
    "text": "‘Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and will dine with him, and he with Me."
  },
  {
    "id": "B11",
    "ref": "1 John 5:13",
    "book": "1 John",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Assurance of Salvation",
    "poem": false,
    "lines": [
      "These things I have written to you who believe in the name of the Son of God, so that you may know that you have eternal life."
    ],
    "text": "These things I have written to you who believe in the name of the Son of God, so that you may know that you have eternal life."
  },
  {
    "id": "B12",
    "ref": "John 5:24",
    "book": "John",
    "series": "B",
    "seriesName": "Proclaim Christ",
    "topic": "Assurance of Salvation",
    "poem": false,
    "lines": [
      "“Truly, truly, I say to you, he who hears My word, and believes Him who sent Me, has eternal life, and does not come into judgment, but has passed out of death into life."
    ],
    "text": "“Truly, truly, I say to you, he who hears My word, and believes Him who sent Me, has eternal life, and does not come into judgment, but has passed out of death into life."
  },
  {
    "id": "C1",
    "ref": "1 Corinthians 3:16",
    "book": "1 Corinthians",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Spirit",
    "poem": false,
    "lines": [
      "Do you not know that you are a sanctuary of God and that the Spirit of God dwells in you?"
    ],
    "text": "Do you not know that you are a sanctuary of God and that the Spirit of God dwells in you?"
  },
  {
    "id": "C2",
    "ref": "1 Corinthians 2:12",
    "book": "1 Corinthians",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Spirit",
    "poem": false,
    "lines": [
      "Now we have received, not the spirit of the world, but the Spirit who is from God, so that we may know the depths graciously given to us by God,"
    ],
    "text": "Now we have received, not the spirit of the world, but the Spirit who is from God, so that we may know the depths graciously given to us by God,"
  },
  {
    "id": "C3",
    "ref": "Isaiah 41:10",
    "book": "Isaiah",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Strength",
    "poem": true,
    "lines": [
      "‘Do not fear, for I am with you;",
      "Do not anxiously look about you, for I am your God.",
      "I will make you mighty, surely I will help you;",
      "Surely I will uphold you with My righteous right hand.’"
    ],
    "text": "‘Do not fear, for I am with you; Do not anxiously look about you, for I am your God. I will make you mighty, surely I will help you; Surely I will uphold you with My righteous right hand.’"
  },
  {
    "id": "C4",
    "ref": "Philippians 4:13",
    "book": "Philippians",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Strength",
    "poem": false,
    "lines": [
      "I can do all things through Him who strengthens me."
    ],
    "text": "I can do all things through Him who strengthens me."
  },
  {
    "id": "C5",
    "ref": "Lamentations 3:22-23",
    "book": "Lamentations",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Faithfulness",
    "poem": true,
    "lines": [
      "The lovingkindnesses of Yahweh indeed never cease,",
      "For His compassions never fail.",
      "They are new every morning;",
      "Great is Your faithfulness."
    ],
    "text": "The lovingkindnesses of Yahweh indeed never cease, For His compassions never fail. They are new every morning; Great is Your faithfulness."
  },
  {
    "id": "C6",
    "ref": "Numbers 23:19",
    "book": "Numbers",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Faithfulness",
    "poem": true,
    "lines": [
      "“God is not a man, that He should lie,",
      "Nor a son of man, that He should repent;",
      "Has He said, and will He not do it?",
      "Or has He spoken, and will He not establish it?"
    ],
    "text": "“God is not a man, that He should lie, Nor a son of man, that He should repent; Has He said, and will He not do it? Or has He spoken, and will He not establish it?"
  },
  {
    "id": "C7",
    "ref": "Isaiah 26:3",
    "book": "Isaiah",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Peace",
    "poem": true,
    "lines": [
      "“The steadfast of mind You will keep in perfect peace",
      "Because he trusts in You."
    ],
    "text": "“The steadfast of mind You will keep in perfect peace Because he trusts in You."
  },
  {
    "id": "C8",
    "ref": "1 Peter 5:7",
    "book": "1 Peter",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Peace",
    "poem": false,
    "lines": [
      "casting all your anxiety on Him, because He cares for you."
    ],
    "text": "casting all your anxiety on Him, because He cares for you."
  },
  {
    "id": "C9",
    "ref": "Romans 8:32",
    "book": "Romans",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Provision",
    "poem": false,
    "lines": [
      "He who indeed did not spare His own Son, but delivered Him over for us all, how will He not also with Him graciously give us all things?"
    ],
    "text": "He who indeed did not spare His own Son, but delivered Him over for us all, how will He not also with Him graciously give us all things?"
  },
  {
    "id": "C10",
    "ref": "Philippians 4:19",
    "book": "Philippians",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Provision",
    "poem": false,
    "lines": [
      "And my God will fulfill all your needs according to His riches in glory in Christ Jesus."
    ],
    "text": "And my God will fulfill all your needs according to His riches in glory in Christ Jesus."
  },
  {
    "id": "C11",
    "ref": "Hebrews 2:18",
    "book": "Hebrews",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Help in Temptation",
    "poem": false,
    "lines": [
      "For since He Himself was tempted in that which He has suffered, He is able to come to help those who are tempted."
    ],
    "text": "For since He Himself was tempted in that which He has suffered, He is able to come to help those who are tempted."
  },
  {
    "id": "C12",
    "ref": "Psalm 119:9-11",
    "book": "Psalms",
    "series": "C",
    "seriesName": "Rely on God's Resources",
    "topic": "His Help in Temptation",
    "poem": true,
    "lines": [
      "How can a young man keep his way pure?",
      "By keeping it according to Your word.",
      "With all my heart I have sought You;",
      "Do not let me stray from Your commandments.",
      "Your word I have treasured in my heart,",
      "That I may not sin against You."
    ],
    "text": "How can a young man keep his way pure? By keeping it according to Your word. With all my heart I have sought You; Do not let me stray from Your commandments. Your word I have treasured in my heart, That I may not sin against You."
  },
  {
    "id": "D1",
    "ref": "Matthew 6:33",
    "book": "Matthew",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Put Christ First",
    "poem": false,
    "lines": [
      "“But seek first His kingdom and His righteousness, and all these things will be added to you."
    ],
    "text": "“But seek first His kingdom and His righteousness, and all these things will be added to you."
  },
  {
    "id": "D2",
    "ref": "Luke 9:23",
    "book": "Luke",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Put Christ First",
    "poem": false,
    "lines": [
      "And He was saying to them all, “If anyone wishes to come after Me, let him deny himself, and take up his cross daily and follow Me."
    ],
    "text": "And He was saying to them all, “If anyone wishes to come after Me, let him deny himself, and take up his cross daily and follow Me."
  },
  {
    "id": "D3",
    "ref": "1 John 2:15-16",
    "book": "1 John",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Separate from the World",
    "poem": false,
    "lines": [
      "Do not love the world nor the things in the world. If anyone loves the world, the love of the Father is not in him.",
      "For all that is in the world, the lust of the flesh and the lust of the eyes and the boastful pride of life, is not from the Father, but is from the world."
    ],
    "text": "Do not love the world nor the things in the world. If anyone loves the world, the love of the Father is not in him. For all that is in the world, the lust of the flesh and the lust of the eyes and the boastful pride of life, is not from the Father, but is from the world."
  },
  {
    "id": "D4",
    "ref": "Romans 12:2",
    "book": "Romans",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Separate from the World",
    "poem": false,
    "lines": [
      "And do not be conformed to this world, but be transformed by the renewing of your mind, so that you may approve what the will of God is, that which is good and pleasing and perfect."
    ],
    "text": "And do not be conformed to this world, but be transformed by the renewing of your mind, so that you may approve what the will of God is, that which is good and pleasing and perfect."
  },
  {
    "id": "D5",
    "ref": "1 Corinthians 15:58",
    "book": "1 Corinthians",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Be Steadfast",
    "poem": false,
    "lines": [
      "Therefore, my beloved brothers, be steadfast, immovable, always abounding in the work of the Lord, knowing that your labor is not in vain in the Lord."
    ],
    "text": "Therefore, my beloved brothers, be steadfast, immovable, always abounding in the work of the Lord, knowing that your labor is not in vain in the Lord."
  },
  {
    "id": "D6",
    "ref": "Hebrews 12:3",
    "book": "Hebrews",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Be Steadfast",
    "poem": false,
    "lines": [
      "For consider Him who has endured such hostility by sinners against Himself, so that you will not grow weary, fainting in heart."
    ],
    "text": "For consider Him who has endured such hostility by sinners against Himself, so that you will not grow weary, fainting in heart."
  },
  {
    "id": "D7",
    "ref": "Mark 10:45",
    "book": "Mark",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Serve Others",
    "poem": false,
    "lines": [
      "“For even the Son of Man did not come to be served, but to serve, and to give His life a ransom for many.”"
    ],
    "text": "“For even the Son of Man did not come to be served, but to serve, and to give His life a ransom for many.”"
  },
  {
    "id": "D8",
    "ref": "2 Corinthians 4:5",
    "book": "2 Corinthians",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Serve Others",
    "poem": false,
    "lines": [
      "For we do not preach ourselves but Jesus Christ as Lord, and ourselves as your slaves for the sake of Jesus."
    ],
    "text": "For we do not preach ourselves but Jesus Christ as Lord, and ourselves as your slaves for the sake of Jesus."
  },
  {
    "id": "D9",
    "ref": "Proverbs 3:9-10",
    "book": "Proverbs",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Give Generously",
    "poem": true,
    "lines": [
      "Honor Yahweh from your wealth",
      "And from the first of all your produce;",
      "So your barns will be filled with plenty",
      "And your vats will burst with new wine."
    ],
    "text": "Honor Yahweh from your wealth And from the first of all your produce; So your barns will be filled with plenty And your vats will burst with new wine."
  },
  {
    "id": "D10",
    "ref": "2 Corinthians 9:6-7",
    "book": "2 Corinthians",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Give Generously",
    "poem": false,
    "lines": [
      "Now this I say, he who sows sparingly will also reap sparingly, and he who sows with blessing will also reap with blessing.",
      "Each one must do just as he has purposed in his heart, not grudgingly or under compulsion, for God loves a cheerful giver."
    ],
    "text": "Now this I say, he who sows sparingly will also reap sparingly, and he who sows with blessing will also reap with blessing. Each one must do just as he has purposed in his heart, not grudgingly or under compulsion, for God loves a cheerful giver."
  },
  {
    "id": "D11",
    "ref": "Acts 1:8",
    "book": "Acts",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Develop World Vision",
    "poem": false,
    "lines": [
      "but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all Judea and Samaria, and even to the end of the earth.”"
    ],
    "text": "but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all Judea and Samaria, and even to the end of the earth.”"
  },
  {
    "id": "D12",
    "ref": "Matthew 28:19-20",
    "book": "Matthew",
    "series": "D",
    "seriesName": "Be Christ's Disciple",
    "topic": "Develop World Vision",
    "poem": false,
    "lines": [
      "“Go therefore and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit,",
      "teaching them to keep all that I commanded you; and behold, I am with you always, even to the end of the age.”"
    ],
    "text": "“Go therefore and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit, teaching them to keep all that I commanded you; and behold, I am with you always, even to the end of the age.”"
  },
  {
    "id": "E1",
    "ref": "John 13:34-35",
    "book": "John",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Love",
    "poem": false,
    "lines": [
      "“A new commandment I give to you, that you love one another, even as I have loved you, that you also love one another.",
      "“By this all will know that you are My disciples, if you have love for one another.”"
    ],
    "text": "“A new commandment I give to you, that you love one another, even as I have loved you, that you also love one another. “By this all will know that you are My disciples, if you have love for one another.”"
  },
  {
    "id": "E2",
    "ref": "1 John 3:18",
    "book": "1 John",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Love",
    "poem": false,
    "lines": [
      "Little children, let us not love with word or with tongue, but in deed and truth."
    ],
    "text": "Little children, let us not love with word or with tongue, but in deed and truth."
  },
  {
    "id": "E3",
    "ref": "Philippians 2:3-4",
    "book": "Philippians",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Humility",
    "poem": false,
    "lines": [
      "doing nothing from selfish ambition or vain glory, but with humility of mind regarding one another as more important than yourselves,",
      "not merely looking out for your own personal interests, but also for the interests of others."
    ],
    "text": "doing nothing from selfish ambition or vain glory, but with humility of mind regarding one another as more important than yourselves, not merely looking out for your own personal interests, but also for the interests of others."
  },
  {
    "id": "E4",
    "ref": "1 Peter 5:5-6",
    "book": "1 Peter",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Humility",
    "poem": false,
    "lines": [
      "You younger men, likewise, be subject to your elders. And all of you, clothe yourselves with humility toward one another, for God is opposed to the proud, but gives grace to the humble.",
      "Therefore humble yourselves under the mighty hand of God, that He may exalt you at the proper time,"
    ],
    "text": "You younger men, likewise, be subject to your elders. And all of you, clothe yourselves with humility toward one another, for God is opposed to the proud, but gives grace to the humble. Therefore humble yourselves under the mighty hand of God, that He may exalt you at the proper time,"
  },
  {
    "id": "E5",
    "ref": "Ephesians 5:3",
    "book": "Ephesians",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Purity",
    "poem": false,
    "lines": [
      "But sexual immorality or any impurity or greed must not even be named among you, as is proper among saints;"
    ],
    "text": "But sexual immorality or any impurity or greed must not even be named among you, as is proper among saints;"
  },
  {
    "id": "E6",
    "ref": "1 Peter 2:11",
    "book": "1 Peter",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Purity",
    "poem": false,
    "lines": [
      "Beloved, I urge you as sojourners and exiles to abstain from fleshly lusts which wage war against the soul,"
    ],
    "text": "Beloved, I urge you as sojourners and exiles to abstain from fleshly lusts which wage war against the soul,"
  },
  {
    "id": "E7",
    "ref": "Leviticus 19:11",
    "book": "Leviticus",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Honesty",
    "poem": false,
    "lines": [
      "‘You shall not steal, nor deal falsely, nor lie to one another."
    ],
    "text": "‘You shall not steal, nor deal falsely, nor lie to one another."
  },
  {
    "id": "E8",
    "ref": "Acts 24:16",
    "book": "Acts",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Honesty",
    "poem": false,
    "lines": [
      "“In view of this, I also do my best to maintain always a conscience without fault both before God and before men."
    ],
    "text": "“In view of this, I also do my best to maintain always a conscience without fault both before God and before men."
  },
  {
    "id": "E9",
    "ref": "Hebrews 11:6",
    "book": "Hebrews",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Faith",
    "poem": false,
    "lines": [
      "And without faith it is impossible to please Him, for he who draws near to God must believe that He is and that He is a rewarder of those who seek Him."
    ],
    "text": "And without faith it is impossible to please Him, for he who draws near to God must believe that He is and that He is a rewarder of those who seek Him."
  },
  {
    "id": "E10",
    "ref": "Romans 4:20-21",
    "book": "Romans",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Faith",
    "poem": false,
    "lines": [
      "yet, with respect to the promise of God, he did not waver in unbelief but grew strong in faith, giving glory to God,",
      "and being fully assured that what God had promised, He was able also to do."
    ],
    "text": "yet, with respect to the promise of God, he did not waver in unbelief but grew strong in faith, giving glory to God, and being fully assured that what God had promised, He was able also to do."
  },
  {
    "id": "E11",
    "ref": "Galatians 6:9-10",
    "book": "Galatians",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Good Works",
    "poem": false,
    "lines": [
      "And let us not lose heart in doing good, for in due time we will reap if we do not grow weary.",
      "So then, while we have opportunity, let us do good to all people, and especially to those who are of the household of the faith."
    ],
    "text": "And let us not lose heart in doing good, for in due time we will reap if we do not grow weary. So then, while we have opportunity, let us do good to all people, and especially to those who are of the household of the faith."
  },
  {
    "id": "E12",
    "ref": "Matthew 5:16",
    "book": "Matthew",
    "series": "E",
    "seriesName": "Grow in Christlikeness",
    "topic": "Good Works",
    "poem": false,
    "lines": [
      "“Let your light shine before men in such a way that they may see your good works, and glorify your Father who is in heaven."
    ],
    "text": "“Let your light shine before men in such a way that they may see your good works, and glorify your Father who is in heaven."
  }
];

export const BY_ID = new Map(VERSES.map((v) => [v.id, v]));
