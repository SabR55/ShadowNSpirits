import ReservationBtn from "../ReservationBtn";
import images from '../assets/assets.js';

function OurDrinks() {
    return (
        <div>
            {/* Hero Image */}
            <img src={images.ourDrinksHero} />

            {/* Floating Reservation button */}
            <div id="reservationBtn" className="fixed z-10">
                <ReservationBtn />
            </div>

            <div 
                className="grid grid-cols-1 sm:grid-cols-2 mx-auto max-w-6xl gap-16"
                style={{padding: "80px 15%"}}
                >
                
                <div className="flex flex-col items-center text-left mx-auto">
                    <div>
                        <h1 className="drinks-mainTitle text-white text-3xl">Signature <br/> Drinks</h1>

                        <img 
                            src={images.homeDecor} 
                            className="pt-8 w-24 h-auto block"/>

                        <img 
                            src={images.ourDrinksCard01} 
                            className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover"
                            style={{paddingTop:"80px"}}
                        />
                        
                        <p className="drinks-title pt-8 text-white text-xl">Crimson Whisper</p>

                        <p className="drinks-desc pt-4 text-white text-m">A fusion of cranberry and vodka, kissed with a hint of lime, this enigmatic elixir whispers secrets of a bygone era in every sip.</p>
                        
                    </div>
                </div>
                

                <div className="flex flex-col items-center text-left mx-auto">
                    <div className="pb-16">
                        <img 
                            src={images.ourDrinksCard02} 
                            className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover"
                        />
                        
                        <p className="drinks-title pt-8 text-white text-xl">Midnight Reverie</p>

                        <p className="drinks-desc pt-4 text-white text-m">A smooth and smoky blend of aged whiskey and dark cherry liqueur. Perfect for those who seek a taste of the extraordinary.</p>
                        
                    </div>

                    <div>
                        <img 
                            src={images.ourDrinksCard03} 
                            className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover"
                        />
                        
                        <p className="drinks-title pt-8 text-white text-xl">Velvet Dream</p>

                        <p className="drinks-desc pt-4 text-white text-m">A luxurious mix of gin and elderflower liqueur. This enchanting cocktail offers a velvety smooth sip that lingers with floral elegance.</p>
                        
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default OurDrinks;