import { FishRecord } from 'app/api/fish/route'

interface Props {
  fish: FishRecord
  count: number
}

export default function FishIndex({ fish, count }: Props) {
  const fishDetails = [
    { label: 'Type', value: fish.type },
    { label: 'Length', value: `${fish.total_length} cm` },
    { label: 'Weight', value: `${fish.weight} kg` },
    { label: 'Location', value: fish.location },
    { label: 'Lure type', value: fish.lure },
    { label: 'Caught Count', value: count },
    { label: 'Date Recorded', value: new Date(fish.date_caught).toLocaleDateString() },
  ]
  return (
    <div className="flex flex-col items-center mt-8">
      <img
        src={fish.images}
        alt={fish.name}
        className="w-64 h-64 object-cover rounded-lg shadow-md"
      />
      <div className="mt-6 md:ml-8">
        {fishDetails.map((detail, index) => (
          <p key={index} className="mt-2">
            <span className="font-bold">{detail.label}:</span> {detail.value}
          </p>
        ))}
      </div>
    </div>
  )
}
