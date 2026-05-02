## get-public-profile Sample response

Test url and responses here for the username "arnaldoperez": 

https://api.freecodecamp.org/users/get-public-profile?username=arnaldoperez

```json
{
    "entities": {
        "user": {
            "arnaldoperez": {
                "about": "Desarrollador de Venezuela",
                "calendar": {},
                "completedChallenges": [
                    {
                        "id": "5ee127a03c3b35dd45426493",
                        "completedDate": 1652627629405,
                        "files": []
                    },
                    {
                        "id": "587d7db8367417b2b2512ba3",
                        "completedDate": 1579115103511,
                        "files": []
                    },
                    {
                        "id": "587d7db8367417b2b2512ba2",
                        "completedDate": 1579114920746,
                        "files": []
                    },
                    {
                        "id": "aa2e6f85cab2ab736c9a9b24",
                        "completedDate": 1579002994220,
                        "files": [
                            {
                                "contents": "function checkCashRegister(price, cash, cid) {\n  var diff=cash-price\n  const totalCID=cid.reduce((total,val)=>{\n    return total+val[1]\n  },0)\n  // If the change amount is equal to the amount of cid\n  if(diff==totalCID) return {\n    status: 'CLOSED',\n    change:cid\n  }\n  // If the change amount is more than the amount of cid\n  else if (diff>totalCID) return {\n    status: 'INSUFFICIENT_FUNDS',\n    change:[]\n  }\n  // Initialize all bills and coins (BOCs)\n  const BOCs= [\n    ['PENNY',\t0.01],\n    ['NICKEL',\t0.05],\n    ['DIME',\t0.1],\n    ['QUARTER',\t0.25],\n    ['ONE',\t1 ],\n    ['FIVE',\t5 ],\n    ['TEN',\t10 ],\n    ['TWENTY', \t20 ],\n    ['ONE HUNDRED',  100 ],\n  ]\n  var totalChange=0\n  var change={status:'OPEN',change:[]}\n  console.log(\"Diff amount\", diff)\n  // loops all the Bills Or Coins (boc) in cid\n  for(let i=cid.length-1;i>=0;i--){\n    let boc=cid[i]\n    let current=[boc[0],0]\n    console.log(\"Change\", diff, \"is greater or equal than\",BOCs[i][1],diff>=BOCs[i][1])\n    // while change is greater than the boc and\n    while(diff>=BOCs[i][1] && boc[1]>0){    \n    // there's more money available of that boc\n      console.log(\"There's more available\",boc[1]>0)\n      console.log(\"Add a\", boc[0],diff>=BOCs[i][1] && boc[1]>0)\n      diff=(Math.round((diff - BOCs[i][1]) * 100) / 100).toFixed(2)\n      boc[1]= boc[1] - BOCs[i][1]\n      current[1]=current[1] + BOCs[i][1]\n      totalChange+=BOCs[i][1]\n      console.log(diff,\"left\")\n    }\n    console.log(\"change\",current)\n    if(current[1]>0) change['change'].push(current)\n  } \n  \n  if(totalChange<diff) return {\n    status: 'INSUFFICIENT_FUNDS',\n    change:[]\n  }\n  // Here is your change, ma'am.\n  return change;\n}\n\n// Example cash-in-drawer array:\n// [[\"PENNY\", 1.01],\n// [\"NICKEL\", 2.05],\n// [\"DIME\", 3.1],\n// [\"QUARTER\", 4.25],\n// [\"ONE\", 90],\n// [\"FIVE\", 55],\n// [\"TEN\", 20],\n// [\"TWENTY\", 60],\n// [\"ONE HUNDRED\", 100]]\n\nconsole.log(checkCashRegister(3.26, 100, [[\"PENNY\", 1.01], [\"NICKEL\", 2.05], [\"DIME\", 3.1], [\"QUARTER\", 4.25], [\"ONE\", 90], [\"FIVE\", 55], [\"TEN\", 20], [\"TWENTY\", 60], [\"ONE HUNDRED\", 100]]));\n",
                                "key": "indexjs",
                                "ext": "js",
                                "name": "index",
                                "path": "index.js"
                            }
                        ]
                    },
                    {
                        "id": "aff0395860f5d3034dc0bfc9",
                        "completedDate": 1578879562038,
                        "files": [
                            {
                                "contents": "function telephoneCheck(str) {\n  // Good luck!\n  return /^1?\\s?(\\(\\d{3}\\)|\\d{3})(-|\\s)?\\d{3}(-|\\s)?\\d{4}$/.test(str);\n}\n\ntelephoneCheck(\"555-555-5555\");\n",
                                "key": "indexjs",
                                "ext": "js",
                                "name": "index",
                                "path": "index.js"
                            }
                        ]
                    },
                    {
                        "id": "5c6c06847491271903d37cfd",
                        "completedDate": 1578878592482,
                        "files": []
                    },
                    {
                        "id": "598e8944f009e646fc236146",
                        "completedDate": 1578576911955,
                        "files": []
                    },
                    {
                        "id": "58965611f9fc0f352b528e6c",
                        "completedDate": 1567924949793,
                        "files": [],
                        "solution": "https://fcc-template-arnaldo.glitch.me"
                    },
                    {
                        "id": "5895f70ef9fc0f352b528e6b",
                        "completedDate": 1567924781106,
                        "files": [],
                        "solution": "https://fcc-template-arnaldo.glitch.me/"
                    },
                    {
                        "id": "5895f70df9fc0f352b528e6a",
                        "completedDate": 1567924580102,
                        "files": [],
                        "solution": "https://fcc-template-arnaldo.glitch.me"
                    },
                    {
                        "id": "5895f70df9fc0f352b528e69",
                        "completedDate": 1567916036741,
                        "files": [],
                        "solution": "https://fcc-template-arnaldo.glitch.me"
                    },
                    {
                        "id": "587d8247367417b2b2512c38",
                        "completedDate": 1567714443193,
                        "files": [],
                        "solution": "https://fcc-helmetjs-arnaldo.glitch.me"
                    },
                    {
                        "id": "587d8247367417b2b2512c37",
                        "completedDate": 1567714381131,
                        "files": [],
                        "solution": "https://fcc-helmetjs-arnaldo.glitch.me"
                    },
                    {
                        "id": "bd7158d8c443edefaeb5bd0f",
                        "completedDate": 1567628409826,
                        "files": [],
                        "solution": "https://fcc-file-metadata-arnaldo.glitch.me/",
                        "githubLink": "https://github.com/arnaldoperez/fcc-file-metadata",
                        "challengeType": 4
                    },
                    {
                        "id": "5a8b073d06fa14fcfde687aa",
                        "completedDate": 1567566945078,
                        "files": [],
                        "solution": "https://fcc-excersice-tracker-arnaldo.glitch.me",
                        "githubLink": "https://github.com/arnaldoperez/fcc-excersice-tracker",
                        "challengeType": 4
                    },
                    {
                        "id": "bd7158d8c443edefaeb5bd0e",
                        "completedDate": 1567540317695,
                        "files": [],
                        "solution": "https://fcc-urlshortner-arnaldo.glitch.me/",
                        "githubLink": "https://github.com/arnaldoperez/fcc-urlshortner",
                        "challengeType": 4
                    },
                    {
                        "id": "bd7158d8c443edefaeb5bdef",
                        "completedDate": 1567539368849,
                        "files": [],
                        "solution": "https://fcc-timestamp-arnaldo.glitch.me/",
                        "githubLink": "https://github.com/arnaldoperez/fcc-timestamp",
                        "challengeType": 4
                    },
                    {
                        "id": "bd7158d8c443edefaeb5bdff",
                        "completedDate": 1567460240737,
                        "files": [],
                        "solution": "https://fcc-headerparser-arnaldo.glitch.me/",
                        "githubLink": "https://github.com/arnaldoperez/fcc-headerparser",
                        "challengeType": 4
                    },
                    {
                        "id": "587d7fb1367417b2b2512bf2",
                        "completedDate": 1567320141168,
                        "files": [],
                        "solution": "https://fcc-express-arnaldo.glitch.me"
                    },
                    {
                        "id": "587d7fb9367417b2b2512c12",
                        "completedDate": 1567318987619,
                        "files": [],
                        "solution": "https://fcc-mongoose-arnaldo.glitch.me"
                    },
                    {
                        "id": "587d7fb8367417b2b2512c11",
                        "completedDate": 1567318754668,
                        "files": [],
                        "solution": "https://fcc-mongoose-arnaldo.glitch.me/"
                    },
                    {
                        "id": "587d7fb8367417b2b2512c10",
                        "completedDate": 1567318702180,
                        "files": [],
                        "solution": "https://fcc-mongoose-arnaldo.glitch.me/"
                    },
                    {
                        "id": "587d7fb8367417b2b2512c0f",
                        "completedDate": 1567318622788,
                        "files": [],
                        "solution": "https://fcc-mongoose-arnaldo.glitch.me/"
                    },
                    {
                        "id": "587d7fb8367417b2b2512c0e",
                        "completedDate": 1567302200643,
                        "files": [],
                        "solution": "https://fcc-mongoose-arnaldo.glitch.me/"
                    },
                    {
                        "id": "587d7fb7367417b2b2512c0d",
                        "completedDate": 1567301874054,
                        "files": [],
                        "solution": "https://fcc-mongoose-arnaldo.glitch.me"
                    },
                    {
                        "id": "587d7fb7367417b2b2512c0c",
                        "completedDate": 1567301599877,
                        "files": [],
                        "solution": "https://fcc-mongoose-arnaldo.glitch.me"
                    },
                    {
                        "id": "587d7fb7367417b2b2512c0b",
                        "completedDate": 1567292108558,
                        "files": []
                    },
                    {
                        "id": "587d7fb6367417b2b2512c06",
                        "completedDate": 1567281050759,
                        "files": []
                    },
                    {
                        "id": "587d7fb2367417b2b2512bf8",
                        "completedDate": 1567270527841,
                        "files": [],
                        "solution": "https://fcc-backend-arnaldo.glitch.me/"
                    },
                    {
                        "id": "587d7fb2367417b2b2512bf7",
                        "completedDate": 1567269303679,
                        "files": [],
                        "solution": "https://fcc-backend-arnaldo.glitch.me"
                    },
                    {
                        "id": "587d7fb0367417b2b2512bed",
                        "completedDate": 1559539373345,
                        "files": [],
                        "solution": "https://fcc-backend-arnaldo.glitch.me/"
                    },
                    {
                        "id": "587d7fac367417b2b2512bde",
                        "completedDate": 1562093964812,
                        "files": []
                    },
                    {
                        "id": "587d7fac367417b2b2512bdd",
                        "completedDate": 1562092070038,
                        "files": []
                    },
                    {
                        "id": "587d7fac367417b2b2512bdc",
                        "completedDate": 1562091533112,
                        "files": []
                    },
                    {
                        "id": "aaa48de84e1ecc7c742e1124",
                        "completedDate": 1492366341274,
                        "files": [
                            {
                                "contents": "function palindrome(str) {\n  // Good luck!\n  str=str.toLowerCase();\n  str=str.replace(/[^A-Za-z0-9]/g, '');\nreturn ((str==str.split(\"\").reverse().join(\"\"))? true : false);\n}\n\n\n\npalindrome(\"eye\");",
                                "key": "indexjs",
                                "ext": "js",
                                "name": "index",
                                "path": "index.js"
                            }
                        ]
                    },
                    {
                        "id": "5690307fddb111c6084545d7",
                        "completedDate": 1492280356834,
                        "files": []
                    },
                    {
                        "id": "a24c1a4622e3c05097f71d67",
                        "completedDate": 1492455467379,
                        "files": [],
                        "challengeType": 5
                    },
                    {
                        "id": "56533eb9ac21ba0edf2244e2",
                        "completedDate": 1492456363531,
                        "files": [],
                        "solution": "\nfunction rot13(str) { // LBH QVQ VG!\n  var arrRot=\"NOPQRSTUVWXYZABCDEFGHIJKLM!?.\".split(\"\");\n  var arrNor=\"ABCDEFGHIJKLMNOPQRSTUVWXYZ!?.\".split(\"\");\n  var strOut=\"\";\n  var char=\"\";\n  for (var i=0; i<str.length;i++)\n    {\n      char=str.substr(i,1);\n      if (arrRot.indexOf(char)===-1)\n        {\n          strOut+=\" \";\n        }\n      else \n        {\n          strOut+=arrNor[arrRot.indexOf(char)];\n        }\n    }\n  return strOut;\n}\n\n// Change the inputs below to test\nrot13(\"SERR PBQR PNZC LBH QVQ VG!\");\n",
                        "challengeType": 5
                    },
                    {
                        "id": "56bbb991ad1ed5201cd392d4",
                        "completedDate": 1492456922075,
                        "files": []
                    },
                    {
                        "id": "a3566b1109230028080c9345",
                        "completedDate": 1507775025612,
                        "files": [],
                        "challengeType": 5
                    },
                    {
                        "id": "a5de63ebea8dbee56860f4f2",
                        "completedDate": 1507776084419,
                        "files": [],
                        "challengeType": 5
                    },
                    {
                        "id": "a7f4d8f2483413a6ce226cac",
                        "completedDate": 1507828489573,
                        "files": [],
                        "solution": "\nfunction convertToRoman(num) {\n  /*\n  var dec=[1000,900,500,400,100,90,50,40,10,9,5,4,1];\n  var rom=['M','CM','D','CD','C','XC','L','XL','X','IX','V','VI','I'];\n  var result;\n  \n  for(var i=0; i<dec.length;i++)\n    {\n      while(dec[i]<=num)\n        {\n          result+=rom[i];\n          num-=dec[i];\n        }\n    }\n  return result;\n  */\n\n  var arr=num.toString().split(\"\");\n  arr=arr.reverse();\n  var romano=[];\n  var arrn=['0','1','2','3','4','5','6','7','8','9'];\n  var arrr=[];\n  for (var i=0; i<arr.length;i++)\n    {\n      var n=arr[i];\n      //romano.push(arrn.indexOf(n));\n      switch(i)\n        {\n        case 0:\n            arrr=['','I','II','III','IV','V','VI','VII','VIII','IX'];\n            romano.unshift(arrr[arrn.indexOf(n)]);\n            break;\n        case 1:\n            arrr=['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'];\n            romano.unshift(arrr[arrn.indexOf(n)]);\n            break;\n          case 2:\n            arrr=['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'];\n            romano.unshift(arrr[arrn.indexOf(n)]);\n            break;\n          case 3:\n            arrr=['','M','MM','MMM','MMMM','MMMMM','MMMMMM','MMMMMMM','MMMMMMMM','MMMMMMMMM'];\n            romano.unshift(arrr[arrn.indexOf(n)]);\n            break;\n        }\n    }\n return romano.join(\"\");\n\n}\n\nconvertToRoman(500);\n",
                        "challengeType": 5
                    },
                    {
                        "id": "647f85d407d29547b3bee1bb",
                        "completedDate": 1704150593578,
                        "files": [],
                        "solution": "https://learn.microsoft.com/api/gamestatus/38ca1185-79e5-4715-b216-125d46400e25"
                    },
                    {
                        "id": "647e21f88acb466c97ccbeeb",
                        "completedDate": 1704157147450,
                        "files": []
                    },
                    {
                        "id": "647e21c48acb466c97ccbee7",
                        "completedDate": 1704157798680,
                        "files": []
                    },
                    {
                        "id": "647e21ba8acb466c97ccbee6",
                        "completedDate": 1704158478816,
                        "files": []
                    },
                    {
                        "id": "647e22058acb466c97ccbeec",
                        "completedDate": 1704298288508,
                        "files": []
                    },
                    {
                        "id": "647e21df8acb466c97ccbee9",
                        "completedDate": 1704298955452,
                        "files": []
                    },
                    {
                        "id": "647e21eb8acb466c97ccbeea",
                        "completedDate": 1704300363566,
                        "files": []
                    }
                ],
                "completedExams": [],
                "experience": [],
                "is2018DataVisCert": false,
                "is2018FullStackCert": false,
                "isA2EnglishCert": false,
                "isB1EnglishCert": false,
                "isApisMicroservicesCert": true,
                "isBackEndCert": false,
                "isCheater": false,
                "isCollegeAlgebraPyCertV8": false,
                "isDataAnalysisPyCertV7": false,
                "isDataVisCert": false,
                "isDonating": false,
                "isFoundationalCSharpCertV8": false,
                "isFrontEndCert": false,
                "isFrontEndLibsCert": false,
                "isFullStackCert": false,
                "isJavascriptCertV9": false,
                "isHonest": true,
                "isInfosecCertV7": false,
                "isInfosecQaCert": false,
                "isJsAlgoDataStructCert": true,
                "isJsAlgoDataStructCertV8": false,
                "isMachineLearningPyCertV7": false,
                "isPythonCertV9": false,
                "isQaCertV7": false,
                "isRelationalDatabaseCertV8": false,
                "isRelationalDatabaseCertV9": false,
                "isRespWebDesignCert": false,
                "isRespWebDesignCertV9": false,
                "isSciCompPyCertV7": false,
                "location": "Barinas, Venezuela",
                "name": "Arnaldo Perez",
                "picture": "https://avatars0.githubusercontent.com/u/19396163?v=4",
                "points": 742,
                "portfolio": [
                    {
                        "description": "Driver setup, user-facing backend, admin backend, resiliency.",
                        "id": "FHU_xSLtEpXwL9bqSS8FI",
                        "image": "https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg",
                        "title": "M101JS: MongoDB for Node.js Developers",
                        "url": "http://university.mongodb.com/course_completion/ba6ff2a8-c8a0-4ce7-974d-334fd97e"
                    },
                    {
                        "description": "Fundamentals of MongoDB: connecting to a MongoDB Cluster, using MongoDB Compass, MongoDB's document storage model and principles of flexible schema design, basic architecture of MongoDB clusters, CRUD operations.",
                        "id": "ad39f70e-2f5c-4dd8-a4b1-8c3f8f683aa2",
                        "image": "https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg",
                        "title": "M101: MongoDB Basics",
                        "url": "https://university.mongodb.com/course_completion/5a60a1e4-1247-4f5d-b7e1-2c06c094/printable"
                    },
                    {
                        "description": "Basic installation of MongoDB, JSON, schema design, querying, insertion of data, indexing and working with language drivers. The course project involves building a blogging platform with MongoDB.",
                        "id": "025e45c1-a5cb-478d-b4b2-4c5d80749e9c",
                        "image": "https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg",
                        "title": "M101P: MongoDB for developers",
                        "url": "https://university.mongodb.com/course_completion/d3a58889-4b58-4257-a8dd-bb1c5802/printable"
                    },
                    {
                        "description": "Basic installation of MongoDB, JSON, schema design, querying, insertion of data, indexing and working with language drivers. The course project involves building a blogging platform with MongoDB.",
                        "id": "b84c7028-4f3a-41bf-b893-24d9839067de",
                        "image": "https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg",
                        "title": "M101: MongoDB for .NET developers",
                        "url": "https://university.mongodb.com/course_completion/abd69486-70f9-474f-8e0f-37e5eb8e/printable"
                    },
                    {
                        "description": "Fundamentals of the MongoDB's powerful Aggregation Framework: data transformation, data science, reducing data over the wire, views.",
                        "id": "c9b11981-a8ee-43d7-a899-f8ae5734e3e1",
                        "image": "https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg",
                        "title": "M121: MongoDB Aggregation Framework",
                        "url": "https://university.mongodb.com/course_completion/52a9ce60-2088-40da-98b3-11600162/printable"
                    }
                ],
                "profileUI": {
                    "isLocked": false,
                    "showAbout": true,
                    "showCerts": true,
                    "showDonation": true,
                    "showHeatMap": false,
                    "showLocation": true,
                    "showName": true,
                    "showPoints": true,
                    "showPortfolio": true,
                    "showTimeLine": true,
                    "showExperience": false
                },
                "yearsTopContributor": [],
                "joinDate": "2016-05-16T20:24:08.000Z",
                "username": "arnaldoperez",
                "usernameDisplay": "arnaldoperez",
                "githubProfile": "https://github.com/arnaldoperez",
                "website": ""
            }
        }
    },
    "result": "arnaldoperez"
}

```

