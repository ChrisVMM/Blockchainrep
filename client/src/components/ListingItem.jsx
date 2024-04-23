import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className="bg-gray-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`} className="block">
        <img
          src={listing.imageUrls[0] || 'https://via.placeholder.com/595x400'}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-gray-800 truncate">{listing.name}</p>
          <div className="flex items-center gap-1 text-gray-600">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="text-sm truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
          <p className="text-gray-700 mt-2 font-semibold">
            ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="text-gray-700 flex gap-4 text-xs">
            <div className="font-bold">{listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}</div>
            <div className="font-bold">{listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
