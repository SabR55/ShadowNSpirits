import ReservationBtn from "../ReservationBtn";
import images from '../assets/assets.js';

function Homepage(){

    const cards = [
        {
          id: 1,
          image: 'homeCard01',
          description: 'Handcrafted drinks that incorporate unusual ingredients, offering a one-of-a-kind drinking experience.'
        },
        {
          id: 2,
          image: 'homeCard02',
          description: 'A menu of gourmet small plates and appetizers, that perfectly compliments our cocktails.'
        },
        {
          id: 3,
          image: 'homeCard03',
          description: 'Cozy, intimate setting perfect for gatherings with friends or romantic evenings for couples.'
        }
      ];

    return (
        <div>
            
            {/* Hero Image */}
            <img src={images.homeHero} />

           {/* Floating Reservation button */}
            <div id="reservationBtn" className="fixed z-10">
                <ReservationBtn />
            </div>

            {/* Section 1 */}
            <div className="pt-2 pb-16 px-4">

                <div className="w-full max-w-7xl mx-auto">
                
                    <div className="flex flex-wrap justify-center">
                    {cards.map((card) => (
                        <div 
                            key={card.id} 
                            className="pt-16 w-80 sm:w-80 flex flex-col items-center"
                            >
                            <img 
                            src={images[card.image]}
                            className="home-image w-3/4 max-w-xs h-auto object-cover"
                            />
                            <div className="mt-6">
                                <p className="text-gray-200 pl-2" style={{width:"247px"}}>{card.description}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="relative">
                <img 
                    src={images.smokeBg}
                    className="absolute inset-0 w-full h-full object-cover -z-0"  
                />
                <img 
                    src="/src/assets/Images/home-decor.png" 
                    className="pt-16 w-24 h-auto mx-auto block"/>

                
                <div className="relative z-1">
                    <div className="container mx-auto px-16 py-12">

                        {/* Section 2 - Image Left, Text Right */}
                        <section className="mb-20">
                            <div className="flex flex-col md:flex-row items-center">
                                {/* Image on Left */}
                                <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
                                    <img 
                                        src={images.homeImg01}
                                        alt="Restaurant interior" 
                                        className="home-image w-auto h-auto"
                                    />
                                </div>
                                
                                {/* Text Content on Right */}
                                <div className="w-full md:w-1/2 md:pl-8">
                                    <p className="home-section-text mb-4">
                                    Our bites menu offers a perfect balance of flavours that harmonise with our innovative cocktails. Whether you're in the mood for something light or a more indulgent treat, our bites promise to delight your palate.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 - Text Left, Image Right */}
                        <section className="mb-20">
                            <div className="flex flex-col md:flex-row-reverse items-center">
                                {/* Image on Right */}
                                <div className="w-full md:w-1/2 md:pl-8 mb-8 md:mb-0">
                                    <img 
                                        src={images.homeImg02}
                                        alt="Special dishes" 
                                        className="home-image w-full h-auto"
                                    />
                                </div>
                                
                                {/* Text Content on Left */}
                                <div className="w-full md:w-1/2 md:pr-8">
                                    <p className="home-section-text text-right sm:text-left mb-4">
                                    Enjoy the enchanting ambiance that makes Shadow & Spirits a truly unique destination.
                                    </p>
                                    <p className="home-section-text text-right sm:text-left mb-6">
                                    Join us for an unforgettable night of extraordinary flavours and timeless elegance.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <img 
                    src={images.homeDecor} 
                    className="pt-16 w-24 h-auto mx-auto block transform rotate-180"/>
            </div>
        </div> 
    )
}

export default Homepage;