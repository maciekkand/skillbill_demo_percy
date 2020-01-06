const prefix = 'http://localhost:3000/devs?'
let query = ''

const skill1 = ''
const rank1 = 0
const skill2 = ''
const rank2 = 0
const skill3 = ''
const rank3 = 0

//*   http://localhost:3000/devs?skill_1=JS&rank_1_gte=4
//?   query = prefix + 'skill_1=' + skill1 + '&rank_1_gte=' + rank1

// query = prefix + 'skill_1=' + skill_1 + '&rank_1_gte=' + rank_1 + '&skill_2=' + skill_2 + '&rank_2_gte=' + rank_2 + '&skill_3=' + skill_3 + '&rank_3_gte=' + rank_3

if (skill1) query = prefix + 'skill1=' + skill1 
if (skill1 && rank1) query = query + '&rank1_gte=' + rank1

if (skill2) query = query + '&skill2=' + skill2 
if (skill2 && rank2) query = query + '&rank2_gte=' + rank2

if (skill3) query = query + '&skill3=' + skill3 
if (skill3 && rank3) query = query + '&rank3_gte=' + rank3

if (!query) query = prefix + '_limit=10'

console.log(query)  


//? http://localhost:3000/devs?first_like=Pau
//? http://localhost:3000/devs?q=illa

//? json-server db2.json --watch
//? yarn serve
//? npx cypress open
//? npx cypress run