## Challanges data 

urlPython: https://www.freecodecamp.org/page-data/learn/python-v9/page-data.json
urlBackend: https://www.freecodecamp.org/page-data/learn/back-end-development-and-apis-v9/page-data.json
urlJavascript: https://www.freecodecamp.org/page-data/learn/javascript-v9/page-data.json
urlWebDesign: https://www.freecodecamp.org/page-data/learn/responsive-web-design-v9/page-data.json


```json
{
    "componentChunkName": "component---src-templates-introduction-super-block-intro-tsx",
    "path": "/learn",
    "result": {
        "data": {
            "allChallengeNode": {
                "nodes": [
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-1"
                            },
                            "id": "6823ac607bfdbc46331b2559",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 1",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-1",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-2"
                            },
                            "id": "682ba2318000b62f179bdf04",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 2",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-2",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-3"
                            },
                            "id": "682cd206883fc7b25eb539c5",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 3",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-3",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-4"
                            },
                            "id": "6823c1a0bcada44f32bf0bdc",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 4",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-4",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-5"
                            },
                            "id": "682cd20b883fc7b25eb539c6",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 5",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-5",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-6"
                            },
                            "id": "6823d6244511f252c8300eed",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 6",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-6",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-7"
                            },
                            "id": "6823d9ac8bdc3853df65a1ff",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 7",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-7",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-8"
                            },
                            "id": "6823e036ea4b71553558c01b",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 8",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-8",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-9"
                            },
                            "id": "6823e169fda14755fbf00445",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 9",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-9",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-10"
                            },
                            "id": "683921c4769fd23dbadec2fe",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 10",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-10",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/workshop-curriculum-outline/step-11"
                            },
                            "id": "6823e637c1c0ed56f781b4fc",
                            "block": "workshop-curriculum-outline",
                            "blockLabel": "workshop",
                            "challengeType": 0,
                            "title": "Step 11",
                            "order": 0,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "step-11",
                            "blockLayout": "challenge-grid",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/lab-debug-camperbots-profile-page/lab-debug-camperbots-profile-page"
                            },
                            "id": "6823f9df49cc206af5471a30",
                            "block": "lab-debug-camperbots-profile-page",
                            "blockLabel": "lab",
                            "challengeType": 25,
                            "title": "Debug Camperbot's Profile Page",
                            "order": 1,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "lab-debug-camperbots-profile-page",
                            "blockLayout": "link",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/lecture-understanding-html-attributes/what-is-html"
                            },
                            "id": "66f6db08d55022680a3cfbc9",
                            "block": "lecture-understanding-html-attributes",
                            "blockLabel": "lecture",
                            "challengeType": 19,
                            "title": "What Role Does HTML Play on the Web?",
                            "order": 2,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "what-is-html",
                            "blockLayout": "challenge-list",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/responsive-web-design-v9/lecture-understanding-html-attributes/what-are-attributes"
                            },
                            "id": "6708143cab2b583ecd3324f5",
                            "block": "lecture-understanding-html-attributes",
                            "blockLabel": "lecture",
                            "challengeType": 19,
                            "title": "What Are Attributes, and How Do They Work?",
                            "order": 2,
                            "superBlock": "responsive-web-design-v9",
                            "dashedName": "what-are-attributes",
                            "blockLayout": "challenge-list",
                            "chapter": "html",
                            "module": "basic-html"
                        }
                    },
                    {
                        "challenge": {
                            "fields": {
                                "slug": "/learn/learn-dynamic-programming-in-python/quiz-dynamic-programming/quiz-dynamic-programming"
                            },
                            "id": "67f413a2abe9894c52e15c6e",
                            "block": "quiz-dynamic-programming",
                            "blockLabel": "quiz",
                            "challengeType": 8,
                            "title": "Dynamic Programming Quiz",
                            "order": 3,
                            "superBlock": "learn-dynamic-programming-in-python",
                            "dashedName": "quiz-dynamic-programming",
                            "blockLayout": "link",
                            "chapter": null,
                            "module": null
                        }
                    }
                ]
            },
            "allSuperBlockStructure": {
                "nodes": [
                    {
                        "superBlock": "responsive-web-design",
                        "chapters": null
                    },
                    {
                        "superBlock": "javascript-algorithms-and-data-structures",
                        "chapters": null
                    },
                    {
                        "superBlock": "front-end-development-libraries",
                        "chapters": null
                    },
                    {
                        "superBlock": "data-visualization",
                        "chapters": null
                    },
                    {
                        "superBlock": "back-end-development-and-apis",
                        "chapters": null
                    },
                    {
                        "superBlock": "quality-assurance",
                        "chapters": null
                    },
                    {
                        "superBlock": "scientific-computing-with-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "data-analysis-with-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "information-security",
                        "chapters": null
                    },
                    {
                        "superBlock": "coding-interview-prep",
                        "chapters": null
                    },
                    {
                        "superBlock": "machine-learning-with-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "relational-database",
                        "chapters": null
                    },
                    {
                        "superBlock": "2022/responsive-web-design",
                        "chapters": null
                    },
                    {
                        "superBlock": "javascript-algorithms-and-data-structures-v8",
                        "chapters": null
                    },
                    {
                        "superBlock": "javascript-v9",
                        "chapters": [
                            {
                                "dashedName": "javascript",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "javascript-variables-and-strings",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-javascript",
                                            "lecture-introduction-to-strings",
                                            "lecture-understanding-code-clarity",
                                            "workshop-greeting-bot",
                                            "lab-javascript-trivia-bot",
                                            "lab-sentence-maker",
                                            "lecture-working-with-data-types",
                                            "review-javascript-variables-and-data-types",
                                            "quiz-javascript-variables-and-data-types",
                                            "lecture-working-with-strings-in-javascript",
                                            "workshop-teacher-chatbot",
                                            "lecture-working-with-string-character-methods",
                                            "lecture-working-with-string-search-and-slice-methods",
                                            "workshop-string-inspector",
                                            "lecture-working-with-string-formatting-methods",
                                            "workshop-string-formatter",
                                            "lecture-working-with-string-modification-methods",
                                            "workshop-string-transformer",
                                            "review-javascript-strings",
                                            "quiz-javascript-strings"
                                        ]
                                    },
                                    {
                                        "dashedName": "javascript-booleans-and-numbers",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-numbers-and-arithmetic-operators",
                                            "lab-debug-type-coercion-errors",
                                            "lecture-working-with-operator-behavior",
                                            "lab-debug-increment-and-decrement-operator-errors",
                                            "lecture-working-with-comparison-and-boolean-operators",
                                            "workshop-logic-checker-app",
                                            "lecture-working-with-unary-and-bitwise-operators",
                                            "lecture-working-with-conditional-logic-and-math-methods",
                                            "workshop-mathbot",
                                            "lab-fortune-teller",
                                            "lecture-working-with-numbers-and-common-number-methods",
                                            "review-javascript-math",
                                            "quiz-javascript-math",
                                            "lecture-understanding-comparisons-and-conditionals",
                                            "review-javascript-comparisons-and-conditionals",
                                            "quiz-javascript-comparisons-and-conditionals"
                                        ]
                                    },
                                    {
                                        "dashedName": "javascript-functions",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-functions",
                                            "workshop-calculator",
                                            "lab-boolean-check",
                                            "lab-email-masker",
                                            "workshop-loan-qualification-checker",
                                            "lab-celsius-to-fahrenheit-converter",
                                            "lab-counting-cards",
                                            "lab-leap-year-calculator",
                                            "lab-truncate-string",
                                            "lab-string-ending-checker",
                                            "review-javascript-functions",
                                            "quiz-javascript-functions"
                                        ]
                                    },
                                    {
                                        "dashedName": "javascript-arrays",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-arrays",
                                            "workshop-shopping-list",
                                            "lab-lunch-picker-program",
                                            "lab-golf-score-translator",
                                            "lecture-working-with-common-array-methods",
                                            "review-javascript-arrays",
                                            "quiz-javascript-arrays"
                                        ]
                                    },
                                    {
                                        "dashedName": "javascript-objects",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-javascript-objects-and-their-properties",
                                            "workshop-wildlife-tracker",
                                            "lab-cargo-manifest-validator",
                                            "lecture-working-with-json",
                                            "lecture-working-with-optional-chaining-and-object-destructuring",
                                            "workshop-recipe-tracker",
                                            "lab-quiz-game",
                                            "lab-record-collection",
                                            "review-javascript-objects",
                                            "quiz-javascript-objects"
                                        ]
                                    },
                                    {
                                        "dashedName": "javascript-loops",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-loops",
                                            "workshop-word-counter",
                                            "workshop-sentence-analyzer",
                                            "workshop-space-mission-roster",
                                            "workshop-heritage-library-catalog",
                                            "lab-longest-word-in-a-string",
                                            "lab-factorial-calculator",
                                            "lab-mutations",
                                            "lab-chunky-monkey",
                                            "lab-profile-lookup",
                                            "lab-repeat-a-string",
                                            "workshop-festival-crowd-flow-simulator",
                                            "lab-missing-letter-detector",
                                            "review-javascript-loops",
                                            "quiz-javascript-loops"
                                        ]
                                    },
                                    {
                                        "dashedName": "review-javascript-fundamentals",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-types-and-objects",
                                            "lecture-working-with-arrays-variables-and-naming-practices",
                                            "lecture-working-with-code-quality-and-execution-concepts",
                                            "lab-reverse-a-string",
                                            "lab-largest-number-finder",
                                            "lab-first-element-finder",
                                            "lab-slice-and-splice",
                                            "lab-pyramid-generator",
                                            "lab-gradebook-app",
                                            "lecture-the-var-keyword-and-hoisting",
                                            "lab-title-case-converter",
                                            "lab-falsy-remover",
                                            "lab-inventory-management-program",
                                            "lecture-understanding-modules-imports-and-exports",
                                            "lecture-working-with-the-arguments-object-and-rest-parameters",
                                            "lab-unique-sorted-union",
                                            "lab-password-generator",
                                            "lab-sum-all-numbers-algorithm",
                                            "lab-dna-pair-generator",
                                            "lab-html-entitiy-converter",
                                            "lab-odd-fibonacci-sum-calculator",
                                            "lab-element-skipper",
                                            "lab-playlist-remix-engine",
                                            "review-javascript-fundamentals",
                                            "quiz-javascript-fundamentals"
                                        ]
                                    },
                                    {
                                        "dashedName": "higher-order-functions-and-callbacks",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-higher-order-functions-and-callbacks",
                                            "workshop-library-manager",
                                            "lab-book-organizer",
                                            "lab-sorted-index-finder",
                                            "lab-symmetric-difference",
                                            "lab-value-remover-function",
                                            "lab-matching-object-filter",
                                            "lab-prime-number-sum-calculator",
                                            "lab-range-based-lcm-calculator",
                                            "lab-deep-flattening-tool",
                                            "lab-all-true-property-validator",
                                            "review-javascript-higher-order-functions",
                                            "quiz-javascript-higher-order-functions"
                                        ]
                                    },
                                    {
                                        "dashedName": "dom-manipulation-and-events",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-the-dom-click-events-and-web-apis",
                                            "workshop-storytelling-app",
                                            "workshop-emoji-reactor",
                                            "lab-favorite-icon-toggler",
                                            "lecture-understanding-the-event-object-and-event-delegation",
                                            "workshop-music-instrument-filter",
                                            "lab-real-time-counter",
                                            "lab-lightbox-viewer",
                                            "workshop-rps-game",
                                            "lab-football-team-cards",
                                            "review-dom-manipulation-and-click-events-with-javascript",
                                            "quiz-dom-manipulation-and-click-event-with-javascript"
                                        ]
                                    },
                                    {
                                        "dashedName": "js-a11y",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-aria-expanded-aria-live-and-common-aria-states",
                                            "workshop-planets-tablist",
                                            "workshop-note-taking-app",
                                            "lab-theme-switcher",
                                            "review-js-a11y",
                                            "quiz-js-a11y"
                                        ]
                                    },
                                    {
                                        "dashedName": "debugging-javascript",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-debugging-techniques",
                                            "lab-random-background-color-changer",
                                            "review-debugging-javascript",
                                            "quiz-debugging-javascript"
                                        ]
                                    },
                                    {
                                        "dashedName": "basic-regex",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-regular-expressions",
                                            "workshop-spam-filter",
                                            "lab-palindrome-checker",
                                            "lab-regex-sandbox",
                                            "lab-spinal-case-converter",
                                            "lab-pig-latin",
                                            "lab-smart-word-replacement",
                                            "review-javascript-regular-expressions",
                                            "quiz-javascript-regular-expressions"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-markdown-to-html-converter",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-markdown-to-html-converter"
                                        ]
                                    },
                                    {
                                        "dashedName": "form-validation",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-form-validation",
                                            "workshop-calorie-counter",
                                            "lab-customer-complaint-form",
                                            "review-form-validation-with-javascript",
                                            "quiz-form-validation-with-javascript"
                                        ]
                                    },
                                    {
                                        "dashedName": "javascript-dates",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-dates",
                                            "lab-date-conversion",
                                            "review-javascript-dates",
                                            "quiz-javascript-dates"
                                        ]
                                    },
                                    {
                                        "dashedName": "audio-and-video-events",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-audio-and-video",
                                            "workshop-music-player",
                                            "review-javascript-audio-and-video",
                                            "quiz-javascript-audio-and-video"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-drum-machine",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-drum-machine"
                                        ]
                                    },
                                    {
                                        "dashedName": "maps-and-sets",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-maps-and-sets",
                                            "workshop-plant-nursery-catalog",
                                            "review-javascript-maps-and-sets",
                                            "quiz-javascript-maps-and-sets"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-voting-system",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-voting-system"
                                        ]
                                    },
                                    {
                                        "dashedName": "localstorage-and-crud-operations",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-client-side-storage-and-crud-operations",
                                            "workshop-todo-app",
                                            "lab-bookmark-manager-app",
                                            "review-local-storage-and-crud",
                                            "quiz-local-storage-and-crud"
                                        ]
                                    },
                                    {
                                        "dashedName": "classes-and-the-this-keyword",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-how-to-work-with-classes-in-javascript",
                                            "workshop-shopping-cart",
                                            "lab-project-idea-board",
                                            "review-javascript-classes",
                                            "quiz-javascript-classes"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-bank-account-manager",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-bank-account-manager"
                                        ]
                                    },
                                    {
                                        "dashedName": "recursion",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-recursion-and-the-call-stack",
                                            "workshop-countup",
                                            "lab-countdown",
                                            "lab-range-of-numbers",
                                            "workshop-decimal-to-binary-converter",
                                            "lab-permutation-generator",
                                            "review-recursion",
                                            "quiz-recursion"
                                        ]
                                    },
                                    {
                                        "dashedName": "data-structures",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-common-data-structures-js",
                                            "workshop-linked-list-js",
                                            "lab-linked-list-operations",
                                            "lab-implement-a-stack",
                                            "lab-implement-a-queue",
                                            "review-data-structures-js",
                                            "quiz-data-structures-js"
                                        ]
                                    },
                                    {
                                        "dashedName": "algorithms",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-common-searching-and-sorting-algorithms",
                                            "workshop-binary-search-js",
                                            "workshop-merge-sort-js",
                                            "lab-bubble-sort-algorithm",
                                            "lab-selection-sort-js",
                                            "lab-insertion-sort",
                                            "lab-quicksort-js",
                                            "review-searching-and-sorting-algorithms-js",
                                            "quiz-searching-and-sorting-algorithms-js"
                                        ]
                                    },
                                    {
                                        "dashedName": "graphs-and-trees",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-graphs-and-trees-js",
                                            "workshop-shortest-path-algorithm-js",
                                            "lab-adjacency-list-to-matrix-converter-js",
                                            "workshop-breadth-first-search-js",
                                            "lab-depth-first-search-js",
                                            "lab-n-queens-problem-js",
                                            "review-graphs-and-trees-js",
                                            "quiz-graph-and-trees-js"
                                        ]
                                    },
                                    {
                                        "dashedName": "dynamic-programming",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-dynamic-programming-js",
                                            "lab-nth-fibonacci-number-js",
                                            "review-dynamic-programming-js",
                                            "quiz-dynamic-programming-js"
                                        ]
                                    },
                                    {
                                        "dashedName": "functional-programming",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-functional-programming",
                                            "workshop-recipe-ingredient-converter",
                                            "lab-optional-arguments-sum-function",
                                            "lab-sorting-visualizer",
                                            "review-javascript-functional-programming",
                                            "quiz-javascript-functional-programming"
                                        ]
                                    },
                                    {
                                        "dashedName": "asynchronous-javascript",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-asynchronous-programming",
                                            "workshop-fcc-authors-page",
                                            "lab-fcc-forum-leaderboard",
                                            "review-asynchronous-javascript",
                                            "quiz-asynchronous-javascript"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-weather-app",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-weather-app"
                                        ]
                                    },
                                    {
                                        "dashedName": "review-javascript",
                                        "comingSoon": null,
                                        "moduleType": "review",
                                        "blocks": [
                                            "review-javascript"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "javascript-certification-exam",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "javascript-certification-exam",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "exam-javascript-certification"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "the-odin-project",
                        "chapters": null
                    },
                    {
                        "superBlock": "college-algebra-with-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "project-euler",
                        "chapters": null
                    },
                    {
                        "superBlock": "foundational-c-sharp-with-microsoft",
                        "chapters": null
                    },
                    {
                        "superBlock": "a2-english-for-developers",
                        "chapters": null
                    },
                    {
                        "superBlock": "rosetta-code",
                        "chapters": null
                    },
                    {
                        "superBlock": "python-for-everybody",
                        "chapters": null
                    },
                    {
                        "superBlock": "b1-english-for-developers",
                        "chapters": null
                    },
                    {
                        "superBlock": "a1-professional-spanish",
                        "chapters": [
                            {
                                "dashedName": "es-a1-chapter-welcome-to-a1-professional-spanish",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "es-a1-module-introduction-and-certification-overview",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-learn-certification-introduction"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "es-a1-chapter-spanish-fundamentals",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "es-a1-module-letters-sounds-and-first-numbers",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-learn-vowels",
                                            "es-a1-learn-consonants-and-special-characters",
                                            "es-a1-practice-the-alphabet",
                                            "es-a1-learn-the-first-ten-numbers",
                                            "es-a1-practice-the-first-ten-numbers",
                                            "es-a1-review-spanish-fundamentals",
                                            "es-a1-quiz-spanish-fundamentals"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "es-a1-chapter-greetings-and-introductions",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "es-a1-module-greetings-and-farewells",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-warm-up-greetings-and-farewells-basics",
                                            "es-a1-learn-greetings-during-the-day",
                                            "es-a1-practice-greetings-and-farewells",
                                            "es-a1-review-greetings-and-farewells",
                                            "es-a1-quiz-greetings-and-farewells"
                                        ]
                                    },
                                    {
                                        "dashedName": "es-a1-module-introducing-yourself",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-warm-up-introducing-yourself-basics",
                                            "es-a1-learn-meet-luna",
                                            "es-a1-learn-meet-mateo",
                                            "es-a1-learn-meet-julieta",
                                            "es-a1-practice-introducing-yourself",
                                            "es-a1-review-introducing-yourself",
                                            "es-a1-quiz-introducing-yourself"
                                        ]
                                    },
                                    {
                                        "dashedName": "es-a1-module-first-questions",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-warm-up-first-questions-basics",
                                            "es-a1-learn-meet-angela-and-basti",
                                            "es-a1-practice-first-questions",
                                            "es-a1-review-first-questions",
                                            "es-a1-quiz-first-questions"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "es-a1-chapter-basic-personal-details",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "es-a1-module-numbers-10-to-29",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-warm-up-remember-first-numbers",
                                            "es-a1-learn-numbers-10-to-29",
                                            "es-a1-practice-using-numbers-10-to-29",
                                            "es-a1-review-numbers-10-to-29",
                                            "es-a1-quiz-numbers-10-to-29"
                                        ]
                                    },
                                    {
                                        "dashedName": "es-a1-module-sharing-your-personal-details",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-warm-up-getting-ready-to-share-personal-details",
                                            "es-a1-learn-basic-personal-information",
                                            "es-a1-learn-contact-information-and-spelling",
                                            "es-a1-practice-personal-details-in-action",
                                            "es-a1-review-sharing-your-personal-details",
                                            "es-a1-quiz-sharing-your-personal-details"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "es-a1-chapter-describing-company-and-people",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "es-a1-module-numbers-30-to-100",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-learn-numbers-30-to-60",
                                            "es-a1-learn-numbers-61-to-100",
                                            "es-a1-practice-using-the-first-100-numbers",
                                            "es-a1-review-first-100-numbers",
                                            "es-a1-quiz-numbers-30-to-100"
                                        ]
                                    },
                                    {
                                        "dashedName": "es-a1-module-describing-a-company",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-warm-up-describing-a-company-basics",
                                            "es-a1-learn-what-the-company-does",
                                            "es-a1-learn-asking-about-a-company",
                                            "es-a1-practice-company-profile",
                                            "es-a1-review-talking-about-a-company",
                                            "es-a1-quiz-describing-a-company"
                                        ]
                                    },
                                    {
                                        "dashedName": "es-a1-module-describing-people-at-work",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "es-a1-warm-up-describing-people-at-work-basics",
                                            "es-a1-learn-mini-biographies",
                                            "es-a1-learn-talking-about-colleagues",
                                            "es-a1-practice-asking-about-mini-biographies",
                                            "es-a1-learn-short-workplace-profile",
                                            "es-a1-practice-asking-about-short-workplace-profiles",
                                            "es-a1-review-describing-people-at-work",
                                            "es-a1-quiz-describing-people-at-work"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "a2-professional-spanish",
                        "chapters": null
                    },
                    {
                        "superBlock": "a2-professional-chinese",
                        "chapters": null
                    },
                    {
                        "superBlock": "basic-html",
                        "chapters": null
                    },
                    {
                        "superBlock": "semantic-html",
                        "chapters": null
                    },
                    {
                        "superBlock": "a1-professional-chinese",
                        "chapters": [
                            {
                                "dashedName": "zh-a1-chapter-welcome-to-a1-professional-chinese",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "zh-a1-module-introduction-and-certification-overview",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "zh-a1-learn-certification-introduction"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "zh-a1-chapter-pinyin",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "zh-a1-module-initials-and-finals",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "zh-a1-learn-simple-finals",
                                            "zh-a1-learn-initials",
                                            "zh-a1-learn-compound-finals",
                                            "zh-a1-learn-nasal-finals",
                                            "zh-a1-learn-special-spelling-rules",
                                            "zh-a1-practice-pinyin"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "zh-a1-chapter-greetings-and-introductions",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "zh-a1-module-greetings-and-basic-introductions",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "zh-a1-warm-up-greeting-new-colleagues",
                                            "zh-a1-learn-understanding-greetings-and-introductions",
                                            "zh-a1-practice-introducing-yourself",
                                            "zh-a1-review-greetings-and-introductions",
                                            "zh-a1-quiz-greetings-and-introductions"
                                        ]
                                    },
                                    {
                                        "dashedName": "zh-a1-module-asking-and-giving-basic-information",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "zh-a1-warm-up-meeting-new-teammates",
                                            "zh-a1-learn-understanding-questions-and-answers",
                                            "zh-a1-practice-exchanging-basic-information",
                                            "zh-a1-review-introduction-questions",
                                            "zh-a1-quiz-introduction-questions"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "zh-a1-chapter-numbers-and-personal-information",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "zh-a1-module-numbers-below-100",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "zh-a1-learn-numbers-0-to-10",
                                            "zh-a1-practice-numbers-0-to-10",
                                            "zh-a1-learn-numbers-11-to-19",
                                            "zh-a1-practice-numbers-11-to-19",
                                            "zh-a1-learn-numbers-20-to-99",
                                            "zh-a1-practice-numbers-20-to-99",
                                            "zh-a1-review-numbers-below-100",
                                            "zh-a1-quiz-numbers-below-100"
                                        ]
                                    },
                                    {
                                        "dashedName": "zh-a1-module-communicating-personal-information",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    }
                                ]
                            },
                            {
                                "dashedName": "zh-a1-chapter-expressing-what-you-can-and-cant-do",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "zh-a1-module-talking-about-personal-skills",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "zh-a1-warm-up-personal-skills-basics",
                                            "zh-a1-learn-can-or-cannot",
                                            "zh-a1-practice-personal-skills",
                                            "zh-a1-review-describing-skills",
                                            "zh-a1-quiz-describing-skills"
                                        ]
                                    },
                                    {
                                        "dashedName": "zh-a1-module-discussing-team-skills",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "zh-a1-warm-up-team-skills-basics",
                                            "zh-a1-learn-who-can-do-what-on-the-team",
                                            "zh-a1-practice-talking-about-skills",
                                            "zh-a1-review-discussing-team-skills",
                                            "zh-a1-quiz-discussing-team-skills"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "dev-playground",
                        "chapters": null
                    },
                    {
                        "superBlock": "full-stack-open",
                        "chapters": [
                            {
                                "dashedName": "part-0",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-1",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-2",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-3",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-4",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-5",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-6",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-7",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-8",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-9",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-10",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-11",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-12",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "part-13",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-blog-page"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "responsive-web-design-v9",
                        "chapters": [
                            {
                                "dashedName": "html",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "basic-html",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "workshop-curriculum-outline",
                                            "lab-debug-camperbots-profile-page",
                                            "lecture-understanding-html-attributes",
                                            "lab-debug-pet-adoption-page",
                                            "lecture-understanding-the-html-boilerplate",
                                            "workshop-cat-photo-app",
                                            "lab-recipe-page",
                                            "lecture-html-fundamentals",
                                            "workshop-bookstore-page",
                                            "lecture-understanding-how-html-affects-seo",
                                            "lab-travel-agency-page",
                                            "lecture-working-with-audio-and-video-elements",
                                            "workshop-html-music-player",
                                            "workshop-html-video-player",
                                            "lab-html-audio-and-video-player",
                                            "lecture-working-with-images-and-svgs",
                                            "workshop-build-a-heart-icon",
                                            "lecture-working-with-media",
                                            "workshop-build-a-video-display-using-iframe",
                                            "lab-video-compilation-page",
                                            "lecture-working-with-links",
                                            "review-basic-html",
                                            "quiz-basic-html"
                                        ]
                                    },
                                    {
                                        "dashedName": "semantic-html",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-importance-of-semantic-html",
                                            "lecture-understanding-nuanced-semantic-elements",
                                            "workshop-major-browsers-list",
                                            "lecture-working-with-text-and-time-semantic-elements",
                                            "workshop-quincys-job-tips",
                                            "lecture-working-with-specialized-semantic-elements",
                                            "workshop-blog-page",
                                            "lab-event-hub",
                                            "review-semantic-html",
                                            "quiz-semantic-html"
                                        ]
                                    },
                                    {
                                        "dashedName": "html-forms-and-tables",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-forms",
                                            "workshop-hotel-feedback-form",
                                            "lecture-working-with-tables",
                                            "workshop-final-exams-table",
                                            "lab-book-catalog-table",
                                            "lecture-working-with-html-tools",
                                            "review-html-tables-and-forms",
                                            "quiz-html-tables-and-forms"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-survey-form",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-survey-form"
                                        ]
                                    },
                                    {
                                        "dashedName": "html-and-accessibility",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-importance-of-accessibility-and-good-html-structure",
                                            "workshop-debug-coding-journey-blog-page",
                                            "lecture-accessible-tables-forms",
                                            "workshop-tech-conference-schedule",
                                            "lab-debug-donation-form",
                                            "lecture-introduction-to-aria",
                                            "workshop-accessible-audio-controller",
                                            "lecture-accessible-media-elements",
                                            "lab-checkout-page",
                                            "lab-movie-review-page",
                                            "lab-multimedia-player",
                                            "review-html-accessibility",
                                            "quiz-html-accessibility"
                                        ]
                                    },
                                    {
                                        "dashedName": "review-html",
                                        "comingSoon": null,
                                        "moduleType": "review",
                                        "blocks": [
                                            "review-html"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "computers",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "computer-basics",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-computer-internet-and-tooling-basics",
                                            "lecture-working-with-file-systems",
                                            "lecture-browsing-the-web-effectively",
                                            "review-computer-basics",
                                            "quiz-computer-basics"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "css",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "basic-css",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-what-is-css",
                                            "workshop-cafe-menu",
                                            "lab-business-card",
                                            "lecture-css-specificity-the-cascade-algorithm-and-inheritance",
                                            "review-basic-css",
                                            "quiz-basic-css",
                                            "lecture-styling-lists-and-links",
                                            "lab-stylized-to-do-list",
                                            "lecture-working-with-backgrounds-and-borders",
                                            "lab-blog-post-card",
                                            "review-css-backgrounds-and-borders",
                                            "quiz-css-backgrounds-and-borders"
                                        ]
                                    },
                                    {
                                        "dashedName": "design-for-developers",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-user-interface-design-fundamentals",
                                            "lecture-user-centered-design",
                                            "lecture-common-design-tools",
                                            "review-design-fundamentals",
                                            "quiz-design-fundamentals"
                                        ]
                                    },
                                    {
                                        "dashedName": "absolute-and-relative-units",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-relative-and-absolute-units",
                                            "lab-event-flyer-page",
                                            "review-css-relative-and-absolute-units",
                                            "quiz-css-relative-and-absolute-units"
                                        ]
                                    },
                                    {
                                        "dashedName": "pseudo-classes-and-elements",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-pseudo-classes-and-pseudo-elements-in-css",
                                            "workshop-greeting-card",
                                            "workshop-parent-teacher-conference-form",
                                            "lab-job-application-form",
                                            "review-css-pseudo-classes",
                                            "quiz-css-pseudo-classes"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-colors",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-colors-in-css",
                                            "workshop-colored-markers",
                                            "lab-colored-boxes",
                                            "review-css-colors",
                                            "quiz-css-colors"
                                        ]
                                    },
                                    {
                                        "dashedName": "styling-forms",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-best-practices-for-styling-forms",
                                            "workshop-registration-form",
                                            "lab-contact-form",
                                            "workshop-game-settings-panel",
                                            "lab-feature-selection",
                                            "review-styling-forms",
                                            "quiz-styling-forms"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-box-model",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-css-transforms-overflow-and-filters",
                                            "workshop-rothko-painting",
                                            "lab-confidential-email-page",
                                            "review-css-layout-and-effects",
                                            "quiz-css-layout-and-effects"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-flexbox",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-css-flexbox",
                                            "workshop-flexbox-photo-gallery",
                                            "workshop-colorful-boxes",
                                            "lab-pricing-plans-layout",
                                            "review-css-flexbox",
                                            "quiz-css-flexbox"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-page-of-playing-cards",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-page-of-playing-cards"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-typography",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-css-fonts",
                                            "workshop-nutritional-label",
                                            "lab-newspaper-article",
                                            "review-css-typography",
                                            "quiz-css-typography"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-and-accessibility",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-best-practices-for-accessibility-and-css",
                                            "workshop-accessibility-quiz",
                                            "lab-tribute-page",
                                            "review-css-accessibility",
                                            "quiz-css-accessibility"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-positioning",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-how-to-work-with-floats-and-positioning-in-css",
                                            "workshop-cat-painting",
                                            "lab-house-painting",
                                            "review-css-positioning",
                                            "quiz-css-positioning"
                                        ]
                                    },
                                    {
                                        "dashedName": "attribute-selectors",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-attribute-selectors",
                                            "workshop-balance-sheet",
                                            "review-css-attribute-selectors",
                                            "quiz-css-attribute-selectors"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-book-inventory-app",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-book-inventory-app"
                                        ]
                                    },
                                    {
                                        "dashedName": "responsive-design",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-best-practices-for-responsive-web-design",
                                            "workshop-piano",
                                            "review-responsive-web-design",
                                            "quiz-responsive-web-design"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-technical-documentation-page",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-technical-documentation-page"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-variables",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-css-variables",
                                            "workshop-city-skyline",
                                            "lab-availability-table",
                                            "review-css-variables",
                                            "quiz-css-variables"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-grid",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-css-grid",
                                            "workshop-magazine",
                                            "lab-newspaper-layout",
                                            "lecture-debugging-css",
                                            "review-css-grid",
                                            "quiz-css-grid"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-product-landing-page",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-product-landing-page"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-animations",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-animations-and-accessibility",
                                            "workshop-ferris-wheel",
                                            "lab-moon-orbit",
                                            "workshop-flappy-penguin",
                                            "lab-personal-portfolio",
                                            "review-css-animations",
                                            "quiz-css-animations"
                                        ]
                                    },
                                    {
                                        "dashedName": "review-css",
                                        "comingSoon": null,
                                        "moduleType": "review",
                                        "blocks": [
                                            "review-css"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "responsive-web-design-certification-exam",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "responsive-web-design-certification-exam",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "exam-responsive-web-design-certification"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "front-end-development-libraries-v9",
                        "chapters": [
                            {
                                "dashedName": "front-end-development-libraries",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "react-fundamentals",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-javascript-libraries-and-frameworks",
                                            "workshop-reusable-mega-navbar",
                                            "lab-reusable-footer",
                                            "lecture-working-with-data-in-react",
                                            "workshop-reusable-profile-card-component",
                                            "lab-mood-board",
                                            "review-react-basics",
                                            "quiz-react-basics"
                                        ]
                                    },
                                    {
                                        "dashedName": "react-state-hooks-and-routing",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-state-and-responding-to-events-in-react",
                                            "workshop-toggle-text-app",
                                            "lab-color-picker",
                                            "lecture-understanding-effects-and-referencing-values-in-react",
                                            "workshop-fruit-search-app",
                                            "lab-one-time-password-generator",
                                            "review-react-state-and-hooks",
                                            "quiz-react-state-and-hooks",
                                            "lecture-working-with-forms-in-react",
                                            "workshop-superhero-application-form",
                                            "lab-event-rsvp",
                                            "lecture-working-with-data-fetching-and-memoization-in-react",
                                            "workshop-shopping-list-app",
                                            "lecture-routing-react-frameworks-and-dependency-management-tools",
                                            "lecture-react-strategies-and-debugging",
                                            "review-react-forms-data-fetching-and-routing",
                                            "quiz-react-forms-data-fetching-and-routing"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-currency-converter",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-currency-converter"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-tic-tac-toe",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-tic-tac-toe"
                                        ]
                                    },
                                    {
                                        "dashedName": "performance",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-performance-in-web-applications",
                                            "review-web-performance",
                                            "quiz-web-performance"
                                        ]
                                    },
                                    {
                                        "dashedName": "testing",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-the-different-types-of-testing",
                                            "review-testing",
                                            "quiz-testing"
                                        ]
                                    },
                                    {
                                        "dashedName": "css-libraries-and-frameworks",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-css-libraries-and-frameworks",
                                            "workshop-error-message-component",
                                            "workshop-tailwind-cta-component",
                                            "workshop-tailwind-pricing-component",
                                            "lab-music-shopping-cart-page",
                                            "lab-photography-exhibit",
                                            "review-css-libraries-and-frameworks",
                                            "quiz-css-libraries-and-frameworks"
                                        ]
                                    },
                                    {
                                        "dashedName": "data-visualization",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-data-visualization",
                                            "lab-bar-chart",
                                            "lab-scatterplot-graph"
                                        ]
                                    },
                                    {
                                        "dashedName": "typescript-fundamentals",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-typescript",
                                            "workshop-type-safe-user-profile",
                                            "workshop-type-safe-math-toolkit",
                                            "lecture-understanding-type-composition",
                                            "workshop-shape-manager",
                                            "lab-motorcycle-shop",
                                            "lecture-working-with-generics-and-type-narrowing",
                                            "workshop-bug-emoji-picker",
                                            "lab-product-showcase",
                                            "lecture-working-with-typescript-configuration-files",
                                            "workshop-fortune-teller-app",
                                            "lab-flashcard-quiz-app",
                                            "lab-digital-pet-game",
                                            "review-typescript",
                                            "quiz-typescript"
                                        ]
                                    },
                                    {
                                        "dashedName": "review-front-end-libraries",
                                        "comingSoon": true,
                                        "moduleType": "review",
                                        "blocks": [
                                            "review-front-end-libraries"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "front-end-development-libraries-certification-exam",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "front-end-development-libraries-certification-exam",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "exam-front-end-development-libraries-certification"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "python-v9",
                        "chapters": [
                            {
                                "dashedName": "python",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "python-basics",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-python",
                                            "lecture-understanding-variables-and-data-types",
                                            "workshop-report-card-printer",
                                            "lecture-introduction-to-python-strings",
                                            "workshop-employee-profile-generator",
                                            "lecture-numbers-and-mathematical-operations",
                                            "workshop-bill-splitter",
                                            "lecture-booleans-and-conditionals",
                                            "workshop-movie-ticket-booking-calculator",
                                            "lab-travel-weather-planner",
                                            "lecture-understanding-functions-and-scope",
                                            "lab-discount-calculator",
                                            "workshop-caesar-cipher",
                                            "lab-rpg-character",
                                            "review-python-basics",
                                            "quiz-python-basics"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-loops-and-sequences",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-loops-and-sequences",
                                            "workshop-pin-extractor",
                                            "lab-number-pattern-generator",
                                            "review-loops-and-sequences",
                                            "quiz-loops-and-sequences"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-dictionaries-and-sets",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-dictionaries-and-sets",
                                            "lecture-working-with-modules",
                                            "workshop-medical-data-validator",
                                            "review-dictionaries-and-sets",
                                            "quiz-dictionaries-and-sets"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-user-configuration-manager",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-user-configuration-manager"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-error-handling",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-error-handling",
                                            "lab-isbn-validator",
                                            "review-error-handling",
                                            "quiz-error-handling"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-classes-and-objects",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-classes-and-objects",
                                            "workshop-musical-instrument-inventory",
                                            "lab-planet-class",
                                            "workshop-email-simulator",
                                            "review-classes-and-objects",
                                            "quiz-classes-and-objects"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-budget-app",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-budget-app"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-object-oriented-programming",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-object-oriented-programming-and-encapsulation",
                                            "workshop-salary-tracker",
                                            "lab-game-character-stats",
                                            "lecture-understanding-inheritance-and-polymorphism",
                                            "workshop-media-catalogue",
                                            "lecture-understanding-abstraction",
                                            "workshop-discount-calculator",
                                            "lab-player-interface",
                                            "review-object-oriented-programming",
                                            "quiz-object-oriented-programming"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-polygon-area-calculator",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-polygon-area-calculator"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-linear-data-structures",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-common-data-structures",
                                            "workshop-linked-list-class",
                                            "review-data-structures",
                                            "quiz-data-structures"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-hash-table",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-hash-table"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-algorithms",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-searching-and-sorting-algorithms",
                                            "workshop-binary-search",
                                            "lab-bisection-method",
                                            "workshop-merge-sort",
                                            "lab-quicksort",
                                            "lab-selection-sort",
                                            "lab-luhn-algorithm",
                                            "review-searching-and-sorting-algorithms",
                                            "quiz-searching-and-sorting-algorithms"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-tower-of-hanoi",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-tower-of-hanoi"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-graphs-and-trees",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-graphs-and-trees",
                                            "workshop-shortest-path-algorithm",
                                            "lab-adjacency-list-to-matrix-converter",
                                            "workshop-breadth-first-search",
                                            "lab-depth-first-search",
                                            "lab-n-queens-problem",
                                            "review-graphs-and-trees",
                                            "quiz-graphs-and-trees"
                                        ]
                                    },
                                    {
                                        "dashedName": "python-dynamic-programming",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-dynamic-programming",
                                            "lab-nth-fibonacci-number",
                                            "review-dynamic-programming",
                                            "quiz-dynamic-programming"
                                        ]
                                    },
                                    {
                                        "dashedName": "review-python",
                                        "comingSoon": null,
                                        "moduleType": "review",
                                        "blocks": [
                                            "review-python"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "python-certification-exam",
                                "comingSoon": false,
                                "modules": [
                                    {
                                        "dashedName": "python-certification-exam",
                                        "comingSoon": false,
                                        "moduleType": null,
                                        "blocks": [
                                            "exam-python-certification"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "relational-databases-v9",
                        "chapters": [
                            {
                                "dashedName": "relational-databases",
                                "comingSoon": null,
                                "modules": [
                                    {
                                        "dashedName": "code-editors",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-code-editors-and-ides"
                                        ]
                                    },
                                    {
                                        "dashedName": "bash-fundamentals",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-the-command-line-and-working-with-bash",
                                            "workshop-bash-boilerplate",
                                            "review-bash-commands",
                                            "quiz-bash-commands"
                                        ]
                                    },
                                    {
                                        "dashedName": "sql-and-postgresql",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-relational-databases",
                                            "workshop-database-of-video-game-characters",
                                            "review-sql-and-postgresql",
                                            "quiz-sql-and-postgresql"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-celestial-bodies-database",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-celestial-bodies-database"
                                        ]
                                    },
                                    {
                                        "dashedName": "bash-scripting",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-bash-scripting",
                                            "workshop-bash-five-programs",
                                            "review-bash-scripting",
                                            "quiz-bash-scripting"
                                        ]
                                    },
                                    {
                                        "dashedName": "sql-and-bash",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-sql",
                                            "workshop-sql-student-database-part-1",
                                            "workshop-sql-student-database-part-2",
                                            "workshop-kitty-ipsum-translator",
                                            "workshop-bike-rental-shop",
                                            "review-bash-and-sql",
                                            "quiz-bash-and-sql"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-world-cup-database",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-world-cup-database"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-salon-appointment-scheduler",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-salon-appointment-scheduler"
                                        ]
                                    },
                                    {
                                        "dashedName": "git",
                                        "comingSoon": null,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-nano",
                                            "workshop-castle",
                                            "lecture-introduction-to-git-and-github",
                                            "lecture-working-with-code-reviews-branching-deployment-and-ci-cd",
                                            "workshop-sql-reference-object",
                                            "review-git",
                                            "quiz-git"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-periodic-table-database",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-periodic-table-database"
                                        ]
                                    },
                                    {
                                        "dashedName": "lab-number-guessing-game",
                                        "comingSoon": null,
                                        "moduleType": "cert-project",
                                        "blocks": [
                                            "lab-number-guessing-game"
                                        ]
                                    },
                                    {
                                        "dashedName": "review-relational-databases",
                                        "comingSoon": null,
                                        "moduleType": "review",
                                        "blocks": [
                                            "review-relational-databases"
                                        ]
                                    }
                                ]
                            },
                            {
                                "dashedName": "relational-databases-certification-exam",
                                "comingSoon": false,
                                "modules": [
                                    {
                                        "dashedName": "relational-databases-certification-exam",
                                        "comingSoon": false,
                                        "moduleType": null,
                                        "blocks": [
                                            "exam-relational-databases-certification"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "back-end-development-and-apis-v9",
                        "chapters": [
                            {
                                "dashedName": "back-end-development-and-apis",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "introduction-to-nodejs",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-nodejs-and-event-driven-architecture",
                                            "review-node-js-intro",
                                            "quiz-node-js-intro"
                                        ]
                                    },
                                    {
                                        "dashedName": "nodejs-core-modules",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-working-with-node-core-modules",
                                            "review-node-js-core-modules",
                                            "quiz-node-js-core-modules"
                                        ]
                                    },
                                    {
                                        "dashedName": "node-package-manager",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-introduction-to-npm",
                                            "lecture-working-with-npm-scripts",
                                            "review-npm",
                                            "quiz-npm"
                                        ]
                                    },
                                    {
                                        "dashedName": "http-and-the-web-standards-model",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-how-http-dns-tcpip-work",
                                            "lecture-understanding-the-http-request-response-model"
                                        ]
                                    },
                                    {
                                        "dashedName": "rest-api-and-web-services",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    },
                                    {
                                        "dashedName": "introduction-to-express",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "lecture-understanding-rest-api-and-web-services",
                                            "lecture-working-with-express",
                                            "lecture-understanding-routing-in-express-js"
                                        ]
                                    },
                                    {
                                        "dashedName": "express-middleware",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    },
                                    {
                                        "dashedName": "error-handling-in-express",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    },
                                    {
                                        "dashedName": "websockets",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    },
                                    {
                                        "dashedName": "node-and-sql",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    },
                                    {
                                        "dashedName": "security-and-privacy",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    },
                                    {
                                        "dashedName": "authentication",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    },
                                    {
                                        "dashedName": "tooling-and-deployment",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": []
                                    }
                                ]
                            },
                            {
                                "dashedName": "back-end-development-and-apis-certification-exam",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "back-end-development-and-apis-certification-exam",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "exam-back-end-development-and-apis-certification"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "full-stack-developer-v9",
                        "chapters": [
                            {
                                "dashedName": "certified-full-stack-developer-exam",
                                "comingSoon": true,
                                "modules": [
                                    {
                                        "dashedName": "certified-full-stack-developer-exam",
                                        "comingSoon": true,
                                        "moduleType": null,
                                        "blocks": [
                                            "exam-certified-full-stack-developer"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "superBlock": "html-forms-and-tables",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-python-for-beginners",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-algorithms-and-data-structures",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-precalculus",
                        "chapters": null
                    },
                    {
                        "superBlock": "html-and-accessibility",
                        "chapters": null
                    },
                    {
                        "superBlock": "computer-basics",
                        "chapters": null
                    },
                    {
                        "superBlock": "basic-css",
                        "chapters": null
                    },
                    {
                        "superBlock": "design-for-developers",
                        "chapters": null
                    },
                    {
                        "superBlock": "absolute-and-relative-units",
                        "chapters": null
                    },
                    {
                        "superBlock": "pseudo-classes-and-elements",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-colors",
                        "chapters": null
                    },
                    {
                        "superBlock": "styling-forms",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-box-model",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-flexbox",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-typography",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-and-accessibility",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-positioning",
                        "chapters": null
                    },
                    {
                        "superBlock": "attribute-selectors",
                        "chapters": null
                    },
                    {
                        "superBlock": "responsive-design",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-variables",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-grid",
                        "chapters": null
                    },
                    {
                        "superBlock": "css-animations",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-oop-with-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-rag-mcp-fundamentals",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-bash",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-sql-and-postgresql",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-bash-scripting",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-sql-and-bash",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-nano",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-git-and-github",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-variables-and-strings-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-booleans-and-numbers-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-functions-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-arrays-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-objects-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-loops-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "javascript-fundamentals-review",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-higher-order-functions-and-callbacks-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-dom-manipulation-and-events-with-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-javascript-and-accessibility",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-javascript-debugging",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-basic-regex-with-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-dates-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-audio-and-video-events-with-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-maps-and-sets-in-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-localstorage-and-crud-operations-with-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-javascript-classes",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-recursion-with-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-functional-programming-with-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-asynchronous-javascript",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-python-basics",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-python-loops-and-sequences",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-python-dictionaries-and-sets",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-error-handling-in-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-python-classes-and-objects",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-oop-in-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "introduction-to-linear-data-structures-in-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-algorithms-in-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-graphs-and-trees-in-python",
                        "chapters": null
                    },
                    {
                        "superBlock": "learn-dynamic-programming-in-python",
                        "chapters": null
                    }
                ]
            }
        },
        "pageContext": {
            "superBlock": "javascript-v9"
        }
    },
    "staticQueryHashes": [],
    "slicesMap": {}
}
```