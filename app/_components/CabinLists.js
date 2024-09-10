import { unstable_noStore as noStore } from 'next/cache';
import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '../_lib/data-service';

export default async function CabinLists({ filter }) {
    // opt out cache --- does not cache any data
    // noStore();

    const cabins = await getCabins();

    if (!cabins.length) return null;

    let displayedCabins;

    if (filter === 'all') displayedCabins = cabins;

    if (filter === 'small')
        displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

    if (filter === 'medium')
        displayedCabins = cabins.filter(
            (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
        );

    if (filter === 'large')
        displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
            {displayedCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}
