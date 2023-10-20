import { RecordedFishData } from 'mockData/fish'

interface Props {
  fishIndexEntryList: Array<RecordedFishData>
}

export default function FishGraph({ fishIndexEntryList }: Props) {
  const maxLength = Math.max(...fishIndexEntryList.map((fish) => fish.total_length))
  const maxWeight = Math.max(...fishIndexEntryList.map((fish) => fish.weight))
  const containerWidth = 300
  return (
    <div style={{ marginBottom: '100px' }}>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <h1>Historial Data</h1>
        <div className="flex-col justify-center items-start space-y-4">
          {fishIndexEntryList.map((fish, index) => (
            <div key={index} className="flex flex-col items-start mx-2 space-y-2">
              <div className="relative h-5" style={{ width: `${containerWidth}px` }}>
                <div
                  className="absolute left-0 h-5 bg-blue-500 transition-all duration-200 hover:bg-blue-700 cursor-pointer"
                  title={`Date: ${fish.date_caught.toISOString().split('T')[0]}, Length: ${
                    fish.total_length
                  }`}
                  style={{
                    width: `${(fish.total_length / maxLength) * containerWidth}px`,
                  }}
                ></div>
              </div>
              <div className="relative h-5" style={{ width: `${containerWidth}px` }}>
                <div
                  className="absolute left-0 h-5 bg-green-500 transition-all duration-200 hover:bg-green-700 cursor-pointer"
                  title={`Date: ${fish.date_caught.toISOString().split('T')[0]}, Weight: ${
                    fish.weight
                  }`}
                  style={{
                    width: `${(fish.weight / maxWeight) * containerWidth}px`,
                  }}
                ></div>
              </div>
              <div className="text-xs">{fish.location}</div>
              <div className="text-xs">{fish.weight} kg</div>
              <div className="text-xs">{fish.total_length} cm</div>
              <div className="text-xs">{fish.date_caught.toISOString().split('T')[0]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex space-x-4 text-sm font-semibold">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-500 mr-2"></div>
            Length
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 mr-2"></div>
            Weight
          </div>
        </div>
      </div>
    </div>
  )
}
