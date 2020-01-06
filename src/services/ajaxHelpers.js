// import { LITERALS, NUMBERS } from './constants'

export const fetch = (context, selectedSkills = {}) => {
  console.log('selectedSkills = ', selectedSkills)

  // if (selectedSkills.paginationLimit) {
  //   if (selectedSkills.paginationLimit > NUMBERS.PAGINATION_LIMIT) {
  //     const limit = Number(String(selectedSkills.paginationLimit).slice(1)) || NUMBERS.PAGINATION_LIMIT
  //     const skip = Number(selectedSkills.paginationLimit) - limit
  //     return LITERALS.PREFIX + `?s={id:1}&sk=${skip}&l=${limit}&` + LITERALS.SUFFIX
  //   }
  //   return LITERALS.PREFIX + '?s={id:1}&l=' + NUMBERS.DOWNLOAD_LIMIT + '&' + LITERALS.SUFFIX
  // }

  /*
let query = ''
const skill1 = selectedSkills.skill1 || ''
const rank1 = selectedSkills.rank1 || 0
const skill2 = selectedSkills.skill2 || ''
const rank2 = selectedSkills.rank2 || 0
const skill3 = selectedSkills.skill3 || ''
const rank3 = selectedSkills.rank3 || 0
*/

  const prefix = 'http://localhost:3000/devs?'
  let query = ''
  const skill1 = selectedSkills.skill1 || ''
  const rank1 = selectedSkills.rank1 || 0
  const skill2 = selectedSkills.skill2 || ''
  const rank2 = selectedSkills.rank2 || 0
  const skill3 = selectedSkills.skill3 || ''
  const rank3 = selectedSkills.rank3 || 0

  if (skill1) query = prefix + 'skill1=' + skill1
  if (skill1 && rank1) query = query + '&rank1_gte=' + rank1

  if (skill2) query = query + '&skill2=' + skill2
  if (skill2 && rank2) query = query + '&rank2_gte=' + rank2

  if (skill3) query = query + '&skill3=' + skill3
  if (skill3 && rank3) query = query + '&rank3_gte=' + rank3

  // if (!query) query = prefix
  if (!query) query = prefix + '_limit=10'
  console.log('query = ' + query)

  return query

  // if (skill1 && rank1 && skill2 && rank2 && skill3 && rank3) {
  //   query = '?s={id:1}&q={"skill1":"' + skill1 + '",$and:[{"rank1":{$gte:' + rank1 + '}}, \
  //     {$and:[{"skill2":"' + skill2 + '"},{$and:[{"rank2":{$gte:' + rank2 + '}}, \
  //     {$and:[{"skill3":"' + skill3 + '"},{$and:[{"rank3":{$gte:' + rank3 + '}}]}]}]}]}]}'
  // }
  // else if (skill1 && rank1 && skill2 && rank2) {
  //   query = '?s={id:1}&q={"skill1":"' + skill1 + '",$and:[{"rank1":{$gte:' + rank1 + '}}, \
  //     {$and:[{"skill2":"' + skill2 + '"},{$and:[{"rank2":{$gte:' + rank2 + '}}]}]}]}'
  // }
  // else if (skill1 && rank1) {
  //   query = '?s={rank1:-1}&q={"skill1":"' + skill1 + '",$and:[{"rank1":{$gte:' + rank1 + '}}]}'
  // }
  // else {
  //   query = '?s={id:1}&l=' + NUMBERS.DOWNLOAD_LIMIT
  // }

  // const urlString = LITERALS.PREFIX + query + '&' + LITERALS.SUFFIX
  // console.log('urlString = ' , urlString)
  // return urlString
}

export const findText = text => {
  const prefix = 'http://localhost:3000/devs?'

  const query = prefix + 'q=' + text
  console.log('query = ', query)

  return query
}
