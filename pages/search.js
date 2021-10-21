import { format } from "date-fns";
import { useRouter } from "next/dist/client/router"
import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import InfoCard from "../src/components/InfoCard";
import Map from "../src/components/Map";


function Search({ searchResults }) {
    
    const router = useRouter();
    const { location, startDate, endDate, noOfGuests } = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div className="h-screen">
            <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {noOfGuests} guests</p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden space-x-3 text-gray-800 whitespace-nowrap md:inline-flex mb-5 ">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and beds</p>
                        <p className="button">More filters</p>
                    </div>


                    <div className="flex flex-col">
                        {searchResults.map(({ img, location, title, description, star, price, total }) => (
                            <InfoCard
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))}
                    </div>
                </section>

                <section className="hidden xl:inline-flex xl:mn-w-[600px]">
                    <Map/>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export async function getServerSideProps() {
    const searchResults = await fetch("https://jsonkeeper.com/b/5NPS")
        .then(
            (res) => res.json()
        );

    return {
        props: {
            searchResults,
        },
    };
}

export default Search

