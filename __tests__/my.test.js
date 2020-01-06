/* eslint-disable */
const { days, startHours, endHours } = require('../src/services/helpers')

it('should return array of length = 8, with an object property \
    of "text: Czw 14 Luty" another object property \
    of "text: Śr 20 Luty" and their timestamps as value', () => {

  const result = days()

  const startOfDay = new Date('2019-02-15').setUTCHours(0, 0, 0, 0)


  expect(result.length).toBe(8)

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        text: 'Czw 14 Luty',
        value: 1550102400000
      })
    ])
  )

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        text: 'Śr 20 Luty',
        value: 1550620800000
      })
    ])
  )
})

it('should return array of length = 8, with an object property \
    of "text: Czw 14 Luty" and another object property \
    of "text: Nie 17 Luty"', () => {

      const result = startHours()


      expect(result.length).toBe(5)

      expect(result[0]).toEqual({
        text: 'Od godziny',
        value: null
      })

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            text: 20,
            value: 20
          })
        ])
      )

      expect(result[4]).toEqual({
        text: 23,
        value: 23
      })

})


it.only('should return array of length = 8, with an object property \
    of "text: Czw 14 Luty" and another object property \
    of "text: Nie 17 Luty"', () => {

      const result = endHours()


      expect(result.length).toBe(5)

      expect(result[0]).toEqual({
        text: 'Do godziny',
        value: null
      })

      expect(result[1]).toEqual({
        text: 21,
        value: 21
      })

      expect(result[4]).toEqual({
        text: 24,
        value: 24
      })

})

