export const fishLures = ['jigs', 'crank', 'spinner']
export const fishTypes = ['tuna', 'barracuda', 'perch', 'salmon', 'catfish', 'bass']

export const fishFormFields = [
  {
    type: 'text',
    label: 'Fish Name:',
    placeholder: 'Fish Name',
    key: 'name',
  },
  {
    type: 'number',
    label: 'Total Length:',
    placeholder: 'Total Length',
    key: 'total_length',
  },
  {
    type: 'number',
    label: 'Weight:',
    placeholder: 'Weight',
    key: 'weight',
  },
  {
    type: 'text',
    label: 'Tracking ID:',
    placeholder: 'Tracking ID',
    key: 'tracking_code',
  },
]

export const fishImages = {
  tuna: '/static/images/tuna.png',
  barracuda: '/static/images/barracuda.png',
  perch: '/static/images/perch.png',
  salmon: '/static/images/salmon.png',
  catfish: '/static/images/catfish.png',
  bass: '/static/images/bass.png',
}
