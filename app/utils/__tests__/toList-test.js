import toList from '../toList';

describe('Utils.toList', () => {

  it('accepts an object and returns an object', () => {
    toList({
      'name': 'Ari',
      'friends': [
        {'name': 'Nate'}
      ]
    })
  })

})