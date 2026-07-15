export type Language = 'en' | 'ka';

export interface Section {
  id: string;
  title: string;
  text: string;
}

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  caption: string;
}

export interface Section {
  id: string;
  title: string;
  text: string;
  quickFacts: { label: string; value: string }[];
}

export interface Content {
  title: string;
  subtitle: string;
  location: string;
  summaryTitle: string;
  summary: string;
  exploreLabel: string;
  readHistoryLabel: string;
  listenLabel: string;
  listenActiveLabel: string;
  timelineTitle: string;
  galleryTitle: string;
  printLabel: string;
  quickFactsTitle: string;
  liveWeatherLabel: string;
  viewOnMapLabel: string;
  weatherConditions: Record<string, string>;
  closeModalLabel: string;
  sections: Section[];
  timeline: TimelineEvent[];
  gallery: GalleryImage[];
  glossary: Record<string, string>;
  footer: string;
}

export const contentData: Record<Language, Content> = {
  en: {
    title: "Kvetera",
    subtitle: "The Fortress-City",
    location: "Akhmeta, Georgia",
    summaryTitle: "A Brief History",
    summary: "From the mid-7th century, Georgia's socio-political and cultural development was halted by the Arab military-religious expansion. The movement against the Arabs took on the character of a broad national liberation struggle... It was precisely during this period (7th-8th centuries) that the Duchy of Kvetera was founded, and its administrative center - the fortress-city of Kvetera - was built.",
    exploreLabel: "Explore Site",
    readHistoryLabel: "Read History",
    listenLabel: "Listen to Audio Guide",
    listenActiveLabel: "Pause Audio Guide",
    timelineTitle: "Chronology of Kvetera",
    galleryTitle: "Archival Imagery",
    printLabel: "Print Archive",
    closeModalLabel: "Close Details",
    quickFactsTitle: "Section Facts",
    liveWeatherLabel: "Akhmeta Live",
    viewOnMapLabel: "View on Google Maps",
    weatherConditions: {
      clear: "Clear",
      cloudy: "Cloudy",
      foggy: "Foggy",
      rain: "Rain",
      snow: "Snow",
      storm: "Storm",
      unknown: "Unknown"
    },
    footer: "Historical content provided by Historian Gogi Urgebashvili.",
    glossary: {
      "Emirate of Tbilisi": "An Islamic state established by the Arabs in Georgia, lasting from 736 to 1122.",
      "Caliphate": "The Islamic state under the leadership of an Islamic steward known as a caliph.",
      "Korepiskoposate": "The Principality of Kakheti, ruled by a Chorepiscopus (Korepiskopos), a unique title for the regional ruler.",
      "darbazi": "A traditional Georgian architectural type, often referring to a hall church or a specific type of dwelling with a dome.",
      "eristavi": "A Georgian feudal title, roughly equivalent to a duke or governor of a region.",
      "Duchy": "A territory or domain ruled by a duke or equivalent regional leader (Saeristavo in Georgian)."
    },
    gallery: [
      { id: "gallery1", caption: "Aerial view of the citadel" },
      { id: "gallery2", caption: "The domed gate-church" },
      { id: "gallery3", caption: "Remains of the defensive walls" },
      { id: "gallery4", caption: "Surrounding landscape of Kakheti" }
    ],
    timeline: [
      {
        period: "Mid-7th Century",
        title: "Arab Expansion",
        description: "Georgia's socio-political and cultural development is halted by Arab military-religious expansion."
      },
      {
        period: "736-738",
        title: "Emirate of Tbilisi",
        description: "Established during Caliphate campaigns, pushing the focus of resistance to outer regions like Kakheti."
      },
      {
        period: "7th-8th Centuries",
        title: "Foundation of Kvetera",
        description: "The Duchy of Kvetera is founded and its administrative center, the fortress-city, is built."
      },
      {
        period: "9th Century",
        title: "Border Expansion",
        description: "The border of the Principality shifts westward to the Ksani River, expanding Kvetera's jurisdiction."
      },
      {
        period: "9th-11th Centuries",
        title: "Height of Power",
        description: "Kvetera reaches its zenith, controlling major caravan trade routes of the eastern Georgian highlands."
      },
      {
        period: "13th Century",
        title: "Strategic Decline",
        description: "The fortress loses its primary defensive function during Georgia's unification and fades from historical sources."
      }
    ],
    sections: [
      {
        id: "origins",
        title: "Historical Context & Origins",
        text: `From the mid-7th century, Georgia's socio-political and cultural development was halted by the Arab military-religious expansion. The movement against the Arabs took on the character of a broad national liberation struggle, and the punitive expeditions carried out by the conquerors became more frequent and severe. During one of the campaigns organized by the Caliphate (736-738), the Emirate of Tbilisi was established, and naturally, the full hardship of "Arab rule" fell upon the inner regions of the principality of Kartli at the time, while in its outlying regions people lived relatively peacefully and developed economically. Under these conditions, the Principality of Kakheti (the Korepiskoposate) was established in the northwestern part of eastern Georgia.\n\nFrom the moment of its formation, the rulers of Kakheti began an active struggle both against the Arabs and for the unification of Georgian lands.\n\nIt was precisely during this period (7th-8th centuries) that the Duchy of Kvetera was founded, and its administrative center - the fortress-city of Kvetera - was built.`,
        quickFacts: [
          { label: "Elevation", value: "850m ASL" },
          { label: "Founded", value: "7th-8th century" }
        ]
      },
      {
        id: "strategic",
        title: "Strategic Importance & Borders",
        text: `The political administration of the duchy covered the territory of the north of ujarma between Kakheti and Kukheti. To the northwest lay the "highlands" of Kakheti - Erto-Mtianeti, Pkhovi, and Durdzuk-Gvleghveti; to the east, the area extended to the present-day Telavi municipality; to the west, it reached the Turdo River and the village of Gulgula; and to the southwest, its border directly adjoined the Emirate of Tbilisi. Because of this, Kvetera's original function was that of a border fortress-stronghold.\n\nThe Duchy of Kvetera reached the height of its power in the 9th-11th centuries, when the rulers of Kakheti gained control over all the major caravan trade routes of the highlands of eastern Georgia.`,
        quickFacts: [
          { label: "Border", value: "Emirate of Tbilisi" },
          { label: "Peak Power", value: "9th-11th centuries" }
        ]
      },
      {
        id: "uniter",
        title: "The Uniter of Peoples",
        text: `It is traditionally accepted in historiography that the established border of the Principality of Kakheti - in this case, of the Duchy of Kvetera - shifted in the 9th century westward from the Aragvi River to the Ksani River, bringing the minor fortresses of Grui and Tsirkvali, located there, as well as the mountain pass into Dvaleti, under the jurisdiction of the Duke of Kvetera. As a result, the Duchy of Kvetera also an administrative unit of the Principality, and controlled later the Kingdom of Kakheti - controlled two of the three mountain passes into the North Caucasus: two through Daryal and one through Dvaleti. In other words, as noted, every major strategic route passed through a customs checkpoint of the Duchy of Kvetera, and along these roads powerful "countries" formed - local communities of kindred peoples who together created a strong current in the development of the shared Caucasian civilization. The Kakhs, Kokhs, Tsanars, Gardabanians, Pkhovel-Pshavians, Khevsurians, Tushetians, Sojians, and Kists - the historical arena of the merging ("intermarrying," through both conflict and cooperation) of all these peoples was this relatively small but highly capable "country." Each of them contributed to the creation of present-day Kakheti (Academician N. Berdzenishvili, Issues of the History of Georgia, Vol. 1, p. 175).\n\nThe name Kvetera-Kvetena, in Old Georgian, means "uniter" or "connector" (it means "buckle/clasp"), and if one analyzes the political borders of the duchy together with the diversity of communities and peoples settled within those borders, it truly appears as a uniting, connecting administrative unit. It should also be emphasized that the political administration of the main caravan routes of eastern Georgia naturally brought great economic advancement to the Duchy of Kvetera and the Principality of Kakheti (later the Kingdom of Kakheti-Hereti), making it financially possible to carry out several ambitious projects (for example, the construction of the grand monastic complex of Alaverdi, the funding of missionary activity in the North Caucasus, and so on).`,
        quickFacts: [
          { label: "Meaning", value: "Uniter/Connector" },
          { label: "Control", value: "North Caucasus Passes" }
        ]
      },
      {
        id: "architecture",
        title: "Architecture & Layout",
        text: `As a strategic defensive structure, the fortress-city of Kvetera naturally lost its primary function during the era of Georgia's unification, and by the 13th century it is no longer mentioned in historical sources. However, traces of active life on its territory continued throughout the rest of the late Middle Ages.\n\nThe fortress-city of Kvetera is located west of the town of Akhmeta, on the right bank of the Iltö River. The fortress complex occupies a high mountain peak and is surrounded by a wall of river stone and rubble. The territory, sharply elongated from east to west, has a total area of approximately 30,000 square meters, divided unevenly by a wall into two parts: the lower fortress and the citadel.\n\nThe lower fortress is essentially in ruins; what remains are the buttresses of the southern (main) entrance, several towers, and the remnants of a hall-type (darbazi) church. The architectural structures of the citadel are relatively better preserved. The 3,500-square-meter area is surrounded by a high wall incorporating six towers, including one signal tower 17 meters high. The citadel also contains the two-story palace of the duke (eristavi), a domed gate-church, the ruins of an early Christian-era hall church, two water reservoir tanks, and the ruins of auxiliary structures.`,
        quickFacts: [
          { label: "Total Area", value: "~30,000 sq.m." },
          { label: "Citadel Area", value: "3,500 sq.m." },
          { label: "Signal Tower", value: "17 meters high" }
        ]
      }
    ]
  },
  ka: {
    title: "კვეტერა",
    subtitle: "ციხე-ქალაქი",
    location: "ახმეტა, საქართველო",
    summaryTitle: "მოკლე ისტორია",
    summary: "საქართველოს სოციალურ-პოლიტიკური და კულტურული განვითარება VII საუკუნის შუაწლებიდან არაბთა სამხედრო-რელიგიურმა ექსპანსიამ შეაჩერა... სწორედ, ამ პერიოდში (VII-VIII ს.ს.) დაარსდა კვეტერის საერისთავო და აშენდა მისი ადმინისტრაციული ცენტრი - კვეტერის ციხე-ქალაქი.",
    exploreLabel: "გამოიკვლიე",
    readHistoryLabel: "წაიკითხე ისტორია",
    listenLabel: "აუდიო გიდი",
    listenActiveLabel: "შეაჩერე აუდიო",
    timelineTitle: "კვეტერის ქრონოლოგია",
    galleryTitle: "არქივის სურათები",
    printLabel: "არქივის ბეჭდვა",
    closeModalLabel: "დახურვა",
    quickFactsTitle: "სექციის ფაქტები",
    liveWeatherLabel: "ამინდი ახმეტაში",
    viewOnMapLabel: "ნახე რუკაზე",
    weatherConditions: {
      clear: "მოწმენდილი",
      cloudy: "ღრუბლიანი",
      foggy: "ნისლი",
      rain: "წვიმა",
      snow: "თოვლი",
      storm: "ჭექა-ქუხილი",
      unknown: "უცნობია"
    },
    footer: "ისტორიული ტექსტი: ისტორიკოსი გოგი ურგებაშვილი.",
    glossary: {
      "თბილისის საამირო": "არაბების მიერ დაარსებული ისლამური სახელმწიფო საქართველოში, რომელიც 736-დან 1122 წლამდე არსებობდა.",
      "ხალიფატის": "ისლამური სახელმწიფო, რომელსაც მართავდა ხალიფა.",
      "საქორეპისკოპოსო": "კახეთის სამთავრო, რომელსაც მართავდა ქორეპისკოპოსი - რეგიონის მმართველის უნიკალური ტიტული.",
      "დარბაზული": "ქართული ხუროთმოძღვრების ტიპი, ჩვეულებრივ ნიშნავს ერთნავიან ეკლესიას ან გუმბათიან საცხოვრებელს.",
      "ერისთავის": "ქართული ფეოდალური ტიტული, რეგიონის მმართველი, ევროპული ჰერცოგის ექვივალენტი.",
      "საერისთავო": "ტერიტორია, რომელსაც მართავდა ერისთავი."
    },
    gallery: [
      { id: "gallery1", caption: "ციტადელის ხედი ზემოდან" },
      { id: "gallery2", caption: "გუმბათიანი კარის ეკლესია" },
      { id: "gallery3", caption: "თავდაცვითი გალავნის ნაშთები" },
      { id: "gallery4", caption: "კახეთის მიმდებარე ლანდშაფტი" }
    ],
    timeline: [
      {
        period: "VII ს. შუაწლები",
        title: "არაბთა ექსპანსია",
        description: "საქართველოს განვითარება შეჩერდა არაბთა სამხედრო-რელიგიური ექსპანსიის გამო."
      },
      {
        period: "736-738 წწ.",
        title: "თბილისის საამირო",
        description: "ჩამოყალიბდა ხალიფატის ლაშქრობის შედეგად, რამაც სიმძიმე შიდა ქართლს დააწვა."
      },
      {
        period: "VII-VIII ს.ს.",
        title: "კვეტერის დაარსება",
        description: "დაარსდა კვეტერის საერისთავო და აშენდა მისი ადმინისტრაციული ცენტრი."
      },
      {
        period: "IX ს.",
        title: "საზღვრების გაფართოება",
        description: "საერისთავოს საზღვარმა არაგვიდან ქსანზე გადაინაცვლა და კონტროლი გაფართოვდა."
      },
      {
        period: "IX-XI ს.ს.",
        title: "სიძლიერის ზენიტი",
        description: "საერისთავომ ხელში ჩაიგდო აღმოსავლეთ საქართველოს ძირითადი საქარავნო გზები."
      },
      {
        period: "XIII ს.",
        title: "სტრატეგიული დაქვეითება",
        description: "საქართველოს გაერთიანების ხანაში ციხემ ფუნქცია დაკარგა და წყაროებში აღარ იხსენიება."
      }
    ],
    sections: [
      {
        id: "origins",
        title: "ისტორიული კონტექსტი და საწყისები",
        text: `საქართველოს სოციალურ-პოლიტიკური და კულტურული განვითარება VII საუკუნის შუაწლებიდან არაბთა სამხედრო-რელიგიურმა ექსპანსიამ შეაჩერა.\n\nარაბების წინააღმდეგ მოძრაობამ ფართო ეროვნულ-განმანთავისუფლებელი ბრძოლის ხასიათი მიიღო და დამპყრობლების მხრიდან დამსჯელი ექსპედიციები უფრო ხშირი და სასტიკი გახდა. ხალიფატის მიერ ორგანიზებული მორიგი ლაშქრობის დროს (736-738) წლებში ჩამოყალიბდა თბილისის საამირო და ბუნებრივია, ,,არაბობის" მთელი სიმძიმე მაშინდელი ქართლის საერისმთავროს შიდა რაიონებს დააწვა, ხოლო მის განაპირა რეგიონებში ხალხი შედარებით მშვიდად ცხოვრობდა და ეკონომიურად ვითარდებოდა. ასეთ მდგომარეობაში აღმოსავლეთ საქართველოს ჩრდილო-დასავლეთ ნაწილში კახეთის სამთავრო (საქორეპისკოპოსო) ჩამოყალიბდა.\n\nჩამოყალიბების თანავე კახეთის მთავრებმა აქტიური ბრძოლა დაიწყეს როგორც არაბების წინააღმდეგ, ისე ქართული მიწების შემოკრებისთვის.\n\nსწორედ, ამ პერიოდში (VII-VIII ს.ს.) დაარსდა კვეტერის საერისთავო და აშენდა მისი ადმინისტრაციული ცენტრი - კვეტერის ციხე-ქალაქი.`,
        quickFacts: [
          { label: "სიმაღლე", value: "850მ ზ.დ." },
          { label: "დაარსდა", value: "VII-VIII ს.ს." }
        ]
      },
      {
        id: "strategic",
        title: "სტრატეგიული მნიშვნელობა და საზღვრები",
        text: `საერისთავოს პოლიტიკური ადმინისტრირების ქვეშ იყო უჯარმის ჩრდილოეთით კახეთსა და კუხეთს შორის მოქცეული ტერიტორია. ჩრდილო დასავლეთით „მთეულეთი" კახეთისა ერწო-მთიანეთი, ფხოვი, დურძუკ-ღვლიღვეთი აღმოსავლეთით თანამედროვე თელავის მუნიციპალიტეტის დასავლეთით ჩამომდინარე მდ. თურდო და სოფელი გულგულა, სამხრეთ დასავლეთის საზღვარი კი თბილისის საამიროს უშუალოდ ემიჯნებოდა და აქედან გამომდინარე კვეტერის პირველფუნქციაც მენაპირე ციხე-სიმაგრის ქონდა.\n\nსიძლიერის ზენიტს კვეტერის საერისთავომ IX-XI ს.ს-ში მიაღწია, როდესაც კახეთის მთავრებმა აღმოსავლეთ საქართველოს მთიანეთის ყველა ძირითადი საქარავნო გზა-მაგისტრალი ჩაიგდეს ხელში.`,
        quickFacts: [
          { label: "საზღვარი", value: "თბილისის საამირო" },
          { label: "ზენიტი", value: "IX-XI ს.ს." }
        ]
      },
      {
        id: "uniter",
        title: "ხალხთა შემკვრელი",
        text: `ისტორიოგრაფიაში ტრადიციულად მიღებულია რომ კახეთის სამთავროს, ამ შემთხევაში კვეტერის საერისთავოს დადგენილმა საზღვარმა IX ს-ში მდინარე არაგვიდან დასავლეთით მდინარე ქსანზე გადაინაცვლა იქ მდებარე უმნიშვანელსი ციხეები გრუი და წირქვალი, ასევე დვალეთის გადასასვლელი კვეტერის ერისთავის გამგებლობის ქვეშ მოექცა. აქედან გამომდინარე კახეთის სამთავროს, შემდგომში სამეფოს, ადმინისტრაციული ერთეული კვეტერის საერისთავო ჩრდილო კავკასიაში სამი გადასასვლელიდან - ორს დარიალანს და დვალეთს - აკონტროლებდა. ანუ, როგორც აღვნიშნეთ ყველა ძირითადი სტრატეგიული გზა-მაგისტრალი კვეტერის საერისთავოს საბაჟო გასასვლელს ხვდებოდა, ასევე, ამ გზების მიმდებარედ ყალიბდებოდა მძლავრი „ქვეყნები" - მონათესავე ხალხის ლოკალური ერთობები, რომელნიც საერთო კავკასიური ცივილიზაციის განვითარებაში ძლიერ ნაკადს ქმნიდნენ. ,,კახნი, კოხნი, წანარნი, გარდაბანელნი, ფხოველ-ფშავლები, ხევსურები, თუშები, სოჯნი, ქისტები, ყველა ამათ შერწყმა-„შეჯვარების" (ბრძოლისა და თანამშრომლების) ისტორიული სარბიელი იყო ეს შედარებით პატარა, მაგრამ დიდი შესაძლებლობების „ქვეყანა". თითოეულ ამათგანს თავისი წვლილი შეუტანია აწინდელი კახეთის შექმნაში (აკადემიკოსი ნ. ბერძენიშვილი საქართველოს ისტორის საკითხები ტ.1 გვ.175).\n\nსახელდება კვეტერა-კვეტენა-ძველქართულად შემკვრელს, შემაკავშირებელს (ღილს ნიშნავს) და თუ საერისთავოს პოლიტიკურ საზღვრებს, ამ საზღვრებში მოსახლე თემების, ასევე ხალხების მრავალფეროვნებას გავაანალიზებთ, იგი მართლა შემკვრელ-შემაკავშირებელ ადმანისტრაციულ ერთეულად წარმოგვიდგება. უნდა ხაზი გავუსვათ იმასაც, რომ აღმოსავლეთ საქართველოს ძირითადი საქარავნო მაგისტრალების პოლიტიკურმა ადმინისტრირებამ, ბუნებრივია, კვეტერის საერისთავო და კახეთის სამთავრო (შემდგომში კახეთ- ჰერეთის სამეფო) ეკონომიურად ძლიერ დააწინაურა და შესაძლებელი გახდა, - ფინანსური თვალსაზრისით - რამდენიმე ამბიციური პროექტის განხორციელება (მაგალითისთვის, გრანდიუზული ალავერდის სამონასტრო კომპლექსის მშენებლობა, ჩრდილო კავკასიაში სამისიონერო მოძრაობის დაფინანსება და ა.შ).`,
        quickFacts: [
          { label: "მნიშვნელობა", value: "შემკვრელი/ღილი" },
          { label: "კონტროლი", value: "კავკასიის გზები" }
        ]
      },
      {
        id: "architecture",
        title: "არქიტექტურა",
        text: `კვეტერის ციხე-ქალაქს, როგორც სტრატეგიულ სათავდაცვო ნაგებობას, ძირითადი პირველფუნქცია, საქართველოს გაერთიანების ხანაში ბუნებრივად მოეშალა და XIII საუკუნეში ის ისტორიულ წყაროებში აღარ მოიხსენიება. თუმცა მის ტერიტორიაზე აქტიური ცხოვრების კვალი მთელი გვიანი შუა საუკუნეების განმავლობაში არ შეწყვეტილა.\n\nციხე-ქალაქი კვეტერა მდებარეობს ქ. ახმეტიდან დასავლეთით მდ. ილტოს მარჯვენა ნაპირას. ციხე-კომლექსს მაღალი მთის წვერი უკავია და გარს არტყია რიყისა და ნატეხი ქვის გალავანი, აღმოსავლეთიდან დასავლეთისკენ მკვეთრად წაგრძელებული ტერიტორიის საერთო ფართობი დაახლოებით 30 000 კვ.მ-ია, რომელიც ორ არათანაბარ ნაწილად, ქვედა ციხედ და ციტადელად, ასევე გალავნით იყოფა.\n\nქვედა ციხე ფაქტიურად დანგრეულია, შემორჩენილია სამხრეთის (მთავარი) შემოსასვლელის ბურჯები, რამდენიმე კოშკი და დარბაზული ეკლესიის ნაშთი.\n\nციხე-ციტადელის არქიტექტურული ნაგებობები შედარებით უკეთაა შემორჩენილი. 3 500 კვ.მ. ფართობს გარს მაღალი გალავანი არტყია, რომელშიც ჩართულია ექვსი, მათ შორის ერთი - 17 მეტრი სიმაღლის სასიგნალო კოშკი. ასევე, ციტადელში დგას ერისთავის ორსართულიანი სასახლე, გუმბათიანი კარის ეკლესია, ადრე ქრისტიანული ხანის დარბაზული ეკლესიის ნანგრევი, ორი წყალსაცავის ავზი და დამხმარე ნაგებობების ნანგრევები.`,
        quickFacts: [
          { label: "ფართობი", value: "30 000 კვ.მ." },
          { label: "ციტადელი", value: "3 500 კვ.მ." },
          { label: "კოშკი", value: "17მ სიმაღლე" }
        ]
      }
    ]
  }
};
